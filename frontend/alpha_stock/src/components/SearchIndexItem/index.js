import "./SearchIndexItem.css"
import {useSelector} from "react-redux"
import { useEffect, useReducer, useState, useRef} from "react"
import {Chart, registerables}from "chart.js";
import { fetchCompanyInfo, fetchPriceData } from "../../store/stocks";
import { useDispatch } from "react-redux";
// import { updateWatchlist } from "../../store/stocks"
import PriceChart from "../PriceChart";

export default function SearchIndexItem({symbol, price}){
    // //do a fetch for data once you have api
    const priceData = useSelector(state => state.stocks.priceData[symbol])
    const [latestChange, setLatestChange] = useState()
    const [currentGraph, setCurrentGraph] = useState()
    const dispatch = useDispatch()
    let currentUser = undefined
 

    const graphRef = useRef()


  
    const handleSearchItemClick = (e, ticker) => {
        e.preventDefault()
        dispatch(fetchPriceData(ticker))
        dispatch(fetchCompanyInfo(ticker))
    }

    // const handleDrag = (e,symbol) => {
    //     e.preventDefault()

    //         if(currentUser){
    //             let updatedUser = {...currentUser}
    //             updatedUser.watchlist.push(symbol)
    //             // dispatch(updateWatchlist(updatedUser))
    //             let watchList = document.getElementById("research-nav-left")
    //             watchList.appendChild(e.target)
    //             e.target.setAttribute("id", "watch-list-item")
    //         }
    
    //     }

    return (
        <>
        <div id="search-item-container" onClick={(e) => handleSearchItemClick(e,symbol)}>
            <div id="search-item-symbol">{symbol}</div>

            <PriceChart prices={priceData} duration={"1Y"}></PriceChart>

      
            <div id="search-item-change" style={{"color":priceData[0].changePercent > 0 ? "green" : "red"}}>{priceData[0].changePercent > 0 ? `+${priceData[0].changePercent}%`:`${priceData[0].changePercent}%`}</div>
     
        </div>
       
         
        </>
    )
}