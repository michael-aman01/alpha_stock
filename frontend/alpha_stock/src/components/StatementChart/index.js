import {useSelector} from "react-redux"
import { useEffect, useReducer, useState, useRef} from "react"
import {Chart, registerables}from "chart.js";
import { fetchCompanyInfo, fetchPriceData, fetchStatement } from "../../store/stocks";
import { useDispatch } from "react-redux";
// import { updateWatchlist } from "../../store/stocks"


import { setWeekYear } from "date-fns";
import { capitalCase } from "change-case";




export default function StatementChart({symbol, statementType}){


}