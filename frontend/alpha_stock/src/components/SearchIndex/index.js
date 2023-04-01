import "./SearchIndex.css"
import Seachbar from "../Searchbar"
import SearchIndexItem from "../SearchIndexItem"
import { useEffect, useState } from "react"
import {useSelector,useDispatch} from 'react-redux'
import { restoreSession } from "../../store/session"


export default function SearchIndex(){
    const priceData = useSelector(state => state.stocks.priceData)
    const info = useSelector(state => state.stocks.info)
    const [symbols, setSymbols] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    const state = useSelector(state => state)
    const [watchlist, setWatchlist] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        console.log(currentUser)
   
    },[currentUser])


    // useEffect(() => {
   
    //     if(Object.keys(priceData) !== symbols){
    //         setSymbols(Object.keys(priceData))
    //         setWatchlist(Object.keys(priceData))
    //     }

      
    // },[symbols, priceData])



    return (

        
            <>
              <div id="right-search-pane">

                {
                    Object.keys(priceData).map(sym =>  watchlist.includes(sym) !== true ?  
         
                    <>
                                        <SearchIndexItem symbol={sym} prices={priceData[sym]} currentUser={currentUser}></SearchIndexItem> 
   
                    </>


                    : null
                )}

                </div>
                    </>
  
    )
}
