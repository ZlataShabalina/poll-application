import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PollList.css'; 

const PollList = ({ language, texts }) => {
    const currentTexts = texts[language];
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPollId, setExpandedPollId] = useState(null); 

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

    const handleDeletePoll = async (pollId) => {
        try {
            await axios.delete(`http://localhost:8000/api/polls/${pollId}/`);
            setPolls(prevPolls => prevPolls.filter(poll => poll.id !== pollId));
        } catch (err) {
            console.error('Error deleting poll:', err);
            
        }
    };

    const togglePollDetails = (pollId) => {
        if (expandedPollId === pollId) {
            setExpandedPollId(null); 
        } else {
            setExpandedPollId(pollId); 
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="poll-list-container">
            <h1 className='poll-list-title'>{currentTexts.pollList}</h1>
            {polls.length === 0 ? (
                <p>No polls available</p>
            ) : (
                <ul className="polls-list">
                    {polls.map(poll => (
                        <li key={poll.id} className="poll-item">
                            <div className="poll-header">
                                <h2 className="poll-title">{poll.title}</h2>
                                <div className="button-group">
                                    <button className="delete-button" onClick={() => togglePollDetails(poll.id)}>
                                        {expandedPollId === poll.id ? 'Hide Details' : 'Details'}
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeletePoll(poll.id)}>Delete Poll</button>
                                </div>
                            </div>
                            {expandedPollId === poll.id && (
                                <>
                                    <p className="poll-description">{poll.description}</p>
                                    <ul className="questions-list">
                                        {poll.questions.map(question => (
                                            <li key={question.id} className="question-item">
                                                <strong>{question.text}</strong>
                                                <ul className="choices-list">
                                                    {question.choices.map(choice => (
                                                        <li key={choice.id} className="choice-item">
                                                            {choice.text} ({choice.votes} votes)
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PollList;
