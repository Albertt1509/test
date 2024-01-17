import React, { useState } from 'react';
import DateRangePicker from 'react-date-range';

const DateRangeFilter = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    return (
        <div>
            <h3>Date Range Filter:</h3>
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
            <p>
                Selected Date Range: {startDate.toDateString()} - {endDate.toDateString()}
            </p>
        </div>
    );
};

export default DateRangeFilter;