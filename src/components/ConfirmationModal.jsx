import closeIcon from '../assets/close.svg';
import axiosInstance from "../utils/axios-instance.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
function ConfirmationModal({showConfirmation, toggleShowConfirmation, id, onClose}) {
    const authState = useAuthHeader();
    async function deleteAccount() {
        try {
            await axiosInstance.delete(`/account/${id}`, {
                headers: {
                    Authorization: `${authState}`
                }
            });

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className={`${showConfirmation ? 'block' : 'hidden'} z-[70]`}>
            <div className="overlay z-[70] bg-black bg-opacity-30"></div>
            <div className={`flex flex-col justify-between w-[400px] h-[150px] rounded absolute top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2 bg-white py-[8px] pl-4 pr-2 z-[80]`}>
                <div className="flex justify-between">
                    <div>
                        Delete Account
                    </div>
                    <div onClick={toggleShowConfirmation} className="cursor-pointer w-[20px]">
                        <img src={closeIcon} alt="closeIcon"/>
                    </div>
                </div>
                <div>
                    Are you sure you want to delete this account?
                </div>
                <div className="flex justify-end gap-2">
                    <button type="submit" className="bg-white outline outline-1 rounded-lg w-[70px] px-2" onClick={() => {deleteAccount(); toggleShowConfirmation(1); onClose();}}>Yes</button>
                    <button className="bg-pink-300 outline outline-1 rounded-lg w-[70px] px-2" onClick={toggleShowConfirmation}>No</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;