import LoginButton from "./LoginButton.jsx";
import {useForm} from "react-hook-form";
import LoginInput from "./LoginInput.jsx";
import LoginInvalidCredentials from "./LoginInvalidCredentials.jsx";
import {useState} from "react";
import axiosInstance from "../../utils/axios-instance.js";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        mode: "all",
    });

    const signIn = useSignIn();
    const navigate = useNavigate();
    const [invalidCredentialsVisibility, setInvalidCredentialsVisibility] = useState(false);

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post(
                "/login",
                data,
            );

            if (res.status === 200) {
                setInvalidCredentialsVisibility(false);
                if (signIn({
                    auth: {
                        token: res.data.token,
                        type: 'Bearer',
                    },
                    userState: {
                        name: res.data.user.email,
                        uid: res.data.user.id,
                    },
                })){

                    const expirationDate = res.data.expires;

                    Cookies.set('_auth', res.data.token, { expires: expirationDate  });

                    return navigate("/");
                }
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