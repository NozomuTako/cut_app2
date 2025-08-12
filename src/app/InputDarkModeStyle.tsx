import useDarkModeCheck from "./useDarkModeCheck";

function InputDarkModeStyle() {
  const { darkMode } = useDarkModeCheck();

  return {
    inputStyle: darkMode ? 'bg-amber-800 text-white' : 'bg-amber-100 text-black',
    // titleColor: darkMode ? 'text-red-500' : 'text-blue-500',
  };
}


export default InputDarkModeStyle;