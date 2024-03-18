import closeIcon from "../assets/close.svg";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axiosInstance from "../utils/axios-instance.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {MyContext} from "../App.jsx";

function AddTransactionModal({isOpen, onClose}) {
    const authState = useAuthHeader();
    const [selectType, setSelectType] = useState(1);
    const [error, setError] = useState("");
    const context = useContext(MyContext);


    const handleSelectType = (type) => {
        setSelectType(type);
        setValue("type", type === 1 ? "expenses" : "income");
    }

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        reset,
    } = useForm({
        mode: "all",
        defaultValues: {
            type: "expenses",
            title: "",
        }
    });

    useEffect(() => {
        register("type");
        setValue("type", selectType === 1 ? "expenses" : "income");
    }, [register, setValue, selectType, isOpen]);

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post(`/categories`, data, {
                headers: {
                    Authorization: `${authState}`
                },
            });
            if (res.status === 201) {
                setError("");
                reset({title: ""});
                onClose();
                context.toggleToaster("A category created successfully!");
            }
        } catch (err) {
            setError(err.response.data.errors.title[0])
        }

    }

    return (
        <div>
            <div className={`overlay ${isOpen ? "block" : "hidden"}`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="account-info-modal p-8 h-full">
                        {/*head*/}
                        <div className="flex text-3xl justify-between pt-2">
                            <div>Add Category</div>
                            <div className="cursor-pointer" onClick={onClose}>
                                <img src={closeIcon} alt="close-icon"/>
                            </div>
                        </div>
                        {/*end head*/}
                        {/*body*/}
                        <div className="flex flex-col ">
                            <div className="flex mt-[32px]">
                                <div
                                    onClick={() => handleSelectType(1)}
                                    className={`${selectType === 1 ? 'opacity-100 border-2 border-solid border-black py-[4px] pl-[10px] pr-[15px] z-10'
                                        : 'opacity-50 py-[5px] pl-[11px] pr-[16px]'} 
                                                flex border border-solid bg-white rounded-[10px] py-[5px] px-[11px]
                                                 gap-[7px] cursor-pointer`}>
                                    <div className={"sm-circle bg-[#EE3F19] p-[5px]"}>
                                        <img src={arrowUp} alt="arrow-up-icon"/>
                                    </div>
                                    <div className="mt-auto mb-auto text-[20px]">
                                        Expenses
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleSelectType(2)}
                                    className={`${selectType === 2 ? 'opacity-100 border-2 border-solid border-black pl-[15px] pr-[10px] z-10'
                                        : 'opacity-50 pl-[16px] pr-[11px]'} 
                                                flex border border-solid bg-white rounded-[10px] 
                                                gap-[7px] cursor-pointer ml-[-10px] py-[5px]`}>
                                    <div className={"sm-circle bg-[#21C206] p-[5px]"}>
                                        <img src={arrowDown} alt="arrow-down-icon"/>
                                    </div>
                                    <div className="mt-auto mb-auto text-[20px]">
                                        Income
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[32px]">
                                <div className="relative">

                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="py-3 px-3 rounded border border-solid border-[#333333] outline-none w-full"
                                        required
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

                                    <label htmlFor="title" className="absolute input-label">
                                        Title <span className="text-red-500 opacity-0">*</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/*end body*/}
                        {/*footer*/}
                        <div className="flex justify-end absolute bottom-0 right-0 p-8">
                            <div onClick={onClose} className="cursor-pointer my-auto">
                                Close
                            </div>
                            <button
                                type={"submit"}
                                className="bg-[#B9E2E6] py-[10px] px-[25px] ml-[20px] rounded-xl disabled:opacity-50"
                                disabled={!isValid}>
                                Save
                            </button>
                        </div>
                        {/*endfooter*/}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTransactionModal;