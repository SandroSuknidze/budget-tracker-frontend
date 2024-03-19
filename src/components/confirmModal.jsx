function ConfirmModal({isOpen, title, message, onConfirm, onClose}) {
    if (!isOpen) return null;

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? '' : 'hidden'}`}
        >
            <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? '' : 'hidden'}`}/>

            <div className="flex items-center justify-center min-h-screen relative z-20">
                <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl">
                    <div className="bg-white px-4 pt-5 pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500" id="modal-description">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
