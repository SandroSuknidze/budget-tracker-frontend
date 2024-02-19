function LoginButton({ disabled = true }) {
    return (
        <div>
            <button type="submit" className="login-button" disabled={disabled}>Login</button>
        </div>
    );
}

export default LoginButton;