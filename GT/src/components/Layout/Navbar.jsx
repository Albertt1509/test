import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">Logo</div>
                    <div className="space-x-4">
                        <a href="#" className="text-white hover:text-gray-300">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
