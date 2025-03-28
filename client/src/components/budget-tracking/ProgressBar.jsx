import React from "react";
import "@/css/budgets.css";

const ProgressBar = ({ label, current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className='progress-container'>
      <div className='progress-bar'>
        <svg width='200' height='120' viewBox='0 0 200 120'>
          <path className='outer-progress' d='M15,100 a60,60 0 0,1 170,0' />
          {/* Progress arc */}
          <path
            className='inner-progress'
            strokeDasharray={`${(progress / 100) * 282.74} 282.74`} // Circumference of half circle
            d='M15,100 a60,60 0 0,1 170,0'
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressBar;
