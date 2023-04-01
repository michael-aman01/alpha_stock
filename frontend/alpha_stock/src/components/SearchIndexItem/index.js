import "./SearchIndexItem.css"
import {useSelector} from "react-redux"
import { useEffect, useReducer, useState, useRef} from "react"
import {Chart, registerables}from "chart.js";
import { fetchCompanyInfo, fetchPriceData, updateWatchlist } from "../../store/stocks";
import { useDispatch } from "react-redux";
// import { updateWatchlist } from "../../store/stocks"

import PriceChart from "../PriceChart";
import { restoreSession } from "../../store/session";
import { setWeekYear } from "date-fns";




export default function SearchIndexItem({symbol, prices}){
    // //do a fetch for data once you have api
    const priceData = useSelector(state => state.stocks.priceData)
    const [latestChange, setLatestChange] = useState()
    const [currentGraph, setCurrentGraph] = useState()
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)
    const stateStocks = useSelector(state => state.stocks)
    const [currentStocks, setCurrentStocks] = useState()
    const [watchlist, setWatchlist] = useState()
    const [newSyms, setNewSyms] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
 

    const graphRef = useRef()


  
    const handleSearchItemClick = (e, ticker) => {
        e.preventDefault()
        dispatch(fetchPriceData(ticker))
        dispatch(fetchCompanyInfo(ticker))
    }




    return (
        <>
        <div id="search-item-container" onClick={(e) => handleSearchItemClick(e,symbol)}>
            <div id="search-item-symbol">{symbol}</div>

            <PriceChart prices={prices} duration={"1Y"}></PriceChart>

      
            <div id="search-item-change" style={{"color":priceData[symbol][0].changePercent > 0 ? "green" : "red"}}>{priceData[symbol][0].changePercent > 0 ? `+${ priceData[symbol][0].changePercent.toFixed(2)}%`:`${priceData[symbol][0].changePercent.toFixed(2)}%`}</div>
     
        </div>
       
         
        </>
    )
}