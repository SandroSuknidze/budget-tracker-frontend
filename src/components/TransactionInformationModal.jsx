import closeIcon from "../assets/close.svg";
import pencil from "../assets/pencil.svg";
import trash from "../assets/trash.svg";
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../App.jsx";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axiosInstance from "../utils/axios-instance.js";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";
import ConfirmModal from "./confirmModal.jsx";

function TransactionInformationModal({isOpen, onClose, selectedAccountId}) {
    const context = useContext(MyContext);
    const authState = useAuthHeader();

    const [transactionInformation, setTransactionInformation] = useState({});

    const [showConfirmation, setShowConfirmation] = useState(false);


    useEffect(() => {
        axiosInstance.get(`/transactions/${selectedAccountId}`, {
            headers: {
                Authorization: `${authState}`
            }
        })
            .then((res) => {
                setTransactionInformation(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                 console.log(err);
             });
    }, [authState, selectedAccountId]);

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        axiosInstance.delete(`/transactions/${selectedAccountId}`, {
            headers: {
                Authorization: `${authState}`
            }
        })
            .then(() => {
                context.toggleToaster("Transaction deleted successfully");
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={`overlay ${isOpen ? "block" : "hidden"}`}>
            <div className="account-info-modal p-8 h-full">
                <div className="flex text-3xl justify-between pt-2">
                    <div>Transaction Information</div>
                    <div className='flex justify-between gap-[11px]'>
                        <div className="cursor-pointer" onClick={onClose}>
                            <img src={pencil} alt="pencil-icon"/>
                        </div>
                        <div className="cursor-pointer" onClick={handleDelete}>
                            <img src={trash} alt="trash-icon"/>
                        </div>
                        <div className="cursor-pointer" onClick={onClose}>
                            <img src={closeIcon} alt="close-icon"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-[27px]">
                    <div className='flex bg-white rounded-[10px] py-[5px] gap-[7px]'>
                        <div className={`sm-circle ${transactionInformation.type === "expenses" ? 'bg-[#EE3F19]' : 'bg-[#21C206]'} p-[5px]`}>
                            <img src={transactionInformation.type === "expenses" ? arrowUp : arrowDown} alt={"icon"}/>
                        </div>
                        <div className="mt-auto mb-auto text-[20px]">
                            {transactionInformation.type === "expenses" ? "Expenses" : "Income"}
                        </div>
                    </div>
                    <div className={`text-[36px] ${transactionInformation.type === "expenses" ? 'text-[#EE3F19]' : 'text-[#21C206]'} leading-[46px]`}>
                        {transactionInformation.type === "expenses" ? "-" : ""}
                        {transactionInformation.amount?.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        {transactionInformation.account?.currency.split('(').join('').split(')').join('').split(' ')[1]}
                    </div>
                </div>

                {transactionInformation?.title && (
                    <div className="text-[24px] mt-[21px]">
                        {transactionInformation?.title}
                    </div>
                )}
                <div className="flex mt-[25px] gap-[32px] overflow-x-scroll"
                     style={{scrollbarWidth: 'none'}}
                >
                    {transactionInformation.categories && transactionInformation.categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center text-[20px] py-[18px] px-[51px] border-[1px] border-black
                                rounded-xl leading-[26px] font-bold"
                        >
                            {category?.title}
                        </div>
                    ))}
                </div>
                <div className="flex mt-[10px] text-[20px] py-[16px] border-b-[#333333] border-b-[1px]">
                    <div className="font-bold w-1/3">Payment Date:</div>
                    <div className="w-2/3">
                        {new Date(transactionInformation?.payment_date).toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </div>
                </div>
                {transactionInformation?.payee && (
                    <div className="flex text-[20px] py-[16px] border-b-[#333333] border-b-[1px]">
                        <div className="font-bold w-1/3">Payee:</div>
                        <div className="w-2/3">{transactionInformation?.payee}</div>
                    </div>
                )}
                {transactionInformation?.description && (
                    <div className="flex text-[20px] py-[16px]">
                        <div className="font-bold w-1/3">Description:</div>
                        <div className="w-2/3">{transactionInformation?.description}</div>
                    </div>
                )}
                <div onClick={onClose}
                     className="text-[20px] flex justify-end absolute bottom-0 right-0 p-8 cursor-pointer">
                    Close
                </div>
            </div>
            <ConfirmModal
                isOpen={showConfirmation}
                title="Confirmation"
                message="Are you sure you want to delete this transaction?"
                onConfirm={confirmDelete}
                onClose={() => setShowConfirmation(false)}
            />
        </div>
    );
}

export default TransactionInformationModal;