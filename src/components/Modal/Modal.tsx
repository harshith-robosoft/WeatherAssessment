import React from 'react'
import "./Moadal.css"
const Modal = () => {
  return (
    
    <div>
    <div className="modalContainer">
      <div className="overlay">
        <div className="modalContent">
          <div className="infoModal">
            Are you sure want to remove all the favourites?
          </div>
          <div className="modalButtons">
            <form action="" className="modalForm">
              <button className="btnNo" >
                No
              </button>
              <button
                className="btnNo"
                type="button"
                
              >
                Yes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  )
}

export default Modal
