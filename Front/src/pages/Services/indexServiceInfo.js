import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { GetServiceInfo } from '../../hooks/useServiceInfo';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';

export default function ServiceInfoPage() {

    useEffect(()=>{
        getServiceInfo();
    },[]);

    const { id } = useParams();
    const { userData, setUserData } = useContext(UserContext);
    const [serviceData, setServiceData] = useState({});
    console.log(userData);
    console.log(serviceData);

    async function getServiceInfo(){
        const response = await GetServiceInfo(id);
        setServiceData(response);
    }

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                {!serviceData.id ? <></> :
                <>
                    <h1>Informações do Serviço</h1>
                    <h2>{`id: ${('0000'+serviceData.id).slice(-4)}`}</h2>
                    <Info>
                        <p><strong>Nome:</strong> {`${serviceData.requesterUser.name} ${serviceData.requesterUser.surname}`}</p>
                        <p><strong>Dúvida:</strong> {serviceData.name}</p>
                        <p><strong>Observação:</strong> {serviceData.description}</p>
                        <p><strong>Preço:</strong> R${Number(serviceData.price/100).toFixed(2).replace(".", ",")}</p>
                    </Info>
                    <div className='botoes'>
                        <div className='botao'>Enviar solicitação de ajuda</div>
                        <div className='botao'>Enviar uma mensagem</div>
                    </div>
                </>}
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

    h1{
        margin-top: 50px;
        font-size: 30px;
        font-weight: 700;
    }

    h2{
        margin-top: 10px;
        color: #808080;
    }

    .botoes{
        width: 800px;
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
    }

    .botao{
        width: 260px;
        height: 60px;
        background-color: #D8D8D8;
        color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    margin-top: 60px;
    font-size: 25px;

    p{
        margin-bottom: 30px;
    }

    strong{
        margin-right: 5px;
    }
`;
