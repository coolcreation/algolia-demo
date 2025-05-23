// Components
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';
import Searchbox from '../components/Searchbox';

function ProductPage() {
  return (
    <>

      <Navbar />
      
      <div className="main-container">
        
        <h1 className='fs-4 text-center'>Product Page</h1>
        <Searchbox />
      </div>
        
      <Footer />
    </>
  )
}

export default ProductPage




