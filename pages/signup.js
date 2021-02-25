import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Btn from '../components/Btn';
import FormBlock from '../components/FormBlock';
import InputField from '../components/InputField';
import { PageTitle } from '../components/PageTitle';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function SignUpPage() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
 
    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        };

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false)
    }

    return(
        <main>
            <PageTitle>Sign up</PageTitle>
            {currentUser.email}
            {error && <p>{error}</p>}
            <FormBlock 
                formName='signup' 
                formId='signup' 
                formAction='/' 
                formMethod='GET'
                handleFormSubmit={e => handleSubmit(e)}
            >
                <InputField 
                    inputType='email' 
                    labelText='Email'
                    refHandler={emailRef}
                />
                <InputField 
                    inputType='password' 
                    labelText='Password'
                    refHandler={passwordRef} 
                />
                <InputField 
                    inputType='password' 
                    labelText='Confirm Password'
                    refHandler={passwordConfirmRef} 
                />
                <Btn 
                    btnText='Sign Up' 
                    btnType='submit'
                    style={{ color: 'blue' }}
                    setDisabled={loading}
                    onBtnClickHandler={() => console.log('submitted')}
                />
            </FormBlock>
        </main>
    )
}

export default SignUpPage;