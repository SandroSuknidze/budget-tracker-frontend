function Toaster({text, isOpen, onClose}) {
    return (
        (isOpen &&
        <div className="w-full absolute flex rounded-[10px] p-3 text-white justify-between bg-[#1AA103]">
            {text}
            <div className="text-white" onClick={onClose}>
                Close
            </div>
        </div>
        )
    );
}

export default Toaster;