import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {

    const handleLogout = () => {
        localStorage.removeItem("access_token");
    };

    return (
        <>
            <div className="w-1/5 bg-white h-100 shadow-md">
                <div className="fixed h-screen">
                    <div className="flex items-center justify-center py-4">
                        <img
                            alt="Blog Nih"
                            className="h-10"
                            height={50}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gfel-AapoSZTh5Lnp4WWv4lypUWN7wbqZg&s"
                            width={100}
                        />
                        <span className="ml-2 text-xl font-bold">DonaturDonat</span>
                    </div>
                    <nav className="mt-10 w-1">
                        <Link
                            className="flex items-center py-2 px-8 bg-gray-200 text-gray-700"
                            to="/admin"
                        >
                            <i className="fas fa-box-open"></i>
                            <span className="mx-4 font-medium">Post</span>
                        </Link>
                        <Link
                            className="flex items-center py-2 px-8 text-gray-700 hover:bg-gray-200"
                            to="/categories">
                            <i className="fas fa-th-large"></i>
                            <span className="mx-4 font-medium">Categories</span>
                        </Link>
                        <Link
                            className="flex items-center py-2 px-8 text-gray-700 hover:bg-gray-200"
                            to="/add-user"
                        >
                            <i className="fas fa-user-plus"></i>
                            <span className="mx-4 font-medium">Add User</span>
                        </Link>
                        <div className="mt-10">
                            <h3 className="px-8 text-xs font-semibold text-gray-500 uppercase">
                                Account
                            </h3>
                            <Link
                                className="flex items-center py-2 px-8 text-gray-700 hover:bg-gray-200"
                                href="#"
                            >
                                <i className="fas fa-user"></i>
                                <span className="mx-4 font-medium">Hai, Ninda!</span>
                            </Link>
                            <Link
                                className="flex items-center py-2 px-8 text-gray-700 hover:bg-gray-200"
                                to={"/"}
                                onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                <span className="mx-4 font-medium">Logout</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}