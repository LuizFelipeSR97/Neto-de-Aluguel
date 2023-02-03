import styled from 'styled-components';

export default function BottomBarComponent(){

    return (
        <BottomBar>
            <ContentBottomBar>
                <h2>© Copyright 2023 Neto de Aluguel | Freepik - Flaticon</h2>
                <div className="links">
                    <a href={"/about-us"}><h1>Quem Somos</h1></a><h1>|</h1><a href={"/privacityPolicy"}><h1>Política de privacidade</h1></a><h1>|</h1><a href={"/contact-us"}><h1>Fale conosco</h1></a>
                </div>
            </ContentBottomBar>
        </BottomBar>
    )
}

const BottomBar = styled.div`
    height: 80px;
    width: 100%;
    background-color: #579BB1;
    display: flex;
    justify-content: center;
    z-index: 1;
`;

const ContentBottomBar = styled.div`
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    color: #FFFFFF;

    img{
        position: absolute;
        left: 30px;
        top: 5px;
        width: 60px;
        cursor: pointer;
    }

    ion-icon{
        color: white;
        font-size: 40px;
        margin-right: 30px;
        position: absolute;
        right: 0px;
        cursor: pointer;
    }

    h1{
        font-size: 15px;
        margin-left: 10px;
    }

    h2{
        margin-left: 120px;
        margin-bottom: 10px;
        font-size: 10px;
        cursor: default;
    }

    .links{
        margin-right: 20px;
        margin-bottom: 10px;
        display: flex;
        cursor: pointer;
    }
`;
