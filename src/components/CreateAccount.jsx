import plusIcon from '../assets/plus-icon.svg'
function CreateAccount() {
    return (
        <div className="account cursor-pointer">
            <div className="add-account m-auto gap-5 text-white">
                <img className="circle" src={plusIcon} alt="plus-icon"/>
                <div className="m-auto">Add Account</div>
            </div>
        </div>
    );
}

export default CreateAccount;