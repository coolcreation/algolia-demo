// npm install algoliasearch

import { algoliasearch } from 'algoliasearch';

import Product from './models/productModel.js'; // Ensure Product model is correctly defined and connected to MongoDB
import dotenv from "dotenv";

dotenv.config();

const ALGOLIA_APPLICATION_ID = process.env.Application_ID;
const ALGOLIA_API_KEY = process.env.Write_API_Key;

const ALGOLIA_INDEX_NAME = "products"; // SET THE ACTUAL INDEX NAME

if (!ALGOLIA_APPLICATION_ID || !ALGOLIA_API_KEY || !process.env.URL) {
    throw new Error("Missing environment variables");
}

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);
// const index = client; // Revert to this, or just use 'client' directly in the sync function

async function syncAlgolia() {
    console.log('--- Syncing Algolia Products ---');
    let products = [];
    try {
        products = await Product.find({});
        console.log('Products fetched from MongoDB. Count:', products.length);
        if (products.length > 0) {
            console.log('First product fetched:', products[0]);
        } else {
            console.log('No products found in MongoDB. Algolia will be cleared or remain empty.');
        }
    } catch (error) {
        console.error('Error fetching products from MongoDB:', error);
        return;
    }


    // Check product attributes for correct form
    const records = products.map(p => {

        // don't add product if attributes aren't correct
        if (!p || !p._id || !p.name || !p.price || !p.description) {
            console.warn(`Skipping malformed product:`, p);
            return null;               
        } 

        // add product to list if attributes are good
        return {                    
            objectID: p._id.toString(),
            name: p.name,
            price: p.price,
            description: p.description,
            stock: p.stock
        };

    }).filter(record => record !== null);


    console.log('Records prepared for Algolia. Count:', records.length);
    if (records.length > 0) {
        console.log('First record prepared:', records[0]);
    } else {
        console.log('No valid records prepared for Algolia.');
    }

    try {
        // Iterate through records and use saveObject for each
        for (const record of records) {

            // Save the object to Algolia via 'products' index
            await client.saveObject({               // Use the main 'client' object  (see line #19 above)
                indexName: ALGOLIA_INDEX_NAME,      // Algolia index name 'products' (see line #13 above)
                body: record,                       // Pass the single 'product' to be saved in Algolia 'products' index
            });
        }
        console.log('Products synced to Algolia!');
    } catch (error) {
        console.error('Error syncing products to Algolia:', error);
    }


}

export default syncAlgolia;