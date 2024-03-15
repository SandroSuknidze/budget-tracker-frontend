import {Outlet} from "react-router-dom";


function Navbar() {
    return (
        <div className="container pt-0 padding bg-bgPrimary h-screen relative">
            <header className="h-[45px] bg-bgPrimary">
                hello
                <Outlet />
            </header>
        </div>
    );
}

export default Navbar;

