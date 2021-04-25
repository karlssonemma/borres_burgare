import React, { useRef, useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import InputField from '../components/FormComponents/InputField';
import { PageTitle } from '../components/Text/PageTitle';
import { StyledBtn } from '../components/Buttons/StyledBtn';
import { StyledForm } from '../components/FormComponents/StyledForm';
import CenteredMain from '../components/CenteredMain';
import Nav from '../components/Nav';
import Link from 'next/link';
import StyledLink from '../components/StyledLink';

const schema = object().shape({
    email: string().required('required'),
    password: string().required('required')
})

function LogInPage() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const onSubmit = async (data) => {
        try {
            setError('');
            setLoading(true);
            await login(data.email, data.password)
            router.push('/order');
        } catch {
            setError('Failed to log in');
        };
        setLoading(false);
    };

    return(
        <>
        <Nav />
        <CenteredMain>
            <PageTitle>Log In</PageTitle>
            {error && <p style={{marginTop: '.5em'}}>{error}</p>}
            <StyledForm 
                formName='signup' 
                formId='signup' 
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField 
                    inputType='email' 
                    inputName='email' 
                    labelText='Email'
                    register={register}
                />
                <InputField 
                    inputType='password' 
                    inputName='password' 
                    labelText='Password'
                    register={register} 
                />
                <StyledBtn
                    style={{width: '100%'}}
                    type='submit'
                    disabled={loading}
                    onClick={console.log(errors)}
                >
                    Log In
                </StyledBtn>
            </StyledForm>
            <Link href='/signup'>
                <StyledLink>Don't have an account?</StyledLink>
            </Link>
        </CenteredMain>
        </>
    )
}

export default LogInPage;