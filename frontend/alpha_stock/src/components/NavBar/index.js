import Banner from "../Banner"
import NavOptionsDropdown from "../NavDropDown"
import Searchbar from "../Searchbar"
import "./NavBar.css"
import Logo from "./site_logo.jpeg"
import github from "./github-logo.svg"
import linkedin from "./linkedin.png"
import siteIcon from "./site_icon.png"
export default function NavBar(){
    return(
        <>
            <div id="nav-container">
          
            <div id="nav-logo">
                <div>
                <img  height={150} width={150} src={siteIcon}></img>
                </div>
              <div id="site-logo-text">
                <span id="site-logo-text1">AlphaStock</span>
                <span id="site-logo-text2">JS</span>
              </div>
            </div>
     
                 <Searchbar />
         

                    <div id="social-media-container">
                        <div class="social-icon" onClick={() => window.open("https://www.linkedin.com/in/maman1/","_blank")}>
                                <img height={50} width={50} src={linkedin}></img>
                            </div>
                        <div class="social-icon" onClick={() => window.open("https://github.com/michael-aman01/alpha_stock/tree/frontend","_blank")}>
                            <img height={50} width={50} src={github}></img>
                        </div>
                     
                    </div>

        

           
            </div>

        </>
    )
}