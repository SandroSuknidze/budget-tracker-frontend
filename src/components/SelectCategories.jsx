import Multiselect from "multiselect-react-dropdown";
import closeIcon from "../assets/close.svg";
import {useContext, useEffect, useState} from "react";
import axiosInstance from "../utils/axios-instance.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {MyContext} from "../App.jsx";
export default function SelectCategories ({selectType, register, onSelectedCategoriesSubmit, errorMessage}) {
    const authState = useAuthHeader();
    const context = useContext(MyContext);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [error, setError] = useState("");


    useEffect(() => {
        setSelectedCategories([]);
        let type = selectType === 1 ? "expenses" : "income";

        axiosInstance.get(`/categories/${type}`, {
            headers: {
                Authorization: `${authState}`
            }
        }).then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [authState, selectType]);

    function handleSelectedCategories (event) {
        setSelectedCategories(event);
    }

    useEffect(() => {
        onSelectedCategoriesSubmit(selectedCategories);
    }, [onSelectedCategoriesSubmit, selectedCategories]);

    useEffect(() => {
        setSelectedCategories([]);
        onSelectedCategoriesSubmit(selectedCategories);
    }, [context.toggleToaster]);

    async function handleSubmit(value) {
        let type = selectType === 1 ? "expenses" : "income";


        let data = {
            "title": value,
            "type": type,
        }

        try {
            const res = await axiosInstance.post(`/categories`, data, {
                headers: {
                    Authorization: `${authState}`
                },
            });
            if (res.status === 201) {
                setError("");
                setSelectedCategories([...selectedCategories, {id: res.data.id, title: data.title}]);
            }
        } catch (err) {
            setError(err.response?.data?.errors?.title?.[0]);
        }
    }
    
    return (
        <div>
            <div className="relative">
                <Multiselect

                    options={categories} // Options to display in the dropdown
                    onSelect={(event) => handleSelectedCategories(event)}
                    onRemove={(event) => handleSelectedCategories(event)}
                    // onChange={() => console.log("onchange test")} // Function will trigger on change event
                    onKeyPressFn={(event) => {
                        if (event.key === 'Enter') {
                            handleSubmit(event.target.value);
                        }
                    }}
                    hidePlaceholder={true}
                    placeholder=""
                    avoidHighlightFirstOption={true}
                    showArrow={true}
                    // loading={true}
                    customCloseIcon={
                        <img src={closeIcon} alt="close" className="cursor-pointer w-[18px]" />
                    }
                    // selectedValues={categories}
                    selectedValues={selectedCategories}
                    displayValue="title"
                    style={{
                        chips: {
                            color: "black",
                            background: "transparent",
                            border: "1px solid black",
                            borderRadius: "10px",
                            gap: "10px",
                            lineHeight: "22px",
                        },
                        searchBox: {
                            padding: "13px 15px 8px 15px",
                            borderColor: "#989898",
                            maxHeight: "57px",
                            overflow: "scroll",
                            scrollbarWidth: "none",
                        },
                        inputField: {
                            height: "29px",
                            marginTop: 0,
                        },

                    }}
                    {...register}


                />
                <label htmlFor='goal' className="absolute categories-label">
                    Categories <span className="text-red-500">*</span>
                </label>
                {error && <p className="login-error">{error}</p>}
                {errorMessage && !error && <p className="login-error">{errorMessage}</p>}
            </div>
        </div>
    );
}
