import { useAuth } from "~/context/auth/auth.hooks";
import { useTheme } from "~/context/theme/theme.hooks";
import { Link } from "react-router";
import { useLanguage } from "~/context/language/language.hooks";

export default function Test() {

    const { changeLanguage, language } = useLanguage();
    const { toggleTheme, mode } = useTheme();
    const { user, login, logout } = useAuth();

    const teste = (language : string ) => {
        changeLanguage( language);
    }
    
    

    return (
        <div className={ `${mode == "light" ? "bg-white" : "bg-black" } text-white min-h-screen d-flex items-center justify-center`}>
            <h1 className="text-3xl font-bold text-blue-600">{mode}</h1>
            <Link to="/admin/theme" className="font-bold text-blue-600">{language}</Link>
            <button className="font-bold text-blue-600" onClick={toggleTheme}>Change Theme</button>
        </div>
    );
}
