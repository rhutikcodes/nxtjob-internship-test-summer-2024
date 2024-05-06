import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={`py-[13px] px-[20px] rounded-lg border-[1px] gap-[8px] ${className}`}
      {...props}
    />
  );
};

export default Button;
