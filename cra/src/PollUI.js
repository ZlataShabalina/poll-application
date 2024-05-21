import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PollUI.css'; 

const PollUI = () => {
    const { pollId } = useParams();
    const navigate = useNavigate();
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [votedQuestions, setVotedQuestions] = useState(new Set());

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/polls/${pollId}/`);
                setPoll(response.data);
            } catch (err) {
                setError('Error fetching poll');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPoll();
    }, [pollId]);

    const handleVote = async (choiceId, questionId) => {
        try {
            await axios.post(`http://localhost:8000/api/choices/${choiceId}/vote/`);
            setVotedQuestions((prevVotedQuestions) => new Set(prevVotedQuestions).add(questionId));
        } catch (err) {
            console.error('Error voting:', err);
            
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="poll-ui-container">
            {poll ? (
                <>
                    <h1>{poll.title}</h1>
                    <p>{poll.description}</p>
                    <ul className="questions-list">
                        {poll.questions.map(question => (
                            <li key={question.id} className="question-item">
                                {votedQuestions.has(question.id) ? (
                                    <p>Your vote is accepted</p>
                                ) : (
                                    <>
                                        <strong>{question.text}</strong>
                                        <ul className="choices-list">
                                            {question.choices.map(choice => (
                                                <li key={choice.id} className="choice-item">
                                                    {choice.text}
                                                    <button className='vote' onClick={() => handleVote(choice.id, question.id)}>Vote</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Poll not found</p>
            )}
            <button className="back-to-polls-button" onClick={() => navigate('/user')}>Back to Polls</button>
        </div>
    );
};

export default PollUI;
