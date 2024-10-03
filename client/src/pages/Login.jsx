import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { instanceAxios } from "../axiosClient";

export default function Login() {
    const [email, setEmail] = useState("admin@mail.com");
    const [password, setPassword] = useState("123456");
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            const response = await instanceAxios.post(
                "/apis/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("access_token", response.data.data.access_token);

            navigate('/admin');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="ml-10 mt-10 mr-10">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <p className="mb-8">Log in and access Blog Nih to explore the world...</p>
                <div className="flex">
                    <div className="w-1/2">
                        <img
                            alt="Gambar Depan Blog"
                            className="rounded-lg shadow-md"
                            height={180}
                            src="https://i.pinimg.com/originals/a0/23/59/a023595a6a0b3ade26fdf39f0b1ce703.gif"
                            width={580}
                        />
                    </div>
                    <div className="w-1/2 pl-10">
                        <h2 className="text-2xl font-bold mb-4">Log in to your account</h2>
                        <p className="mb-4">Enter your email and password to login.</p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Enter email address ..."
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Enter your password ..."
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}