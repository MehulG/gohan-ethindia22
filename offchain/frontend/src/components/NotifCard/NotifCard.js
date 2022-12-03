import React from 'react';
import './NotifCard.css';
import { FcAbout, FcApproval, FcHighPriority } from "react-icons/fc";

export const NotifCard = (props) => {
  return (
    <div className='notifCardContainer'>
      <FcAbout className='icon'/>
      <div className='notifContent'>
        <h3>{props.notifTitle}</h3>
        <p>{props.notifMessage}</p>
      </div>
      <div>
        <FcApproval className='icon'/>
        <FcHighPriority className='icon'/>
      </div>
    </div>
  )
}