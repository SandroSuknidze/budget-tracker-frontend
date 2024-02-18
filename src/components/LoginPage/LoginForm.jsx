import LoginInput from "./LoginInput.jsx";
import LoginButton from "./LoginButton.jsx";
import {useForm} from "react-hook-form";

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { isValid }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="login-form">
            <h1 className="login-header">Budgetify</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <LoginInput text={"Email"} type={"text"} name={"email"} {...register("email")}/>
                <LoginInput text={"Password"} type={"password"} name={"password"} {...register("password")}/>
                <LoginButton disabled={!isValid}/>
            </form>
        </div>
    );
}

export default LoginForm;