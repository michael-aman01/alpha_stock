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
            const tags = currentUser.watchlist.map(sym => {return (<div  class="tickerDiv">{sym}</div>)})
           
            setTags(tags)
        }
    },[currentUser])

    useEffect(() => {
    
        const timeout = setTimeout(()=>{
            const tags = document.getElementsByClassName("tickerDiv")
            if(tags){
                Array.from(tags).forEach((tag,indx) => {
                    const currentMargin = tag.style.marginLeft
                    if(currentMargin.length === 0){
                        const currentMargin = tag.style.marginLeft
                        //set at index range start
                        const startingMargins = [...Array(tags.length).keys()].map(i => `${Math.ceil((parseInt(i)/tags.length).toFixed(2)*10)}%`)
                        for(let i = 0; i < startingMargins.length; i++){
                            tags[i].style.marginLeft = startingMargins[i]
                            console.log(tags[i].style.marginLeft)
                        }
                    }else{
                        
                        const currentMargin =   parseInt(`${tag.style.marginLeft}`.split("%")[0])
                        tag.style.marginLeft = `${currentMargin +1}%`

                    }

                
                })
    
                setCurrentX(currentX+1)
            
           }
        },750)


})





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