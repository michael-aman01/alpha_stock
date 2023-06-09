import "./ResearchPage.css"
import PriceChart from "../PriceChart"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import StatementChart from "../StatementChart"
// import Searchbar from "../Searchbar"
import SearchIndex from "../SearchIndex"
import Watchlist from "../Watchlist"
import SearchIndexItem from "../SearchIndexItem"
import { fetchPriceData,  fetchRatios, fetchNewsFeed} from "../../store/stocks"
import StatementChart from "../StatementChart"
import NavBar from "../NavBar"
import {
    camelCase,
    sentenceCase,
    snakeCase,
  } from "change-case";
import NewsFeed from "../NewsFeed"



export default function ResearchPage(){
    const priceData = useSelector(state => Object.values(state.stocks.priceData).reverse()[0])
    const prices = useSelector(state => state.stocks.priceData)
    const latest = useSelector(state => Object.keys(state.stocks.info))
    const info = useSelector(state => Object.values(state.stocks.info).reverse()[0])
    const [symbol, setSymbol] = useState()
    const dispatch = useDispatch()
  
    const [selectedDuration, setSelectedDuration] = useState()
    const [open, setOpen] = useState()
    const [volume, setVolume] = useState()
    const [high, setHigh] = useState()
    const [low, setLow] = useState()
    const [avgVolume, setAvgVolume] = useState()
    const [annualHigh, setAnnualHigh] = useState()
    const [annualLow, setAnnualLow] = useState()
    const [marketCap, setMarketCap] = useState()
    const [about, setAbout] = useState()
    const [divYield, setDivYield] = useState()

    const currentRatios = useSelector(state => state.stocks.ratios)
    const [ratios, setRatios] = useState(null)
    const [currentStatements,  setCurrentStatements] = useState()
    const statements = useSelector(state => state.stocks.statements)



    async function getPriceData(sym){
        if(prices !== undefined || prices !== null){
            try{
                //from price fetch
                
                setOpen(prices[sym][0].open.toFixed(2))
                setHigh(prices[sym][0].high.toFixed(2))
                setLow(prices[sym][0].low.toFixed(2))
                setVolume(prices[sym][0].volume.toFixed(2))
                const yearHigh = prices[sym].slice(0, 260).map(obj => obj.close)
                setAnnualHigh(Math.max(...yearHigh).toFixed(2))
                setAnnualLow(Math.min(...yearHigh).toFixed(2))
                // //from info fetch:

                setAvgVolume(info.volAvg.toFixed(0))
                setMarketCap(info.mktCap.toExponential(2))
                setDivYield(info.lastDiv === undefined ? "N/A": (info.lastDiv/priceData[priceData.length-1].open.toFixed(2)).toFixed(4))
                setAbout(info.description)
                getRatios(sym)

            }catch(err){console.log(err)}
         


        }
    }
    useEffect(() => {
        if(currentStatements === undefined && statements !==  undefined){
            setCurrentStatements(statements)
        }
    },[statements, currentStatements])


    useEffect(() => {

        if(info !== undefined){
            getPriceData(info.symbol)
            handleNews([info.symbol])
        }
    },[priceData,info])

    useEffect(() => {
        console.log(latest)
        console.log("latest",prices[latest[latest.length]])
    },[latest])



    



    const handleDuration = (e) => {
        e.preventDefault()
        setSelectedDuration(e.target.id)

    }

   


    async function getRatios(sym){
        if(!Object.keys(currentRatios).includes(sym)){
            let res = await dispatch(fetchRatios(sym))
            let data = res.data
            let newRatios = {}
            Object.keys(data).forEach(lineItem => {
                if(data[lineItem] !== null){
                    newRatios[sentenceCase(lineItem)] = data[lineItem].toFixed(2)
                }
            })
            setRatios(newRatios)
        }else{
            let data = currentRatios[sym]
            let newRatios = {}
            Object.keys(data).forEach(lineItem => {
                if(data[lineItem] !== null){
                    newRatios[sentenceCase(lineItem)] = data[lineItem].toFixed(2)
                }
            })
            setRatios(newRatios)
        }
        
      
    }

    const handleNews = () => {
       if(info !== undefined){
        dispatch(fetchNewsFeed([info.symbol]))
       }
    }
if(info){
    return(
        <>

            <NavBar></NavBar>
   
           <div id="research-container">
            <div id="research-chart">
                        <div>
                            {info === undefined ? null :     <PriceChart duration={selectedDuration} prices={prices[info.symbol]} companyInfo={info} chartType={"research"}></PriceChart>}
                    
                        </div>
                       
                        <div id="chart-button-container">
                            <h2>Duration:</h2>
                        <button className="duration-button" onClick={handleDuration} id="MAX">MAX</button>
                        <button className="duration-button" onClick={handleDuration} id="1Y">1Y</button>
                        <button className="duration-button" onClick={handleDuration} id="6M">6M</button>
                        <button className="duration-button" onClick={handleDuration} id="1M">1M</button>
                        <button className="duration-button" onClick={handleDuration} id="1W">1W</button>
                    </div>
                    <div id="research-info-container">
                        <div className="info-box">
                        <h1 style={{"color":"white","textDecoration":"underline"}}>Ratios</h1>
                            <div id="ratios-container">
                                <div id="selected-ratio-container">
                                    <ul id="ratios-list">
                                    {ratios !== null ? Object.keys(ratios).map(lineItem => (
                                        <div class="ratios-line-item">
                                            <div>{lineItem}</div>
                                            <div style={parseInt(ratios[lineItem]) < 0 ?{color: "red"}:{color: "green"}}>{ratios[lineItem]}</div>
                                        </div>
                                    )):null}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="info-spacer"></div>

                    <div id="info-container-right">
                        <div id="stats-container">
                        <h1 style={{"color":"white","textDecoration":"underline", "marginLeft":"1%"}}>Stats</h1>
                            <div className="info-box" id="price-stats-container">
                                <div className="stats-col">
            
                                    <div className="stats-row">
                                        <div>Open: </div>
                                        <div> {open === undefined ? null : open}</div>
                                    </div>
                                    <div className="stats-row">
                                    <div>High: </div>
                                        <div> {high === undefined ? null : high}</div>
                                        </div>
                                    <div className="stats-row">
                                        <div>Low: </div>
                                        <div> {low === undefined ? null : low}</div>
                                    </div>
                                </div>
                                <div className="stats-col">
                                    <div className="stats-row">
                                        <div>Volume: </div>
                                        <div> {volume === undefined ? null : volume}</div>
                                    </div>
                                    <div className="stats-row">
                                        <div>Avg Volume: </div>
                                        <div> {avgVolume === undefined ? null : avgVolume}</div>
                                    </div>
                                    <div className="stats-row">
                                        <div>52 Wk High: </div>
                                        <div> {annualHigh === undefined ? null : annualHigh}</div>
                                    </div>

                                </div>
                                <div className="stats-col">
                                    <div className="stats-row">
                                            <div>52 Wk Low: </div>
                                            <div> {annualLow === undefined ? null : annualLow}</div>
                                    </div>
                                    <div className="stats-row">
                                            <div>Div/Yield: </div>
                                            <div> {divYield === undefined ? null : divYield}</div>
                                    </div>
                                    <div className="stats-row">
                                        <div>Market Cap: </div>
                                        <br></br>
                                        <div> {marketCap === undefined ? null : marketCap}</div>
                                    </div>
                                </div>
                            
                        </div>
                    
                             <div id="about-text-container">
                                <h1 style={{"color":"white","textDecoration":"underline"}}>About</h1>
                                    {about === undefined ? "N/A": about}</div>
                            </div>
                     
           
                    </div>
 
                </div> 
                
             
                </div>

                <div id="right-section-container">
                <h1 style={{"color":"white","textDecoration":"underline"}}>Search Results</h1>
                <div class="right-scroll-container">
                  
                  <SearchIndex></SearchIndex>
                </div>
                <div id="news-container">
                <h1 style={{"color":"white","textDecoration":"underline"}}>Latest News</h1>
                <div class="right-scroll-container">
                
                  <NewsFeed></NewsFeed>
              
        
            
                </div>
            </div>
        
            </div> 
      
        </div>
    
        </>
    )
}else{
    return(
        <>
            <NavBar></NavBar>
            <div id="research-container">
                <div id="research-chart"  class="start-text">
                    <div  style={{"marginLeft":"10%"}}>SEARCH FOR A STOCK BY NAME IN THE SEARCH BAR ABOVE TO GET STARTED</div>
                    <div style={{"marginLeft":"10%","color":"yellow"}}>(example: type "apple" to search for apple inc)</div>
                </div>
                <div id="right-section-container">
                <h1 style={{"color":"white","textDecoration":"underline"}}>Search Results</h1>
                <div class="right-scroll-container">
                  
                
                </div>
                <div id="news-container">
                <h1 style={{"color":"white","textDecoration":"underline"}}>Latest News</h1>
                <div class="right-scroll-container">
                

              
        
            
                </div>
            </div>
            </div>
            </div>
        </>
    )
}}