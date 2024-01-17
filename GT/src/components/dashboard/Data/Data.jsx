import React, { useState, useEffect } from "react";

const Data = () => {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://recruitment-test.gltkdev.com/analytic/click");
                const data = await response.json();

                setApiData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Data</h2>
                    {/* Render your data here */}
                    {apiData && (
                        <pre>{JSON.stringify(apiData, null, 2)}</pre>
                        /* Ubah cara render data sesuai kebutuhan Anda */
                    )}
                </div>
            )}
        </div>
    );
};

export default Data;
