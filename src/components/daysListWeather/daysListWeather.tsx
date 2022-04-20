import React from 'react'
import { fahrenheitToCelsius } from '../../common/helpers/helpers';
import "../home/home.css";
// TODO:Speeling
const days_ar = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "shabat"]

const DaysListWeather = (props: any): JSX.Element => {
  let weathersArr: any = props.weathersArr;
  let location: any = props.location
  // Todo: check how to add with interface
  return (
    <div>
      <h2 className='text-center my-3'>Daily weather of {location}</h2>
      <div className='row justify-content-around '>
        {weathersArr.map((item: any) => {
          let dt = new Date(item.Date);
          let day = days_ar[dt.getDay()]
          const cTemp = fahrenheitToCelsius(item.Temperature.Maximum.Value)
          return (
            <div key={item.Date} className='text-center col-xl-2 col-md-4 p-2 border bg-light shadow div-card'>
              <h3>{day}</h3>
              <h4>{cTemp} °C</h4>
              <img src={`https://developer.accuweather.com/sites/default/files/${String(item.Day.Icon).padStart(2, "0")}-s.png`} alt="icon" width="90" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DaysListWeather