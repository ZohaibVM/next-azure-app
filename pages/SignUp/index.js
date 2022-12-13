import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { formsService } from "./../../services/formsService";
import { successToast, errorToast, validateEmail } from "./../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { push } = useRouter();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const isEmailValidated = validateEmail(e.target.value);
    isEmailValidated ? setError(null) : setError("Email is not Valid!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmpassword) {
      setError("Please Fill All Fields !!");
      return;
    }

    if (password !== confirmpassword) {
      setError("Both Passwords should be match !!");
      return;
    }

    const userData = {
      id: uuidv4(),
      username,
      email,
      password,
    };

    setLoading(true);

    try {
      const res = await axios.post(formsService.signup, { userData });
      console.log(res);
      if (res.status === 200) {
        setError(null);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        push("/Login");
        successToast(res?.data?.message);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="signup-wrapper">
      <div className="signup">
        <h1 className="text-center mb-4">SignUp</h1>
        <form onSubmit={handleSubmit}>
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
              <button className="btn btn-dark btn-block" disabled={loading}>
                SignUp {loading && <i className="fa fa-spinner fa-spin"></i>}
              </button>
            </div>
            {error && (
              <div className="col-12">
                <div className="alert alert-danger">{error}</div>
              </div>
            )}
            <div className="col-12">
              <div className="d-flex justify-content-end">
                <Link href="/Login">
                  <a className="text-dark">Already Have an Account?</a>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
