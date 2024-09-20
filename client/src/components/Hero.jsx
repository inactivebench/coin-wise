import heroImg from "../assets/payment.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className='section hero '>
      <div className='container flex'>
        <article className='hero-info '>
          <h1>
            Money Made<br></br> <span className='accent-color'>Easy</span>
          </h1>
          <p>
            Flexible and friendly approach to managing <br></br>your money.
          </p>
          <Link to='/signup' className='link '>
            <button className=' btn capitalize'>start your free trial</button>
          </Link>
        </article>
        <article className='hero--img'>
          <img src={heroImg} alt='payment illustration' className='hero-img' />
        </article>
      </div>
    </section>
  );
};
export default Hero;
