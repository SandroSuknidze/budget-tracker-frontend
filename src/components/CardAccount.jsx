import AccountInfoModal from "./AccountInfoModal.jsx";
import {useState} from "react";

function CardAccount({
                         id,
                         title,
                         currency,
                         balance,
                         description,
                         isSelected,
                         onClick,
                         editAccount,
                         onCloseCreateAccount,
                         showConfirmation,
                         toggleShowConfirmation,
                     }) {
    const [showAccountInfo, setShowAccountInfo] = useState(false);

    function handleShowAccountInfo() {
        setShowAccountInfo(!showAccountInfo);
    }

    let currencySymbol = currency.split(")").join("").split("(")[1];

    return (
        <>
            <div onClick={onClick}
                 className={`account ${isSelected && 'selected'}  cursor-pointer mb-5 justify-between`}>
                <div className="flex flex-col justify-start ml-[23px] gap-5 text-white">
                    <div className="text-[32px]">{title}</div>
                    <div className="text-[53px]">{balance.toLocaleString()}</div>

                </div>
                <div className="flex flex-col w-1/4  gap-5 text-white">
                    <div className="flex justify-center w-[90px] h-[90px] bg-white
                        text-[#D376D7] border-4 border-solid border-white rounded-full text-6xl items-center">
                        {currencySymbol}
                    </div>
                    <div onClick={handleShowAccountInfo} className="m-auto details">Details</div>
                </div>
            </div>
            <AccountInfoModal
                id={id}
                isOpen={showAccountInfo}
                onClose={handleShowAccountInfo}
                title={title}
                currency={currency}
                description={description}
                balance={balance}
                editAccount={editAccount}
                onCloseCreateAccount={onCloseCreateAccount}

                showConfirmation={showConfirmation}
                toggleShowConfirmation={toggleShowConfirmation}
            />
        </>

    );
}

export default CardAccount;