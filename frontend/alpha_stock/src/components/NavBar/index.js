import Banner from "../Banner"
import NavOptionsDropdown from "../NavDropDown"
import Searchbar from "../Searchbar"
import "./NavBar.css"
import Logo from "./site_logo.jpeg"
export default function NavBar(){
    return(
        <>
            <div id="nav-container">
                <div id="nav-logo">
            
                </div>
         
                    <Searchbar />

        
                    <NavOptionsDropdown></NavOptionsDropdown>
           
            </div>
            <div style={{"height":"100%"}}>
              <Banner></Banner>
            </div>
        </>
    )
}