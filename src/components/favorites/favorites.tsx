import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import "./favorites.css";
import axios from 'axios';
import WeatherFavorite from './weatherFavorite';

const dictatory_ar: any = []

const Favorites = () => {
    const FavoritesArray = useAppSelector((s: any) => s.Favorites.data)
    const [locations_ar, setLocationsAr] = useState([])

    useEffect(() => {
        let apis_ar = FavoritesArray.map((item: any) => {
            dictatory_ar[item.id] = item.name;
            return { url: `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${item.id}?apikey=V4lGnpAQ6AHeqGZGblouOxBHwGwDK2md`, name: item.name }
        })
        axios.all(apis_ar.map((item: any) => axios.get(item.url)))
            .then((data: any) => {
                setLocationsAr(data)
            })
    }, [FavoritesArray])
    return (
        <div className='container'>
            <h3>Favorites</h3>
            <div className='row justify-content-around m'>
                {locations_ar.map((item: any) => { 
                    let url = item.config.url;
                    let indexOfQ = url.indexOf("?");
                    let indexOfSlash = url.indexOf("day/");
                    let locCode = url.substring(indexOfSlash + 4, indexOfQ);
                    return (
                        <WeatherFavorite key={item.name} location={dictatory_ar[locCode]} item={item.data.DailyForecasts[0]} codeTown={locCode} />
                    )
                })}
            </div>
        </div>
    )
}
export default Favorites