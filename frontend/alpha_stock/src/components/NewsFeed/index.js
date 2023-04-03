import React, { useRef, useEffect, useState } from "react";

import { capitalCase } from "change-case";


import { addCompanyInfo, addPriceData } from "../../store/stocks";
import { useDispatch, useSelector } from "react-redux";

import {fetchPriceData, fetchCompanyInfo} from '../../store/stocks'
import { compose } from "redux";
import "./newsFeed.css"
import { useNavigate } from "react-router-dom";
export default function NewsFeed({symbol}){
    const [data, setData] = useState([])
    const currentStocks = useSelector(state => state.stocks)
    const currentNews = useSelector(state => state.stocks.news)
    const navigate = useNavigate()
    useEffect(() => {
        if(currentNews){
            setData(currentNews.data)
        }

    },[currentStocks])




if(currentNews.data){
 return (
    <>
    <div id="new-feed-container">



    <div  id="news-feed-scroll" >


    {

    currentNews.data.map(obj => (
        <div class="news-widget" onClick={() => window.open(obj.url, "_blank")}>
        <div id="news-title">{obj.title}</div>
        <div style={{display: "flex"}}>
        <div id="news-site">{obj.site}</div>
        <div id="news-date">{obj.publishedDate.split(" ").slice(0,1)}</div>
            </div>
  
        <br></br>
        <div id="news-text">"{obj.text.split(" ").slice(0, 10).join(" ")}....."</div>
        <div>{}</div>
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
            <div>

                loading...
            </div>
        </>
    )
}
}