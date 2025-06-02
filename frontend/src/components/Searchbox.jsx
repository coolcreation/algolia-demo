//  https://www.algolia.com/doc/guides/building-search-ui/getting-started/react/

import { useState } from 'react'
// import { liteClient as algoliasearch } from 'algoliasearch/lite';
import algoliasearch from 'algoliasearch/lite';

import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'
import { useSearchBox } from 'react-instantsearch';  // Show products for searches only, not propdcuts without a search
import { useCart } from '../context/CartContext';    // ContextAPI


import ProductCard from './ProductCard.jsx';
import VariantCard from './VariantCard.jsx';


export default function Searchbox() {

  const [productAdded, setProductAdded] = useState()  // could use this for temp message possibly, otherwise we don't need it
  const { addToCart } = useCart();

  const ALGOLIA_APPLICATION_ID = import.meta.env.VITE_Application_ID
  const ALGOLIA_API_KEY = import.meta.env.VITE_Search_API_Key

  const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

  const handleProductAdded = (id) => {
    console.log("Unique Product+Variant ID:", id);   
    setProductAdded(id);
    addToCart(id);
  };

  // Show products for searches only, not propdcuts without a search
  function ConditionalHits() {
    const { query } = useSearchBox();
    return query.trim().length > 0 ? <Hits hitComponent={HitCard} /> : null;
  }

    //  pseudo-variant detection logic
  function isTrueVariantProduct(hit) {
    const variants = hit.variants;
    if (!Array.isArray(variants)) return false;
    return variants.length > 1;       // if we have only one then do something
  }

  function isPseudoVariant(hit) {
    const variants = hit.variants;
    if (!Array.isArray(variants)) return false;
    if (variants.length !== 1) return false;

    const variant = variants[0];
    const nameMatches = variant.name?.toLowerCase().includes(hit.baseName?.toLowerCase());

    return nameMatches;
  }

  // display the correct product card we need
  function HitCard({ hit }) {
    if (isTrueVariantProduct(hit)) {
      return <ProductCard
          hit={hit}
          handleProductAdded={handleProductAdded}
      />;
    }

    if (isPseudoVariant(hit)) {
      return <VariantCard 
          hit={{ ...hit, ...hit.variants[0] }}
          productAdded={productAdded}
          handleProductAdded={handleProductAdded}
      />
    }

  }

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="products">
        <SearchBox />
        <ConditionalHits />
      </InstantSearch>

    </>
    
  )

}



      {/* <InstantSearch searchClient={searchClient} indexName="products">
          <SearchBox className='search-box' placeholder='product search' />
          // Embed 'Hits' here to affect what is shown in real time while typing a search  
          <Hits hitComponent={Hit} />
      </InstantSearch> */}


      {/* The following will always display all products. Search will not affect the view: */}
      {/* <div className="hits-container">
          <InstantSearch searchClient={searchClient} indexName="products">
              <Hits hitComponent={Hit}/>
          </InstantSearch>
      </div> */}
