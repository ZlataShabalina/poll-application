import React, { useState } from 'react';
import axios from 'axios';
import './PollList.css'; 

const AddPoll = ({ language, texts }) => {
    const currentTexts = texts[language];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ text: '', choices: [''] }]);

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].text = event.target.value;
        setQuestions(newQuestions);
    };

    const handleChoiceChange = (qIndex, cIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].choices[cIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { text: '', choices: [''] }]);
    };

    const addChoice = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].choices.push('');
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const pollResponse = await axios.post('http://localhost:8000/api/polls/', {
                title,
                description
            });

            const pollId = pollResponse.data.id;

            for (const question of questions) {
                const questionResponse = await axios.post('http://localhost:8000/api/questions/', {
                    poll: pollId,
                    text: question.text
                });

                const questionId = questionResponse.data.id;

                for (const choice of question.choices) {
                    await axios.post('http://localhost:8000/api/choices/', {
                        question: questionId,
                        text: choice
                    });
                }
            }

            
            window.location.reload();
        } catch (error) {
            console.error('There was an error creating the poll!', error);
        }
    };

    return (
        <div className="poll-list-container">
             <h1 className='poll-list-title'>{currentTexts.addPoll}</h1>
            <form onSubmit={handleSubmit} className="add-poll-form">
                <div className="poll-form-item">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="poll-form-item">
                    <label>Description</label><br/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="poll-form-item">
                    <label>Question</label>
                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="question-item">
                            <input
                                type="text"
                                placeholder="Question text"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                required
                            /><br />
                            <label>Choice</label>
                            {question.choices.map((choice, cIndex) => (
                                <div key={cIndex}>
                                    <input
                                        type="text"
                                        placeholder="Choice text"
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(qIndex, cIndex, e)}
                                        required
                                    />
                                </div>
                            ))}
                            <button type="button" className="delete-button" onClick={() => addChoice(qIndex)}>Add Choice</button>
                        </div>
                    ))}
                    <button type="button" className="delete-button" onClick={addQuestion}>Add Question</button>
                </div>
                <button type="submit"className="delete-button" >Create Poll</button>
            </form>
        </div>
    );
};

export default AddPoll;
