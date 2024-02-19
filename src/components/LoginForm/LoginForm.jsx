import LoginButton from "./LoginButton.jsx";
import {useForm} from "react-hook-form";
import LoginInput from "./LoginInput.jsx";
import LoginInvalidCredentials from "./LoginInvalidCredentials.jsx";
import axios from "axios";
import {useState} from "react";

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        mode: "all",
    });

    const [invalidCredentialsVisibility, setInvalidCredentialsVisibility] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/login",
                data
            );
            console.log(data);
            if (response.status === 200) {
                setInvalidCredentialsVisibility(false);
            } else {
                setInvalidCredentialsVisibility(true);
            }
        } catch (err) {
            console.log(err);
            setInvalidCredentialsVisibility(true);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LoginInput
                id="Email"
                label="Email"
                type="text"
                error={errors.email}
                register={register("email", {
                    required: "Required field is empty",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address'
                    }
                })}
                errorMessage={errors.email?.message}
            />

            <LoginInput
                id="Password"
                label="Password"
                type="password"
                error={errors.password}
                register={register("password", {
                    required: "Required field is empty",
                })}
                errorMessage={errors.password?.message}
            />
            <LoginButton disabled={!isValid}/>
            <LoginInvalidCredentials visibility={invalidCredentialsVisibility} setVisibility={setInvalidCredentialsVisibility} />
        </form>
    );
}

export default LoginForm;