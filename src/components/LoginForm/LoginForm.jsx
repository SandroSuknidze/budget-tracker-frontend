import LoginButton from "./LoginButton.jsx";
import {useForm} from "react-hook-form";
import LoginInput from "./LoginInput.jsx";

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        mode: "all",
    });

    const onSubmit = (data) => {
        console.log(data);

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LoginInput
                id="Email"
                label="Email"
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
                error={errors.password}
                register={register("password", {
                    required: "Required field is empty",
                })}
                errorMessage={errors.password?.message}
            />
            <LoginButton disabled={!isValid}/>
        </form>
    );
}

export default LoginForm;