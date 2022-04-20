import React from 'react'
import { useNavigate } from 'react-router-dom';
import { fahrenheitToCelsius } from '../../common/helpers/helpers';
import { DaliyWeather } from '../../models/daliyweather';
import { useAppDispatch } from '../../redux/hooks'
import { FavoritesSlice } from '../../redux/slice'

const WeatherFavorite = (props: any) => {
  const nav = useNavigate();
  let item: DaliyWeather = props.item;
  let location: string = props.location;
  const appDispatch = useAppDispatch();
  const temperature = props.item.Temperature && fahrenheitToCelsius(props.item.Temperature.Maximum.Value)

  const removeFavorites = (id: string) => {
    appDispatch(FavoritesSlice.actions.removeFavorites(id));
  }

  return (
    <React.Fragment>
      {item.Temperature ?
        <div className='col-3 border divC text-center bg-light shadow ms-2 div-card card-Favorites'>
          <div>
            <img src={`https://developer.accuweather.com/sites/default/files/${String(item.Day.Icon).padStart(2, "0")}-s.png`} width="90" />
          </div>
          <h2>{location} </h2>
          <h3>{temperature}°C</h3>
          <button className='btn-Favorites' onClick={() => {
            nav("/town/" + location)
          }}>show info</button>
          <button className='btn-delete' onClick={() => { removeFavorites(props.codeTown) }}>X</button>
        </div> : <h2>Loading...</h2>}
    </React.Fragment>
  )
}
export default WeatherFavorite