import About from "./Mainpage/About";
import Features from "./Mainpage/Features";
import Footer from "./Mainpage/Footer";
import Hero from "./Mainpage/Hero";
import Navbar from "./Mainpage/Navbar";

function Home(params) {

  
  return(<>
  <main>
    
    <Navbar/>
  <Hero/>
  <About/>
  <Features/>
  <Footer/>
  </main>
  
  </>)
}



export default Home