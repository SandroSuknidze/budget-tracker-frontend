import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import plusIcon from "../assets/raw-plus-icon.svg";
import piggyIcon from "../assets/piggy-bank-icon.png";
import {useContext, useEffect, useRef, useState} from "react";
import CreateAccount from "../components/CreateAccount.jsx";
import CreateAccountModal from "../components/CreateAccountModal.jsx";
import axiosInstance from "../utils/axios-instance.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import CardAccount from "../components/CardAccount.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";
import {MyContext} from "../App.jsx";
import Income from "../components/Income.jsx";
import Expenses from "../components/Expenses.jsx";
import SearchInput from "../components/SearchInput.jsx";

function HomePage() {
    const context = useContext(MyContext);

    const [accounts, setAccounts] = useState([])
    const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

    const [addTransactionModal, setAddTransactionModal] = useState(false);
    const authState = useAuthHeader();

    useEffect(() => {
        function fetchAccounts() {
            axiosInstance.get("/accounts", {
                headers: {
                    Authorization: `${authState}`
                }
            })
             .then(res => {
                    setAccounts(res.data);
                    console.log(res.data);
                })
             .catch(err => {
                    console.log(err);
                });
        }
        fetchAccounts();
    }, [authState, context.showToaster]);


    const handleSelectAccount = (index) => {
        setSelectedAccountIndex(index);
    };



    function toggleAddTransactionModal() {
        setAddTransactionModal(!addTransactionModal);
    }


    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('auto');

    useEffect(() => {
        function updateMaxHeight() {
            const windowHeight = window.innerHeight - 135;
            setMaxHeight(windowHeight + 'px');
        }

        window.addEventListener('resize', updateMaxHeight);
        updateMaxHeight();

        return () => window.removeEventListener('resize', updateMaxHeight);
    }, []);

    return (
        <div>
            <CreateAccountModal isOpen={context.showAccountModal} onClose={context.toggleAccountModal} activateToaster={context.toggleToaster} editAccount={context.editAccount}/>
            <div className="flex justify-between items-center mt-[90px]">
                    {accounts.length === 0 ? (
                            <div className="w-[35%] mb-auto" onClick={context.toggleAccountModal}>
                                <CreateAccount />
                            </div>
                    ) : (
                        <div ref={contentRef} className="w-[35%] mb-auto relative flex flex-col overflow-y-scroll"
                             style={{ maxHeight: maxHeight, scrollbarWidth: 'none' }}>
                            {accounts.map((account, index) => (
                                <CardAccount
                                    key={index}
                                    id={account.id}
                                    title={account.title}
                                    currency={account.currency}
                                    balance={account.balance}
                                    description={account.description}
                                    onClick={() => handleSelectAccount(index)}
                                    isSelected={index === selectedAccountIndex}
                                    handleEditAccount={context.handleEditAccount}
                                    onCloseCreateAccount={context.toggleAccountModal}

                                    showConfirmation={context.showConfirmation}
                                    toggleShowConfirmation={context.toggleShowConfirmation}
                                />
                            ))}
                        </div>
                    )}

                <div className="w-[43%] mb-auto relative">
                    <SearchInput />
                </div>
                <AddTransactionModal isOpen={addTransactionModal} onClose={toggleAddTransactionModal}/>
                <div ref={contentRef} className="w-[22%] mb-auto text-right pl-[82px] flex flex-col justify-between" style={{ height: maxHeight }}>
                    <div className="flex flex-col gap-[15px]">
                        <Income src={arrowDown} alt={"arrow-down-icon"}/>
                        <Expenses src={arrowUp} alt={"arrow-up-icon"}/>
                        <div onClick={toggleAddTransactionModal} className="flex border border-solid bg-[#B9E2E6] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-white p-[5px]"}>
                                <img src={plusIcon} alt="plus-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Add Transaction
                            </div>
                        </div>
                        <div onClick={context.toggleAccountModal}
                             className="flex border border-solid bg-[#B9E2E6] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-white p-[5px]"}>
                                <img src={plusIcon} alt="plus-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Add Account
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[15px] pb-[21px]">
                        <div
                            className="flex border border-solid bg-[#B9E2E6] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-white p-[5px]"}>
                                <img src={piggyIcon} alt="piggy-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Add Piggy Bank
                            </div>
                        </div>
                        <div
                            className="flex border border-solid bg-[#FECEE2] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-white p-[5px]"}>
                                <img src={piggyIcon} alt="piggy-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Apartment
                            </div>
                        </div>
                        <div
                            className="flex border border-solid bg-[#FECEE2] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-white p-[5px]"}>
                                <img src={piggyIcon} alt="piggy-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Car
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
