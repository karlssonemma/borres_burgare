import React, { useRef, useState } from 'react';
import InputField from '../components/InputField';
import { PageTitle } from '../components/PageTitle';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { StyledBtn } from '../components/StyledBtn';
import { useForm } from 'react-hook-form';
import { StyledForm } from '../components/StyledForm';
import firebaseInstance from '../config/firebase';


function SignUpPage() {

    const { register, handleSubmit, errors } = useForm();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            })
        } catch (error){
            setError('Failed to create account', error)
        };

        setLoading(false);
        
    };

    return(
        <main>
            <PageTitle>Sign up</PageTitle>
            {currentUser.email}
            {error && <p>{error}</p>}
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
                    type='submit'
                    disabled={loading}
                    onClick={console.log('submitted')}
                >
                    Sign Up
                </StyledBtn>
            </StyledForm>
        </main>
    )
}

export default SignUpPage;