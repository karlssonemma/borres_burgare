import styled from 'styled-components';
import Btn from '../components/Btn';
import FormBlock from '../components/FormBlock';
import InputField from '../components/InputField';
import { PageTitle } from '../components/PageTitle';

function SignUpPage() {

    return(
        <main>
            <PageTitle>Sign up</PageTitle>
            <FormBlock 
                formName='signup' 
                formId='signup' 
                formAction='/' 
                formMethod='GET'
            >
                <InputField 
                    inputType='text' 
                    labelText='Email' 
                />
                <InputField 
                    inputType='text' 
                    labelText='Password' 
                />
                <InputField 
                    inputType='text' 
                    labelText='Confirm Password' 
                />
                <Btn 
                    btnText='Sign Up' 
                    btnType='submit' 
                />
            </FormBlock>
        </main>
    )
}

export default SignUpPage;