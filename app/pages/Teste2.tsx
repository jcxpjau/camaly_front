import { useAuth } from "~/context/auth/auth.hooks";
import { useTheme } from "~/context/theme/theme.hooks";
import { Link } from "react-router";

export default function Test2() {

    const { mode, toggleTheme } = useTheme();

    console.log( mode );
    

    return (
        <div className={ `${mode == "light" ? "bg-white" : "bg-black" } text-white min-h-screen flex items-center justify-center`}>
            <h1 className="text-3xl font-bold text-blue-600">{mode}</h1>
            

            <Link to="/admin/dashboard" className="text-3xl font-bold text-blue-600">Dashboard</Link>
            <button className="font-bold text-blue-600" onClick={toggleTheme}>ChangeTheme</button>
        </div>
    );
}
