import { useState } from "react";

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const { id, title, icon, backgroundColor, bgColor, color, description } =
    flashcard;
  return (
    <div
      className={`card ${flip ? "flip" : ""} `}
      style={
        flip
          ? { border: `8px solid ${bgColor}` }
          : { borderBottom: `8px solid ${bgColor}` }
      }
      onClick={() => {
        setFlip(!flip);
      }}
    >
      <div className='grid front ff-montserrat'>
        <div className={`${backgroundColor} ${color} card-title  `}>
          <h2>{id}</h2>
        </div>
        <h3 className='ff-600'>{title}</h3>
        <p className='fs-300 read'>Read more</p>
      </div>
      <div className='grid back'>
        <div className='card-img'>
          <img src={icon} alt={title} />
        </div>
        <p className='fs-300 ff-montserrat '>{description}</p>
      </div>
    </div>
  );
};
export default Flashcard;
