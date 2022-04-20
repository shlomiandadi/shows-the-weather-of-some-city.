import axios from 'axios';
import React, { useRef } from 'react'
import { useState } from 'react';

const SearchWeather = (props: any) => {
  const [loc_ar, setLocAr] = useState([])
  // collect location from redux
  let inputRef: any = useRef();

  const onSub = (e: any) => {
    e.preventDefault();
    props.doApiLocation(inputRef.current.value);
  }

  const onInputSearch = () => {
    let input_val = inputRef.current.value;
    if (input_val.length > 1 && input_val.length < 4) {
      doApiForLocationList(input_val)
    }
  }

  const doApiForLocationList = async (input_val: any) => {
    let url = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=V4lGnpAQ6AHeqGZGblouOxBHwGwDK2md&q=" + input_val;
    let resp = await axios.get(url);
    let temp_ar = resp.data.map((item: any) => {
      return item.LocalizedName
    })
    setLocAr(temp_ar)
  }

  return (
    <div className='my-3'>
      <form onSubmit={onSub} className='col-md-7 mx-auto d-flex'>
        <input list="locationData22" onInput={onInputSearch} ref={inputRef} type="search" className='form-control' placeholder='search for town/city in the world...' />
        <button className='btn btn-info'>Search</button>
        <datalist key="same" id="locationData22">
          {loc_ar.map((town, i) => {
            return (
              <option key={i} value={town}>{town}</option>
            )
          })}
        </datalist>
      </form>
    </div>
  )
}
export default SearchWeather