import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  onEnter?: () => void;
  isDarkMode?: boolean; // Optional prop to check dark mode
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

};

function Input(props: InputProps) {
    
    const { className = "", type, title ,onEnter ,isDarkMode ,value ,onChange, ...rest } = props;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const parsed = parseInt(raw, 10);

        // 先頭ゼロを除去するため、数値に変換してから文字列に戻す
        const sanitized = isNaN(parsed) ? "" : parsed.toString();

        // valueを直接更新する（親から渡されたonChangeを使う）
        const syntheticEvent = {
            ...e,
            target: {
                ...e.target,
                value: sanitized,
                valueAsNumber: parsed,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange?.(syntheticEvent);
    };


    return (
        <>
            {/* <p className={`font-medium ${titleColor}`}> */}
            <p className="font-medium">
                {title}
            </p>
            <input
                type={type || "number"}
                value={value?.toString() ?? ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 ${className}`}
                {...rest}

            /> 
        </>
    );
}

export default Input;