function LoginInput({ id, label, type, error, register, errorMessage }) {
    return (
        <div className="login-input-wrapper">
            <input
                className={`login-input ${error ? "error" : ""}`}
                type={type}
                id={id}
                autoComplete={"yes"}
                {...register}
                required
            />
            <label htmlFor={id} className={`login-label ${error ? "error" : ""}`}>
                {label}
            </label>
            <div className="login-eye-icon">
                {type === "password" &&
                    <img src="images/eye-icon.svg" alt="eye-icon"/>
                }
            </div>
            {error && <p className="login-error">{errorMessage}</p>}
        </div>
    );
}

export default LoginInput;