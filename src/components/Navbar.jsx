import {Link, Outlet} from "react-router-dom";
import Toaster from "./Toaster.jsx";
import avatar from "../assets/avatar.svg";
import LogoutModal from "./LogoutModal.jsx";
import {useContext, useState} from "react";
import {MyContext} from "../App.jsx";


function Navbar() {
    const context = useContext(MyContext);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);



    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    return (
        <div className="container pt-0 padding bg-bgPrimary h-screen relative">
            <header className="h-[45px] bg-bgPrimary">
                <nav className="navbar pt-[50px] pb-[45px]">
                    <div className="w-[35%]">
                        <Link to={"/"}>
                            <h1 className="nav-text">Budgetify</h1>
                        </Link>
                    </div>
                    <ul className="nav-mid w-[43%] text-[20px] relative">
                        <Toaster text={context.toasterText} isOpen={context.showToaster} onClose={context.toggleToaster}/>
                        <li>
                            <Link to={"/categories"}>Categories</Link>
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
                            {context.name}
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
            <Outlet />
        </div>
    );
}

export default Navbar;

