import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { use } from 'react'

// function ListaUsuario(){
// const usuarios = [
// { id: 1, nome: "Ana", email: "ana@email.com" },
// { id: 2, nome: "Bruno", email: "bruno@email.com" },
// { id: 3, nome: "Carlos", email: "carlos@email.com" },
// ];
// return(
//  <div>
//   <ul >{usuarios.map((usuarios) =><li key={usuarios.id}>
//    {usuarios.nome} - {usuarios.email}
//   </li>)}
  
//   </ul>
//  </div>
// )

// }

// export default ListaUsuario

function ListaUsuario(){

   const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Ana", email: "ana@email.com" },
    { id: 2, nome: "Bruno", email: "bruno@email.com" },
    { id: 3, nome: "Carlos", email: "carlos@email.com" },
  ]);


const [Nome,SetNome] = useState("")
const [email,Setemail] = useState("")


function addUsuario(){

  if(Nome.trim() === "" || email.trim() === ""){
    return;
  }

  const NovoUsuario ={
    id:Date.now(),
    nome:Nome,
    email:email
  };
  setUsuarios([...usuarios, NovoUsuario]);
  SetNome("");
  Setemail("");
  
}
return(
<div>
  <h2>Adicionar usuario</h2>

  <input type="text"
  placeholder='nome'
  value={Nome}
  onChange={(e) => SetNome(e.target.value) } />


  <input type="text"
  placeholder='email'
  value={email}
  onChange={(e) => Setemail(e.target.value)} />

  <button onClick={addUsuario} >Adicionar Usuario</button>
  <h2>{ListaUsuario}</h2>

  <ul>
    {usuarios.map((usuario)=> <li key={usuario.id}>
      {usuario.nome} - {usuario.email}
    </li> )}
  </ul>
</div>

)
}

export default ListaUsuario