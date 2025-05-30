import { useCart } from '../context/CartContext' // ContextAPI

// Components
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'

function CartPage() {

  const { cartItems } = useCart();               // get cart 

  return (
    <>

      <Navbar />
      
      <div className="main-container">
        
        <h1 className='fs-4 text-center'>Cart Page</h1>

        <div className='border border-2 m-3 p-4'>
          {cartItems.length === 0 ? (
            <p className='text-center'>No items in cart.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index}>
                <p>{item}</p>
              </div>
            ))
          )}
        </div>

      </div>
       
      <Footer />
    </>
  )
}

export default CartPage