import React from 'react';
import './NotifCard.css';
import { AiFillBell } from "react-icons/ai";
import { FaAmazon, FaCentercode } from "react-icons/fa";


export const NotifCard = () => {
  return (
    <div className='notifCardContainer'>
      <AiFillBell/>
      <div className='notifContent'>
        <h3>New Request</h3>
        <p>Your doctor is requsting for your heart beat data.</p>
      </div>
      <FaAmazon/>
      <FaCentercode/>
    </div>
  )
}