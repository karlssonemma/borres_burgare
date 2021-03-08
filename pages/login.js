import React, { useRef, useState } from 'react';
import InputField from '../components/InputField';
import { PageTitle } from '../components/PageTitle';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { StyledBtn } from '../components/StyledBtn';
import { useForm } from 'react-hook-form';
import { StyledForm } from '../components/StyledForm';

function LogInPage() {

    const { register, handleSubmit, errors } = useForm();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const onSubmit = async (data) => {
        try {
            setError('');
            setLoading(true);
            await login(data.email, data.password);
            router.push('/order');
            console.log(currentUser);
        } catch {
            setError('Failed to log in');
        };

        setLoading(false);
    };

    return(
        <main>
            <PageTitle>Log In</PageTitle>
            {currentUser.email}
            {error && <p>{error}</p>}
            <StyledForm 
                formName='signup' 
                formId='signup' 
                // formAction='/' 
                // formMethod='GET'
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField 
                    inputType='email' 
                    inputName='email' 
                    labelText='Email'
                    formRef={register}
                />
                <InputField 
                    inputType='password' 
                    inputName='password' 
                    labelText='Password'
                    formRef={register} 
                />
                <StyledBtn
                    type='submit'
                    disabled={loading}
                    onClick={console.log('submitted')}
                >
                    Log In
                </StyledBtn>
            </StyledForm>
        </main>
    )
}

export default LogInPage;