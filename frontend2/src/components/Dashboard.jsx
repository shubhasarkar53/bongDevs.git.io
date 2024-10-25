// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [dashboardMessage, setDashboardMessage] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            const response = await fetch('http://localhost:3000/api/v1/admin/profile', {
                method: 'GET',
                credentials: 'include', // include cookies
            });

            const data = await response.json();
            if (response.ok) {
                setDashboardMessage(data.admin.username);
            } else {
                setDashboardMessage('Unauthorized. Please log in.');
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>HI {dashboardMessage}</p>
        </div>
    );
}

export default Dashboard;
