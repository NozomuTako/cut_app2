function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className = "", children, onClick,...rest } = props;
    return (
        <button
            className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}


export default Button;