let participantes = [
  {
    nome: "Ellen",
    email: "ruth_ellen.araujo@hotmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Maria",
    email: "araujo@hotmail.com",
    dataInscricao: new Date(2023, 5, 21, 10, 10),
    dataCheckIn: new Date(2023, 3, 22, 12, 0)
  },
  {
    nome: "João",
    email: "joao@example.com",
    dataInscricao: new Date(2022, 7, 15, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "Ana",
    email: "ana@example.com",
    dataInscricao: new Date(2021, 10, 5, 9, 0),
    dataCheckIn: new Date(2021, 10, 8, 16, 20)
  },
  {
    nome: "Pedro",
    email: "pedro@example.com",
    dataInscricao: new Date(2020, 1, 12, 18, 45),
    dataCheckIn: new Date(2020, 1, 15, 11, 10)
  },
  {
    nome: "Mariana",
    email: "mariana@example.com",
    dataInscricao: new Date(2019, 4, 25, 11, 20),
    dataCheckIn: new Date(2019, 4, 28, 19, 30)
  },
  {
    nome: "Lucas",
    email: "lucas@example.com",
    dataInscricao: new Date(2018, 8, 10, 8, 15),
    dataCheckIn: new Date(2018, 8, 13, 13, 40)
  },
  {
    nome: "Carla",
    email: "carla@example.com",
    dataInscricao: new Date(2017, 6, 30, 13, 45),
    dataCheckIn: new Date(2017, 7, 2, 10, 5)
  },
  {
    nome: "Rafael",
    email: "rafael@example.com",
    dataInscricao: new Date(2016, 3, 18, 20, 0),
    dataCheckIn: new Date(2016, 3, 21, 15, 15)
  },
  {
    nome: "Camila",
    email: "camila@example.com",
    dataInscricao: new Date(2015, 11, 8, 16, 30),
    dataCheckIn: new Date(2015, 11, 11, 9, 55)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to (participante.dataCheckIn)

  //estrutura condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
       <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
        >
        Confirmar check-in
        </button>
    
    `
  }

  return `
  <tr>
      <td>
       <strong>
         ${participante.nome} 
        </strong>
        <br>
        <small>
         ${participante.email}
        </small>
      </td>
      <td> ${dataInscricao}</td>
      <td> ${dataCheckIn}</td>
  </tr>
  `
}

const atualizarlista = (participantes) => {
  let output = ""
  //estrutura de repetiçao - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
    //faça alguma coisa
  }

  //Substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output 
} 
  atualizarlista(participantes) //chamando a funçao e substituindo

  const adicionarParticipante = (event) => {
    event.preventDefault()

   const dadosDoFormulario = new FormData(event.target)
   
   const participante = {
     nome: dadosDoFormulario.get('nome'),
     email: dadosDoFormulario.get('email'),
     dataInscricao: new Date(),
     dataCheckIn: null
   }

   // verificar se o participante ja existe
   const participanteExiste = participantes.find(
     (p) => {
       return p.email == participante.email
      
     }
   )
   if(participanteExiste) {
     alert('Email já cadastrado!')
     return
   }

   participantes = [participante, ...participantes]
   atualizarlista(participantes)

   //limpar formulario
   event.target.querySelector('[name="nome"]').value = ""
   event.target.querySelector('[name="email"]').value = ""

  }

  const fazerCheckIn = (event) => {
    //confirmar se participante realmente quer fazer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
      return
  }
    
     //encontrar o participánte dentro da lista
     const participante = participantes.find((p) => {
       return p.email == event.target.dataset.email
     })
     //atualizar o check-in do participante
      participante.dataCheckIn = new Date()

     //atualizar a lista de participantes 
     atualizarlista(participantes)
  }