import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { formsService } from "./../../services/formsService";
import {
  successToast,
  errorToast,
  validateEmail,
  warningToast,
} from "./../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [otpLoading, setOtpLoading] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const { push } = useRouter();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const isEmailValidated = validateEmail(e.target.value);
    isEmailValidated
      ? setRegisterError(null)
      : setRegisterError("Email is not Valid!");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmpassword) {
      setRegisterError("Please Fill All Fields !!");
      return;
    }

    if (password !== confirmpassword) {
      setRegisterError("Both Passwords should be match !!");
      return;
    }

    const userData = {
      id: uuidv4(),
      username,
      email,
      password,
      isActive: false,
    };

    setRegisterLoading(true);

    try {
      const res = await axios.post(formsService.signup, { userData });
      if (res.status === 200) {
        setRegisterError(null);
        setIsRegistered(true);
        successToast(res?.data?.message);
      }
      if (res.status === 201) {
        warningToast(res?.data?.message);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setRegisterLoading(null);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      setOtpError("Please Fill OTP Field !!");
      return;
    }

    //SendOTP to backend
    const userData = {
      otp,
      email,
    };

    setOtpLoading(true);

    try {
      const res = await axios.post(formsService.verifyOTP, { userData });
      if (res.status === 200) {
        setOtpError(null);
        setOtp("");
        push("/");
        successToast(res?.data?.message);
      }
      if (res.status === 201) {
        warningToast(res?.data?.message);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setOtpLoading(null);
    }
  };

  const handleResendOTP = (e) => {
    e.preventDefault();
  };

  return (
    <section className="signup-wrapper">
      <div className="signup">
        <h1 className="text-center mb-4">SignUp</h1>
        {!isRegistered && (
          <form onSubmit={handleSignup}>
            <div className="row">
              <div className="col-12 mb-3">
                <input
                  className="app-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <input
                  className="app-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleEmail(e)}
                />
              </div>
              <div className="col-12 mb-3">
                <input
                  className="app-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <input
                  className="app-input"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <button
                  className="btn btn-dark btn-block"
                  disabled={registerLoading}
                >
                  SignUp{" "}
                  {registerLoading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              </div>
              {registerError && (
                <div className="col-12">
                  <div className="alert alert-danger">{registerError}</div>
                </div>
              )}
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <Link href="/">
                    <a className="text-dark">Already Have an Account?</a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
        {isRegistered && (
          <form onSubmit={handleOTP}>
            <div className="row">
              <div className="col-12 mb-3">
                <input
                  className="app-input"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <small className="form-text text-muted">
                  Check your email for OTP code
                </small>
              </div>
              <div className="col-12 mb-3">
                <button
                  className="btn btn-dark btn-block"
                  disabled={otpLoading}
                >
                  Verify{" "}
                  {otpLoading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              </div>
              {otpError && (
                <div className="col-12">
                  <div className="alert alert-danger">{otpError}</div>
                </div>
              )}
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <Link href="">
                    <a
                      className="text-dark"
                      onClick={(e) => handleResendOTP(e)}
                    >
                      Resend OTP?
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="text-dark">Already Have an Account?</a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default SignUp;
