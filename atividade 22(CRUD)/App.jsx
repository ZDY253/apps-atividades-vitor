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

Lista CRUD em React — Questões 2 até 11

Introdução

CRUD significa Create, Read, Update e Delete. São as quatro operações básicas utilizadas para manipular dados em aplicações.

- Create: adicionar novos itens.
- Read: visualizar os itens existentes.
- Update: atualizar ou editar itens.
- Delete: remover itens.

Em React, utilizamos o "useState" para armazenar e atualizar informações. Também utilizamos métodos JavaScript como "map()", "filter()" e o operador spread ("...").

---

Questão 2 — Entendendo o estado

O useState é necessário porque permite que o React identifique mudanças nos dados e atualize a tela automaticamente. Uma variável comum não provoca uma nova renderização.

// Versão A: variável comum
const usuarios = ["Ana", "Bruno"];

// Versão B: utilizando useState
const [usuarios, setUsuarios] = useState(["Ana", "Bruno"]);

// O useState permite atualizar os dados e avisar
// o React para renderizar novamente a interface.

Questão 3 — Lista de nomes (CREATE e READ)

Criação de uma lista de nomes com input controlado, botão para adicionar e exibição dos nomes utilizando map().

import { useState } from "react";

function ListaDeNomes() {
    const [nomes, setNomes] = useState(["Ana", "Bruno"]);
    const [input, setInput] = useState("");

    function adicionarNome() {
        setNomes([...nomes, input]);
        setInput("");
    }

    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={adicionarNome}>
                Adicionar
            </button>

            <ul>
                {nomes.map((nome, index) => (
                    <li key={index}>{nome}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListaDeNomes;

Questão 4 — Lista de tarefas com objetos

Nesta questão, cada tarefa possui um ID único e um texto. O Date.now() é utilizado para gerar o identificador.

import { useState } from "react";

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [input, setInput] = useState("");

    function adicionarTarefa() {
        const novaTarefa = {
            id: Date.now(),
            texto: input
        };

        setTarefas([...tarefas, novaTarefa]);
        setInput("");
    }

    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={adicionarTarefa}>
                Adicionar
            </button>

            <ul>
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id}>
                        {tarefa.texto}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;

Questão 5 — Impedir itens vazios

Utilizamos o método trim() para impedir que o usuário adicione tarefas vazias ou contendo apenas espaços.

function adicionarTarefa() {
    if (input.trim() === "") {
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: input.trim()
    };

    setTarefas([...tarefas, novaTarefa]);
    setInput("");
}

Questão 6 — Remover nomes (DELETE)

Utilizamos o filter() para remover somente o item selecionado pelo ID.

function removerNome(id) {
    setNomes(
        nomes.filter(nome => nome.id !== id)
    );
}

Renderização da lista com botão de remoção:

<ul>
    {nomes.map((nome) => (
        <li key={nome.id}>
            {nome.texto}

            <button onClick={() => removerNome(nome.id)}>
                Remover
            </button>
        </li>
    ))}
</ul>

Questão 7 — CRUD de tarefas (CREATE e DELETE)

Nesta questão, juntamos as funcionalidades de adicionar e remover tarefas, além de mostrar a quantidade total de itens.

import { useState } from "react";

function App() {
    const [tarefas, setTarefas] = useState([]);
    const [input, setInput] = useState("");

    function adicionar() {
        if (input.trim() === "") return;

        const novaTarefa = {
            id: Date.now(),
            texto: input
        };

        setTarefas([...tarefas, novaTarefa]);
        setInput("");
    }

    function remover(id) {
        setTarefas(
            tarefas.filter(tarefa => tarefa.id !== id)
        );
    }

    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={adicionar}>
                Adicionar
            </button>

            <h3>Total: {tarefas.length}</h3>

            {tarefas.map(tarefa => (
                <p key={tarefa.id}>
                    {tarefa.texto}

                    <button onClick={() => remover(tarefa.id)}>
                        Remover
                    </button>
                </p>
            ))}
        </div>
    );
}

export default App;

Questão 8 — Por que usar filter() em vez de splice()?

O filter() é preferível porque cria um novo array sem modificar o original. Já o splice() modifica diretamente o array existente, o que não é recomendado para atualizar estados no React.

// Usamos filter() porque ele cria um novo array,
// sem modificar o array original.
// O splice() altera diretamente o array,
// podendo impedir o React de detectar a mudança.

Questão 9 — Editar tarefas com prompt() (UPDATE)

Utilizamos prompt() para solicitar um novo texto e map() para encontrar e atualizar a tarefa correspondente.

function editarTarefa(id) {
    const novoTexto = prompt("Novo texto:");

    if (novoTexto && novoTexto.trim() !== "") {
        setTarefas(
            tarefas.map(tarefa =>
                tarefa.id === id
                    ? {
                        ...tarefa,
                        texto: novoTexto.trim()
                    }
                    : tarefa
            )
        );
    }
}

Botão para editar:

<button onClick={() => editarTarefa(tarefa.id)}>
    Editar
</button>

Questão 10 — Edição inline (UPDATE)

Nesta questão, o usuário consegue editar uma tarefa diretamente na tela, utilizando um input, sem precisar abrir um prompt().

import { useState } from "react";

function App() {
    const [tarefas, setTarefas] = useState([
        { id: 1, texto: "Estudar React" },
        { id: 2, texto: "Fazer exercícios" }
    ]);

    const [editandoId, setEditandoId] = useState(null);
    const [novoTexto, setNovoTexto] = useState("");

    function editar(tarefa) {
        setEditandoId(tarefa.id);
        setNovoTexto(tarefa.texto);
    }

    function salvar(id) {
        setTarefas(
            tarefas.map(tarefa =>
                tarefa.id === id
                    ? { ...tarefa, texto: novoTexto }
                    : tarefa
            )
        );

        setEditandoId(null);
    }

    return (
        <div>
            {tarefas.map(tarefa => (
                <div key={tarefa.id}>

                    {editandoId === tarefa.id ? (
                        <>
                            <input
                                value={novoTexto}
                                onChange={(e) =>
                                    setNovoTexto(e.target.value)
                                }
                            />

                            <button onClick={() => salvar(tarefa.id)}>
                                Salvar
                            </button>

                            <button onClick={() => setEditandoId(null)}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            {tarefa.texto}

                            <button onClick={() => editar(tarefa)}>
                                Editar
                            </button>
                        </>
                    )}

                </div>
            ))}
        </div>
    );
}

export default App;

Questão 11 — Toggle (Concluída)

Nesta última questão, adicionamos um checkbox para marcar e desmarcar tarefas como concluídas.

Utilizamos map() e spread para atualizar somente a tarefa selecionada. O operador ! inverte o valor booleano.

import { useState } from "react";

function App() {
    const [tarefas, setTarefas] = useState([
        { id: 1, texto: "Estudar", concluida: false },
        { id: 2, texto: "Programar", concluida: false }
    ]);

    function alternarConclusao(id) {
        setTarefas(
            tarefas.map(tarefa =>
                tarefa.id === id
                    ? {
                        ...tarefa,
                        concluida: !tarefa.concluida
                    }
                    : tarefa
            )
        );
    }

    return (
        <div>
            {tarefas.map(tarefa => (
                <div key={tarefa.id}>

                    <input
                        type="checkbox"
                        checked={tarefa.concluida}
                        onChange={() => alternarConclusao(tarefa.id)}
                    />

                    <span>
                        {tarefa.texto}
                        {tarefa.concluida
                            ? " - Concluída"
                            : " - Pendente"}
                    </span>

                </div>
            ))}
        </div>
    );
}

export default App;

---

Resumo dos principais métodos utilizados

Método| Função
useState()| Gerenciar estados
map()| Percorrer e atualizar arrays
filter()| Filtrar e remover elementos
spread (...)| Copiar arrays e objetos
Date.now()| Gerar identificadores
trim()| Remover espaços desnecessários
prompt()| Solicitar informações
length| Contar elementos
!| Inverter valores booleanos

Conclusão

Com essas questões, foi possível praticar os principais conceitos de CRUD utilizando React e JavaScript.

O aprendizado dessas operações é importante para desenvolver aplicações que permitem cadastrar, visualizar, editar e excluir informações.

Tecnologias utilizadas:

- JavaScript
- React
- JSX
- useState
- Métodos de arrays
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