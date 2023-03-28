import {loginUser, restoreCSRF} from "./session"
const ADD_TO_WATCHLIST = 'stocks/ADD_TO_WATCHLIST'

const ADD_PRICE_DATA = 'stocks/ADD_PRICE_DATA'
const ADD_COMPANY_INFO = 'stocks/ADD_COMPANY_INFO'

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



export const fetchPriceData = (symbol) => async dispatch => {

    const res = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${process.env.REACT_APP_API_KEY}`)
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



//add fetch when you have access to api again

export default function StocksReducer(initialState={info:{}, priceData:{}, watchlist: []},action){
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
        default:
            return initialState
    }
}


