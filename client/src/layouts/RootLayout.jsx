import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";


export default function RootLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.clear;
            navigate("/login");
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <SideBar onClick={handleLogout}/>
            <Outlet />
        </>
    )
}