import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import avatar from "../assets/avatar.svg";
import search from "../assets/search.svg";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import plusIcon from "../assets/raw-plus-icon.svg";
import piggyIcon from "../assets/piggy-bank-icon.png";
import {useEffect, useRef, useState} from "react";
import LogoutModal from "../components/LogoutModal.jsx";
import CreateAccount from "../components/CreateAccount.jsx";
import CreateAccountModal from "../components/CreateAccountModal.jsx";
import Toaster from "../components/Toaster.jsx";
import axiosInstance from "../utils/axios-instance.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import CardAccount from "../components/CardAccount.jsx";

function HomePage() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [toasterText, setToasterText] = useState("");
    const [accounts, setAccounts] = useState([])
    const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
    const [editAccount, setEditAccount] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const authUser = useAuthUser();
    const authState = useAuthHeader();

    let name = authUser.name.split('@')[0];

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
    }, [authState, editAccount, showToaster]);

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    function toggleAccountModal() {
        setEditAccount(0);
        setShowAccountModal(!showAccountModal);
    }

    function toggleToaster(text) {

        setShowToaster(!showToaster);
        setToasterText(text);
        setTimeout(() => {
            setShowToaster(false)
            setToasterText("");
        }, 5000);
    }

    const handleSelectAccount = (index) => {
        setSelectedAccountIndex(index);
    };

    const handleEditAccount = (id) => {
        setEditAccount(id);
    }

    function toggleShowConfirmation(num) {
        setShowConfirmation(!showConfirmation);
        if (num === 1) {
            setEditAccount(0);
            setShowToaster(!showToaster);
            setToasterText("Account is successfully deleted!");
            setTimeout(() => {
                setShowToaster(false)
                setToasterText("");
            }, 5000);
        }
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
        <div className="container pt-0 padding bg-bgPrimary h-screen relative">
            <header className="h-[45px] bg-bgPrimary">
                <nav className="navbar pt-[50px] pb-[45px]">
                    <div className="w-[35%]">
                        <h1 className="nav-text">Budgetify</h1>
                    </div>
                    <ul className="nav-mid w-[43%] text-[20px] relative">
                        <Toaster text={toasterText} isOpen={showToaster} onClose={toggleToaster}/>
                        <li>
                            <a>Categories</a>
                        </li>
                        <li>
                            <a>Subscriptions</a>
                        </li>
                        <li>
                            <a>Obligatory</a>
                        </li>
                        <li>
                            <a>Statistic</a>
                        </li>
                        <li>
                            <a>Admin</a>
                        </li>
                    </ul>
                    <div className="nav-end w-[22%]">
                        <div className="avatar flex">
                            <img src={avatar} alt=""/>
                        </div>
                        <div className="name text-[20px]" onClick={toggleDropdown}>
                            {name}
                        </div>
                        {showDropdown &&
                            <div className="dropdown">
                                <ul>
                                    <li>
                                        <a onClick={toggleModal}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
            </header>
            <LogoutModal isOpen={showModal} onClose={toggleModal}/>
            <CreateAccountModal isOpen={showAccountModal} onClose={toggleAccountModal} activateToaster={toggleToaster} editAccount={editAccount}/>
            <div className="flex justify-between items-center mt-[90px]">
                    {accounts.length === 0 ? (
                            <div className="w-[35%]" onClick={toggleAccountModal}>
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
                                    editAccount={handleEditAccount}
                                    onCloseCreateAccount={toggleAccountModal}

                                    showConfirmation={showConfirmation}
                                    toggleShowConfirmation={toggleShowConfirmation}
                                />
                            ))}
                        </div>
                    )}

                <div className="w-[43%] mb-auto relative">
                    <input type="text" placeholder="Search" className="pt-[15px] px-[48px] pb-[16px] rounded-[10px] w-full"/>
                    <img src={search} alt="search-icon" className="w-[22px] h-[22px] absolute top-[15px] left-[20px]"/>
                </div>
                <div ref={contentRef} className="w-[22%] mb-auto text-right pl-[82px] flex flex-col justify-between" style={{ height: maxHeight }}>
                    <div className="flex flex-col gap-[15px]">
                        <div className="flex border border-solid bg-white rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-[#21C206] p-[5px]"}>
                                <img src={arrowDown} alt="arrow-down-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Income
                            </div>
                        </div>
                        <div className="flex border border-solid bg-white rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-[#EE3F19] p-[5px]"}>
                                <img src={arrowUp} alt="arrow-up-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Expenses
                            </div>
                        </div>
                        <div className="flex border border-solid bg-[#B9E2E6] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                            <div className={"sm-circle bg-white p-[5px]"}>
                                <img src={plusIcon} alt="plus-icon"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                Add Transaction
                            </div>
                        </div>
                        <div onClick={toggleAccountModal}
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
