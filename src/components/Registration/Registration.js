import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import app from "../../Hook/firebaseConfig";
import useFirebase from '../../Hook/useFirebase';
const auth = getAuth(app);

const Registration = ({ user, setUser }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { handleGoogleLogin, test } = useFirebase();


  const handleName = (event) => {
    setName(event.target.value);

  }

  const handleEmail = (event) => {
    const test = /\S+@\S+\.\S+/.test(event.target.value)
    if (!test) {
      setError("Please give a valid email")
      return;
    }

    setEmail(event.target.value);
    setError('')

  };

  const handlePassword = (event) => {
    if (!/(?=.{8,})/.test(event.target.value)) {
      setError('Password must be 8 cherecters')
      return;
    }
    if (!/(?=.*[a-zA-Z])/.test(event.target.value)) {
      setError('Password should have upper letter')
      return;
    }

    if (!/(?=.*[!#$%&? "])/.test(event.target.value)) {
      setError('Password should have a special charecter')
      return;
    }


    setError("");
    setPassword(event.target.value);


  }


  const handleRegister = (event) => {
    event.preventDefault();
    if ((name, email, password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const userInfo = userCredential.user;
          setUser(userInfo);
          updateName()
          setError("");
          verify();
          // console.log(userInfo)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage)
          // ..
        });
    }
    else {
      setError("Please fill out all the input")
      return;
    }
  }

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  const verify = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        alert('Check email and verify')
      });

  }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }, [])





  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/hYJTmVX/undraw-Mobile-login-re-9ntv-1.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <div className="input-box">
            <p className="text-danger">{error}</p>
            <form action="">
              <input
                onBlur={handleName}
                className="form-control p-3 m-2"
                type="text"
                placeholder="Enter your name"
                required
              />
              <input
                onBlur={handleEmail}
                className="form-control p-3 m-2"
                type="email"
                placeholder="Email"
                required
              />
              <input
                onBlur={handlePassword}
                className="form-control p-3 m-2"
                type="password"
                placeholder="password"
                required
              />
              <p className="link ">
                <Link to="/login" className="text-decoration-none">
                  <small className="text-danger link">
                    already have an account? please login
                  </small>
                </Link>
              </p>
              <input
                onClick={() => setIsDisabled(!isDisabled)}
                className="p-2" type="checkbox" />{" "}
              <span className="mb-3">accept term & condition</span>
              <br />
              <button
                disabled={isDisabled}
                onClick={handleRegister}
                type="submit"
                className="btn btn-info p-3 w-50 mt-3 fw-bold text-white"
              >
                Register
              </button>
            </form>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto">
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p className="fw-bold">Google SignIn</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
