import React from 'react'
import { fahrenheitToCelsius } from '../../common/helpers/helpers';
import { DaliyWeather } from '../../models/daliyweather';
import "../CurrentWeather/currentWeather.css";
const CurrentWeather = (props: any) => {
  let item: DaliyWeather = props.item;
  let location: string = props.location;
  const temperature = props.item.Temperature && fahrenheitToCelsius(props.item.Temperature.Maximum.Value)

  return (
    <React.Fragment>
      {item.Temperature ?
        <div className='col-3 border divC text-center bg-light shadow ms-2 card-start '>
          <div>
            <img src={`https://developer.accuweather.com/sites/default/files/${String(item.Day.Icon).padStart(2, "0")}-s.png`} width="90" />
          </div>
          <h2>{location}</h2>
          <h3>{temperature}°C</h3>
        </div> : <h2>Loading...</h2>}
    </React.Fragment>
  )
}
export default CurrentWeather