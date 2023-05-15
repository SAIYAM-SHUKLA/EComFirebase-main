import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import cartlogo from "../components/assets/cartlogo.png";
import profilelogo from "../components/assets/profilelogo.png";
import { auth, db } from '../FirebaseConfigs/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  function GetCurrentUser(){
    const [user,setUser] = useState("")
    const usersCollectionRef = collection(db,"users")

    useEffect(()=>{
      auth.onAuthStateChanged(userlogged =>{
        if(userlogged){
          const getUsers = async()=>{
            const q = query(usersCollectionRef,where("uid","==",userlogged.uid))
            // console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc)=>({
              ...doc.data(),id:doc.id
            })))
          }
          getUsers();
        }
        else{
          setUser(null);
        }
      })
    },[])
    return user
  }

  const loggedUser  =GetCurrentUser();
  if(loggedUser){console.log(loggedUser[0])}

  const navigate = useNavigate();

  const handleLogout = ()=>{
    auth.signOut().then(()=>{
      navigate("/login")
    })
  }

  const[cartData,setCartData]= useState([]) ; 
  if(loggedUser){
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggedUser[0].uid}`
      // console.log(path)
      getDocs(collection(db, path)).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // console.log(doc.id, " => ", doc.data());
              cartArray.push({ ...doc.data(), id: doc.id })
          });
          setCartData(cartArray)
          // console.log('done')
      }).catch('Error error error')

  }
  getcartdata()
  }








  return (

    <>

    {/* new nav bar changed */}
    {
          !loggedUser && 
  
   
   

    



    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/"> <img  class ="imgg"src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-digital-shopping-logo-mouse-cursor-cart-concepts_502185-286.jpg" alt="" /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Link to="/"><button>Home</button></Link>
        </li>
        <li class="nav-item">
        <Link to="/sellproduct"><button>Sell</button></Link>
        </li>
        
        
        <li class="nav-item">
        <Link to='/login'><button>Login</button></ Link >
        </li>
        <li class="nav-item">
      
       


        <Link to='/signup'><button>Register</button></Link>
        </li>
       
        


      </ul>

        <div className='cart-btn'>
                <img src={cartlogo} alt="no img" />
                <span className='cart-icon-css'>0</span>
            </div>


      <Link to="/login">
                <img src={profilelogo} className='profile-icon' alt="" />
            </Link>
      
    </div>
  </div>
</nav>}








{
          loggedUser && 
  
   
   

    



    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/"> <img  class ="imgg"src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-digital-shopping-logo-mouse-cursor-cart-concepts_502185-286.jpg" alt="" /></a>


   
      
            
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Link to="/"><button>Home</button></Link>
        </li>
        <li class="nav-item">
        <Link to="/sellproduct"><button>Sell</button></Link>
        </li>
        
        
      
       
        


      </ul>


      <button className='logout-btn' onClick={handleLogout}>Logout</button>

        <div className='cart-btn'>
                <img src={cartlogo} alt="no img" />
                <span className='cart-icon-css'>0</span>
            </div>


      <Link to="/userprofile">
                <img src={profilelogo} className='profile-icon' alt="" />
            </Link>
      
      
    </div>
  </div>
</nav>}


{/* new nav bar changed end*/}


<div className="product-types">
      <a href="/product-type/mobile"><button>Mobiles</button></a>
              <a href="/product-type/laptop"><button>Laptops</button></a>
              <a href="/product-type/camera"><button>Cameras</button></a>
              <a href="/product-type/shoes"><button>Shoes</button></a>
      </div>


</>




 
    








    
  );
};

export default Navbar;
