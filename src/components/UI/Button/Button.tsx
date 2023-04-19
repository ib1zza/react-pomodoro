import React from 'react';
import s from './Button.module.scss';

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
    className?: string
}
const Button:React.FC<IButtonProps> = ({children, className, ...rest}) => {
    return (
        <button className={s.button + " " + (className ? className : "")} {...rest}>{children}</button>
    );
};

export default Button;