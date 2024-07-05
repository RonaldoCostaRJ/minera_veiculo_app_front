/*
  --------------------------------------------------------------------------------------
  Função para obter a lista completa de informações existente do servidor via requisição GET na API
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/modeloautos';
  nome_modelo = document.getElementById("consultaModelo").value="";
  limpaList();
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
      .then((data) => {
      data.modelos_auto.forEach(item => insertList(item.regiao_busca,item.categoria_modelo, item.marca_modelo, item.tipo_modelo,item.tipo_cambio_modelo, item.nome_modelo,
        item.ano_desde_modelo, item.ano_ate_modelo, item.km_desde, item.km_ate,item.valor_desde_modelo,item.valor_ate_modelo))      
        
      })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para obter um único registro de uma busca a partir de um nome de modelo de automóvel indicado via requisição GET
  --------------------------------------------------------------------------------------
*/
const getModelo = async () => {

  nome_modelo = document.getElementById("consultaModelo").value;
  

  ///Nome do modelo deve ser passado para o endpoint
  let url = 'http://127.0.0.1:5000/modeloauto?nome_modelo=' + nome_modelo;
  ////////////////////////
  fetch(url, {
    method: 'get',  })
    .then((response) => response.json())
      .then((data) => {
        item=data;
        ///chama a função limpa lista para limpar os dados do grid e manter somente o modelo retornado via API
        limpaList();
        ////insere os dados no grid
        insertList(item.regiao_busca,item.categoria_modelo, item.marca_modelo, item.tipo_modelo,item.tipo_cambio_modelo, item.nome_modelo,
        item.ano_desde_modelo, item.ano_ate_modelo, item.km_desde, item.km_ate,item.valor_desde_modelo,item.valor_ate_modelo)    
        
      })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para limpar os dados da table, mantendo somente a linha do título
  --------------------------------------------------------------------------------------
*/
const limpaList = async () => {

  var table = document.getElementById('myTable');
  var linhas =  table.getElementsByTagName('tr');
  var numlinhas = linhas.length;
  while (numlinhas > 1) {
    table.deleteRow(numlinhas-1);
    numlinhas = linhas.length;
  }

}
/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
onload = function () {
  getList()
};
/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputRegiao, inputCategoria_modelo, inputMarca, inputTipoModelo, inputTipo_cambio_modelo, inputModelo,
  inputAno_desde_modelo, inputAno_ate_modelo, inputKm_desde,inputKm_ate, inputvalor_desde_modelo,inputValor_ate_modelo) => {
  const formData = new FormData();
  formData.append('regiao_busca', inputRegiao);
  formData.append('categoria_modelo', inputCategoria_modelo);
  formData.append('marca_modelo', inputMarca);
  formData.append('tipo_modelo', inputTipoModelo);  
  formData.append('tipo_cambio_modelo', inputTipo_cambio_modelo);
  formData.append('nome_modelo', inputModelo);
  formData.append('ano_desde_modelo', inputAno_desde_modelo);
  formData.append('ano_ate_modelo', inputAno_ate_modelo);
  formData.append('km_desde', inputKm_desde);
  formData.append('km_ate', inputKm_ate);
  formData.append('valor_ate_modelo', inputValor_ate_modelo);
  formData.append('valor_desde_modelo',inputvalor_desde_modelo);
  
  
  let url = 'http://127.0.0.1:5000/modeloauto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      ///indica o índice da coluna contendo o nome do modelo, que neste caso é zero(0).
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja excluir o modelo " +nomeItem + " ?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("O modelo " + nomeItem + " foi  removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  
  let url = 'http://127.0.0.1:5000/modeloauto?&nome_modelo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item ........
  --------------------------------------------------------------------------------------
*/

const newItem = () => {
  
  let inputRegiao = document.getElementById("localizacao-select").value;
  let inputCategoria_modelo = document.getElementById("categoria-select").value;
  let inputTipoModelo = document.getElementById("tipoVeiculos-select").value;
  let inputTipo_cambio_modelo = document.getElementById("tipoCambio-select").value;
  let inputMarca = document.getElementById("marca-select").value;
  let inputModelo = document.getElementById("modelo").value;
  let inputvalor_desde_modelo = document.getElementById("valorDesde").value;
  let inputValor_ate_modelo = document.getElementById("valorate").value;
  let inputAno_desde_modelo = document.getElementById("anoDesde").value;
  let inputAno_ate_modelo = document.getElementById("anoAte").value;
  let inputKm_desde = document.getElementById("kmDesde").value;
  let inputKm_ate = document.getElementById("kmate").value;
//////tratamento para campos em branco
  if (inputRegiao === '') {
    alert("É preciso escolher a Região!");
  } 
  else if(inputCategoria_modelo === '') {
    alert("É preciso escolher a Categoria!");
  } 
  else if(inputTipoModelo === '') {
    alert("É preciso escolher a Categoria!");
  } 
  else if(inputTipo_cambio_modelo === '') {
    alert("É preciso escolher a Categoria!");
  } 
  else if(inputMarca === '') {
    alert("É preciso escolher a Categoria!");
  } 
  else if(inputModelo === '') {
    alert("É preciso escolher a Categoria!");
  } 
  else if(inputCategoria_modelo === '') {
    alert("É preciso escolher a Categoria!");
  } 
    else if (isNaN(inputvalor_desde_modelo) || isNaN(inputValor_ate_modelo)  || 
          isNaN(inputAno_desde_modelo) || isNaN(inputAno_ate_modelo) ||
           isNaN(inputKm_desde) || isNaN(inputKm_ate) ) {
    alert("Valor, Anos e Kilometragem precisam ser números!");
  }    
  else {

    insertList(inputRegiao, inputCategoria_modelo, inputMarca, inputTipoModelo, inputTipo_cambio_modelo, inputModelo,
      inputAno_desde_modelo, inputAno_ate_modelo, inputKm_desde,inputKm_ate, inputvalor_desde_modelo,inputValor_ate_modelo)
      
    postItem (inputRegiao, inputCategoria_modelo, inputMarca, inputTipoModelo, inputTipo_cambio_modelo, inputModelo,
      inputAno_desde_modelo, inputAno_ate_modelo, inputKm_desde,inputKm_ate, inputvalor_desde_modelo,inputValor_ate_modelo)
    
      alert("Item adicionado!")
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (regiao_busca,categoria_modelo, marca_modelo, tipo_modelo, tipo_cambio_modelo, nome_modelo, ano_desde_modelo, ano_ate_modelo,km_desde,km_ate, valor_desde_modelo, valor_ate_modelo) => {
  
  var item = [nome_modelo, marca_modelo, categoria_modelo, tipo_modelo, tipo_cambio_modelo, regiao_busca, ano_desde_modelo, ano_ate_modelo,km_desde,km_ate, valor_desde_modelo, valor_ate_modelo];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
 
  document.getElementById("localizacao-select").value= "";
  document.getElementById("categoria-select").value= "";
  document.getElementById("tipoVeiculos-select").value= "";
  document.getElementById("tipoCambio-select").value= "";
  document.getElementById("marca-select").value= "";
  document.getElementById("modelo").value= "";
  document.getElementById("anoDesde").value= "";
  document.getElementById("anoAte").value= "";
  document.getElementById("kmDesde").value= "";
  document.getElementById("kmate").value= "";
  document.getElementById("valorDesde").value= "";
  document.getElementById("valorate").value= "";
  removeElement()
}