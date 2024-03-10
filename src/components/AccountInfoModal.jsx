import pencilIcon from '../assets/pencil.svg'
import trashIcon from '../assets/trash.svg'
import closeIcon from '../assets/close.svg'
import ConfirmationModal from "./ConfirmationModal.jsx";


function AccountInfoModal({id, title, currency, balance, description, isOpen, onClose, editAccount, onCloseCreateAccount,
                              showConfirmation ,toggleShowConfirmation }) {

    return (
        <div>
            <ConfirmationModal showConfirmation={showConfirmation} toggleShowConfirmation={toggleShowConfirmation} id={id} onClose={onClose}/>
            <div className={`overlay ${isOpen ? "block" : "hidden"}`}>
                <div className="account-info-modal p-8 h-full">
                    {/*head*/}
                    <div className="flex text-3xl justify-between pt-2">
                        <div className=" ">Account Information</div>
                        <div className="flex gap-2">
                            <div className="cursor-pointer" onClick={() => {
                                onClose();
                                onCloseCreateAccount();
                                editAccount(id);
                            }}>
                                <img src={pencilIcon} alt="close-icon"/>
                            </div>
                            <div className="cursor-pointer" onClick={toggleShowConfirmation}>
                                <img src={trashIcon} alt="close-icon"/>
                            </div>
                            <div className="cursor-pointer" onClick={onClose}>
                                <img src={closeIcon} alt="close-icon"/>
                            </div>
                        </div>
                    </div>
                    {/*endhead*/}
                    {/*body*/}
                    <div className="flex flex-col ">
                    <div className="flex border-b-[1px] border-solid border-[#333333] py-4">
                            <div className="w-1/3 font-bold">Title:</div>
                            <div className="w-2/3">{title}</div>
                        </div>
                        <div className="flex border-b-[1px] border-solid border-[#333333] py-4">
                            <div className="w-1/3 font-bold">Balance:</div>
                            <div className="w-2/3">{balance}</div>
                        </div>
                        <div className="flex border-b-[1px] border-solid border-[#333333] py-4">
                            <div className="w-1/3 font-bold">Currency:</div>
                            <div className="w-2/3">{currency}</div>
                        </div>
                        <div className="flex border-solid border-[#333333] py-4">
                            <div className="w-1/3 font-bold">Description:</div>
                            <div className="w-2/3">{description}</div>
                        </div>
                    </div>
                    {/*endbody*/}
                    {/*footer*/}
                    <div className="flex justify-end absolute bottom-0 right-0 p-8">
                        <div onClick={onClose} className="cursor-pointer">
                            Close
                        </div>
                    </div>
                    {/*endfooter*/}
                </div>
            </div>
        </div>
    );
}

export default AccountInfoModal;