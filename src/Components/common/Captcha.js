import React, { useState, useRef } from 'react';

const SimpleCaptcha = () => {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const captchaRef = useRef();

    const generateCaptcha = () => {
        const randomText = Math.random().toString(36).substring(2, 6).toUpperCase();
        setCaptchaText(randomText);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (userInput.toUpperCase() === captchaText) {
            setIsCaptchaValid(true);

        } else {
            setIsCaptchaValid(false);

        }

        setUserInput('');
        generateCaptcha();
    };

    return (
        <div className='row'>
            <div className='container'>

                <form onSubmit={handleFormSubmit}>
                    <div className="form-group col-4">
                        <label for="exampleInputtext"></label>
                        <input type="text" className="form-control " value={userInput} onChange={handleInputChange}  placeholder="Enter the text"/>
                           
                    </div>
                    
                    <div className='my-3'>
                        <img
                            src={`https://dummyimage.com/120x40/000000/ffffff&text=${captchaText}`}
                            alt="CAPTCHA"
                            ref={captchaRef}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
                {isCaptchaValid ? (
                    <p style={{ color: 'GREEN' }}>CAPTCHA is valid!</p>
                ) : (
                    <p style={{ color: 'red' }}>CAPTCHA is invalid. Please try again.</p>
                )}
            </div>
        </div>
    );
};

export default SimpleCaptcha;