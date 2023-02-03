import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';
import { GetAllConversations } from '../../hooks/useGetConversations';
import { GetAllMessages } from '../../hooks/useGetAllMessages';

export default function MyConversationsPage() {

    const { userData, setUserData } = useContext(UserContext);
    const [userConversations, setUserConversations] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [pages, setPages] = useState({});
    const navigate = useNavigate();
    const dependency = (userConversations.length===0)

    useEffect(()=>{
        getAllUserConversations();
        getAllUserMessages();
        countPages();
    },[dependency]);

    async function getAllUserConversations(){
        const response = await GetAllConversations(userData.user.id);
        setUserConversations(response);
    }

    async function getAllUserMessages(){
        const response = await GetAllMessages(userData.user.id);
        response.sort((b,a) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        console.log(response)
        setUserMessages(response);
    }

    function countPages(){
        const countMessages = userConversations.length;
        let currentPage = 1;
        let maxPage = 1;

        if (countMessages>0){
            if (countMessages%5>0){
                maxPage=Math.floor(countMessages/5)+1;
            } else {
                maxPage=Math.floor(countMessages/5);
            }
        }

        setPages({currentPage, maxPage});
    }

    console.log(userConversations)
    console.log(userMessages)

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
            <div className="list">
                    <h1>Minhas Conversas</h1>
                    {!userConversations[1]?
                    <>Não existem mensagens ainda. Comece uma conversa com alguém e ela aparecerá aqui.</> 
                    : <>{userConversations.map((conversation, index) => (index>pages.currentPage*5-6 && index<pages.currentPage*5) ?
                    <div onClick={()=>navigate(`/conversation/${conversation.id}`)} className="conversation">
                        <div className="question">
                            <h1>Usuário: </h1>
                            <h2>{conversation.helper.id === userData.user.id ? conversation.requester.name +' '+conversation.requester.surname : conversation.helper.name +' '+conversation.helper.surname}</h2>
                        </div>
                        <div className="description">
                            <h1>Mensagens:</h1>
                            <div className="messages">
                            {userMessages.map((message)=>(message.conversationId===conversation.id ? <h2>[{message.senderUser.name}] {message.text}</h2> : <></>))}
                            </div>
                        </div>
                    </div>
                    :
                    <></>)}</>}
                </div>
                <div className="pages">
                    <h1>Página {pages.currentPage} de {pages.maxPage}</h1>
                    <h2 onClick={()=>setPages({...pages, currentPage: pages.currentPage-1})}>{pages.currentPage>1 ? '<< Voltar' : ''} </h2>
                    <h2 onClick={()=>setPages({...pages, currentPage: pages.currentPage+1})}>{pages.currentPage===pages.maxPage ? '' : 'Avançar >>'}</h2>
                </div>
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
    height: 823px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;

    .list{
        margin-top: 40px;
        width: 800px;
        height: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1{
            font-size: 25px;
            font-weight: 700;
            margin-bottom: 30px;
        }
    }

    .conversation{
        width: 600px;
        height: 105px;
        padding: 10px 20px;
        margin-top: 20px;
        font-size: 18px;
        color: #000000;
        display:  flex;
        flex-direction: column;
        border: 1px solid #CCCCCC;
        border-radius: 10px;
        background-color: #EDEDED;
        cursor: pointer;

        .question{
            height: 25px;
            display: flex;
            overflow: hidden;

            h1{
                margin-left: 30px;
                margin-top: 1px;
            }
        }

        .description{
            margin-top: 10px;
            height: 60px;
            display: flex;
            overflow-x: hidden;
            overflow-y: hidden;
        }

        h1{
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 0;
        }

        h2{
            margin-left: 10px;
            font-size: 18px;
            font-weight: 400;
        }
    }

    .conversation:hover{
        background-color: #E2E2E2;
    }

    .pages{
        width: 500px;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;

        h1{
            font-size: 18px;
            color: #000000;
            margin-right: 100px;
        }

        h2{
            font-size: 18px;
            color: blue;
            cursor: pointer;
        }
    }

    .messages{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        h2{
            color: gray;
            margin-bottom: 10px;
            font-size: 18px;
        }
    }
`;