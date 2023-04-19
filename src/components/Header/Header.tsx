import React from 'react';
import s from './Header.module.scss';

interface IHeaderProps {

}
const Header:React.FC<IHeaderProps> = ({}) => {

    // TODO
    const preferedTime = 30;
    return (
        <div>
            <h1 className={s.logo}>Pomodoro</h1>
            <div className={s.buttons}>
                <button className={s.button}>15 min</button>
                <button className={s.button}>{(preferedTime || 30) + "min"}</button>
                <button className={s.button}>45 min</button>
            </div>
        </div>
    );
};

export default Header;