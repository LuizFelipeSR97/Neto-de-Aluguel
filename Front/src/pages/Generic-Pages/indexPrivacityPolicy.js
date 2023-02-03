import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';

export default function PrivacityPolicyPage() {

    const { userData, setUserData } = useContext(UserContext);

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                Página genérica de Política de Privacidade (em construção)
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
`;
