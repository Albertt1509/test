import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';

const MyDateRangePicker = ({ onChange }) => {
    const [dateRange, setDateRange] = useState([null, null]);

    const handleDateRangeChange = (newDateRange) => {
        setDateRange(newDateRange);

        if (onChange) {
            onChange(newDateRange);
        }
    };

    return (
        <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder={['Start Date', 'End Date']}
        />
    );
};

export default MyDateRangePicker;
