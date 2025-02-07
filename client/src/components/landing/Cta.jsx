import { Link } from "react-router-dom";
import ctaImg from "@/assets/images/Saving-money.svg";

const Cta = () => {
  return (
    <section className='cta-section'>
      <div className='container cta-container flex'>
        <div className='cta-img'>
          <img src={ctaImg} alt='save money illustration' className='img' />
        </div>
        <article className='cta-info grid ff-montserrat'>
          <h1 className='capitalize fs-700'>simplify your money life</h1>
          <p>
            “The goal isn’t more money. The goal is living life on your terms. -
            CHRIS BROGAN”
          </p>
          <Link to='/signup' className='link '>
            <button className=' btn capitalize'>get started</button>
          </Link>
        </article>
      </div>
    </section>
  );
};
export default Cta;
