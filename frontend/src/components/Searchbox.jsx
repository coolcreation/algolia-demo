//  https://dashboard.algolia.com/apps/5VVBCOJ357/explorer/browse/LayeredEcommerce?searchMode=search
//  https://www.algolia.com/doc/guides/building-search-ui/getting-started/react/

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'

export default function Searchbox() {

  const ALGOLIA_APPLICATION_ID = import.meta.env.VITE_Application_ID
  const ALGOLIA_API_KEY = import.meta.env.VITE_Search_API_Key

  const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

  function Hit({ hit }) {
    return (
        // <div className="hit">
        // <h4>{hit.name}</h4>
        // <p>{hit.description}</p>
        // <p>${hit.price}</p>
        // </div>

        <div className='product-card-container d-flex flex-wrap justify-content-around w-100 gap-3'>
          <div className="card bg-dark col-12">

              <div class="card-body text-white">
                  <h4 className="card-title">{hit.name}</h4>
                  <p className="card-text">{hit.description}</p>
                  <p className="card-text text-info fs-5">${hit.price}</p>
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
            <Hits hitComponent={Hit} />
        </InstantSearch>
    </>
    
  )

}


