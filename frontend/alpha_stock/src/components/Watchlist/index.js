import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPriceData } from "../../store/stocks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PriceChart from "../PriceChart";
import { fetchWatchlist } from "../../store/stocks";
import SearchIndexItem from "../SearchIndexItem";



export default function Watchlist(){
    const session = useSelector(state => state.session)
    const priceData = useSelector(state => state.stocks.priceData)
    const stateStocks = useSelector(state => state.stocks)

    const [prices, setPrices] = useState([])
    const dispatch = useDispatch()
    const [watchlist, setWatchlist] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    const [watchlistWidgets, setWatchlistWidgets] = useState([])

    useEffect(() => {
        if(watchlist !== undefined && session.watchlist !== null){
            setWatchlist(session.watchlist)
        }
    },[session])






   



if(currentUser !== undefined && session.watchlist !== null && session.watchlist !== undefined){
    return (

        
        <>
          <div id="right-search-pane">
                <h1>Search Results</h1>

            {
                session.watchlist.map((sym, i) =>   
     
                <>
                <div>{sym}</div>
                                    {/* <SearchIndexItem symbol={sym} prices={priceData[sym]} currentUser={currentUser}></SearchIndexItem>  */}

                </>



            )}

            </div>
                </>

)
}else{
    return( 
    <>
    <div>
        DRAG AND DROP
    </div></>)}
}