import "./ResearchPage.css"
import PriceChart from "../PriceChart"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import StatementChart from "../StatementChart"
// import Searchbar from "../Searchbar"
import SearchIndex from "../SearchIndex"
import Watchlist from "../Watchlist"
import SearchIndexItem from "../SearchIndexItem"
import { fetchPriceData } from "../../store/stocks"
import { compose } from "redux"
import NavBar from "../NavBar"
import { restoreSession } from "../../store/session"

export default function ResearchPage(){
    const priceData = useSelector(state => Object.values(state.stocks.priceData).reverse()[0])
    const prices = useSelector(state => state.stocks.priceData)
    const latest = useSelector(state => Object.keys(state.stocks.priceData))
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

    const currentUser = useSelector(state => state.session.currentUser)

    const [watchlist, setWatchlist] = useState()
    const [watchlistPrices, setWatchlistPrices] = useState()



    useEffect(() => {
      
        if(priceData !== undefined || priceData !== null){
            try{
   //from price fetch: 
   setOpen(priceData[0].open.toFixed(2))
   setHigh(priceData[0].high.toFixed(2))
   setLow(priceData[0].low.toFixed(2))
   setVolume(priceData[0].volume.toFixed(2))
   const yearHigh = priceData.slice(0, 260).map(obj => obj.close)
   setAnnualHigh(Math.max(...yearHigh).toFixed(2))
   setAnnualLow(Math.min(...yearHigh).toFixed(2))
   //from info fetch:

   setAvgVolume(info.volAvg.toFixed(0))
   setMarketCap(info.mktCap.toExponential(2))
   setDivYield(info.lastDiv === undefined ? "N/A": (info.lastDiv/priceData[priceData.length-1].open.toFixed(2)).toFixed(4))
   setAbout(info.description)

            }catch(err){console.log(err)}
         


        }
    },[priceData])


    // useEffect(() => {
    //     if(currentUser !== undefined){
    //         let list = currentUser.watchlist
    //         currentUser.watchlist.map(sym => {
    //             dispatch(fetchPriceData(sym))
    //          })
    //         setWatchlist(list)
    //     }
    // },[currentUser])

    // useEffect(() => {
    //     if(prices && currentUser){
    //         let watchListComponents = []
    //         let listPrices = currentUser.watchlist.map(sym => {
           
    //             watchListComponents.push([sym, prices[sym]])

    //         })
        
    //         setWatchlist(watchListComponents)
    //     }
    // },[prices])

    const handleDuration = (e) => {
        e.preventDefault()
        setSelectedDuration(e.target.id)
    }

    const test = async e => {
        const res = sessionStorage.getItem("currentUser")
        console.log(res)
    }



    return(
        <>

            <NavBar></NavBar>
         <div id="research-container">
         <div id="research-nav-left">
                    <h1>Watch List</h1>
                    <Watchlist></Watchlist>
                </div>

                <div id="research-content-container">
              <div>
              
              </div>
                    <div id="research-chart">
                        <PriceChart duration={selectedDuration} prices={priceData} companyInfo={info} chartType={"research"}></PriceChart>
            
                    </div>
              
                    <div id="chart-button-container">
                        <button className="duration-button" onClick={handleDuration} id="MAX">MAX</button>
                        <button className="duration-button" onClick={handleDuration} id="1Y">1Y</button>
                        <button className="duration-button" onClick={handleDuration} id="6M">6M</button>
                        <button className="duration-button" onClick={handleDuration} id="1M">1M</button>
                        <button className="duration-button" onClick={handleDuration} id="1W">1W</button>
     
                    </div>
                    <div id="research-info-container">
                        <div className="info-box">
                            <h1>Ratios</h1>
                            <button onClick={test}></button>
                        </div>
                        <div id="info-spacer"></div>
                        
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
                    </div>
                    <div id="stock-about-container">
                     
                        <div id="about-text-container">
                        <h1>About</h1>
                            {about === undefined ? null : about}</div>
                    </div>
                </div> 
                <div id="research-nav-right">
                  
                  <SearchIndex></SearchIndex>
            
            </div>
                </div>
        </>
    )
}