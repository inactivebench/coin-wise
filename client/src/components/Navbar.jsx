import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='header '>
      <div className='nav container flex'>
        <Link to='/' className='logo '>
          coin-wise
        </Link>
        <nav className=' flex'>
          <ul className='primary--nav  flex'>
            <li className='nav-item capitalize'>home</li>
            <li className='nav-item capitalize'>learn</li>
          </ul>
        </nav>
        <div className='flex'>
          <Link to='/signin' className='link capitalize'>
            sing in
          </Link>
          <Link to='/signup' className='btn link capitalize'>
            start your free trial
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
