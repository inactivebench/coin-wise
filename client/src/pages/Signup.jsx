import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { FaTimes, FaInfoCircle } from "react-icons/fa";
import logo from "../assets/images/coin.svg";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    setValidEmail(EMAIL_REGEX.test(email));
  }, [username, email]);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='sign-section-container'>
      {/* <Link to='/' className='logo  sign-logo'>
        coin-wise
      </Link> */}
      <Link to='/' className='logo  sign-logo'>
        <img src={logo} alt='coin wise logo' />
      </Link>
      <div className='form-container flex'>
        <div>
          <h1 className='form-header capitalize'>sign up</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live='assertive'
          >
            {errMsg}
          </p>
        </div>
        <form className='flex' onSubmit={handleSubmit}>
          {/* {username} */}
          <label htmlFor='username' className='label'>
            Username:
            <FaCheck className={validUsername ? "valid" : "hide"} />
            <FaTimes className={validUsername ? "valid" : "hide"} />
          </label>
          <input
            type='text'
            id='username'
            ref={usernameRef}
            autoComplete='off'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className='input'
            required
            aria-invalid={validUsername ? "false" : "true"}
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />

          {/* {email} */}
          <label htmlFor='email' className='label'>
            Email:
            <FaCheck className={validUsername ? "valid" : "hide"} />
            <FaTimes className={validUsername ? "valid" : "hide"} />
          </label>
          <input
            type='email'
            id='email'
            aria-describedby='emailnote'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='input'
            required
            aria-invalid={validEmail ? "false" : "true"}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id='emailnote'
            className={pwdFocus && !validEmail ? "instructions" : "offscreen"}
          >
            <FaInfoCircle />
            Please, enter a valid email!
          </p>

          {/* {password} */}

          <label htmlFor='password' className='label'>
            Password:
            <FaCheck className={validUsername ? "valid" : "hide"} />
            <FaTimes className={validUsername ? "valid" : "hide"} />
          </label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            className='input'
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id='pwdnote'
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FaInfoCircle />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label='exclamation mark'>!</span>{" "}
            <span aria-label='at symbol'>@</span>{" "}
            <span aria-label='hashtag'>#</span>{" "}
            <span aria-label='dollar sign'>$</span>{" "}
            <span aria-label='percent'>%</span>
          </p>

          {/* {confirm password} */}

          <label htmlFor='confirm_pwd' className='label'>
            Confirm Password:
            <FaCheck className={validUsername ? "valid" : "hide"} />
            <FaTimes className={validUsername ? "valid" : "hide"} />
          </label>
          <input
            type='password'
            id='confirm_pwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            className='input'
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id='confirmnote'
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FaInfoCircle />
            Must match the first password input field.
          </p>

          <button
            className='btn'
            disabled={
              !validUsername || !validEmail || !validPwd || !validMatch
                ? true
                : false
            }
          >
            Sign Up
          </button>
        </form>
        <p className='link-p '>
          Have an account?
          <span className='link-span'>
            <Link to='/signin'>Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Signup;
