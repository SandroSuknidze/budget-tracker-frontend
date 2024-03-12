import {useEffect, useState} from "react";
import axiosInstance from "../utils/axios-instance.js";
import {useForm} from "react-hook-form";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function CreateAccountModal({onClose, isOpen, activateToaster, editAccount, }) {
    const authState = useAuthHeader();
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        reset,
    } = useForm({
        mode: "all",
        defaultValues: {
            currency: "",
            title: "",
            description: "",
        }
    });
    useEffect(() => {
        async function fetchAccount() {
            if(editAccount !== 0) {
                try {
                    if (editAccount !== 0) {
                        const res = await axiosInstance.get("/account", {
                            params: {
                                id: editAccount
                            },
                            headers: {
                                Authorization: `${authState}`
                            }
                        });
                        setValue("title", res.data[0].title);
                        setValue("description", res.data[0].description);
                        setValue("currency", res.data[0].currency);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }

        fetchAccount();
    }, [editAccount, authState, setValue]);





    useEffect(() => {
        async function fetchData() {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                const data = await response.json();
                let country = data.countryName;
                country = country.charAt(0).toUpperCase() + country.slice(1);

                const res = await axiosInstance.get("/currencies");
                if (res.status === 200) {
                    let currency = res.data[0].find(row => row[0] === country)

                    setValue("currency", `${currency[2]} (${currency[3]})`);
                    setValue("title", "");
                    setValue("description", "");
                    setCurrencies(res.data[0]);
                } else {
                    console.error("Error fetching data:", res);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [setValue, editAccount]);

    const onSubmit = async (data) => {
        if (editAccount === 0) {
            try {
                const res = await axiosInstance.post(`/account`, data, {
                    headers: {
                        Authorization: `${authState}`
                    },
                });
                if (res.status === 201) {
                    setError("");
                    reset({ title: "", description: "" });
                    onClose();
                    activateToaster("The Account created!");
                }
            } catch (err) {
                setError(err.response.data.errors.title[0])
            }
        } else {
            try {
                const res = await axiosInstance.put(`/account/${editAccount}`, data, {
                    headers: {
                        Authorization: `${authState}`
                    },
                });
                if (res.status === 201) {
                    setError("");
                    reset({ title: "", description: "" });
                    onClose();
                    activateToaster("The Account successfully edited!");
                }
            } catch (err) {
                setError(err.response.data.errors.title[0])
            }
        }
    }

    return (
        <div className={`${isOpen ? 'block' : 'hidden'} fixed z-10 top-0 left-0 w-full h-screen bg-black bg-opacity-50`}>
            <div className="w-[400px] h-[450px] create-modal bg-white rounded-lg">
                <div className="relative p-2 border-b-[1px] border-b-black">
                    <div className="text-center">{editAccount ? 'Edit Account' : 'Create Account'}</div>
                    <div onClick={onClose} className="px-5 absolute top-[18%] right-0 cursor-pointer">X</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col p-10 gap-8">
                        <div className="flex flex-col relative">

                            <label htmlFor="title">Title *</label>
                            <input type="text" id="title" name="title" className="bg-gray-100 rounded-md p-2"
                                   {...register("title", {
                                       required: "Required field is empty",
                                       pattern: {
                                           value: /^[a-zA-Z0-9_\p{L} ]*$/u,
                                           message: 'Invalid Title entered. Please check it'
                                       },
                                       maxLength: {
                                           value: 128,
                                           message: 'Maximum number of characters reached'
                                       }
                                   })}

                            />
                            <p className="absolute bottom-[-30px] text-red-600">{errors.title?.message || error}</p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="currency">Currency *</label>
                            <select name="currency" id="currency" className="bg-gray-100 rounded-md p-2"
                                    {...register("currency")}>
                                {currencies.map((item, index) => (
                                    <option key={index}>{item[2]} ({item[3]})</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col relative">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" className="rounded-md resize-none p-2"
                                      {...register("description", {
                                          maxLength: {
                                              value: 256,
                                              message: 'Maximum number of characters reached'
                                          }
                                      })}
                            />
                            <p className="absolute bottom-[-30px] text-red-600">{errors.description?.message}</p>
                        </div>

                    </div>
                    <div className="text-right bottom-0 absolute right-0 px-5 py-3">
                        <button onClick={onClose} type="button" className="outline outline-1 rounded-lg px-2 w-[70px] mr-2">cancel</button>
                        <button disabled={!isValid} type="submit" className="bg-pink-300 outline outline-1 rounded-lg w-[70px] px-2 disabled:opacity-50">save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccountModal;