import React,{useState, useEffect} from 'react'
import './style.css'
import Weathercard from "./weathercard"

const Temp = () => {
    const [searchValue, setSearchValue] = useState("delhi")
    const [tempInfo, setTempInfo] = useState("")

    async function getWeatherInfo(){
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4f0c4a005fc01488f397cee49b19d554`
            const response = await fetch(url)
            const data = await response.json()

            const {temp, humidity, pressure} = data.main;
            const {main: wethermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myWeatherInfo = {
                temp,
                humidity,
                pressure,
                wethermood,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(myWeatherInfo)
        
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [])
    

    return (
        <div>
        <div className="wrap">
                <div className="search">
                    <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='search...' id='search' className="searchTerm" autoFocus />
                    <button type="button" onClick={() => getWeatherInfo()}className="searchButton">Search</button>
                </div>
            </div>
            <Weathercard tempInfo={tempInfo}/>
        </div>
    )
}

export default Temp