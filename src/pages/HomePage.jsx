import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import plusIcon from "../assets/raw-plus-icon.svg";
import piggyIcon from "../assets/piggy-bank-icon.png";
import incomeIcon from "../assets/arrow-down.svg"
import expensesIcon from "../assets/arrow-up.svg"
import sortUpIcon from "../assets/sort-up-icon.png";
import sortDownIcon from "../assets/sort-down-icon.png";
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
import TransactionInformationModal from "../components/TransactionInformationModal.jsx";

function HomePage() {
    const context = useContext(MyContext);

    const [accounts, setAccounts] = useState([])
    const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

    const [addTransactionModal, setAddTransactionModal] = useState(false);
    const authState = useAuthHeader();

    const [transactions, setTransactions] = useState([]);
    const [filterOption, setFilterOption] = useState(null);


    const [sortImage, setSortImage] = useState(1);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [selectedAccountCurrency, setSelectedAccountCurrency] = useState("");

    const [selectedTransactionId, setSelectedTransactionId] = useState(null);

    const [transactionEdit, setTransactionEdit] = useState(null);



    useEffect(() => {
        function fetchAccounts() {
            axiosInstance.get("/accounts", {
                headers: {
                    Authorization: `${authState}`
                }
            })
                .then(res => {
                    setAccounts(res.data);
                    if (res.data.length > 0) {
                        const firstAccountId = res.data[0].id;
                        setSelectedAccountId(firstAccountId);
                        setSelectedAccountCurrency(res.data[0].currency);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        fetchAccounts();
    }, [authState, context.showToaster]);


    const fetchTransactions = (accountId) => {
        axiosInstance.get("/transactions", {
            params: {
                accountId: accountId,
            },
            headers: {
                Authorization: `${authState}`
            }
        })
            .then(res => {
                setTransactions(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (selectedAccountId !== null) {
            fetchTransactions(selectedAccountId);
        } else if (accounts.length > 0) {
            const firstAccountId = accounts[0].id;
            setSelectedAccountId(firstAccountId);
        }
    }, [selectedAccountId, accounts, authState, context.showToaster]);

    const filteredTransactions = transactions.filter(transaction => {
        if (!filterOption) return true;
        return transaction.type === filterOption;
    });

    const handleFilterOption = option => {
        setFilterOption(prevOption => prevOption === option ? null : option);
    };

    const handleSort = () => {
        const sortedTransactions = [...transactions].sort((a, b) => {
            if (sortImage === 1) {
                return new Date(a.payment_date) - new Date(b.payment_date);
            } else {
                return new Date(b.payment_date) - new Date(a.payment_date);
            }
        });
        setTransactions(sortedTransactions);
        setSortImage(prevSort => prevSort === 1 ? 2 : 1);
    };



    const handleSelectAccount = (index, accountId, accountCurrency) => {
        setSelectedAccountIndex(index);
        setSelectedAccountId(accountId);
        setSelectedAccountCurrency(accountCurrency);
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

    const transactionRef = useRef(null);
    const [maxTransactionHeight, setMaxTransactionHeight] = useState('auto');

    useEffect(() => {
        function updateMaxTransactionHeight() {
            const windowHeight = window.innerHeight - 235;
            setMaxTransactionHeight(windowHeight + 'px');
        }

        window.addEventListener('resize', updateMaxTransactionHeight);
        updateMaxTransactionHeight();

        return () => window.removeEventListener('resize', updateMaxTransactionHeight);
    }, []);

    const handleSelectTransaction = (transactionId) => {
        setSelectedTransactionId(transactionId);
    };

    const handleTransactionEdit = (transactionId) => {
        setTransactionEdit(transactionId);
        toggleAddTransactionModal();
    }

    return (
        <div>
            <CreateAccountModal isOpen={context.showAccountModal} onClose={context.toggleAccountModal}
                                activateToaster={context.toggleToaster} editAccount={context.editAccount}/>
            <div className="flex justify-between items-center mt-[90px]">
                {accounts.length === 0 ? (
                    <div className="w-[35%] mb-auto" onClick={context.toggleAccountModal}>
                        <CreateAccount/>
                    </div>
                ) : (
                    <div ref={contentRef} className="w-[35%] mb-auto relative flex flex-col overflow-y-scroll"
                         style={{maxHeight: maxHeight, scrollbarWidth: 'none'}}>
                        {accounts.map((account, index) => (
                            <CardAccount
                                key={index}
                                id={account.id}
                                title={account.title}
                                currency={account.currency}
                                balance={account.balance}
                                description={account.description}
                                onClick={() => handleSelectAccount(index, account.id, account.currency)} // Pass the account ID
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
                    <SearchInput/>
                    <div onClick={handleSort} className={'flex gap-[9px] ml-[20px] mt-[7px] mb-[10px] cursor-pointer w-fit'}>
                        <img src={sortImage === 1 ? sortDownIcon : sortUpIcon} alt={'sort-icon'} className={'w-[24px]'}/>
                        <div>Transaction Date</div>
                    </div>
                    <div ref={transactionRef}
                         className={'flex flex-col gap-[28px] overflow-y-scroll'}
                         style={{maxHeight: maxTransactionHeight, scrollbarWidth: 'none'}}
                    >
                        {filteredTransactions.map((transactions) => (
                            <div key={transactions.id} className={"flex w-full bg-white rounded-xl px-[18px] py-[12px] cursor-pointer"}
                                 onClick={() => handleSelectTransaction(transactions.id)}
                            >
                                <div
                                    className="w-1/4 h-full p-auto text-center bg-[#ECEDED] rounded-xl text-[20px] font-bold
                                        flex justify-center py-[18px] px-[52px]"
                                >
                                    {transactions.categories[0].title}
                                </div>
                                <div className={"flex flex-col w-3/4 pl-[21px]"}>
                                    <div className={"flex justify-between w-full"}>
                                        <div className={"text-[20px]"}>{transactions.title ? transactions.title : transactions.categories[0].title}</div>
                                        <div
                                            className={`${transactions.type === 'expenses' ? 'text-[#EE3F19]' : 'text-[#21C206]'} text-[22px]`}>
                                            {transactions.type === 'expenses' ? '-' : ''}
                                            {transactions.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                            {transactions.account.currency.split(")").join("").split("(")[1]}
                                        </div>
                                    </div>
                                    <div className={"flex text-[15px] transaction-short-list"}>
                                        <div className={'flex'}>
                                            {transactions.type === 'expenses' ? (
                                                <div className={"sm-circle bg-[#EE3F19] p-[5px] size-[30px]"}>
                                                    <img src={expensesIcon} alt={'expenses-icon'}/>
                                                </div>
                                            ) : (
                                                <div className={"sm-circle bg-[#21C206] p-[5px] size-[30px]"}>
                                                    <img src={incomeIcon} alt={'income-icon'}/>
                                                </div>
                                            )
                                            }
                                            <div className={'my-auto ml-[5px]'}>
                                                {transactions.type}
                                            </div>
                                        </div>
                                        <div className={'my-auto'}>
                                            {new Date(transactions.payment_date).toLocaleDateString('de-DE', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <div className={'my-auto'}>{transactions.payee}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredTransactions.length === 0 &&
                            <div className={'text-center text-xl'}>You don’t have any transactions. Please create one.</div>
                        }
                    </div>
                </div>
                <AddTransactionModal isOpen={addTransactionModal} onClose={toggleAddTransactionModal}
                                     selectedAccountId={selectedAccountId}
                                     selectedAccountCurrency={selectedAccountCurrency}
                                     dataFromModal={transactionEdit}
                />
                <div ref={contentRef} className="w-[22%] mb-auto text-right pl-[82px] flex flex-col justify-between"
                     style={{height: maxHeight}}>
                    <div className="flex flex-col gap-[15px]">
                        <Income onClick={() => handleFilterOption('income')} isActive={filterOption === 'income'}
                                src={arrowDown} alt={"arrow-down-icon"}/>
                        <Expenses onClick={() => handleFilterOption('expenses')} isActive={filterOption === 'expenses'}
                                  src={arrowUp} alt={"arrow-up-icon"}/>
                        <div onClick={toggleAddTransactionModal}
                             className="flex border border-solid bg-[#B9E2E6] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
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
            {selectedTransactionId !== null && (
                <TransactionInformationModal
                    isOpen={true} onClose={() => setSelectedTransactionId(null)}
                    selectedAccountId={selectedTransactionId}
                    handleTransactionEdit={handleTransactionEdit}
                />
            )}
        </div>
    );
}

export default HomePage;
