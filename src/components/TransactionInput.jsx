import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import calendarIcon from "../assets/calendarIcon.svg";


function TransactionInput({
                              label,
                              name,
                              type,
                              isRequired,
                              register,
                              errorMessage,
                              onSelectedPaymentDateSubmit,
                              selectedAccountCurrency,
                              categoriesFromEdit,
                              dateFromEdit
                          }) {
    const handleChange = (e) => {
        let inputValue = e.target.value;
        if (/[^0-9.,]/.test(inputValue)) {
            inputValue = inputValue.slice(0, -1);
            e.target.value = inputValue;
            return;
        }

        const cursorPosition = e.target.selectionStart;

        const dotIndex = inputValue.indexOf('.');

        if (inputValue.includes('.') && dotIndex !== 0) {
            const parts = inputValue.split('.');
            let integerPart = parts[0];
            let decimalPart = parts[1] || '';
            integerPart = integerPart.split(',').join('');
            integerPart = integerPart ? new Intl.NumberFormat('en-US').format(BigInt(integerPart)) : '';
            decimalPart = decimalPart.slice(0, 2);
            inputValue = `${integerPart}.${decimalPart}`;
            e.target.value = inputValue;
        } else {
            inputValue = inputValue.replace(/[^\d.]/g, '');
            e.target.value = new Intl.NumberFormat('en-US').format(inputValue);
        }

        const newCursorPosition = cursorPosition + (e.target.value.length - inputValue.length);
        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
    };


    const [startDate, setStartDate] = useState(new Date());
    const [defaultDate, setDefaultDate] = useState(new Date());

    useEffect(() => {
        setStartDate(dateFromEdit)
    }, [dateFromEdit]);

    // console.log("start", startDate);
    // console.log("default", defaultDate);

    const [paymentDate, setPaymentDate] = useState(new Date());

    function handleSelectedPaymentDate (event) {
        setPaymentDate(event);
    }

    useEffect(() => {
        if (typeof onSelectedPaymentDateSubmit === 'function') {
            onSelectedPaymentDateSubmit(paymentDate);
        }
    }, [onSelectedPaymentDateSubmit, paymentDate]);

// console.log("date", dateFromEdit);


    return (
        <div className="relative">
            {type === "date" ? (
                <>
                    <DatePicker
                    toggleCalendarOnIconClick
                    maxDate={new Date()}
                    selected={startDate || defaultDate}
                    {...register}
                    onChange={(date) => {
                        if (date) {
                            setStartDate(date);
                            handleSelectedPaymentDate(date);
                        } else {
                            setStartDate(defaultDate);
                            handleSelectedPaymentDate(defaultDate);
                        }
                    }}

                    dateFormat="dd.MM.yyyy"
                    className="py-3 px-3 rounded border border-solid border-[#989898] outline-none w-full date-picker-container"
                />

                    <img
                        src={calendarIcon}
                        alt="calendar icon"
                        className="calendar-icon"
                        onClick={() => document.querySelector('.react-datepicker-wrapper input').click()}
                    />
                </>
            ) : (
                <>
                    <input
                        type={type}
                        name={name}
                        id={name}
                        className={`${name === "amount" ? "pl-[29px] pr-3" : 'px-3'}
                         py-3 rounded border border-solid border-[#989898] outline-none w-full`}
                        required={isRequired}
                        max={type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                        step={name === "amount" ? "0.01" : undefined}
                        onKeyDown={name === "amount" ? handleChange : undefined}
                        onKeyUp={name === "amount" ? handleChange : undefined}
                        {...register}
                    />
                    {selectedAccountCurrency && (
                        <label className="absolute left-[13px] top--1/2 translate-y-1/2 leading-[25px]">
                            {selectedAccountCurrency.split('(').join('').split(')').join('').split(' ')[1]}
                        </label>
                    )}
                </>

            )}
            <label htmlFor={name} className="absolute categories-label">
                {label}
                {isRequired && <span className="text-red-500">*</span>}
            </label>
            {errorMessage && <p className="login-error">{errorMessage}</p>}
        </div>
    );
}

export default TransactionInput;
