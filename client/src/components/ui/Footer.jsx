import { Link } from "react-router-dom";
import "../../css/footer.css";

const Footer = () => {
  return (
    <footer className='footer-section'>
      <div className='container footer-container grid'>
        <article className='footer-info flex'>
          <div className='footer-cta'>
            <p className='fs-500 '>
              Ready to take control of your finances? Start here.
            </p>
            <Link to='/signup' className='btn link capitalize'>
              get started
            </Link>
          </div>
          <div className='flex uppercase footer-links'>
            <ul className='page-links'>
              <li>
                <a href='#'>the app</a>
              </li>
              <li>
                <a href='#'>the method</a>
              </li>
              <li>
                {" "}
                <a href='#'>about</a>
              </li>
              <li>
                <a href='#'>contact</a>
              </li>
            </ul>
            <ul className='social-links'>
              <li>
                <a href='#'>linkedin</a>
              </li>
              <li>
                <a href='#'>instagram</a>
              </li>
              <li>
                <a href='#'>youtube</a>
              </li>
              <li>
                <a href='#'>x</a>
              </li>
            </ul>
          </div>
        </article>
        <article className='footer-logo '>
          <h1 className=' ff-keania uppercase'>Coin-Wise</h1>
          <div className='flex footer-copy ff-montserrat fs-300'>
            <p>© 2024 Coin Wise. All rights reserved.</p>

            <p> Inactivebench</p>
          </div>
        </article>
      </div>
    </footer>
  );
};
export default Footer;
