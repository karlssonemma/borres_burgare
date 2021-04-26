import React, { useRef, useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, ref } from 'yup';

import InputField from '../components//FormComponents/InputField';
import { PageTitle } from '../components/Text/PageTitle';
import { StyledBtn } from '../components/Buttons/StyledBtn';
import { StyledForm } from '../components/FormComponents/StyledForm';
import CenteredMain from '../components/CenteredMain';
import Nav from '../components/Nav';
import Link from 'next/link';
import StyledLink from '../components/StyledLink';
 
const schema = object().shape({
    email: string().required('required'),
    password: string().min(4, 'Password must be at least 4 characters').required('required'),
    confirmPassword: string().oneOf([ref('password')], 'Passwords must match').required('required')
})

function SignUpPage() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });
    const { signup, currentUser, isAuthenticated } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const userColl = firebaseInstance.firestore().collection('users');
 
    if(isAuthenticated) {
      router.push('/order')
    };

    const onSubmit = async (data) => {

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
            {errors.password && <p style={{marginTop: '.5em'}}>{errors.password.message}</p>}
            {errors.confirmPassword && <p style={{marginTop: '.5em'}}>{errors.confirmPassword.message}</p>}
            <StyledForm 
                name='signup' 
                id='signup' 
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
                <InputField 
                    inputType='password'
                    inputName='confirmPassword'
                    labelText='Confirm Password'
                    register={register}
                />
                <StyledBtn
                    style={{width: '100%'}}
                    type='submit'
                    disabled={loading}
                    onClick={console.log(errors)}
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