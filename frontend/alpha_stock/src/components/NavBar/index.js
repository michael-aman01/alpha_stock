import Banner from "../Banner"
import NavOptionsDropdown from "../NavDropDown"
import Searchbar from "../Searchbar"
import "./NavBar.css"
import Logo from "./site_logo.jpeg"
import github from "./github-logo.svg"
import linkedin from "./linkedin.png"

export default function NavBar(){
    return(
        <>
            <div id="nav-container">
          
            
     
                 <Searchbar />
         

                    <div id="social-media-container">
                        <div class="social-icon">
                                <img height={50} width={50} src={linkedin}></img>
                            </div>
                        <div class="social-icon">
                            <img height={50} width={50} src={github}></img>
                        </div>
                     
                    </div>

        

           
            </div>

        </>
    )
}