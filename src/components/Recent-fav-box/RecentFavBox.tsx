import React from 'react'
import "./RecentFavBox.css"
const RecentFavBox = () => {
  return (
    <div>
          <div className='rectangle-box'>
        <span className='city'>Mysore,Karnataka</span>
        <div className='mid' >
            <img src="images/icon_visibility_info.png" alt="pic"/>
            <span className='temp-deg'>37<sup>o</sup>C</span>
            <span className='city'>Mostly sunny</span>
        </div>
        <img className='favorite-heart-button' src="images/icon_favourite_Active.png" alt="pic" />
      </div>
    </div>
  )
}

export default RecentFavBox
