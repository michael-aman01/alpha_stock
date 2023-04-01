import React, { useRef, useEffect, useState } from "react";

import { capitalCase } from "change-case";


import { addCompanyInfo, addPriceData } from "../../store/stocks";
import { useDispatch, useSelector } from "react-redux";

import {fetchPriceData, fetchCompanyInfo} from '../../store/stocks'
import { compose } from "redux";
import "./newsFeed.css"
export default function NewsFeed({symbol}){
    const [data, setData] = useState([])
    const currentStocks = useSelector(state => state.stocks)
    const currentNews = useSelector(state => state.stocks.news)

    useEffect(() => {
        if(currentNews.data){
            console.log(currentNews)
            setData(currentNews.data)
        }

    },[currentStocks, currentNews])




if(data.length > 0){
 return (
    <>
    <div id="new-feed-container">



    <div  id="news-feed-scroll" >


    {

    data.map(obj => (
        <div class="news-widget">
        <div>{obj.title}</div>
        <div>{obj.site}</div>
        <div>"{obj.text}"</div>
        <div>

        <img height={175} src={obj.image}></img>
        </div>

        </div>
    ))

    
    }
        </div>
        </div>
    </>
 )
}else{
    return (
        <>
            <div>loading</div>
        </>
    )
}

}