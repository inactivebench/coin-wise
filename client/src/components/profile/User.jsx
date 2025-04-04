import { useRef, useState, useEffect } from "react";
import Sidebar from "../ui/Sidebar";
import useAuth from "@/hook/useAuth";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import "@/css/profile.css";
import { jwtDecode } from "jwt-decode";
import { FaInfoCircle } from "react-icons/fa";
import Alert from "../ui/Alert";
import { useGlobalContext } from "@/context";

const User = () => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const DELETE_USER_URL = "/users/delete";
  const UPDATE_PWD_URL = "users/update";

  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [pwdFocus, setPwdFocus] = useState(false);
  const [newPwdFocus, setNewPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [success, setSuccess] = useState(false);
  const passwordRef = useRef();

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { rates, ratesFetched, currency, setCurrency } = useGlobalContext();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userData = {
      currentPassword: pwd,
      password: matchPwd,
    };
    try {
      const response = await axiosPrivate.put(
        UPDATE_PWD_URL,
        { userData },
        {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.status === 201) {
        setPwd("");
        setNewPwd("");
        setMatchPwd("");
        setIsOpen(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.delete(DELETE_USER_URL, {
        Authorization: `Bearer ${auth?.accessToken}`,
      });
      if (response?.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    if (isOpen) return passwordRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newPwd));
    setValidMatch(newPwd === matchPwd);
  }, [newPwd, matchPwd]);

  return (
    <div className=' grid-container'>
      <Sidebar pageTitle={"profile"} />
      <div className=' main-content'>
        <div className='user-container flex'>
          <div className='profile-img flex'>
            <h1 className='capitalize'>p</h1>
          </div>
          <div className='user-info flex capitalize'>
            <div>
              <h2>username</h2>
              <p>{decoded?.userInfo.user}</p>
            </div>
            <div>
              <h2>email</h2>
              <p>{decoded?.userInfo.email || "email info"}</p>
            </div>
          </div>
          <div className='currency-info flex'>
            <h2>currency: </h2>
            <p>$</p>
          </div>
          <div>
            <label htmlFor='currency-select'>
              Choose your preferred currency
            </label>
            <select
              name='currency-select'
              id='currency-select'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {ratesFetched ? (
                Object.keys(rates).map((curr, index) => {
                  return (
                    <option key={index} value={curr}>
                      {curr}
                    </option>
                  );
                })
              ) : (
                <option defaultValue>USD</option>
              )}
            </select>
          </div>
          <form
            className={`update-password-form ${!isOpen ? "hide" : "show"} flex`}
            aria-label='update password form'
          >
            <label htmlFor='password' className='label'>
              Current Password:
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              ref={passwordRef}
              className='input'
              required
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <label htmlFor='newPassword' className='label'>
              New Password:
            </label>
            <input
              type='password'
              id='newPassword'
              onChange={(e) => setNewPwd(e.target.value)}
              value={newPwd}
              className='input'
              required
              aria-describedby='newpwdnote'
              onFocus={() => setNewPwdFocus(true)}
              onBlur={() => setNewPwdFocus(false)}
            />
            <p
              id='newpwdnote'
              className={
                newPwdFocus && !validPwd ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label='exclamation mark'>!</span>{" "}
              <span aria-label='at symbol'>@</span>{" "}
              <span aria-label='hashtag'>#</span>{" "}
              <span aria-label='dollar sign'>$</span>{" "}
              <span aria-label='percent'>%</span>
            </p>
            <label htmlFor='confirm_pwd' className='label'>
              Confirm Password:
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
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              Must match the first password input field.
            </p>
            <div className='flex btn-container '>
              <button
                className='capitalize btn cancel'
                onClick={() => {
                  setPwd("");
                  setNewPwd("");
                  setMatchPwd("");
                  setIsOpen(false);
                }}
              >
                cancel
              </button>
              <button
                className='capitalize btn'
                onClick={handleUpdate}
                disabled={!validMatch || !validPwd ? true : false}
              >
                update password
              </button>
            </div>
          </form>
          <button
            className='capitalize btn'
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            update password
          </button>
          <button className='capitalize btn delete' onClick={handleDelete}>
            delete account
          </button>
        </div>
        <Alert />
      </div>
    </div>
  );
};
export default User;
