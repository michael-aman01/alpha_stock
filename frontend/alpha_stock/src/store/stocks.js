
const ADD_TO_WATCHLIST = 'stocks/ADD_TO_WATCHLIST'

const ADD_PRICE_DATA = 'stocks/ADD_PRICE_DATA'
const ADD_COMPANY_INFO = 'stocks/ADD_COMPANY_INFO'

export const addPriceData = (data,symbol) => {
    return ({
        type: ADD_PRICE_DATA,
        data,
        "symbol":symbol
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
        data
    })
}



export const fetchPriceData = (symbol) => async dispatch => {

    const res = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json()
    if(data){
        dispatch(addPriceData(data,symbol))
    }
}


export const fetchCompanyInfo = (symbol) => async dispatch => {

    const res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json()
    if(data){
        dispatch(addCompanyInfo(data,symbol))
    }
}


//add fetch when you have access to api again

export default function StocksReducer(initialState={info:{}, priceData:{}, watchlist: []},action){
    let newState = Object.freeze(initialState)
    switch(action.type){
        case ADD_TO_WATCHLIST:
            return {...newState, watchlist: [...newState.watchlist,...action.data]}
    
        case ADD_PRICE_DATA:
            if(Object.keys(newState.priceData).includes(action.symbol)){
                delete newState.priceData[action.symbol]
            }
            newState.priceData[action.symbol] = action.data.historical
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


