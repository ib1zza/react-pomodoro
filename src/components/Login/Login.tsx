import React from "react";
import s from "./Login.module.scss";
import { loginByGoogle } from "@utils/queries/Createuser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

interface ILoginProps {}
const Login: React.FC<ILoginProps> = ({}) => {
  const handleGoogle = async () => {
    try {
      loginByGoogle().then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.container}>
      <button className={s.googleLogin} onClick={handleGoogle}>
        <span>{"sign in using google"}</span>{" "}
        <FontAwesomeIcon icon={faGoogle} />
      </button>
    </div>
  );
};

export default Login;
