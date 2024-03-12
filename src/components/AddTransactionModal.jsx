
import closeIcon from "../assets/close.svg";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";

function AddTransactionModal({isOpen, onClose}) {
    return (
        <div>
            <div className={`overlay ${isOpen ? "block" : "hidden"}`}>
                <div className="account-info-modal p-8 h-full">
                    {/*head*/}
                    <div className="flex text-3xl justify-between pt-2">
                        <div>Add Transaction</div>
                        <div className="cursor-pointer" onClick={onClose}>
                            <img src={closeIcon} alt="close-icon"/>
                        </div>
                    </div>
                    {/*endhead*/}
                    {/*body*/}
                    <div className="flex flex-col ">
                        <div className="flex">
                            <div
                                className="flex border border-solid bg-white rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                                <div className={"sm-circle bg-[#EE3F19] p-[5px]"}>
                                    <img src={arrowUp} alt="arrow-up-icon"/>
                                </div>
                                <div className="mt-auto mb-auto">
                                    Expenses
                                </div>
                            </div>
                            <div>
                                <div
                                    className="flex border border-solid bg-white rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
                                    <div className={"sm-circle bg-[#21C206] p-[5px]"}>
                                        <img src={arrowDown} alt="arrow-down-icon"/>
                                    </div>
                                    <div className="mt-auto mb-auto">
                                        Income
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*endbody*/}
                    {/*footer*/}
                    <div className="flex justify-end absolute bottom-0 right-0 p-8">
                        <div onClick={onClose} className="cursor-pointer">
                            Close
                        </div>
                        <div onClick={onClose} className="cursor-pointer">
                            Save
                        </div>
                    </div>
                    {/*endfooter*/}
                </div>
            </div>
        </div>
    );
}

export default AddTransactionModal;