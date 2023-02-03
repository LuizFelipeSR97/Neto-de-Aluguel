import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { GetOpenServices } from '../../hooks/useOpenServices';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';

export default function OpenServicesPage() {

    const [openServices, setOpenServices] = useState([]);
    const dependency = (openServices.length===0)

    useEffect(()=>{
        getOpenServices();
        countPages();
    },[dependency]);

    const { userData, setUserData } = useContext(UserContext);
    const [pages, setPages] = useState({});
    const navigate = useNavigate();
    console.log(openServices)

    async function getOpenServices(){
        const response = await GetOpenServices();
        setOpenServices(response);
    }

    function countPages(){
        const countServices = openServices.length;
        let currentPage = 1;
        let maxPage = 1;

        if (countServices>0){
            if (countServices%5>0){
                maxPage=Math.floor(countServices/5)+1;
            } else {
            maxPage=Math.floor(countServices/5);
            }
        }

        setPages({currentPage, maxPage});
    }

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                <div className="list">
                    <h1>Serviços Abertos</h1>
                    {openServices.length===0 ?
                    <>Não existem serviços em aberto. Tente novamente mais tarde!</> 
                    : <>{openServices.map((service, index) => (index>pages.currentPage*5-6 && index<pages.currentPage*5) ?
                    <div onClick={()=>navigate(`/service/${service.id}`)} className="service">
                        <div className="question">
                            <h1>Dúvida: </h1>
                            <h2>{service.name}</h2>
                        </div>
                        <div className="description">
                            <h1>Observação:</h1>
                            <h2>{service.description}</h2>
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
