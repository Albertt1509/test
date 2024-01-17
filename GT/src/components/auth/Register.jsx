import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import Animation from '../../assets/Animation - 1705494283911.json';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const uploadPhoto = async () => {
        try {
            if (!photo) {
                throw new Error('Please select a photo.');
            }

            const photoFormData = new FormData();
            photoFormData.append('file', photo, photo.name);

            const photoUploadResponse = await fetch('https://recruitment-test.gltkdev.com/user/photo/upload', {
                method: 'POST',
                body: photoFormData,
            });

            if (!photoUploadResponse.ok) {
                const errorData = await photoUploadResponse.json();
                throw new Error(errorData.message || 'Failed to upload photo.');
            }

            const photoUUID = await photoUploadResponse.json();

            console.log('Photo UUID:', photoUUID);

            return photoUUID;
        } catch (error) {
            throw new Error(`Error uploading photo: ${error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!photo) {
            toast.error('Please select a photo.', { position: "top-right", autoClose: 3000 });
            return;
        }

        try {
            const photoUUID = await uploadPhoto();

            const registrationResponse = await fetch('https://recruitment-test.gltkdev.com/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    phone,
                    password,
                    age,
                    photos: [photoUUID],
                }),
            });

            if (registrationResponse.ok) {
                toast.success('Registration successful!', { position: "top-right", autoClose: 3000 });
                setEmail('');
                setName('');
                setPhone('');
                setPassword('');
                setAge('');
                setPhoto(null);
            } else {
                const registrationData = await registrationResponse.json();
                throw new Error(`Registration failed. ${registrationData.detail ? registrationData.detail.code : 'Unknown error'}`);
            }
        } catch (error) {
            toast.error(`Error occurred. ${error.message}`, { position: "top-right", autoClose: 3000 });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">
            <div className="max-w-screen-lg w-full flex flex-col-reverse sm:flex-row rounded shadow-lg">
                <div className="w-full sm:w-1/2 items-center justify-center hidden sm:block">
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
                        width={400}
                        className="absolute inset-0 mx-auto mt-8"
                    />
                </div>
                <div className="w-full sm:w-1/2 flex items-center justify-center bg-white rounded shadow-lg">
                    <div className="w-full max-w-md p-8 sm:ml-4 space-y-4">
                        <h2 className="text-4xl font-semibold mb-6">Register</h2>
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 mt-3 mr-2 text-sm"
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
                            <div className="mb-4">
                                <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
                                <input
                                    type="number"
                                    id="age"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    value={age}
                                    onChange={handleAgeChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
                                <input
                                    type="file"
                                    id="photo"
                                    onChange={handlePhotoChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-6 flex justify-center items-center">
                                <hr className="w-1/6 mr-4 border-t border-gray-300 border-2" />
                                <h1>Sudah Memiliki Akun? <Link to="/" className='font-bold'>Masuk</Link></h1>
                                <hr className="w-1/6 ml-4 border-t border-gray-300 border-2" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegistrationForm;
