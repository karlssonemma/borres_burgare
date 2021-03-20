import React, { useRef, useState } from 'react';
import InputField from '../components//FormComponents/InputField';
import { PageTitle } from '../components/Text/PageTitle';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { StyledBtn } from '../components/Buttons/StyledBtn';
import { useForm } from 'react-hook-form';
import { StyledForm } from '../components/FormComponents/StyledForm';
import firebaseInstance from '../config/firebase';
import { useRouter } from 'next/router';
import CenteredMain from '../components/CenteredMain';
import Nav from '../components/Nav';
import Link from 'next/link';
import StyledLink from '../components/StyledLink';
 

function SignUpPage() {

    const { register, handleSubmit, errors } = useForm();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const userColl = firebaseInstance.firestore().collection('users');
 
    const onSubmit = async (data) => {
        console.log(data.confirm_password)
        if(data.password !== data.confirm_password) {
            return setError('Passwords do not match');
        };

        try {
            setError('');
            setLoading(true);
            const user = await signup(data.email, data.password);
            console.log(user.user.uid);
            userColl.doc(user.user.uid).set({
                email: user.user.email,
                user_id: user.user.uid
            });
            router.push('/order')
        } catch (error){
            setError('Failed to create account', error)
        };

        setLoading(false);
        
    };

    return(
        <>
        <Nav />
        <CenteredMain>
            <PageTitle>Sign up</PageTitle>
            {error && <p style={{marginTop: '.5em'}}>{error}</p>}
            <StyledForm 
                name='signup' 
                id='signup' 
                // action='/' 
                // method='GET'
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
                <InputField 
                    inputType='password'
                    inputName='confirm_password'
                    labelText='Confirm Password'
                    formRef={register} 
                />
                <StyledBtn
                    style={{width: '100%'}}
                    type='submit'
                    disabled={loading}
                    onClick={console.log('submitted')}
                >
                    Sign Up
                </StyledBtn>
            </StyledForm>
            <Link href='/login'>
                <StyledLink>Already have an account?</StyledLink>
            </Link>
        </CenteredMain>
        </>
    )
}

export default SignUpPage;