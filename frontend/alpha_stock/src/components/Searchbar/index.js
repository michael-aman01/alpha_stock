import "./SearchBar.css"
import {useEffect, useState} from 'react'
import symbols from '../../assets/symbols.json'
import {fetchPriceData, fetchCompanyInfo} from "../../store/stocks"
import {useDispatch, useSelector} from "react-redux"
import { useParams, useNavigate} from "react-router-dom"

export default function Searchbar(){
    const dispatch = useDispatch()

    const [currentQuery, setCurrentQuery] = useState('')
    const exchanges = ["NYSE", "NASDAQ", "AMEX"]
    const [searchResults, setSearchResults] = useState()
    const tickers = symbols.filter(sym => exchanges.includes(sym.exchangeShortName)).map(obj => obj.symbol.toLowerCase())
    const names = symbols.filter(sym => exchanges.includes(sym.exchangeShortName)).map(obj => obj.name.toLowerCase())
    const history = useNavigate()

    const priceData = useSelector(state => state.stocks)
    const handleSelection = (e,ticker) => {
        e.preventDefault()
        setCurrentQuery('')
        dispatch(fetchPriceData(ticker))
        dispatch(fetchCompanyInfo(ticker))
        document.addEventListener("click" ,  () => {return null})
        e.target.value = ''
    }



    useEffect(() => {
    
        if(names !== undefined && tickers !== undefined && currentQuery !== undefined){
            if(currentQuery.length === 0){
                let resultContainer = document.getElementById("search-results")
                if(resultContainer !== null){
                    resultContainer.setAttribute("id","search-results-empty")
                }   
                setSearchResults(undefined)
            }else{
                let resultContainer = document.getElementById("search-results-empty")
                if(resultContainer !== null){
                    resultContainer.setAttribute("id","search-results")
                }
                const filteredNames = names.filter(name => name[0] === currentQuery[0] && name.search(currentQuery) !== -1)
                const filteredTickers = filteredNames.map(name => tickers[names.indexOf(name)])
        
                setSearchResults([...filteredNames,...filteredTickers])
            }

           
            
        }


    },[currentQuery, names, tickers,searchResults])

    useEffect(() => {
        if(currentQuery.length === 0){
            document.addEventListener("click", () => {return null})
            setSearchResults(undefined)
        }else{
            document.addEventListener("click", (e) => {
                if(e.target.id !== "profile-search-bar"){
                    setCurrentQuery('')
                }
            })
        }
    },[currentQuery])

  



    return(
        <>
            <div id="search-bar-container">
            <div id="search-input">
                <input  placeholder="search" id="profile-search-bar" type="text" onChange={(e) => setCurrentQuery(e.target.value)}></input>
        
            </div>

            </div>
            <div id="search-results">
      
                 <ul style={{"width":"100%"}}>
           
                    {searchResults && 
                        searchResults.map((result,i)=> 
                        <>
              
                          <div   className="result" onClick={(e) => handleSelection(e, tickers[names.indexOf(result)])}>
                          <div>{result}</div>
                          <div >{tickers[names.indexOf(result)]}</div>
                
                          </div>
                        </>
                      
                        )
                    }
                </ul>
        
            </div>
        </>
    )
}