import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { GetUserServices } from '../../hooks/useUserServices';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';

export default function UserServicesPage() {

    const [userServices, setUserServices] = useState([]);

    useEffect(()=>{
        getUserServices();
    },[]);

    const { userData, setUserData } = useContext(UserContext);
    console.log(userServices);
    console.log(userData)


    async function getUserServices(){
        const response = await GetUserServices(userData.user.id);
        setUserServices(response);
    }

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                USER SERVICES
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

    .service{
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
                margin-left: 44px;
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

    .service:hover{
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
`;
