import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPriceData } from "../../store/stocks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PriceChart from "../PriceChart";
export default function Watchlist(){
    const currentUser = useSelector(state => state.session.user)
    const priceData = useSelector(state => state.stocks.priceData)
    const [prices, setPrices] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if(currentUser !== undefined){
            let syms = []
            currentUser.watchlist.forEach(async sym => {
                let p = await dispatch(fetchPriceData(sym))
                console.log(priceData[sym])
                syms.push([sym,priceData[sym]])
            });
            setPrices(syms)
        }
    },[currentUser])
    if(prices.length > 0){
    return (
        <>
        {
            prices.map(arr => 
                <>
                    <div id="search-item-container">
                        <div id="search-item-symbol">{arr[0]}</div>

                        <PriceChart prices={arr[1]} duration={"1Y"}></PriceChart>

                
                        <div id="search-item-change" style={{"color":arr[1][0].changePercent > 0 ? "green" : "red"}}>{arr[1].changePercent > 0 ? `+${arr[1].changePercent}%`:`${arr[1][0].changePercent}%`}</div>
                
                    </div>
                </>
            )
        }

        </>
    )
}}