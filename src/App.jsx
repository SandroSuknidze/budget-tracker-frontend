import './App.css'
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import Navbar from "./components/Navbar.jsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export const MyContext = createContext(null);

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




    const [showAccountModal, setShowAccountModal] = useState(false);


    const [showToaster, setShowToaster] = useState(false);
    const [toasterText, setToasterText] = useState("");

    const [editAccount, setEditAccount] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const authUser = useAuthUser();

    let name = authUser?.name.split('@')[0];



    function toggleAccountModal() {
        setEditAccount(0);
        setShowAccountModal(!showAccountModal);
    }


    function toggleToaster(text) {

        setShowToaster(!showToaster);
        setToasterText(text);
        setTimeout(() => {
            setShowToaster(false)
            setToasterText("");
        }, 5000);
    }


    const handleEditAccount = (id) => {
        console.log("gaesha");
        setEditAccount(id);
    }

    function toggleShowConfirmation(num) {
        setShowConfirmation(!showConfirmation);
        if (num === 1) {
            setEditAccount(0);
            setShowToaster(!showToaster);
            setToasterText("Account is successfully deleted!");
            setTimeout(() => {
                setShowToaster(false)
                setToasterText("");
            }, 5000);
        }
    }

    return (
        <MyContext.Provider value={{
            toggleAccountModal,
            toggleToaster,
            handleEditAccount,
            toggleShowConfirmation,
            showAccountModal,
            editAccount,
            showConfirmation,
            showToaster,
            toasterText,
            name,
        }}>
            <div>
                <Routes>
                    <Route element={<AuthOutlet fallbackPath={'/login'}/>}>
                        <Route path='/' element={<Navbar/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path='/categories' element={<CategoriesPage/>}/>
                        </Route>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </div>
        </MyContext.Provider>
    )
}

export default App;
