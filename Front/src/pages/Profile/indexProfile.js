import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import genericPhoto from '../../assets/images/generic-person.png';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';
import { GetUserInfo } from '../../hooks/useGetUserInfo';
import { GetUserServices } from '../../hooks/useUserServices';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';
import { CreateConversation } from '../../hooks/useCreateConversation';

export default function ProfilePage() {

    const { id } = useParams();
    const { userData, setUserData } = useContext(UserContext);
    const [userProfileData, setUserProfileData] = useState({});
    const [userServices, setUserServices] = useState({helper: [], requester: []});
    const dependency = userProfileData.user;
    const navigate = useNavigate();
    console.log(userProfileData);

    useEffect(()=>{
        getUserInfo();
        getServices()
    },[dependency]);

    async function getUserInfo(){
        const response = await GetUserInfo(id);
        setUserProfileData(response);
    }

    async function getServices(){
        if (userProfileData.user.id){
            const response = await GetUserServices(userProfileData.user.id)
            setUserServices(response)
        }
    }

    async function findOrCreateConversation(){

        const body = {
            recipientId: userProfileData.user.id,
            senderId: userData.user.id
        }

        const response = await CreateConversation(body);

        if (!response){
            alert ('Ocorreu um erro. Tente novamente!');
            return
        }

        navigate(`/conversation/${response.id}`);
    }

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                <div className='photo'>
                    <h1>Informações do usuário</h1>
                    <img src={genericPhoto} alt=''/>
                </div>
                <div className='info'>
                    <div className='left'>
                        <h2>Nome:</h2>
                        <h2>Membro desde:</h2>
                        <h2>Tipo de usuário:</h2>
                        <h2>Perguntas feitas:</h2>
                        <h2>Perguntas respondidas:</h2>
                        <h2>Status:</h2>
                    </div>
                    { !userProfileData.user ?
                    <></>
                    :
                    <div className='right'>
                        <h2>{userProfileData.user.name} {userProfileData.user.surname}</h2>
                        <h2>{dayjs(userProfileData.user.createdAt).format('DD/MM/YYYY')}</h2>
                        <h2>{userProfileData.user.userTypes.name}</h2>
                        <h2>{userServices.requester.length}</h2>
                        <h2>{userServices.helper.length}</h2>
                        <h2>{userProfileData.user.usersStatus.name}</h2>
                    </div>}
                </div>
                {!userProfileData.user ? <></> : userProfileData.user.id===userData.user.id ? <Button onClick={()=>navigate('/my-account')}>Alterar dados</Button> : <Button onClick={findOrCreateConversation}>Conversar</Button>}
            </Content>
            <BottomBarComponent />
        </Page>
    )
}

const Page = styled.div`
    background-color: #EDEDED;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    a:-webkit-any-link {
        text-decoration: none;
    }
`;

const Content = styled.div`
    background-color: #F3F3F3;
    width: 1200px;
    height: 850px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;

    .photo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 50px;
        margin-top: 20px;

        img{
            justify-content: center;
            width: 200px;
            border: 1px solid #cecece;
            margin-top: 50px;
        }
    }

    .info{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .left{
        width: 40%;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-weight: 700;
    }

    .right{
        width: 40%;
        margin-left: 10px;
    }

    h1{
        font-size: 30px;
        font-weight: 700;
    }

    h2{
        font-size: 20px;
        margin-bottom: 10px;
    }
`;

const Button = styled.div`
    background-color: #d8d8d8;
    font-size: 20px;
    padding: 5px 15px;
    margin-top: 40px;
    border: 1px solid #BCBDBF;
    cursor: pointer;

    :hover{
        background-color: #BCBDBF;
    }
`
