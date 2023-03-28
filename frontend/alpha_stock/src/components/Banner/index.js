import React, { useEffect, useState, useSyncExternalStore } from "react"
import { useSelector } from "react-redux"
import { useRef } from "react"
import "./banner.css"
export default function Banner(){
    const currentUser =  JSON.parse(sessionStorage.getItem("currentUser"))
    const [tickers, setTickers] = useState(null)
    const bannerHeight = window.height
    const [displayText, setDisplayText] = useState()
    const [tags, setTags] = useState()
    const [currentX,setCurrentX] = useState(0)

   


    useEffect(() => {
        if(currentUser !== null && tickers === null){
            setTickers(currentUser.watchlist)
            setDisplayText(currentUser.watchlist.join(" "))
            const tags = currentUser.watchlist.map(sym => {return (<div class="tickerDiv">{sym}</div>)})
            setTags(tags)
        }
    },[currentUser])

    useEffect(() => {

        setTimeout(() => {
            if(tickers !== null){
                const container = document.getElementById("banner-container")
                if(container !== undefined){
                    
                    let current = `${container.style.marginLeft}`
                    let newMargin = current.split("%")[0] 
                    container.style.marginLeft = `${currentX + 1}%`
                    console.log(container.style.marginLeft)
                    setCurrentX(currentX + 1)
                }
            }
        },1000)

    },[currentX])





    if(currentUser){
    return (
        <>
            <div  id="banner-container" >
               {tags}
            </div>
        </>
    )} else{
        return (
            <>
                <div>loading</div>
            </>
        )
    }
}