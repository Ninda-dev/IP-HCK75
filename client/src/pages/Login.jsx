import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { instanceAxios } from "../axiosClient";

export default function Login() {
    const [email, setEmail] = useState("admin@mail.com");
    const [password, setPassword] = useState("admin");
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            let response = await instanceAxios.post(
                "/login",
                {
                    email,
                    password,
                }
            );

            // console.log(response, "----------");
            
            localStorage.setItem("access_token", response.data.access_token);
            // console.log("masuk ga nih#############");
            
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="ml-60 mt-10 mr-60">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <p className="mb-8">Log in to claim your donuts..</p>
                <div className="flex">
                    <div className="w-1/2 ">
                        <img
                            alt="Valentine Donut"
                            className="rounded-lg shadow-md"
                            height={140}
                            src="image/donut valentine.jpeg"
                            width={430}
                        />
                    </div>
                    <div className="w-1/2 pl-10">
                        <h2 className="text-2xl font-bold my-6">Log in to your account</h2>
                        <p className="mb-4">Enter your email and password to login.</p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                                    placeholder="Enter email address ..."
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                                    placeholder="Enter your password ..."
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full mt-6 bg-[#ECB1C0] text-1xl py-2 rounded-lg hover:bg-pink-700 hover:text-white">
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}