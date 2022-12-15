import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { formsService } from "../../services/formsService";
import {
  successToast,
  errorToast,
  warningToast,
  validateEmail,
} from "./../../utils/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [otp, setOTP] = useState("");
  const [otpLoading, setOTPLoading] = useState(null);
  const [otpError, setOTPError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPassswordLoading] = useState(null);
  const [passwordError, setPassswordError] = useState(null);
  const [step, setStep] = useState(1);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isEmailValidated = validateEmail(e.target.value);
    isEmailValidated
      ? setEmailError(null)
      : setEmailError("Email is not Valid!");
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is incorrect or empty!");
      return;
    }

    setEmailLoading(true);

    try {
      const res = await axios.post(formsService.forgotPasswordEmail, { email });
      if (res.status === 200) {
        setEmailLoading(null);
        successToast(res?.data?.message);
        setStep(2);
      }

      if (res.status === 201) {
        warningToast(res?.data?.message);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setEmailLoading(null);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      setOTPError("OTP cannot be empty!");
      return;
    }

    setOTPLoading(true);

    const userData = {
      otp,
      email,
    };

    try {
      const res = await axios.post(formsService.forgotPasswordOTPVerify, {
        userData,
      });

      if (res.status === 200) {
        setOTPError(null);
        setOTPLoading(null);
        successToast(res?.data?.message);
        setStep(3);
      }

      if (res.status === 201) {
        warningToast(res?.data?.message);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setOTPLoading(null);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmpassword) {
      setPassswordError("Password should'nt be empty!");
      return;
    }

    if (password !== confirmpassword) {
      setPassswordError("Both Passwords should match!!");
      return;
    }

    setPassswordLoading(true);

    const userData = {
      email,
      password,
    };

    try {
      const res = await axios.post(formsService.forgotPassword, {
        userData,
      });

      if (res.status === 200) {
        setPassswordError(null);
        setPassswordLoading(null);
        setPassword("");
        setConfirmPassword("");
        successToast(res?.data?.message);
      }

      if (res.status === 201) {
        warningToast(res?.data?.message);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setPassswordLoading(null);
    }
  };

  return (
    <section className="forgot-wrapper">
      <div className="forgot">
        <h1 className="text-center mb-4">Forgot Password</h1>
        {/* EMAIL  */}
        {step === 1 && (
          <form onSubmit={handleEmail}>
            <div className="row">
              <div className="col-12 mb-3">
                <input
                  className="app-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
              <div className="col-12 mb-3">
                <button
                  className="btn btn-dark btn-block"
                  disabled={emailLoading}
                >
                  Send OTP{" "}
                  {emailLoading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              </div>
              {emailError && (
                <div className="col-12">
                  <div className="alert alert-danger">{emailError}</div>
                </div>
              )}
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <Link href="/">
                    <a className="text-dark">Login here</a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* OTP  */}
        {step === 2 && (
          <form onSubmit={handleOTP}>
            <div className="row">
              <div className="col-12 mb-3">
                <p className="m-0">Please check your email for OTP</p>
              </div>
              <div className="col-12 mb-3">
                <input
                  className="app-input"
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <button
                  className="btn btn-dark btn-block"
                  disabled={otpLoading}
                >
                  Verify OTP{" "}
                  {otpLoading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              </div>
              {otpError && (
                <div className="col-12">
                  <div className="alert alert-danger">{otpError}</div>
                </div>
              )}
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <Link href="/">
                    <a className="text-dark">Login here</a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* PASSWORD  */}
        {step === 3 && (
          <form onSubmit={handlePassword}>
            <div className="row">
              <div className="col-12 mb-3">
                <p className="m-0">Please enter your new password</p>
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
                <button className="btn btn-dark btn-block">
                  Update Password{" "}
                  {passwordLoading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              </div>
              {passwordError && (
                <div className="col-12">
                  <div className="alert alert-danger">{passwordError}</div>
                </div>
              )}
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <Link href="/">
                    <a className="text-dark">Login here</a>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
