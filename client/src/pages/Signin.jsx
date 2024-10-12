import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../context";
import useAuth from "../hook/useAuth";
import logo from "../assets/images/coin.svg";
import axios from "../api/axios";

const Signin = () => {
  const SIGNIN_URL = "/auth/login";
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post(SIGNIN_URL, JSON.stringify({ email: email, password: pwd }), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          if (!response.data.login) {
            throw err;
          } else {
            const accessToken = response?.data?.accessToken;
            setAuth({ email, pwd, accessToken });
          }
        });

      console.log(email);
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Sign in Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      <div className='sign-section-container'>
        <Link to='/' className='logo  sign-logo'>
          <img src={logo} alt='coin wise logo' />
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
          <form className='flex form ' onSubmit={handleSubmit}>
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
    </>
  );
};
export default Signin;
