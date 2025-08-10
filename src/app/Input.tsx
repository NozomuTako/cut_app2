import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  onEnter?: () => void;
};

function Input(props: InputProps) {
    const { className = "", type, title ,onEnter, ...rest } = props;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnter) {
        onEnter();
        }
        if (rest.onKeyDown) {
        rest.onKeyDown(e);
        }
    };

    return (
        <>
            <p className=" font-medium text-gray-700">
                {title}
            </p>
            <input
                type={type || "number"}
                onKeyDown={handleKeyDown}
                
                className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 ${className}`}
                {...rest}
            /> 
        </>
    );
}

export default Input;