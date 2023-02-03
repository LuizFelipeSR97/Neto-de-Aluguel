import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main(){
  await prisma.sessions.deleteMany({});
  await prisma.addresses.deleteMany({});
  await prisma.messages.deleteMany({});  
  await prisma.conversations.deleteMany({});
  await prisma.services.deleteMany({});
  await prisma.servicesStatus.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.usersStatus.deleteMany({});
  await prisma.messageStatus.deleteMany({});
  await prisma.userTypes.deleteMany({});

  await prisma.servicesStatus.createMany({
    data: [
      {id:1, name: 'Aberto'},
      {id:2, name: 'Em andamento'},
      {id:3, name: 'Em análise'},
      {id:4, name: 'Fechado'},
    ]
  });
  await prisma.userTypes.createMany({
    data: [
      {id:1, name: 'Ajudante'},
      {id:2, name: 'Ajudado(a)'}
    ]
  });
  await prisma.messageStatus.createMany({
    data: [
      {id:1, name: 'Lida'},
      {id:2, name: 'Não lida'}
    ]
  });
  await prisma.usersStatus.createMany({
    data: [
      {id:1, name: 'Disponível'},
      {id:2, name: 'Ocupado(a)'},
      {id:3, name: 'Ausente'}
    ]
  });
  
  await prisma.users.createMany({
    data: [
      {
        id:1, 
        name: 'Andre',
        surname: 'Alves',
        birthday: '2000-01-01',
        email: 'andre@gmail.com',
        password: '123456',
        typeId: 1,
        statusId: 2
      },
      {
        id:2, 
        name: 'Bernardo',
        surname: 'Bastos',
        birthday: '2000-02-01',
        email: 'bernardo@gmail.com',
        password: '123456',
        typeId: 1,
        statusId: 3
      },
      {
        id:3, 
        name: 'Carolina',
        surname: 'Castro',
        birthday: '2000-03-01',
        email: 'carol@gmail.com',
        password: '123456',
        typeId: 1,
        statusId: 3
      },
      {
        id:4, 
        name: 'Daniela',
        surname: 'Dourado',
        birthday: '2000-04-01',
        email: 'dani@gmail.com',
        password: '123456',
        typeId: 1,
        statusId: 3
      },
      {
        id:5, 
        name: 'Eduardo',
        surname: 'Estrella',
        birthday: '1970-05-01',
        email: 'eduardo@gmail.com',
        password: '123456',
        typeId: 2,
        statusId: 3
      },
      {
        id:6, 
        name: 'Fernanda',
        surname: 'Farias',
        birthday: '1970-06-01',
        email: 'fernanda@gmail.com',
        password: '123456',
        typeId: 2,
        statusId: 3
      },
      {
        id:7, 
        name: 'Gabriela',
        surname: 'Goes',
        birthday: '1970-07-01',
        email: 'fernanda@gmail.com',
        password: '123456',
        typeId: 2,
        statusId: 3
      },
      {
        id:8, 
        name: 'Hugo',
        surname: 'Horta',
        birthday: '1970-08-01',
        email: 'hugo@gmail.com',
        password: '123456',
        typeId: 2,
        statusId: 3
      }
    ]
  });

  await prisma.addresses.createMany({
    data: [
      {
        id:1, 
        userId: 1,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
      {
        id:2, 
        userId: 2,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
      {
        id:3, 
        userId: 3,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
      {
        id:4, 
        userId: 4,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
      {
        id:5, 
        userId: 5,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
      {
        id:6, 
        userId: 6,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
      {
        id:7, 
        userId: 7,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
      {
        id:8, 
        userId: 8,
        name: 'Casa',
        country: 'Brasil',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        district: 'São Conrado'
      },
    ]
  });

  await prisma.services.createMany({
    data: [
      {
        id:1, 
        name: 'Meu monitor não está ligando',
        description: 'Meu monitor ta na tomada mas não funciona',
        statusId: 2,
        requesterId: 5,
        helperId: 1,
        price: 200
      },
      {
        id:2, 
        name: 'Meu monitor não está ligando',
        description: 'Meu monitor ta na tomada mas não funciona',
        statusId: 1,
        requesterId: 6,
        helperId: 6,
        price: 200
      },
      {
        id:3, 
        name: 'Meu monitor não está ligando',
        description: 'Meu monitor ta na tomada mas não funciona',
        statusId: 1,
        requesterId: 7,
        helperId: 7,
        price: 200
      },
      {
        id:4, 
        name: 'Meu monitor não está ligando',
        description: 'Meu monitor ta na tomada mas não funciona',
        statusId: 1,
        requesterId: 8,
        helperId: 8,
        price: 200
      },
      {
        id:5, 
        name: 'Meus videos do youtube demoram muito pra carregar',
        description: 'Quando coloco pra ver meus videos no youtube, eles demoram mais de 1 minuto pra carregar.',
        statusId: 1,
        requesterId: 7,
        helperId: 7,
        price: 500
      },
      {
        id:6, 
        name: 'Meu monitor não está ligando',
        description: 'Meu monitor ta na tomada mas não funciona',
        statusId: 1,
        requesterId: 4,
        helperId: 4,
        price: 500
      }
    ]
  });

  await prisma.conversations.createMany({
    data: [
      {
        id:1, 
        requesterId: 5,
        helperId: 1
      },
      {
        id:2, 
        requesterId: 5,
        helperId: 2
      },
      {
        id:3, 
        requesterId: 7,
        helperId: 3
      },
      {
        id:4, 
        requesterId: 7,
        helperId: 4
      }
    ]
  });

  await prisma.messages.createMany({
    data: [
      {
        id:1, 
        senderId: 1,
        recipientId: 5,
        conversationId: 1,
        statusId: 1,
        text: 'Olá Eduardo, me chamo André. Posso te ajudar com a sua dúvida, pode aceitar minha solicitação?'
      },
      {
        id:2, 
        senderId: 1,
        recipientId: 5,
        conversationId: 2,
        statusId: 1,
        text: 'Olá Eduardo, me chamo Bernardo. Posso te ajudar com a sua dúvida, pode aceitar minha solicitação?'
      },
      {
        id:3, 
        senderId: 5,
        recipientId: 1,
        conversationId: 1,
        statusId: 1,
        text: 'Oi André, acabei de aceitar. Obrigado pela ajuda'
      },
      {
        id:4, 
        senderId: 1,
        recipientId: 5,
        conversationId: 1,
        statusId: 1,
        text: 'Pode me passar o seu número de celular, de preferência um que tenha Whatsapp?'
      },
      {
        id:5, 
        senderId: 5,
        recipientId: 1,
        conversationId: 1,
        statusId: 1,
        text: 'Posso sim, é (21) 99999-9999'
      },
      {
        id:6, 
        senderId: 3,
        recipientId: 7,
        conversationId: 3,
        statusId: 2,
        text: 'Olá Gabriela, me chamo Carol. Posso te ajudar com a sua dúvida, pode aceitar minha solicitação?'
      },
      {
        id:7, 
        senderId: 4,
        recipientId: 7,
        conversationId: 4,
        statusId: 2,
        text: 'Olá Gabriela, me chamo Daniela. Posso te ajudar com a sua dúvida, pode aceitar minha solicitação?'
      }
    ]
  });

  await prisma.sessions.createMany({
    data: [
      {
        id:1, 
        userId: 1,
        token: 'abcd1234'
      },
      {
        id:2, 
        userId: 5,
        token: 'ab12'
      }
    ]
  });
  };

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
