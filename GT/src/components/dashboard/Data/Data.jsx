import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Data = ({ dateRange }) => {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwtToken = sessionStorage.getItem('jwtToken')
                if (!jwtToken) {
                    console.error("JWT token not available");
                    setLoading(false);
                    return;
                }
                const response = await fetch(`https://recruitment-test.gltkdev.com/analytic/click`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
                if (!response.ok) {
                    console.error("Error fetching data:", response.statusText);
                    setLoading(false);
                    return;
                }
                const data = await response.json();
                setApiData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [dateRange]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Data</h2>
                    {apiData && (
                        <pre>{JSON.stringify(apiData, null, 2)}</pre>

                    )}
                </div>
            )}
        </div>
    );
};

Data.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

export default Data;
