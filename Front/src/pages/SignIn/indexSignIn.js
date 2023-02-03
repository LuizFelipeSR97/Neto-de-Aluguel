import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/logo-NDA.png';
import { SignIn } from '../../hooks/useSignIn';
import UserContext from '../../contexts/UserContext';

export default function SignInPage() {
    const { userData, setUserData } = useContext(UserContext);
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();
    console.log(userData)

    async function handleSubmit(e) {

        e.preventDefault();

        const user = {email: e.target.email.value, password: e.target.password.value};

        const loggedUser = await SignIn(user);

        if (loggedUser.name==='AxiosError'){
            e.target.email.value = '';
            e.target.password.value = '';
            setErrorText('Login e/ou senha inválidos. Tente novamente!')
        } else {
            setUserData(loggedUser);
            navigate(`/user/${loggedUser.user.id}`);
        }

    }

    return (
        <Page>
            <Content>
                <img src={logo} alt=''/>
                <Form onSubmit={handleSubmit}>
                    <input name='email' placeholder='E-mail' type='email' required/>
                    <input name='password' placeholder='Senha' type='password' required/>
                    <a href="/sign-up">
                        Ainda não tem uma conta? Faça o cadastro aqui!
                    </a>
                    <ErrorSpace>
                        {errorText}
                    </ErrorSpace>
                    <Button>
                        Login
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
    height: 30px;
    color: #515151;
    margin: 20px 0 200px 0;
    font-size: 20px;
`;
