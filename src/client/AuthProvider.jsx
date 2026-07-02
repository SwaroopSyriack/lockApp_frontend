import { useContext , createContext, useState } from "react";
import authService from "./authService";
import { useNavigate } from "react-router-dom";


const AuthContext  = createContext(null);


const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [user , setUser] = useState(null)
    const [token , setToken] = useState(localStorage.getItem("token") || "")

    const loginAction = async (params) => {

    const res = await authService.Login(params);
    console.log(res)
    if(res.success){
        setUser(res.data.username)
        setToken(res.data.access_token);
        if (res.data.access_token){
        localStorage.setItem("token", res.data.access_token);
        }
        console.log("Login Successfull",res.message)
        console.log(res.data.username)
        navigate("/home");
        return;
    }
    else{
        console.error("Login Failed" , res.data.message)
    }

}

const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
}

    return <AuthContext.Provider value={{ token, user, loginAction, logOut }} >{children}</AuthContext.Provider>;

}


export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext);
}