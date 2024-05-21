import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserUI.css'; 

export default function UserUI() {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handlePlayMusic = () => {
        const audio = new Audio('music.mp3');
        audio.play();
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/polls/');
                setPolls(response.data);
            } catch (err) {
                setError('Error fetching polls');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    const handleStartPoll = (pollId) => {
        navigate(`/poll/${pollId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={darkMode ? 'user-ui-container dark-mode' : 'user-ui-container'}>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="music-button" onClick={handlePlayMusic}>Play Music</button>
            <button className="theme-button" onClick={toggleDarkMode}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <h1>Select a poll:</h1>
            {polls.length === 0 ? (
                <p>No polls available</p>
            ) : (
                <ul className="poll-list">
                    {polls.map(poll => (
                        <li key={poll.id} className="poll-item">
                            <h3>{poll.title}</h3>
                            <p>{poll.description}</p>
                            <button className="start-button" onClick={() => handleStartPoll(poll.id)}>Start</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
