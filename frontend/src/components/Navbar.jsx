
import { Link } from 'react-router-dom'

export default function Navbar() {



  return (
    <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary  border border-bottom">
            <div class="container-fluid">

                <Link to="/" className="nav-brand">
                    <img src={'./ecommerce-logo-tranparent-bg.png'} alt="" />
                </Link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                        <Link className="nav-link link" to="/contactPage">Contact</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link link" to="/aboutPage">About</Link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link link" to="/productPage">Products</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link link" to="/cartPage">Cart</Link>
                    </li>



                </ul>

                </div>
            </div>
        </nav>

    </>
  )
}
