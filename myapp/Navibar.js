import React from "react";
// import { Container} from 'react-bootstrap';
// import { Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const Navibar = () => {
    return (
      <>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>



<nav class="site-header sticky-top py-1 bg-black">
  <div class="container d-flex flex-column flex-md-row justify-content-between">
  
    <img class="mt-1" src={require('./logo.png')} width="130" height="70"  alt=""/>
    <a href="http://localhost:3000#home" type="text" class="text-decoration-none d-none d-md-inline-block text-white mt-5"><h5>Crypto Currency - G2 Coin</h5></a>
    <a href="http://localhost:3000#connect" type="text" class="text-decoration-none d-none d-md-inline-block text-white mt-5"><h5>Connect Wallet</h5></a>
    <a href="http://localhost:3000#transfer" type="text" class="text-decoration-none d-none d-md-inline-block text-white mt-5"><h5>Transfer</h5></a>
    <a href="http://localhost:3000#buy" type="text" class="text-decoration-none d-none d-md-inline-block text-white mt-5"><h5>Buy</h5></a>
    
   
  
  </div>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li></ul></div>
</nav>
  </>
    );
}

export default Navibar;