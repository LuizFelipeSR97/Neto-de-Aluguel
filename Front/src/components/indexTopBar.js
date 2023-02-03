import logo from '../assets/images/logo-NDA.png'
import MenuComponent from './indexMenu';
import styled from 'styled-components';
import { useState } from 'react';

export default function TopBarComponent({userData, setUserData}){

    const [menuVisibility, setMenuVisibility] = useState('hidden');

    function toggleMenu(){
        if (menuVisibility==='hidden'){
            setMenuVisibility('visible')
        } else {
            setMenuVisibility('hidden')
        }
    }

    return (
        <>
            {(menuVisibility==='visible') ?
                <MenuComponent userData={userData} setUserData={setUserData} menuVisibility={menuVisibility} setMenuVisibility={setMenuVisibility}/>
                :
                <></>}
            <TopBar>
                <ion-icon name="menu-outline" onClick={toggleMenu}/>
                <ContentBar>
                    <a href='/'><img src={logo} alt=''/></a>
                </ContentBar>
            </TopBar>
        </>
    )
}

const TopBar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 70px;
    width: 100%;
    background-color: #E1D7C6;
    display: flex;
    justify-content: center;
    z-index: 3;

    ion-icon{
        color: white;
        font-size: 40px;
        position: absolute;
        right: 30px;
        top: 15px;
        cursor: pointer;
        z-index: 3;
    }

    img{
        width: 50px;
        margin-left: 20px;
        cursor: pointer;
    }
`;

const ContentBar = styled.div`
    width: 1200px;
    display: flex;
    align-items: center;
    position: relative;
    color: #ce8680;

    input{
        width: 300px;
        height: 40px;
        background: white;
        border-radius: 5px;
        border: 1px solid #ffffff;
        position: absolute;
        right: 150px;
        padding-left: 15px;
        color: black;
        font-size: 18px;
        z-index: 1;
    }

    img{
        position: absolute;
        left: 30px;
        top: 10px;
        cursor: pointer;
        width: 150px;
    }

    h1{
        margin-bottom: 8px;
        font-weight: 700;
    }

    h2{
        margin-bottom: 8px;
        font-weight: 400;
    }
`;