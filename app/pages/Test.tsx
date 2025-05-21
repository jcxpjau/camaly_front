import { useAuth } from "~/context/auth/auth.hooks";
import { useTheme } from "~/context/theme/theme.hooks";

export default function Test() {

    const { toggleTheme, mode } = useTheme();

    const changeTheme = () => {
        toggleTheme();
    }
    
    

    return (
        <div className={ `${mode == "light" ? "bg-white" : "bg-black" } text-white min-h-screen flex items-center justify-center`} onClick={changeTheme}>
            <h1 className="text-3xl font-bold text-blue-600">{mode}</h1>
        </div>
    );
}
