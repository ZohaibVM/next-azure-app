import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { successToast, errorToast } from "../../utils/utils";
import { formsService } from "../../services/formsService";

const storeInLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { replace } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username or Password is incorrect or empty");
      return;
    }

    const userData = {
      username,
      password,
    };

    setLoading(true);

    try {
      const res = await axios.post(formsService.login, { userData });

      // if user exists
      if (res?.status === 200 && res?.data?.user) {
        setError(null);
        setUsername("");
        setPassword("");
        Cookies.set("loggedin", "true");
        replace("/AllForms");
        storeInLocalStorage(res?.data?.user);
        successToast(res?.data?.message);
      }

      // if user not exists
      if (res?.status === 200 && !res?.data?.user) {
        setError(null);
        errorToast(res?.data?.message);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="login-wrapper">
      <div className="login">
        <h1 className="text-center mb-4">Login</h1>
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12 mb-3">
              <button className="btn btn-dark btn-block" disabled={loading}>
                Login {loading && <i className="fa fa-spinner fa-spin"></i>}
              </button>
            </div>
            {error && (
              <div className="col-12">
                <div className="alert alert-danger">{error}</div>
              </div>
            )}
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <Link href="/ForgotPassword">
                  <a className="text-dark">Forgot Password</a>
                </Link>
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
}

export default Login;
