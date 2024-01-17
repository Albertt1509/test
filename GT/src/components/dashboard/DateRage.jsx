import { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css'

const MyDateRangePicker = () => {
    const [dateRange, setDateRange] = useState([null, null]);

    const handleDateRangeChange = (newDateRange) => {
        setDateRange(newDateRange);
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
