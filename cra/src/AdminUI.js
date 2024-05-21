import React, { useState } from 'react';
import AddPoll from "./AddPoll";
import PollList from "./PollList";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminUI.css'; 

export default function AdminUI() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');

    const handleLogout = () => {
        navigate('/');
    };

    const handleResetVotes = async () => {
        try {
            await axios.post('http://localhost:8000/api/reset-votes/');
            window.location.reload();
        } catch (err) {
            console.error('Error resetting votes:', err);
            alert('Failed to reset votes');
        }
    };

    const toggleLanguage = () => {
        setLanguage(prevLanguage => (prevLanguage === 'en' ? 'fi' : 'en'));
    };

    const texts = {
        en: {
            welcome: 'Welcome admin.',
            resetVotes: 'Reset All Votes',
            logout: 'Logout',
            toggleLanguage: 'Switch to Finnish',
            addPoll: 'Add Poll',
            pollList: 'Poll List'
        },
        fi: {
            welcome: 'Tervetuloa admin.',
            resetVotes: 'Nollaa kaikki äänet',
            logout: 'Kirjaudu ulos',
            toggleLanguage: 'Vaihda englanniksi',
            addPoll: 'Lisää kysely',
            pollList: 'Kyselylista'
        }
    };

    const currentTexts = texts[language];

    return (
        <>
            <button className="logout-button" onClick={handleLogout}>{currentTexts.logout}</button>
            <button className="language-button" onClick={toggleLanguage}>{currentTexts.toggleLanguage}</button>
            <div className="admin-container">
                <h1 className="admin-heading">{currentTexts.welcome}</h1>
                <button className="reset-votes-button" onClick={handleResetVotes}>{currentTexts.resetVotes}</button>
                <PollList language={language} texts={texts} />
                <AddPoll language={language} texts={texts} />
            </div>
        </>
    );
}
