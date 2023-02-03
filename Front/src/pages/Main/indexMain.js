import { useContext, useState } from 'react';
import styled from "styled-components";
import ad from '../../assets/images/ad.png';
import info from '../../assets/images/infoEmpresa2.png';
import UserContext from '../../contexts/UserContext';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';

export default function MainPage() {

    const { userData, setUserData } = useContext(UserContext);

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                <div className="info"><img src={info} alt=''/></div>
                <div className="ad"><img src={ad} alt=''/></div>
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
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;

    .ad{
        margin-top: 40px;
        margin-bottom: 40px;
        width: 1000px;
        height: 150px;
        background-color: lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        img{
            width: 100%;
            height: 100%;
        }
    }

    .info{
        margin-top: 40px;
        margin-bottom: 40px;
        width: 1000px;
        height: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            width: 100%;
            height: 100%;
            border-radius: 25px;
        }
    }
`;
