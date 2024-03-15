
import closeIcon from "../assets/close.svg";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";
import {useState} from "react";

function AddTransactionModal({isOpen, onClose}) {
    const [selectType, setSelectType] = useState(1);

    const handleSelectType = (type) => {
        setSelectType(type);
    }

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
                    {/*end head*/}
                    {/*body*/}
                    <div className="flex flex-col ">
                        <div className="flex mt-[32px]">
                            <div
                                onClick={() => handleSelectType(1)}
                                className={`${selectType === 1 ? 'opacity-100 border-2 border-solid border-black py-[4px] pl-[10px] pr-[15px] z-10' 
                                                : 'opacity-50 py-[5px] pl-[11px] pr-[16px]'} 
                                                flex border border-solid bg-white rounded-[10px] py-[5px] px-[11px]
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

                        <div className="mt-[32px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="goal"
                                    id="goal"
                                    className="py-3 px-3 rounded border border-solid border-[#333333] outline-none w-full"
                                    required
                                />
                                <label htmlFor="goal" className="absolute input-label">
                                    Goal <span className="text-red-500 opacity-0">*</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/*end body*/}
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