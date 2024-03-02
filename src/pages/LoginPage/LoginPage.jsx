import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    return (
        <div className="background-image">
            <div className="container">
                <div className="login-form">
                    <h1 className="login-header">Budgetify</h1>
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;