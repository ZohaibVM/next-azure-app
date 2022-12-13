import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (!username || !password) {
    //   setError("Username or Password is incorrect or empty");
    //   return;
    // }
    // setError(null);
    // console.log(username, password);
    // setUsername("");
    // setPassword("");
  };

  return (
    <section className="forgot-wrapper">
      <div className="forgot">
        <h1 className="text-center mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 mb-3">
              <input
                className="app-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-12 mb-3">
              <button className="btn btn-dark btn-block">
                Send OTP
                {/* <i className="fa fa-spinner fa-spin"></i> */}
              </button>
            </div>
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
              <button className="btn btn-dark btn-block">
                Verify OTP
                {/* <i className="fa fa-spinner fa-spin"></i> */}
              </button>
            </div>
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
                Update Password
                {/* {loading && <i className="fa fa-spinner fa-spin"></i>} */}
              </button>
            </div>
            {/* {error && (
              <div className="col-12">
                <div className="alert alert-danger">{error}</div>
              </div>
            )} */}
            <div className="col-12">
              <div className="d-flex justify-content-end">
                <Link href="/SignUp">
                  <a className="text-dark">SignUp here</a>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
