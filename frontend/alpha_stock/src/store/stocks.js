import { compose } from "redux"
import {loginUser, restoreCSRF} from "./session"
const ADD_TO_WATCHLIST = 'stocks/ADD_TO_WATCHLIST'

const ADD_PRICE_DATA = 'stocks/ADD_PRICE_DATA'
const ADD_COMPANY_INFO = 'stocks/ADD_COMPANY_INFO'
const ADD_STATEMENT = "stocks/ADD_STATEMENT"
const ADD_RATIO_DATA = "stocks/ADD_RATIO_DATA"
const ADD_NEWS_DATA = "stocks/ADD_NEWS_DATA"


export const addPriceData = data => {
    return ({
        type: ADD_PRICE_DATA,
        data,
    
    })
}

export const addCompanyInfo = (data,symbol) => {
    return ({
        type: ADD_COMPANY_INFO,
        data,
        "symbol": symbol
    })
}

export const addToWatchList = (data) => {
    return({
        type: ADD_TO_WATCHLIST,
        data: data.watchlist
    })
}

export const addStatementData = data => {
    return({
        type: ADD_STATEMENT,
        data: data
    })
}

export const addRatioData = data => {
    return({
        type: ADD_RATIO_DATA,
        data: data
    })
}


export const addNewsData = data => {
    return ({
        type: ADD_NEWS_DATA,
        data: data
    })
}


export const fetchPriceData = (symbol) => async dispatch => {

    const res = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?period=quarter&apikey=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json()
    if(data){
        console.log(data)
        await dispatch(addPriceData(data,symbol))
    }
}


export const fetchCompanyInfo = (symbol) => async dispatch => {

    const res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json()
    if(data){
        dispatch(addCompanyInfo(data,symbol))
    }
}



export const fetchRatios = (symbol) => async dispatch => {

    const res = await fetch(`https://financialmodelingprep.com/api/v3/ratios-ttm/${symbol}?apikey=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json()
    if(data){

        dispatch(addRatioData({"symbol": symbol, "data": data[0]}))
        return {"symbol": symbol, "data": data[0]}
    }
}




export const fetchWatchlist = userID => async dispatch => {

    if(sessionStorage.getItem("X-CSRF-Token") === null){
        const token = await restoreCSRF()
    }else{
        const token = sessionStorage.getItem("X-CSRF-Token")
    }

    const res = await fetch(`/api/users/watchlist/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
        }
    })
    const data = await res.json()

    if(data){
        await dispatch(loginUser(data))
        return data
    }
}


export const updateWatchlist = user => async dispatch => {

    const res = await fetch(`/api/users/watchlist/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
        }
    })
    const data = await res.json()

    if(data){
        await dispatch(addToWatchList(data))
        return data
    }
}


export const fetchNewsFeed = symbols => async dispatch => {
    const symsString = `${symbols.map(sym => sym.toUpperCase()).join(",")}`
    const res = await fetch(`https://financialmodelingprep.com/api/v3/stock_news?&limit=50&tickers=${symsString}&page=0&apikey=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json()
    if(data){
        dispatch(addNewsData(data))
        return data
    }
}

//add fetch when you have access to api again
const initialStatements = {"bs":{},"is":{},"cf":{}}
export default function StocksReducer(initialState={info:{}, priceData:{}, statements:initialStatements,watchlist: [],ratios:{}, news: {}},action){
    let newState = Object.freeze(initialState)
    switch(action.type){
        case ADD_TO_WATCHLIST:
            return {...newState, watchlist: [...newState.watchlist,...action.data.filter(sym => !newState.watchlist.includes(sym))]}
    
        case ADD_PRICE_DATA:
            if(Object.keys(newState.priceData).includes(action.symbol)){
                delete newState.priceData[action.symbol]
            }
            newState.priceData[action.data.symbol] = action.data.historical
            return {...newState}
        case ADD_COMPANY_INFO:
            if(Object.keys(newState.info).includes(action.symbol)){
                delete newState.info[action.symbol]
            }
    
            newState.info[action.symbol] = action.data[0]
            return newState
        case ADD_STATEMENT:
       
            newState.statements[action.data.statementType][action.data.symbol] =  action.data.data
            return newState

        case ADD_RATIO_DATA:
  
            newState.ratios[action.data.symbol] = action.data.data
            return newState

        case ADD_NEWS_DATA:
            
            const syms = action.data.map(obj => obj.symbol)
            newState.news["data"] = action.data
            return newState
            
        default:
            return initialState
    }
}


