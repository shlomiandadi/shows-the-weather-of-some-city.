import React from 'react'
import { BsHeartFill } from "react-icons/bs"
import "./favoriteBtn.css";

const FavoriteBtn = (props: { onClick: () => void }) => {
  return (
    <div className='col-6 col-xl-3 text-end'>
      <span className='h3 me-2'>
        <BsHeartFill />
      </span>
      <button onClick={props.onClick} className='btn btn-warning btnF'>Add to favorite</button>
    </div>
  )
}
export default FavoriteBtn