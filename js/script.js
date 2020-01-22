
class DespesasClass {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() { // O this[i] percorre todas os atributos acima e faz a verificacao abaixo
        for(let i in this) {
            if(this[i] == undefined || this[i] == null || this[i] == '') {
                return false
            } 
        }
        return true
    }
}

class BancoDados {
    constructor() {
        let id = localStorage.getItem('id')
        
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')

        return parseInt(proximoId) + 1
    }
    gravar(des) {
        let id = this.getProximoId()// Valor retornado da funcao que soma mais 1

        localStorage.setItem(id, JSON.stringify(des))

        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros() {

        // array de despesa
        let despesas_armazenadas = Array()
        
        let id = localStorage.getItem('id')
        
        // recuperação de todas as despesas no localStorage
        for(let i = 1; i <= id; i++) {
            // recupera despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // Retirada de indices null's (ou seja, excluido)
            if(despesa === null) {
                continue
            }

            console.log(i)
            
            despesa.id = i

            console.log(despesa)
            despesas_armazenadas.push(despesa)
        }
        return despesas_armazenadas

    }

    pesquisar(infoDespesa) {
        let despesaFiltrada = Array()

        despesaFiltrada = this.recuperarTodosRegistros()

        // Filtragem dos atributos dos objetos alocados no localStorage
        // ano
        if(infoDespesa.ano != '') {
            despesaFiltrada = despesaFiltrada.filter(idenObj => idenObj.ano == infoDespesa.ano)
        }
        
        //mes
        if(infoDespesa.mes != '') {
            despesaFiltrada = despesaFiltrada.filter(idenObj => idenObj.mes == infoDespesa.mes)
        }
        
        //dia
        if(infoDespesa.dia != '') {
            despesaFiltrada = despesaFiltrada.filter(idenObj => idenObj.dia == infoDespesa.dia)
        }
        
        //tipo
        if(infoDespesa.tipo != '') {
            despesaFiltrada = despesaFiltrada.filter(idenObj => idenObj.tipo == infoDespesa.tipo)
        }

        //descricao
        if(infoDespesa.descricao != '') {
            despesaFiltrada = despesaFiltrada.filter(idenObj => idenObj.descricao == infoDespesa.descricao)
        }

        //valor
        if(infoDespesa.valor != '') {
            despesaFiltrada = despesaFiltrada.filter(idenObj => idenObj.valor == infoDespesa.valor)
        }
        return despesaFiltrada
    }

    // funcao para o botao excluir dados
    remover(id) {
        localStorage.removeItem(id)
    }
}
let bd = new BancoDados()


function cadastrarDespesas() {

    let ano = document.querySelector('.campoAno').value
    let mes = document.querySelector('.campoMes').value
    let dia = document.querySelector('#dia').value 
    let tipo = document.querySelector('.campoTipo').value
    let descricao = document.querySelector('#descricao').value
    let valor = document.querySelector('#valor').value

    // Criação do OBJETO via class
    let despesa = new DespesasClass(
        ano, 
        mes,
        dia, 
        tipo, 
        descricao, 
        valor
    )

    document.querySelector('.secaoCaixa').style.display = 'none'

    
    if(despesa.validarDados()) {
        
        // estilização da caixa de confirmacao de armazenamento 
        document.querySelector('.secaoCaixa').style.display = 'block'
        document.querySelector('#tituloCaixa').innerHTML = 'Registro inserido com Sucesso'
        document.querySelector('#tituloCaixa').style.color = 'rgb(0, 185, 0)'
        // ----
        document.querySelector('#textoCaixa').innerHTML = 'Despesa foi cadastrada com sucesso!'
        // ----
        document.querySelector('#botaoCaixa').innerHTML = 'Voltar'
        document.querySelector('#botaoCaixa').style.background = 'rgb(0, 185, 0)'

        // Chamada da funcao gravar no localStorage
        bd.gravar(despesa) 
        
       
    } else {
        document.querySelector('.secaoCaixa').style.display = 'block'
        document.querySelector('#tituloCaixa').innerHTML = 'Erro na gravaçao'
        document.querySelector('#tituloCaixa').style.color = 'rgb(204, 8, 8)'
        // ----
        document.querySelector('#textoCaixa').innerHTML = 'Existem campos que não foram preenchidos'
        // ----
        document.querySelector('#botaoCaixa').innerHTML = 'Voltar e corrigir'
        document.querySelector('#botaoCaixa').style.background = 'rgb(204, 8, 8)'
    }
}
    
// function's que informam o usuario da conclusao ou nao da acao

function botaoFecharVoltar() {
    
    if(document.querySelector('#tituloCaixa').style.color == 'rgb(0, 185, 0)') {

        // limpa campos do usuario
     document.querySelector('.campoAno').value = ''
     document.querySelector('.campoMes').value = ''
     document.querySelector('#dia').value = ''
     document.querySelector('.campoTipo').value = ''
     document.querySelector('#descricao').value = ''
     document.querySelector('#valor').value = ''
    }
    
    document.querySelector('.secaoCaixa').style.display = 'none'
}


function carregaListaDespesas(despesasUsuario = Array()) {

    if(despesasUsuario.length == 0) {
        despesasUsuario = bd.recuperarTodosRegistros()
    }

    // selecao do elemento <tbody>
    var listaDespesas = document.querySelector('#listaDespesas')
    listaDespesas.innerHTML = ''
    
    
    //percorre o array despesasUsuario e lista de forma dinamica

    despesasUsuario.forEach( function(d) { //Percorre cada umas das posicoes do array e recupera o valor

        if(d.dia <= 9 && d.dia.length == 1) {
            d.dia = '0' + d.dia
        }
        if(d.mes <= 9 && d.mes.length == 1) {
            d.mes = '0' + d.mes
        }
        

        //criar a linha <tr>
        let linha = listaDespesas.insertRow()

        // criando colunas <td> com valores
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Selecionar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
            break;
            case '2': d.tipo = 'Educação'
            break;
            case '3': d.tipo = 'Lazer'
            break;
            case '4': d.tipo = 'Saúde'
            break;
            case '5': d.tipo = 'Transporte'
            break;

        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$${d.valor}`

        // botao excluir
        let botaoExcluir = document.createElement('button')
        botaoExcluir.innerHTML = '<i class="fas fa-times"></i>'
        botaoExcluir.id = `id_despesa_${d.id}`

        botaoExcluir.onclick = function() {

            // o metodo replace() retira o elemento definido e substitui para o elemento depois da virgula
            let idCorrigido = this.id.replace('id_despesa_', '')
           
            bd.remover(idCorrigido)
            window.location.reload()
        }
                            // append ser para fazer uma inclusao dentro da coluna(4)
        linha.insertCell(4).append(botaoExcluir)  

    })

       // limpa campos do usuario
     document.querySelector('.campoAno').value = ''
     document.querySelector('.campoMes').value = ''
     document.querySelector('#dia').value = ''
     document.querySelector('.campoTipo').value = ''
     document.querySelector('#descricao').value = ''
     document.querySelector('#valor').value = ''
}




function pesquisarDespesa() {

    let ano = document.querySelector('.campoAno').value
    let mes = document.querySelector('.campoMes').value
    let dia = document.querySelector('#dia').value 
    let tipo = document.querySelector('.campoTipo').value
    let descricao = document.querySelector('#descricao').value
    let valor = document.querySelector('#valor').value

    let infoDespesa = new DespesasClass(
        ano, 
        mes,
        dia, 
        tipo, 
        descricao, 
        valor
    )

    let despesaFiltrada = bd.pesquisar(infoDespesa)
    
    this.carregaListaDespesas(despesaFiltrada)
}
