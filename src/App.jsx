import './App.css'
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import useSignOut from "react-auth-kit/hooks/useSignOut";

function App() {
    const signOut = useSignOut();
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiration = () => {
            let authToken = Cookies.get('_auth');
            if (authToken) {
                let decoded = jwtDecode(authToken);
                let currentTime = Math.floor(new Date().getTime() / 1000);
                let expirationDate = decoded.exp;

                if (expirationDate < currentTime) {
                    signOut();
                    Cookies.remove('_auth');
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        let authToken = Cookies.get('_auth');
        if (authToken) {
            const intervalId = setInterval(checkTokenExpiration, 1000);
            return () => clearInterval(intervalId);
        }
    }, [navigate, signOut]);

    return (
        <div>
            <Routes>
                <Route element={<AuthOutlet  fallbackPath={'/login'} />}>
                    <Route path='/' element={<HomePage/>} />
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </div>
    )
}

export default App;
