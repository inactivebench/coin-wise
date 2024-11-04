const Step = ({ step }) => {
  const { id, name, img, description } = step;

  return (
    <div>
      <div className='step-card grid '>
        <img src={img} alt={name} className='img step-img' />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Step;
