import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [email, setEmail] = useState(null); // Store email from API

    const fetchEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: 'test@example.com', 
                password: '12345'
            });
            setEmail(response.data.email); // Assume API returns { email: "test@example.com" }
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };

    // Fetch email on component mount
    React.useEffect(() => {
        fetchEmail();
    }, []);

    return (
        <div>
            <h2>Email: {email ? email : "Loading..."}</h2>
        </div>
    );
};

export default Dashboard;
