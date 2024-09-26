import speechBubble from "../assets/icons/speech-bubble.png";
// import speechBubble from "../assets/icons/chat.png";

const Testimonial = ({ comment }) => {
  const { name, img, backgroundColor, testimonial } = comment;

  return (
    <div className='testimonial-card grid'>
      <p>{testimonial}</p>
      <img src={speechBubble} alt='speech bubble' className='speech' />
      <div className='flex avatar-container'>
        <h3 className='ff-montserrat '>{name}</h3>
        <div className={` avatar-img `}>
          <img src={img} alt={name} className='avatar img' />
        </div>
      </div>
    </div>
  );
};
export default Testimonial;
