import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';
import TopBarComponent from '../../components/indexTopBar';
import BottomBarComponent from '../../components/indexBottomBar';
import { GetUserAddress } from '../../hooks/useGetUserAddress';
import { GetUserTypes } from '../../hooks/useGetUserTypes';
import { GetUserStatus } from '../../hooks/useGetUserStatus';

export default function MyAccountPage() {

    const { userData, setUserData } = useContext(UserContext);
    const [ userAddress, setUserAddress ] = useState({});
    const [ userTypes, setUserTypes ] = useState([]);
    const [ userStatus, setUserStatus ] = useState([]);
    console.log(userAddress)
    const [ formVisibility, setFormVisibility] = useState(
        {
            form1Visibility: 'hidden',
                inputNameVisibility: 'hidden',
                inputSurnameVisibility: 'hidden',
                inputPhotoVisibility: 'visible',
                inputBirthdayVisibility: 'hidden',
                inputTypeVisibility: 'hidden',
                inputStatusVisibility: 'hidden',
            form2Visibility: 'hidden',
                inputEmailVisibility:  'hidden',
                inputPasswordVisibility:  'hidden',
                inputPasswordVerificationVisibility: 'hidden',
            form3Visibility: 'hidden',
                inputAddressNameVisibility: 'hidden',
                inputCountryVisibility: 'hidden',
                inputStateVisibility: 'hidden',
                inputCityVisibility: 'hidden',
                inputDistrictVisibility: 'hidden',
                inputStreetVisibility: 'hidden',
                inputNumberVisibility: 'hidden',
                inputComplementVisibility: 'hidden'
    });
    
    useEffect(() => {
        getUserAddress();
        getUserTypeAndStatusOptions();
    },[])

    function handleSubmit(e){
        e.preventDefault();

        if (e.target.id==='AccountInfo'){
            let info={
                id: userData.user.id,
                name: userData.user.name,
                surname: userData.user.surname,
                photoUrl: userData.user.photoUrl,
                birthday: userData.user.birthday,
                email: userData.user.email,
                password: userData.user.password,
                typeId: userData.user.typeId,
                statusId: userData.user.statusId
            };
            if (formVisibility.inputNameVisibility==='visible' && e.target.name.value!==''){
                info = {...info, name: e.target.name.value};
                e.target.name.value='';
            } 
            if (formVisibility.inputSurnameVisibility==='visible' && e.target.surname.value!==''){
                info = {...info, surname: e.target.surname.value};
                e.target.surname.value='';
            } 
            if (formVisibility.inputPhotoVisibility==='visible' && e.target.photo.value!==''){
                info = {...info, photo: e.target.photo.value};
                e.target.photo.value='';
            } 
            if (formVisibility.inputBirthdayVisibility==='visible' && e.target.birthday.value!==''){
                info = {...info, birthday: e.target.birthday.value};
                e.target.birthday.value='';
            } 
            if (formVisibility.inputTypeVisibility==='visible' && e.target.type.value!==''){
                info = {...info, type: e.target.type.value};
                e.target.type.value='';
            } 
            if (formVisibility.inputStatusVisibility==='visible' && e.target.status.value!==''){
                info = {...info, status: e.target.status.value};
                e.target.status.value='';
            } 

            if (info.name || info.surname ||  info.photo || info.birthday || info.type || info.status){
                info = {...info, id: userData.user.id};
                setFormVisibility({...formVisibility, form1Visibility: 'hidden'});
                //Funcao de salvar no db as informacoes alteradas
                document.location.reload();
            }
        } else if (e.target.id==='AccessInfo'){
            let info={
                id: userData.user.id,
                name: userData.user.name,
                surname: userData.user.surname,
                photoUrl: userData.user.photoUrl,
                birthday: userData.user.birthday,
                email: userData.user.email,
                password: userData.user.password,
                typeId: userData.user.typeId,
                statusId: userData.user.statusId
            };
            if (formVisibility.inputEmailVisibility==='visible' && e.target.email.value!==''){
                info = {...info, email: e.target.email.value};
                e.target.email.value='';
            }
            if (formVisibility.inputPasswordVisibility==='visible' && e.target.password.value!==''){
                if (e.target.password.value !== e.target.passwordVerification.value){
                    e.target.password.value = '';
                    e.target.passwordVerification.value = '';
                    alert('A senha e a confirmação devem ser iguais')
                    return
                } else if (e.target.password.value.length<6) {
                    e.target.password.value = '';
                    e.target.passwordVerification.value = '';
                    alert('A senha deve ter pelo menos 6 caracteres')
                    return
                } else {
                    info = {...info, password: e.target.password.value};
                    e.target.password.value='';
                    e.target.passwordVerification.value='';            
                }
            };

            if (info.email || info.password){
                info = {...info, id: userData.user.id};
                setFormVisibility({...formVisibility, form2Visibility: 'hidden'});
                //Funcao de salvar no db as informacoes alteradas
                document.location.reload();
            } 
        } else if (e.target.id==='AddressInfo') {
            let info={
                id: userAddress.id,
                userId: userAddress.userId,
                name: userAddress.name,
                country: userAddress.country,
                state: userAddress.state,
                city: userAddress.city,
                district: userAddress.district,
                street: userAddress.street,
                number: userAddress.number,
                complement: userAddress.complement
            };
            if (formVisibility.inputAddressNameVisibility==='visible' && e.target.name.value!==''){
                info = {...info, name: e.target.name.value};
                e.target.name.value='';
            } 
            if (formVisibility.inputCountryVisibility==='visible' && e.target.country.value!==''){
                info = {...info, country: e.target.country.value};
                e.target.country.value='';
            } 
            if (formVisibility.inputStateVisibility==='visible' && e.target.state.value!==''){
                info = {...info, state: e.target.state.value};
                e.target.state.value='';
            } 
            if (formVisibility.inputCityVisibility==='visible' && e.target.city.value!==''){
                info = {...info, city: e.target.city.value};
                e.target.city.value='';
            } 
            if (formVisibility.inputDistrictVisibility==='visible' && e.target.district.value!==''){
                info = {...info, district: e.target.district.value};
                e.target.district.value='';
            } 
            if (formVisibility.inputStreetVisibility==='visible' && e.target.street.value!==''){
                info = {...info, street: e.target.street.value};
                e.target.street.value='';
            } 
            if (formVisibility.inputNumberVisibility==='visible' && e.target.number.value!==''){
                info = {...info, number: e.target.number.value};
                e.target.number.value='';
            } 
            if (formVisibility.inputComplementVisibility==='visible' && e.target.complement.value!==''){
                info = {...info, complement: e.target.complement.value};
                e.target.complement.value='';
            }  

            if (info.name || info.country ||  info.state || info.city || info.district || info.street || info.number || info.complement){
                info = {...info, userId: userData.user.id};
                setFormVisibility({...formVisibility, form3Visibility: 'hidden'});
                //Funcao de salvar no db as informacoes alteradas
                document.location.reload();
            }
        }
    };

    function toggleForms(id){
        if(id==="AccountInfo"){
            if(formVisibility.form1Visibility==='hidden'){
                setFormVisibility({...formVisibility, form1Visibility: 'visible', form2Visibility: 'hidden', form3Visibility: 'hidden' });
            } else {
                setFormVisibility({...formVisibility, form1Visibility: 'hidden'});
            }
        } else if(id==="AccessInfo"){
            if(formVisibility.form2Visibility==='hidden'){
                setFormVisibility({...formVisibility, form2Visibility: 'visible', form1Visibility: 'hidden', form3Visibility: 'hidden' });
            } else {
                setFormVisibility({...formVisibility, form2Visibility: 'hidden'});
            }
        } else if(id==="AddressInfo"){
            if(formVisibility.form3Visibility==='hidden'){
                setFormVisibility({...formVisibility, form3Visibility: 'visible', form2Visibility: 'hidden', form1Visibility: 'hidden' });
            } else {
                setFormVisibility({...formVisibility, form3Visibility: 'hidden'});
            }
        }
    };

    function birthdayInputStyle(e){
        const value= e.target.value;

        if (e.key==='Backspace'){
            if(e.target.value.length===3){
                e.target.value = `${value.slice(0,-1)}`;
            } if(e.target.value.length===6){
                e.target.value = `${value.slice(0,-1)}`;
            }
        } else if (e.key !== '1' && e.key !== '2' && e.key !== '3' && e.key !== '4' && e.key !== '5' && e.key !== '6' && e.key !== '7' && e.key !== '8' && e.key !== '9' && e.key !== '0'){
            e.target.value = value.slice(0,-1);
        } else {
            if (e.target.value.length===2 && Number(value)>31){
                e.target.value = '31'
            } else if(e.target.value.length===3){
                e.target.value = `${value.slice(0,2)}/${value.slice(2,3)}`;
            } if (e.target.value.length===5 && Number(value.slice(3,5)>12)){
                e.target.value = value.slice(0,3)+'12';
            } else if(e.target.value.length===6){
                e.target.value = `${value.slice(0,5)}/${value.slice(5,6)}`;
            } else if(e.target.value.length===10 && Number(value.slice(6,10)>2022)){
                e.target.value = value.slice(0,6)+'2022';
            }
        }
    };

    async function getUserAddress(){
        const response = await GetUserAddress(userData.user.id);
        setUserAddress(response.userAddress)
    };

    async function getUserTypeAndStatusOptions(){
        const status = await GetUserStatus();
        const types = await GetUserTypes();
        setUserTypes(types.userTypes);
        setUserStatus(status.userStatus);
    };

    return (
        <Page>
            <TopBarComponent userData={userData} setUserData={setUserData}/>
            <Content>
                <h1>Informações do usuário</h1>
                <div className='title'><h3>Dados da Conta </h3><ion-icon name="chevron-down-outline" onClick={()=>toggleForms("AccountInfo")}/></div>
                {(formVisibility.form1Visibility === 'hidden') ? <></> :
                <Form id="AccountInfo" onSubmit={handleSubmit}>
                    <div className='left'>
                        <h2>Nome:</h2>
                        <h2>Sobrenome:</h2>
                        <h2>Foto:</h2>
                        <h2>Data de nascimento:</h2>
                        <h2>Tipo de conta:</h2>
                        <h2>Status:</h2>
                    </div>
                    <div className='right'>
                        {formVisibility.inputNameVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{userData.user.name==="" ? "-" : userData.user.name}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputNameVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='name' placeholder='Ex: João' />}
                        {formVisibility.inputSurnameVisibility==='hidden' ?
                        <div className='option'>
                            <h2>{userData.user.surname==="" ? "-" : userData.user.surname}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputSurnameVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        :
                        <input type='text' name='surname' placeholder='Ex: das Couves' />}
                        <input type='file' name='photo'/>
                        
                        {formVisibility.inputBirthdayVisibility==='hidden' ?
                        <div className='option'> 
                            <h2>{userData.user.birthday==="" ? "-" : userData.user.birthday}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputBirthdayVisibility: 'visible'})}>Editar</h3> 
                        </div> 
                        :
                        <input type='text' name='birthday' placeholder='Ex: 31/12/1900'  maxLength="10" onKeyUp={birthdayInputStyle}/>}  

                        {userData.user.typeId && formVisibility.inputTypeVisibility==='hidden' ?
                        <div className='option'>
                            <h2>{userTypes[userData.user.typeId-1].name}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputTypeVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> :
                        <div className='multiple2'>
                            <input type='radio' name='type' value='1'/>
                            <h3>{userTypes[0] ? userTypes[0].name : "Opcao 1"}</h3>
                            <input type='radio' name='type' value='2'/>
                            <h3>{userTypes[0] ? userTypes[1].name : "Opcao 2"}</h3>
                        </div>}
                        {userData.user.statusId && formVisibility.inputStatusVisibility==='hidden' ?
                        <div className='option'> 
                            <h2>{userStatus[userData.user.statusId-1].name}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputStatusVisibility: 'visible'})}>
                                Editar
                            </h3> 
                        </div> 
                        : 
                        <div className='multiple3'>
                            <input type='radio' name='status' value='1'/>
                            <h3>{userStatus[0] ? userStatus[0].name : "Opcao 1"}</h3>
                            <input type='radio' name='status' value='2'/>
                            <h3>{userStatus[0] ? userStatus[1].name : "Opcao 1"}</h3>
                            <input type='radio' name='status' value='3'/>
                            <h3>{userStatus[0] ? userStatus[2].name : "Opcao 1"}</h3>
                        </div>}
                    </div>
                    <Button>Salvar 1</Button>
                </Form>}
                <div className='title'><h3>Dados de Acesso </h3><ion-icon name="chevron-down-outline" onClick={()=>toggleForms("AccessInfo")}/></div>
                {(formVisibility.form2Visibility === 'hidden') ? <></> :
                <Form id="AccessInfo" onSubmit={handleSubmit}>
                    <div className='left'>
                        <h2>E-mail:</h2>
                        <h2>Senha:</h2>
                        <h2>Confirmação da senha:</h2>
                    </div>
                    <div className='right'>
                        {formVisibility.inputEmailVisibility==='hidden' ?
                        <div className='option'> 
                            <h2>{userData.user.email==="" ? "-" : userData.user.email}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputEmailVisibility: 'visible', inputPasswordVisibility: 'visible', inputPasswordVerificationVisibility: 'visible'})}>Editar</h3>
                        </div> 
                        :
                        <input type='email' name='email' placeholder='Ex: joao-das-couves@gmail.com'/>}
                        {formVisibility.inputPasswordVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>********</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputPasswordVisibility: 'visible', inputPasswordVerificationVisibility: 'visible'})}>Editar</h3> 
                        </div> 
                        : 
                        <input type='password' name='password'/>}
                        {formVisibility.inputPasswordVerificationVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>********</h2>
                        </div> 
                        :
                        <input type='password' name='passwordVerification'/>}
                    </div>
                <Button>Salvar 2</Button>
                </Form>}
                <div className='title'><h3>Dados de Endereço </h3><ion-icon name="chevron-down-outline" onClick={()=>toggleForms("AddressInfo")}/></div>
                {(formVisibility.form3Visibility === 'hidden') ? <></> :
                <Form id="AddressInfo" onSubmit={handleSubmit}>
                    <div className='left'>
                        <h2>Apelido:</h2>
                        <h2>País:</h2>
                        <h2>Estado:</h2>
                        <h2>Cidade:</h2>
                        <h2>Bairro:</h2>
                        <h2>Endereço:</h2>
                        <h2>Número:</h2>
                        <h2>Complemento:</h2>
                    </div>
                    <div className='right'>
                        {formVisibility.inputAddressNameVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.name==="" ? "-" : userAddress.name}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputAddressNameVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='name' placeholder='Ex: Casa'/>}
                        {formVisibility.inputCountryVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.country==="" ? "-" : userAddress.country}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputCountryVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='country' placeholder='Ex: Brasil' />}
                        {formVisibility.inputStateVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.state==="" ? "-" : userAddress.state}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputStateVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='state' placeholder='Ex: Tocantins' />}
                        {formVisibility.inputCityVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.city==="" ? "-" : userAddress.city}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputCityVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='city' placeholder='Ex: Palmas' />}
                        {formVisibility.inputDistrictVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.district==="" ? "-" : userAddress.district}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputDistrictVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='district' placeholder='Ex: Centro' />}
                        {formVisibility.inputStreetVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.street==="" ? "-" : userAddress.street}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputStreetVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='street' placeholder='Ex: Rua das Flores' />}
                        {formVisibility.inputNumberVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.number==="" ? "-" : userAddress.number}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputNumberVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='number' placeholder='Ex: 150'/>}
                        {formVisibility.inputComplementVisibility==='hidden' ? 
                        <div className='option'> 
                            <h2>{!userAddress || userAddress.complement==="" ? "-" : userAddress.complement}</h2>
                            <h3 onClick={()=>setFormVisibility({...formVisibility, inputComplementVisibility: 'visible'})}>
                                Editar
                            </h3>
                        </div> 
                        : 
                        <input type='text' name='complement' placeholder='Ex: Apartamento 804'/>}
                    </div>
                <Button>Salvar 3</Button>
                </Form>}
            </Content>
            <BottomBarComponent />
        </Page>
    );
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

    .left{
        width: 35%;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-weight: 700;
        margin-top: 8px;
    }

    .right{
        width: 50%;
        margin-left: 20px;
    }

    h1{
        font-size: 30px;
        font-weight: 700;
        margin-top: 30px;
        margin-bottom: 50px;
    }

    h3{
        font-size: 20px;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 30px;
        margin-left: 50px;
    }

    ion-icon{
        font-size: 28px;
        font-weight: 700;
        margin-top: 15px;
        margin-left: 50px;
        cursor: pointer;
    }

    h2{
        font-size: 20px;
        margin-bottom: 30px;
    }

    .title{
        display: flex;
    }

    input{
        width: 400px;
        height: 35px;
        margin-bottom: 15px;
        padding-left: 15px;
        border-radius: 5px;
        border: 1px solid #bcbdbf;
        font-size: 20px;

        ::placeholder{
            font-size: 16px;
        }
    }
`;

const Button = styled.button`
    background-color: #d8d8d8;
    font-size: 15px;
    padding: 5px 20px;
    border: 1px solid #BCBDBF;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    right: 550px;

    :hover{
        background-color: #BCBDBF;
    }
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    padding-bottom: 50px;

    input{
        display: flex;
        padding-left: 5px;
        padding-top: 7px;
        border: none;
        font-size: 15px;
    }

    .option{
        width: 400px;
        height: 35px;
        margin: 0;
        padding: 0;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 15px;
        align-items: center;
        justify-content: space-between;

        h2{
            font-size: 18px;
            font-weight: 400;
            color: #000000;
            margin: 0;
            padding: 0;
        }

        h3{
            font-size: 12px;
            font-weight: 700;
            color: #000000;
            margin: 0;
            padding: 0;
            cursor: pointer;
        }
    }

    .multiple2{
        width: 400px;
        height: 35px;
        margin: 0;
        padding: 0;
        padding-left: 10px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;

        input{
            margin: 0;
            padding: 0;
            margin-left: -50px;
            margin-right: -30px;
            height: 15px;
        }

        h3{
            margin: 0;
            padding: 0;
            margin-right: 80px;
            font-size: 18px;
            font-weight: 400;
        }
    }

    .multiple3{
        width: 400px;
        height: 35px;
        margin: 0;
        padding: 0;
        padding-left: 10px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;

        input{
            margin: 0;
            padding: 0;
            margin-left: -15px;
            height: 15px;
        }

        h3{
            margin: 0;
            padding: 0;
            margin-right: 30px;
            font-size: 18px;
            font-weight: 400;
        }
    }
`;
