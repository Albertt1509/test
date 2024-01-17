const Navbar = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            const response = await fetch("https://recruitment-test.gltkdev.com/user/logout/all", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // atau 'application/x-www-form-urlencoded' tergantung pada kebutuhan server
                },
            });
            if (response.ok) {
                onLogout();
            } else {
                console.error('Logout gagal:', response.statusText);
            }
        } catch (error) {
            console.error('Error selama logout:', error);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">Logo</div>
                    <div className="space-x-4">
                        <button className="text-white hover:text-gray-300" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
