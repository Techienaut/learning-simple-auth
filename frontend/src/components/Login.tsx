import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {}

export const Login: React.FC<Props> = () => {
  const email = useFormInput("");
  const password = useFormInput("");
  let history = useHistory();

  // handle button click of login form
  const handleLogin = async () => {
    try {
      await axios.post(
        "https://blah.com:5000/api/v1/user/login",
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      );
      history.push("/dashboard");
    } catch (error) {
      console.log("haha", error);
    }
  };

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        "https://blah.com:5000/api/v1/auth/csrf-token"
      );
      axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <div>
      Login
      <br />
      <br />
      <div>
        Username
        <br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <input
        type="button"
        style={{ marginTop: 10 }}
        value="Login"
        onClick={handleLogin}
      />
    </div>
  );
};

// custom hook to manage the form input
const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};
