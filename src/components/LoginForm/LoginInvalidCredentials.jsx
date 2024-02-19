function LoginInvalidCredentials({ visibility, setVisibility  }) {
    return (
        <div>
            {visibility &&
                <div className="login-invalid-credentials">
                    Incorrect email or password
                    <img
                        className="close-icon"
                        onClick={() => setVisibility(false)}
                        src="images/close-icon.svg"
                        alt="close-icon"
                    />
                </div>
            }
        </div>
    );
}

export default LoginInvalidCredentials;