import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import avatar from "../assets/avatar.svg";
import search from "../assets/search.svg";
import {useState} from "react";
import LogoutModal from "../components/LogoutModal.jsx";
import CreateAccount from "../components/CreateAccount.jsx";
import CreateAccountModal from "../components/CreateAccountModal.jsx";
import Toaster from "../components/Toaster.jsx";

function HomePage() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const authUser = useAuthUser();

    let name = authUser.name.split('@')[0];

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    function toggleAccountModal() {
        setShowAccountModal(!showAccountModal);
    }

    function toggleToaster() {

        setShowToaster(!showToaster);
        setTimeout(() => {
            setShowToaster(false)
        }, 5000);
    }

    return (
        <div className="container padding bg-bgPrimary h-screen">
            <header>
                <nav className="navbar">
                    <div className="w-[35%]">
                        <h1 className="nav-text">Budgetify</h1>
                    </div>
                    <ul className="nav-mid w-[43%] text-[20px] relative">
                        <Toaster text={"The Account created"} isOpen={showToaster} onClose={toggleToaster}/>
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
            <CreateAccountModal isOpen={showAccountModal} onClose={toggleAccountModal} activateToaster={toggleToaster}/>
            <div className="flex justify-between items-center mt-[45px]">
                <div className="w-[35%]" onClick={toggleAccountModal}>
                    <CreateAccount />
                </div>
                <div className="w-[43%] mb-auto relative">
                    <input type="text" placeholder="Search" className="pt-[15px] px-[48px] pb-[16px] rounded-[10px] w-full"/>
                    <img src={search} alt="search-icon" className="w-[22px] h-[22px] absolute top-[15px] left-[20px]"/>
                </div>
                <div className="w-[22%] mb-auto text-right">
                    Income
                </div>
            </div>
        </div>
    );
}

export default HomePage;
