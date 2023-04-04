import {useSelector} from "react-redux"
import { useEffect, useReducer, useState, useRef} from "react"
import {Chart, registerables}from "chart.js";
import { fetchCompanyInfo, fetchPriceData, fetchStatement } from "../../store/stocks";
import { useDispatch } from "react-redux";
// import { updateWatchlist } from "../../store/stocks"


import { setWeekYear } from "date-fns";




export default function StatementChart({symbol, statementType}){
    // //do a fetch for data once you have api
    const priceData = useSelector(state => state.stocks.priceData)
    const currentStatements = useSelector(state => state.stocks.statements)
    const [availableBS, setAvailableBS] = useState()
    const [availableIS, setAvailableIS] = useState()
    const [availableCF, setAvailableCF] = useState()
    const dispatch = useDispatch()

    const [BS, setBS] = useState()
    const [CF, setCF] = useState()
    const [IS, setIS] = useState()

    const [dataSets, setDataSets] = useState({"BS": null, "IS":null, "CF": null})

    function createDataSets(data, statementType){
        const statementLabels = {
            
            "BS": 'balance-sheet-statement',
            "IS": 'income-statement',
            "CF": 'cash-flow-statement',

        }
        const label = statementLabels[statementType]
        const statementYears = data.map(obj => parseInt(obj.date.split("-")[0]))
        const colors = ["red","blue","green", "white","yellow","purple","grey"]
        const unwanted = ["date", "symbol","cik","fillingDate","acceptedDate","period","calendarYear", "link", "finalLink"]
        const labels = Object.keys(data[0]).filter(key => !unwanted.includes(key))

        const dataSets = []
        data.slice(0,2).map((statement,i) => {
            const newStatement = {}
            labels.map(label => {
                newStatement[label] = statement[label]
            })

            dataSets.push(
                {
                    data: Object.values(newStatement),
       
                    borderColor: colors[i],
                    borderPercentage: 1,
                    backgroundColor: colors[i],
                    fillColor: colors[i],
                    label: ` ${this.label} ${statementYears[i]}`,
                }
            )
        })

        setDataSets({})


    }

    useEffect(() => {
        if(availableBS === undefined && currentStatements !== undefined){
            setAvailableBS(currentStatements.BS)
        }

        if(availableIS === undefined && currentStatements !== undefined){
            setAvailableIS(currentStatements.IS)
        }

        if(availableCF === undefined && currentStatements !== undefined){
            setAvailableCF(currentStatements.CF)
        }
    },[currentStatements, availableBS, availableIS, availableCF])

    useEffect(() => {
        if(symbol !== undefined && availableBS !== undefined){

            if(Object.keys(availableBS).includes(symbol)){
                setBS(availableBS[symbol])
            }else{
                dispatch(fetchStatement(symbol, "BS"))
            }

            if(Object.keys(availableIS).includes(symbol)){
                setIS(availableIS[symbol])
            }else{
                dispatch(fetchStatement(symbol, "IS"))
            }

            if(Object.keys(availableCF).includes(symbol)){
                setCF(availableCF[symbol])
            }else{
                dispatch(fetchStatement(symbol, "CF"))
            }
        }
    },[availableBS, availableIS, availableCF])


    useEffect(() => {
        if(BS !== undefined && IS !== undefined && CF !== undefined){
            setDataSets({"BS": BS, "IS": IS, "CF": CF})
        }
     
    },[BS,IS,CF])

    useEffect(() => {
        if(dataSets !== {"BS": null, "IS": null, "CF":null} ){
            console.log(dataSets)
        }
    },[dataSets])







    return (
        <>
            <div>
                {symbol === undefined ? null : symbol}
                {BS === undefined ? null : Object.keys(BS).length}
                {IS === undefined ? null : Object.keys(IS).length}
                {CF === undefined ? null : Object.keys(CF).length}
            </div>
        </>
    )


}