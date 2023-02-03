import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';
import { GetAllMessagesFromConversation } from '../../hooks/useGetAllMessagesFromConversation';
import { GetAllConversations } from '../../hooks/useGetConversations';
import { CreateMessage } from '../../hooks/useCreateMessage';

export default function MessagesPage() {

    const { userData, setUserData } = useContext(UserContext);
    const { conversationId } = useParams();
    const [allMessages, setAllMessages] = useState([]);
    const navigate = useNavigate();
    const dependency = (allMessages.length===0);
    const [conversationInfo, setConversationInfo] = useState({});

    useEffect(()=>{
        getAllMessages();
        //setInterval(getAllMessages, 15000);
        getConversationInfo();
    },[dependency]);

    async function getAllMessages(){
        const response = await GetAllMessagesFromConversation(conversationId);
        setAllMessages(response);
    }

    async function getConversationInfo(){
        const response = await GetAllConversations(userData.user.id);
        console.log(response)
        const value = response.filter(obj=>obj.id===Number(conversationId))
        setConversationInfo(value[0]);
    }

    async function handleSendMessage(e){
        e.preventDefault();
        const body = {
          senderId: userData.user.id,
          recipientId: ((conversationInfo.requesterId===userData.user.id) ? conversationInfo.helperId : conversationInfo.requesterId),
          conversationId: Number(conversationId),
          text: e.target.message.value
        }
        await CreateMessage(body)
        getAllMessages()
        e.target.message.value='';
    }
    
    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
            <h1>Mensagens</h1>
            <div className="sentMessages">
                <div className='history'>
                    {allMessages[0] ? 
                    allMessages.map( message =>
                        <div className='message'>
                            <h2>[{message.senderUser.name}]</h2><h3>{message.text}</h3>
                        </div>)
                    : <>Vocês ainda não iniciaram uma conversa. Mande uma mensagem e ela aparecerá aqui.</>}
                </div>
            </div>
            <div className="text">
                <form onSubmit={handleSendMessage}>
                <textarea type='text' name='message'/>
                <button >ENVIAR</button>
                </form>
            </div>
            <ion-icon name="arrow-back-outline" onClick={()=>navigate("/my-messages")}/>
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
    position: relative;

    ion-icon{
        font-size: 30px;
        position: absolute;
        top: 40px;
        left: 250px;
        cursor: pointer;
    }

    h1{
        margin-top: 40px;
        font-size: 25px;
        font-weight: 700;
    }

    .sentMessages{
        position: relative;
        margin-top: 40px;
        width: 700px;
        height: 400px;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: #EEEEEE;
        border-radius: 20px;

        ::-webkit-scrollbar {
            display: none;
          }

        .history{
            margin: 0 40px;
            padding: 30px 0 0 0;
        }

        .message{
            display: flex;
            margin-bottom: 20px;
            font-size: 20px;
            width: 100%;

            h2{
                font-weight: 700;
                margin-right: 15px;
            }
        }
    }

    .text{
        margin-top: 20px;
        width: 700px;
    }

    form{
        display: flex;
        justify-content: center;
    }

    textarea{
        width: 600px;
        height: 80px;
        border: 1px solid #d8d8d8;
        border-radius: 10px;
        padding: 15px 20px;
        display: flex;
        text-align: flex-start;
        font-size: 15px;
    }

    button{
        width: 100px;
        margin-left: 10px;
        border: 1px solid #579BB1;
        border-radius: 10px;
        background-color: #579BB1;
        color: #FFFFFF;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
    }
`;