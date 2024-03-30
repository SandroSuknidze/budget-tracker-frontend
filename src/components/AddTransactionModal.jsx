import closeIcon from "../assets/close.svg";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";
import {useContext, useEffect, useState} from "react";
import SelectCategories from "./SelectCategories.jsx";
import TransactionInput from "./TransactionInput.jsx";
import {useForm} from "react-hook-form";
import axiosInstance from "../utils/axios-instance.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {MyContext} from "../App.jsx";

function AddTransactionModal({isOpen, onClose, selectedAccountId, selectedAccountCurrency, dataFromModal}) {
    console.log(dataFromModal);
    const context = useContext(MyContext);

    const [selectType, setSelectType] = useState(1);

    const handleSelectType = (type) => {
        setSelectType(type);
    }

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [paymentDate, setPaymentDate] = useState("");

    const authState = useAuthHeader();

    const handleSelectedCategoriesSubmit = (categories) => {
        setSelectedCategories(categories);
        setValue("categories", categories);
    };

    const handlePaymentDateSubmit = (payment) => {
        setPaymentDate(payment);
        setValue("payment_date", payment);
    }

    useEffect(() => {
        if (selectedCategories.length > 0) {
            clearErrors("categories");
        }
    }, [selectedCategories]);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        clearErrors,
    } = useForm({
        mode: "all",
        defaultValues: {
            "title": "",
            "amount": null,
            "account_id": selectedAccountId,
            "categories": selectedCategories,
            "payment_date": paymentDate,
            "type": 1,
        }
    });


    useEffect(() => {
        setValue("account_id", selectedAccountId);
    }, [setValue, selectedAccountId]);

    async function onSubmit(data) {
        data.categories = data.categories.map(category => category.id);
        let pureAmount = data.amount.split(",").join('');
        data.amount = parseFloat(pureAmount);
        data.type = selectType === 1 ? "expenses" : "income"

        try {
            const res = await axiosInstance.post(`/transactions`, data, {
                headers: {
                    Authorization: `${authState}`
                },
            });
            if (res.status === 201) {
                setSelectedCategories([]);
                reset();
                onClose();
                context.toggleToaster("Transaction has been successfully added!");
            }
        } catch (err) {
            console.log(err.response.data.errors.title[0])
        }
    }

    const handleSaveButtonClick = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <div>
            <div className={`overlay ${isOpen ? "block" : "hidden"}`}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="account-info-modal p-8 h-full"
                >
                    {/*head*/}
                    <div className="flex text-3xl justify-between pt-2">
                        <div>Transaction Information</div>
                        <div className="cursor-pointer" onClick={onClose}>
                            <img src={closeIcon} alt="close-icon"/>
                        </div>
                    </div>
                    {/*end head*/}
                    {/*body*/}
                    <div className="flex flex-col ">
                        <div className="flex mt-[32px] h-[47px]">
                            <div
                                onClick={() => handleSelectType(1)}
                                className={`${selectType === 1 ? 'opacity-100 border-2 border-solid border-black py-[4px] pl-[10px] pr-[15px] z-10' 
                                                : 'opacity-50 py-[5px] pl-[11px] pr-[16px]'} 
                                                flex border border-solid bg-white rounded-[10px]
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
                                className={`${selectType === 2 ? 'opacity-100 border-2 border-solid border-black py-[4px] pl-[15px] pr-[10px] z-10' 
                                                : 'opacity-50 py-[5px] pl-[16px] pr-[11px]'} 
                                                flex border border-solid bg-white rounded-[10px] 
                                                gap-[7px] cursor-pointer ml-[-10px]`}>
                                <div className={"sm-circle bg-[#21C206] p-[5px]"}>
                                    <img src={arrowDown} alt="arrow-down-icon"/>
                                </div>
                                <div className="mt-auto mb-auto text-[20px]">
                                    Income
                                </div>
                            </div>
                        </div>

                        <div className="mt-[32px] flex flex-col gap-[27px]">
                            <TransactionInput
                                register={register("title", {
                                    maxLength: {
                                        value: 128, message: 'Maximum number of characters reached'
                                    }
                                })}
                                label={"Title"}
                                name={"title"}
                                type={"text"}
                                errorMessage={errors.title?.message}
                            />
                            <SelectCategories
                                register={register("categories", {
                                    required: "Required field is empty",
                                })}
                                selectType={selectType}
                                onSelectedCategoriesSubmit={handleSelectedCategoriesSubmit}
                                errorMessage={errors.categories?.message}
                            />
                            <TransactionInput
                                register={register("amount", {
                                    required: "Required field is empty",
                                    validate: {
                                        nonNegative: value => parseFloat(value) >= 0 || "Amount must be a non-negative number",
                                        nonZero: value => parseFloat(value) !== 0 || "Amount cannot be zero",
                                    }
                                })}
                                label={"Amount"}
                                name={"amount"}
                                type={"text"}
                                isRequired={"required"}
                                selectedAccountCurrency={selectedAccountCurrency}
                                errorMessage={errors.amount?.message}
                            />
                            <TransactionInput
                                register={register("payment_date")}
                                onSelectedPaymentDateSubmit={handlePaymentDateSubmit}
                                label={"Payment Date"}
                                name={"date"}
                                type={"date"}
                                isRequired={"required"}
                                errorMessage={errors.payment_date?.message}
                            />
                            <TransactionInput
                                register={register("payee", {
                                    maxLength: {
                                        value: 128,
                                        message: 'Maximum number of characters reached'
                                    }
                                })}
                                label={"Payee"}
                                name={"payee"}
                                type={"text"}
                                errorMessage={errors.payee?.message}
                            />
                            <TransactionInput
                                register={register("description", {
                                    maxLength: {
                                        value: 256,
                                        message: 'Maximum number of characters reached'
                                    }
                                })}
                                label={"Description"}
                                name={"description"}
                                type={"text"}
                                errorMessage={errors.description?.message}
                            />
                        </div>
                    </div>
                    {/*end body*/}
                    {/*footer*/}
                    <div className="flex justify-end absolute bottom-0 right-0 p-8">
                        <div onClick={onClose} className="px-2 w-[70px] mr-2 text-center my-auto">
                            Close
                        </div>
                        <div
                            onClick={handleSaveButtonClick}
                            className={`bg-[#B9E2E6] outline outline-0 rounded-lg w-[70px] px-2 text-center py-2 opacity-100 cursor-pointer`}
                        >
                            Save
                        </div>

                    </div>
                    {/*endfooter*/}
                </form>
            </div>
        </div>
    );
}

export default AddTransactionModal;