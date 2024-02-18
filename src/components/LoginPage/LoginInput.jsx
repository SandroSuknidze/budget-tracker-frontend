import {forwardRef, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
function LoginInput({text, type, onChange, onBlur, ...props}, ref) {
    const [touched, setTouched] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleBlur = (event) => {
        setTouched(true);

        if (input === "") {
            setError("Required field is empty");
        } else if (type === "text" && !validateEmail(input)) {
            setError("Please enter a valid email address");
        } else {
            setError("");
        }

        onBlur && onBlur(event);
    }

    const handleChange = (event) => {
        onChange = onChange(event);
        setInput(event.target.value);
        if (touched) {
            setError("");
        }
    }

    return (
        <div className="login-input-wrapper">
            <input
                className={`login-input ${error ? "error" : ""}`}
                ref={ref}
                type={type}
                id={text}
                onBlur={handleBlur}
                onChange={handleChange}
                {...props}
                required
            />
            <label htmlFor={text} className={`login-label ${error ? "error" : ""}`}>{text}</label>
            <div className="login-eye-icon">
                {props.type === "password" &&
                    <img src="images/eye-icon.svg" alt="eye-icon"/>
                }
            </div>
            {touched && error && <p className="login-error">{error}</p>}
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default forwardRef(LoginInput);