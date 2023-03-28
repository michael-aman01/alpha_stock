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



    useEffect(() => {
        if(watchlist === undefined && currentUser !== null){
            setWatchlist(currentUser.watchlist)
        }
    },[session])

    useEffect(() => {
        if(currentUser === undefined){
            dispatch(restoreSession())
            
        }
    },[session,currentUser])


  
    const handleSearchItemClick = (e, ticker) => {
        e.preventDefault()
        dispatch(fetchPriceData(ticker))
        dispatch(fetchCompanyInfo(ticker))
    }



    // const handleDrag = async (e,symbol) => {
    //     e.preventDefault()
    //     console.log(stateStocks)
    //     if(currentUser && !watchlist.includes(symbol)){
    //         const res = await fetch(`/api/users/watchlist/${currentUser.id}`, {
    //                                                      method: "GET",
    //                                                         headers: {
    //                                                             "Content-Type": "application/json",
    //                                                             "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
    //                                                         }})

    //         const data = await res.json()
    //         console.log(data)
    //     }
    
    //     }
    const handleDrag = async (e,symbol) => {
        e.preventDefault()
        if(!watchlist.includes(symbol)){
            
            let updateUser = {...currentUser}
            updateUser.watchlist = []
            updateUser.watchlist.push(symbol)
            console.log(updateUser)
            // updateUser.watchlist = [...watchlist, newSyms[0]]
            const res = await dispatch(updateWatchlist(updateUser))
            
        }

        
        }
    return (
        <>
        <div id="search-item-container" onClick={(e) => handleSearchItemClick(e,symbol)} draggable onDragEnd={(e) => handleDrag(e, symbol)}>
            <div id="search-item-symbol">{symbol}</div>

            <PriceChart prices={prices} duration={"1Y"}></PriceChart>

      
            <div id="search-item-change" style={{"color":priceData[symbol][0].changePercent > 0 ? "green" : "red"}}>{priceData[symbol][0].changePercent > 0 ? `+${ priceData[symbol][0].changePercent.toFixed(2)}%`:`${priceData[symbol][0].changePercent.toFixed(2)}%`}</div>
     
        </div>
       
         
        </>
    )
}