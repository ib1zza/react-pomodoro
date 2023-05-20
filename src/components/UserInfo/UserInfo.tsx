import React, { useEffect, useState } from "react";
import s from "./UserInfo.module.scss";
import { User } from "firebase/auth";
import notFound from "@/assets/images/notFound.png";
import { FirebaseUserInfo, getUserInfo } from "@utils/queries/getUserInfo";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/context/AuthContext";

interface IUserInfoProps {
  user: User;
}
const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState<FirebaseUserInfo | null>(null);
  useEffect(() => {
    getUserInfo(user.uid).then((val) => setUserInfo(val));
  }, []);
  return (
    <>
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

            <div className={s.todosCounter}>
              <span>Pomodoros Finished: </span>
              {userInfo ? userInfo.pomodorosFinished : "..."}
            </div>
          </div>
        </div>
        <button className={s.logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logout} />
        </button>
      </div>
    </>
  );
};

export default UserInfo;
