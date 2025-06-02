// src/pages/CartPage.js
import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'

// Components
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';
import Searchbox from '../components/Searchbox';

const CartPage = () => {
  const [searchClient, setSearchClient] = useState(null)
  const [cartItems, setCartItems] = useState([])

  const ALGOLIA_APP_ID = import.meta.env.VITE_Application_ID

  useEffect(() => {
    async function fetchSearchKey() {
      try {
        const response = await fetch("http://localhost:8000/api/algolia-key"); // Call secure endpoint

        // Try reading raw response text first
        const raw = await response.text()
        console.log('Raw response:', raw)

        // Then manually parse if needed
        const data = JSON.parse(raw)

        const client = algoliasearch(ALGOLIA_APP_ID, data.key) // Use response key
        setSearchClient(client)
      } catch (error) {
        console.error('Error getting search key:', error)
      }
    }

    fetchSearchKey()
  }, [])

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item])
    console.log('Cart updated:', [...cartItems, item])
  }

  const ProductHit = ({ hit }) => (
    <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem 0' }}>
      <h4>{hit.baseName}</h4>
      <p>{hit.description}</p>
      <button onClick={() => addToCart(hit)}>Add to Cart</button>
    </div>
  )

  if (!searchClient) return <p>Loading search client...</p>

  return (
    <>

      <Navbar />
      
      <div className="main-container">
        
       <div>
          <h1 className='fs-4 text-start ps-1 ps-lg-3'>Cart Page</h1>
         
          <InstantSearch searchClient={searchClient} indexName="products">
            <SearchBox />
            <Hits hitComponent={ProductHit} />
          </InstantSearch>
          
          <h3 className='text-center'>Cart Items</h3>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx}>{item.baseName} - ${item.price}</li>
            ))}
          </ul>
       </div>

      </div>
        
      <Footer />
    </>


  )
}

export default CartPage

// import { useCart } from '../context/CartContext' // ContextAPI

// // Components
// import Navbar from "../components/Navbar"
// import Footer from '../components/Footer'

// function CartPage() {

//   const { cartItems } = useCart();               // get cart 

//   return (
//     <>

//       <Navbar />
      
//       <div className="main-container">
        
//         <h1 className='fs-4 text-center'>Cart Page</h1>

//         <div className='border border-2 m-3 p-4'>
//           {cartItems.length === 0 ? (
//             <p className='text-center'>No items in cart.</p>
//           ) : (
//             cartItems.map((item, index) => (
//               <div key={index}>
//                 <p>{item}</p>
//               </div>
//             ))
//           )}
//         </div>

//       </div>
       
//       <Footer />
//     </>
//   )
// }

// export default CartPage