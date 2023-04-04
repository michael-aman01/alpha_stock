import React, { useRef, useEffect, useState } from "react";

import { capitalCase } from "change-case";
import {Chart, registerables}from "chart.js";
import 'chartjs-adapter-date-fns';
import {enUS} from  'date-fns/locale';
import "./PricesChart.css"
import { addCompanyInfo, addPriceData } from "../../store/stocks";
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import {fetchPriceData, fetchCompanyInfo} from '../../store/stocks'
Chart.register(...registerables);




export default function PriceChart({duration, prices, companyInfo, chartType}) {
   

    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [currentChart, setCurrentChart] = useState()
    const chartRef = useRef(null);
    const [recentChange, setRecentChange] = useState()
    const priceData = useSelector(state => state.stocks.priceData)
    const [changeColor, setChangeColor] = useState()
    const [symbol, setSymbol] = useState()
    

    const type = "line"
    let yType
    if(["1W","1M","6M"].includes(duration)){
        yType = "linear"
    }else{
        yType = "logarithmic"
    }


    const lineAnimation = () => {
        const totalDuration = 1000;
        const delayBetweenPoints = totalDuration / data.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animation = {
          x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                delay(ctx) {
                  if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                  }
                  ctx.xStarted = true;
                  return ctx.index * delayBetweenPoints;
                }
              },
              y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx) {
                  if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                  }
                  ctx.yStarted = true;
                  return ctx.index * delayBetweenPoints;
                }
              }
        };
        return animation
      }

      const getScales = () => {
        if(chartType !== "research"){
          return (
            {
              scales: {
                x:{
                  ticks: {
                    callback: () => {
                      return null
                    }
                  }
                },
                y: {
                  ticks: {
                    callback: () => {
                      return null
                    }
                  }
                }
              },
            }
          )
        }else{
          return (
            {            scales: {
        
              x: {
                    ticks: {
                      color: "white",
                    },
                    type: "time",

                    time: {
                      unit: "week"
                        //set depending on duration passed to price chart class
                    },
          

                  adapters: {
                      date: {
                          locale: enUS
                      }
                  }
              },
              y: {
                ticks: {
                  color: "white",
                },
                position: "right",
                scaleLabel:{
                  display: false
                }
              }
            }}
          )
        }
      }

    const getConfigs = () => {
        const animation = lineAnimation()
        const s = getScales().scales
     
        const config = {
          type: 'line',
          data: {
            datasets: [{
              borderColor: prices[0].change < 0 ? "red" : "green",
              borderWidth: 1,
              radius: 0,
              data: data,
            }]
          },
          options: {
                animation,
                interaction: {
                intersect: false
            },
            
            maintainAspectRatio: false,
            plugins: {
              legend: false,
            },
            scales: s
          }
        };
        return config
    }
    useEffect(() => {
      if(prices !== undefined){

        const dateIndices = prices.map(obj => obj.date)
        const priceData = prices.map(obj => obj.close)
        const durationOptions = {
            "1W": 5,
            "1M": 20,
            "6M": 126,
            "1Y": 252,
            "MAX" : dateIndices.length
        }
        const keys = dateIndices.slice(0,durationOptions[duration])
        
        const subsetData = []
        for(let i = 0; i < keys.length; i++){
            subsetData.push({'x': keys[i], 'y': priceData[i] })
        }
        setData(subsetData.reverse())
    
      }


 },[prices,duration])

 useEffect(() => {
  if (chartRef.current && data !== undefined) {
      if(currentChart !== undefined){
          currentChart.destroy()
      } 
      console.log("prices", priceData)
      const configs = getConfigs()
      setCurrentChart(new Chart(chartRef.current, configs))
    }
  },[chartRef.current, data, duration])


    useEffect(() => {
      if(companyInfo !== undefined && priceData !== undefined){
        if(Object.keys(priceData).includes(companyInfo.symbol)){
          const priceChange = priceData[companyInfo.symbol][1].change.toFixed(2)
          const percentChange = priceData[companyInfo.symbol][0].changePercent.toFixed(2)
          console.log(companyInfo.symbol)

          if(percentChange < 0){
            setRecentChange(`- ${priceChange} (${percentChange}%) Today`)
            setChangeColor("red")
          }else{
            setChangeColor("green")
            setRecentChange(`${priceChange} (${percentChange}%) Today`)
       
          }

        }else{
          console.log(prices)
        }

      }


    },[companyInfo])


  if(chartType === 'research' && companyInfo !== undefined && companyInfo !== null){
  return (
    <div id="price-chart-container">
      <div id="chart-description-container">
        {data !== undefined ? 
        <>
        <div>
        <div style={{"font-size":"45px"}} id="chart-current-price"  className="chart-price-item">
          <span>{`$${companyInfo.price}`} </span>
          <span style={{"fontSize":"20px"}}>{companyInfo.currency}</span>
          </div>
        <div style={{"font-size":"25px", "color": changeColor }} className="chart-price-item" id="chart-percentage-change">{recentChange}</div>
        </div>
       
        </>
        :null


        }
        <div style={{"display":"flex", "flex-direction":"column"}}>
            <div  style={{"font-size":"50px"}}>{companyInfo === undefined ? null : companyInfo.symbol}</div>
   
            <div style={{"font-size":"20px"}}>{companyInfo === undefined ? null : `${companyInfo.companyName} | ${companyInfo.sector}`}</div>
        </div>
      </div>

       <canvas id="price-canvas" ref={chartRef} />

   </div>
 );
}else{
  return (
    <>
      <div id="search-graph-container">
      <canvas id="price-canvas" ref={chartRef} />
      </div>
    </>
  )
}
}