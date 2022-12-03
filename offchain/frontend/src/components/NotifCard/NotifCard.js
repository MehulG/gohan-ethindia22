import React from 'react';
import './NotifCard.css';
import { FcAbout, FcApproval, FcHighPriority } from "react-icons/fc";

export const NotifCard = () => {
  return (
    <div className='notifCardContainer'>
      <FcAbout className='icon'/>
      <div className='notifContent'>
        <h3>New Request</h3>
        <p>Your doctor is requsting for your heart beat data.</p>
      </div>
      <FcApproval className='icon'/>
      <FcHighPriority className='icon'/>
    </div>
  )
}