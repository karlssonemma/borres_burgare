import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Btn from '../components/Btn';
import FormBlock from '../components/FormBlock';
import InputField from '../components/InputField';
import { PageTitle } from '../components/PageTitle';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

function LogInPage() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
 
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            router.push('/order')
        } catch {
            setError('Failed to log in');
        }
        setLoading(false)
    }

    return(
        <main>
            <PageTitle>Log In</PageTitle>
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
                <Btn 
                    btnText='Log In' 
                    btnType='submit'
                    style={{ color: 'blue' }}
                    setDisabled={loading}
                    onBtnClickHandler={() => console.log('submitted')}
                />
            </FormBlock>
        </main>
    )
}

export default LogInPage;