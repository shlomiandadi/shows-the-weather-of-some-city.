import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useAppDispatch } from '../../redux/hooks'
import { FavoritesSlice } from '../../redux/slice'
import FavoriteBtn from '../favoriteBtn/favoriteBtn'
import SearchWeather from '../searchWeather/searchWeather'
import DaysListWeather from '../daysListWeather/daysListWeather'
import CurrentWeather from '../CurrentWeather/currentWeather'
import "./home.css";

const Home = () => {
  const [weathers, setWeathers] = useState([{}])
  const params = useParams()
  const [locData, setLocData] = useState<any>(null)
  const [location, setLocation] = useState<string>(localStorage.getItem("last_location") || "Tel aviv");
  const appDispatch = useAppDispatch()

  const onNewLocation = (locationData: any) => {
    setLocData(locationData);
  }

  useEffect(() => {
    if (params.city) {
      setLocation(params.city);
      doApiLocation(params.city);
    }
    else {
      doApiLocation(location)
    }
  }, [setLocation])

  const doApi = async (_url: string) => {
    let resp = await axios.get(_url);
    setWeathers(resp.data.DailyForecasts)
  }

  const addFavoritesClick = () => {
    if (locData) {
      const name = location;
      const id = locData.Key
      appDispatch(FavoritesSlice.actions.addFavorites({ name, id }))
    }
  }

  const locationSearch = (newLocation: any) => {
    setLocation(newLocation);
    localStorage.setItem("last_location", newLocation);
  }

  const doApiLocation = async (_location: string) => {
    let url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=V4lGnpAQ6AHeqGZGblouOxBHwGwDK2md&q=${_location}`;
    let resp = await axios.get(url);
    if (resp.data.length > 0) {
      locationSearch(_location);
      let wApi = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${resp.data[0].Key}?apikey=V4lGnpAQ6AHeqGZGblouOxBHwGwDK2md`
      doApi(wApi)
      onNewLocation(resp.data[0]);
    }
    else {
      alert("Location not found, try another")
    }
  }

  return (
    <div className='container'>
      <SearchWeather doApiLocation={doApiLocation} />
      <div className='col-md-9 mx-auto border p-3 div-home'>
        <div className="row justify-content-between align-items-center">
          <CurrentWeather location={location} item={weathers[0]} />
          <FavoriteBtn onClick={addFavoritesClick} />
        </div>
        {weathers.length > 1 && <DaysListWeather weathersArr={weathers} location={location} />}
      </div>
    </div>
  )
}
export default Home