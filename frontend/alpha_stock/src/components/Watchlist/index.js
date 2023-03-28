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
        if(currentUser !== null){
            setWatchlist(stateStocks.watchlist)
        }
    },[session])

    useEffect(() => {
        console.log("from watch",currentUser)
    },[currentUser])

    useEffect(() => {
        if(watchlist.length >0 && priceData !== null){

     
        }
    },[watchlist])





    return (
        <>
        {
            watchlist.map((sym, key) => 
                <>
                    <div id="search-item-container">
                 
                            <div>{watchlistWidgets}</div>
                            
                    </div>
                </>
            )
        }

        </>
    )
}