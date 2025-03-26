import { useState, useEffect } from "react";
import Sidebar from "../ui/Sidebar";
import useAuth from "@/hook/useAuth";
import useAxiosPrivate from "@/hook/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import "@/css/profile.css";
import { jwtDecode } from "jwt-decode";
import { FaInfoCircle } from "react-icons/fa";

const User = () => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const DELETE_USER = "/users/delete";

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

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.delete(DELETE_USER, {
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
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(newPwd === matchPwd);
  }, [pwd, matchPwd]);

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
              className='input'
              required
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <label htmlFor='password' className='label'>
              New Password:
            </label>
            <input
              type='password'
              id='password'
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
                  setMatchFocus("");
                  setIsOpen(false);
                }}
              >
                cancel
              </button>
              <button className='capitalize btn' onClick={handleUpdate}>
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
      </div>
    </div>
  );
};
export default User;
