import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useNavigate} from "react-router-dom";

function LogoutModal({ isOpen, onClose }) {
    const signOut = useSignOut();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        onClose();
        navigate('/login');
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Are you sure you want to log out?</h2>
                <div className="modal-buttons">
                    <button onClick={handleLogout}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;
