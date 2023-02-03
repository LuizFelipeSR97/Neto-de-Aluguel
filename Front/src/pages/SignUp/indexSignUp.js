import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../hooks/useSignUp';
import styled from 'styled-components';
import logo from '../../assets/images/logo-NDA.png';

export default function SignInPage() {
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        const user = {email: e.target.email.value, password: e.target.password.value, name: e.target.name.value};

        const createdUser = await SignUp(user);

        if (createdUser.name==='AxiosError'){
            e.target.name.value = '';
            e.target.email.value = '';
            e.target.password.value = '';
            e.target.passwordConfirmation.value = '';
            if(createdUser.response.status===409){
                setErrorText('Já existe um usuário com esse e-mail. Faça login ou use um outro e-mail para criar um novo cadastro.')
            } else {
                setErrorText('Preencha corretamente todos os campos acima.')
            }
        } else {
            navigate('/sign-in');
        }

    }

    return (
        <Page>
            <Content>
                <img src={logo} alt=''/>
                <Form onSubmit={handleSubmit}>
                    <input name='name' placeholder='Nome' type='name' required/>
                    <input name='email' placeholder='E-mail' type='email' required/>
                    <input name='password' placeholder='Senha (pelo menos 6 dígitos)' type='password' required/>
                    <input name='passwordConfirmation' placeholder='Confirme a senha' type='password' required/>
                    <a href="/sign-in">
                        Já tem uma conta? Faça o login agora!
                    </a>
                    <ErrorSpace>
                        {errorText}
                    </ErrorSpace>
                    <Button>
                        Cadastrar
                    </Button>
                </Form>
            </Content>            
        </Page>
    )
}

const Page = styled.div`
    background-color: #CECECE;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    background-color: #F8F4EA;
    width: 500px;
    height: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 4px 24px #000000;    

    img{
        width: 400px;
        margin: 40px 0;
    }

    a:-webkit-any-link {
        margin: 40px 0;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

    input{
        width: 400px;
        height: 60px;
        margin-bottom: 10px;
        padding-left: 30px;
        color: black;
        font-size: 20px;
        border: 1px solid #000000;
        border-radius: 8px;
        font-family: 'Lexend Deca', sans-serif;
    }

    a:-webkit-any-link {
        text-decoration: none;
        font-size: 16px;
        font-weight: 700;
        color: #579BB1;
        margin-top: 10px;
        margin-bottom: 0;
    }

    input::placeholder{
        color: #9C9C9C;
        font-size: 20px;
        font-family: 'Lexend Deca', sans-serif;  
    }

    .options{
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;

        input{
            width: 20px;
            margin-left: 30px;
        }

        .option{
            font-size: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 30px;
        }

        img{
            width: 80px;
            height: 80px;
        }
    }
`;

const Button = styled.button`
    width: 250px;
    height: 60px;
    background: #579BB1;
    border-radius: 8px;
    color: white;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: solid 1px #579BB1;
    border-radius: 12px;
    cursor: pointer;
`;

const ErrorSpace = styled.div`
    text-align: center;
    width: 450px;
    height: 75px;
    color: #515151;
    margin: 20px 0;
    font-size: 20px;
`;
