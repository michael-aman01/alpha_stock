import NavOptionsDropdown from "../NavDropDown"
import Searchbar from "../Searchbar"
import "./NavBar.css"

export default function NavBar(){
    return(
        <>
            <div id="nav-container">
                <div id="nav-logo">gwgwgw</div>
         
                    <Searchbar />

        
                    <NavOptionsDropdown></NavOptionsDropdown>
           
            </div>
        </>
    )
}