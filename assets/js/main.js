const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li') 
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
}
});

function limpaInput() {
 inputTarefa.value = '';   
 inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += '  ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa ')
    li.appendChild(botaoApagar);


}

function criaTarefa(textoInput) {
   const li = criaLi();
   li.innerText = textoInput;
   tarefas.appendChild(li);
   limpaInput();
   criaBotaoApagar(li);
   salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target;

    if (el.classList.contains('apagar')) {
el.parentElement.remove();
salvarTarefas();
    }
})

function salvarTarefas(){
  const liTarefas = tarefas.querySelectorAll('li');   
  const listaDeTarefas = []

  for (let tarefa of liTarefas){
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim();// .trim remove espaco  depois do texto em lista de tarefas
      listaDeTarefas.push(tarefaTexto);  // jogar no array    
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);//string do array convertido en JSON
  localStorage.setItem('tarefas', tarefasJSON)// so pode salvar string por isso converter em JSON


}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);// convertendo tarefas em array novamente
    console.log(tarefas);

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();