//  https://www.algolia.com/doc/guides/building-search-ui/getting-started/react/

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'

export default function Searchbox() {

  const ALGOLIA_APPLICATION_ID = import.meta.env.VITE_Application_ID
  const ALGOLIA_API_KEY = import.meta.env.VITE_Search_API_Key

  const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

  function Hit({ hit }) {
    return (

        <div className='product-card-container d-flex flex-wrap justify-content-around w-100 gap-3'>
          <div className="card bg-dark col-12">

              <div class="card-body text-white">
                  <h4 className="card-title">{hit.name}</h4>
                  <p className="card-text">{hit.description}</p>
                  <p className="card-text text-info fs-5 fw-semibold">${hit.price}</p>
                  <p className="card-text ">qty: {hit.stock}</p>
                  <a className="btn btn-primary w-100 fw-semibold">ADD TO CART</a>
              </div>
          </div>
        </div> 
    )
  }

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="products">
          <SearchBox className='search-box' placeholder='product search' />
          {/* Embed 'Hits' here to affect what is shown in real time while typing a search */}
          <Hits hitComponent={Hit} />
      </InstantSearch>


      {/* The following will always display all products. Search will not affect the view: */}
      {/* <div className="hits-container">
          <InstantSearch searchClient={searchClient} indexName="products">
              <Hits hitComponent={Hit}/>
          </InstantSearch>
      </div> */}
    </>
    
  )

}


