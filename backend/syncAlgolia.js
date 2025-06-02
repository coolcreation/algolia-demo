// npm install algoliasearch

import { algoliasearch } from 'algoliasearch'
import Product from './models/productModel.js'
import dotenv from "dotenv"

dotenv.config()

const ALGOLIA_APPLICATION_ID = process.env.Application_ID
const ALGOLIA_API_KEY = process.env.Admin_Key    // Write_API_Key

const ALGOLIA_INDEX_NAME = "products"  // This is our Algolia index name we want to use

if (!ALGOLIA_APPLICATION_ID || !ALGOLIA_API_KEY || !process.env.URL) {
    throw new Error("Missing environment variables")
}

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

async function syncAlgolia() {
    console.log('--- Syncing Algolia Products ---')
    let products = []
    try {
        products = await Product.find({})
        console.log('Products fetched from MongoDB. Count:', products.length)
        if (products.length > 0) {
            console.log('First product fetched:', products[0])
        } else {
            console.log('No products found in MongoDB')
        }
    } catch (error) {
        console.error('Error fetching products from MongoDB:', error)
        return
    }

    const records = products.map(product => ({
        objectID: product._id.toString(),
        baseName: product.baseName,
        description: product.description,
        brand: product.brand,
        categories: product.categories,
        tags: product.tags,
        sku: product.sku,
        price: product.price || 0,
        stock: product.stock || 0,
        imageURL: product.imageURL,
        variants: product.variants || [],   // embed variants as array
    }));

    console.log('Records prepared for Algolia. Count:', records.length)
    if (records.length > 0) {
        console.log('First record prepared:', records[0])
    } else {
        console.log('No valid records prepared for Algolia.')
    }

    try {

       // clear Algolia index (only needed when developing/seeding)
       await client.clearObjects({ indexName: ALGOLIA_INDEX_NAME })

        // save new Objects
        for (const record of records) {

            // Save the object to Algolia via 'products' index
            await client.saveObject({               // Use the main 'client' object  (see line #19 above)
                indexName: ALGOLIA_INDEX_NAME,      // Algolia index name 'products' (see line #13 above)
                body: record,                       // Pass the single 'product' to be saved in Algolia 'products' index
            })
        }
        console.log('Products synced to Algolia!')
    } catch (error) {
        console.error('Error syncing products to Algolia:', error)
    }

}
export default syncAlgolia


/***********************************************************************
 VariantCard & ProductCard Components will use the following attributes:

// Variant-Level Records
        objectID: ? `${p._id.toString()}-${v.sku}` : p._id.toString(),
        name 
        price 
        stock 
        description 
        brand 
        categories 
        imageURL 

// Product-Level Records
        objectID: p._id.toString(),
        baseName 
        description 
        brand 
        categories 
        price: p.variants?.[0]?.price || 0,
        stock: p.variants?.[0]?.stock || 0,
        imageURL

************************************************************************/