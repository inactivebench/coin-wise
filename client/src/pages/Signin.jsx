import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='signup-section-container'>
      <Link to='/' className='logo  sign-logo'>
        coin-wise
      </Link>
      <div className='form-container flex'>
        <div>
          <h1 className='form-header capitalize'>log in</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live='assertive'
          >
            {errMsg}
          </p>
        </div>
        <form className='flex form' onSubmit={handleSubmit}>
          <label htmlFor='email' className=' label'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            ref={emailRef}
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='input'
            required
          />

          <label htmlFor='password' className='label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            className='input'
            required
          />

          <button className='btn capitalize'>log in</button>
        </form>
        <p className='link-p '>
          New to coin-wise?
          <span className='link-span'>
            <Link to='/signup'>Sign Up today</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Signin;
