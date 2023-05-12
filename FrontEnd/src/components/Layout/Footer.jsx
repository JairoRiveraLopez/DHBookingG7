import React from 'react'
import tweeter   from "../../resources/tweeter.svg"
import facebook   from "../../resources/facebook.svg"
import instagram   from "../../resources/instagram.svg"
import linkedin   from "../../resources/linkedin.svg"
import '../styles/layout/footer.css'

const Footer = () => {
    return (
      <footer> 
          <p >©2021 Digital Booking</p>
          <div className='md-screen'>
              <ul>
                  <li ><img src={facebook}  alt='facebook'></img></li>
                  <li ><img src={linkedin}  alt='linkedin'></img></li>
                  <li ><img src={tweeter}   alt='tweeter'></img></li>
                  <li ><img src={instagram} alt='instagram'></img></li>
              </ul>
          </div>
      </footer>
      
    )
  }

export default Footer