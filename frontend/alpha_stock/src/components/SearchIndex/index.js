import "./SearchIndex.css"
import Seachbar from "../Searchbar"
import SearchIndexItem from "../SearchIndexItem"
import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { getCurrentUser } from "../../store/session"

export default function SearchIndex(){
    const priceData = useSelector(state => state.stocks.priceData)
    const info = useSelector(state => state.stocks.info)
    const [symbols, setSymbols] = useState([])
    const currentUser = useSelector(state => state.session.current_user)
    const state = useSelector(state => state)
    const [watchlist, setWatchlist] = useState([])


    // useEffect(() => {
   
    //     setSymbols(Object.keys(priceData))
    //     setWatchlist(Object.keys(priceData))
      
    // },[priceData, symbols])



    return (

        
            <>
              <div>
                    <h1>Search Results</h1>
                {
                    symbols.map(sym =>  watchlist.includes(sym) === true ?  
         
                
                    <SearchIndexItem symbol={sym} price={priceData[sym]} currentUser={currentUser}></SearchIndexItem> 
            

                    : null
                )}

                </div>
                    </>
  
    )
}
