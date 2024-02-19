function LoginInput({ id, label, error, register, errorMessage }) {
    return (
        <div className="login-input-wrapper">
            <input
                className={`login-input ${error ? "error" : ""}`}
                type="text"
                id={id}
                {...register}
                required
            />
            <label htmlFor={id} className={`login-label ${error ? "error" : ""}`}>
                {label}
            </label>
            {error && <p className="login-error">{errorMessage}</p>}
        </div>
    );
}

export default LoginInput;