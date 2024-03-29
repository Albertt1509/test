import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import Animation from '../../assets/Animation - 1705486809707.json';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://recruitment-test.gltkdev.com/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'username': username,
                    'password': password
                })
            });

            const data = await response.json();

            if (data.access_token) {
                sessionStorage.setItem('jwtToken', data.access_token);

                await fetchAnalyticsData();
                toast.success('Login successful!', { position: "top-right", autoClose: 3000 });
                setRedirectToDashboard(true);
            } else {
                toast.error('Login failed. Invalid username or password.', { position: "top-right", autoClose: 3000 });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error occurred. Please try again.', { position: "top-right", autoClose: 3000 });
        }
    };

    const fetchAnalyticsData = async () => {
        try {
            const jwtToken = sessionStorage.getItem('jwtToken');

            const analyticsResponse = await fetch("https://recruitment-test.gltkdev.com/analytic/click", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            const analyticsData = await analyticsResponse.json();
            console.log(analyticsData);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        }
    };

    if (redirectToDashboard) {
        return window.location.href = "/dashboard";
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="max-w-screen-lg w-full flex flex-col-reverse sm:flex-row rounded shadow-lg">
                <div className="w-full sm:w-1/2  items-center justify-center hidden sm:block">
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: Animation,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}
                        height={500}
                        width={500}
                        className="sm:my-0 my-8"
                    />
                </div>
                <div className="w-full sm:w-1/2 flex items-center justify-center bg-white rounded shadow-lg">
                    <div className="w-full max-w-md p-8 sm:ml-4">
                        <h2 className="text-4xl font-semibold mb-6">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 mt-2 mr-2 text-sm"
                                        onClick={handleTogglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4 pt-6 flex justify-center items-center">
                                <hr className="w-1/6 mr-4 border-t border-gray-300 border-2" />
                                <h1 className=''>Belum Memiliki Akun? <Link to="/register" className='font-bold'>Daftar</Link></h1>
                                <hr className="w-1/6 ml-4 border-t border-gray-300 border-2" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginForm;
