import {useState} from "react";

function LoginInvalidCredentials({ visibility }) {
    const [invalidCredentials, setInvalidCredentials] = useState(visibility);

    return (
        <div>
            {invalidCredentials &&
                <div className="login-invalid-credentials">
                    Incorrect email or password <img className="close-icon" onClick={() => setInvalidCredentials(false)}
                                                     src="images/close-icon.svg" alt="close-icon"/>
                </div>
            }
        </div>
    );
}

export default LoginInvalidCredentials;