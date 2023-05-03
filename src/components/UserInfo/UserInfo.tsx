import React, { useEffect } from "react";
import s from "./UserInfo.module.scss";
import { User } from "firebase/auth";
import notFound from "@/assets/images/notFound.png";
import { getUserInfo } from "@utils/queries/getUserInfo";
interface IUserInfoProps {
  user: User;
}
const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
  const [info, setInfo] = React.useState<any>(null);
  useEffect(() => {
    getUserInfo(user.uid).then((res) => {
      setInfo(res);
      console.log(res);
    });
  }, []);
  return (
    <div className={s.container}>
      <div className={s.userInfo}>
        {
          <img
            className={s.avatar}
            src={user.photoURL || notFound}
            alt="user"
          />
        }
        <div className={s.name}>
          <div className={s.displayName}>{user.displayName}</div>
          <div className={s.email}>{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
