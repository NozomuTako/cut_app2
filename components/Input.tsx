import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  onEnter?: () => void;
  isDarkMode?: boolean; // Optional prop to check dark mode
};

function Input(props: InputProps) {
    
    const { className = "", type, title ,onEnter ,isDarkMode, ...rest } = props;
    // const isDarkMode = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    // const titleColor = isDarkMode ? 'text-red-500' : 'text-blue-500';
    // const inputStyle = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black';

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
            {/* <p className={`font-medium ${titleColor}`}> */}
            <p className="font-medium">
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