import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import avatar from "../assets/avatar.svg";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal.jsx";

function HomePage() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const authUser = useAuthUser();

    let name = authUser.name.split('@')[0];

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    return (
        <div className="container padding">
            <header>
                <nav className="navbar">
                    <div>
                        <h1>Budgetify</h1>
                    </div>
                    <div className="nav-end">
                        <div className="avatar">
                            <img src={avatar} alt=""/>
                        </div>
                        <div className="name" onClick={toggleDropdown}>
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
            <LogoutModal isOpen={showModal} onClose={toggleModal} />
        </div>
    );
}

export default HomePage;
