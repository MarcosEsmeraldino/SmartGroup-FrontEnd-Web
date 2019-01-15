function onLoad() {
    updateHeader();
    setEnquete();
}

function setEnquete() {
	addOpcao();
	addOpcao();
}

function novaOpcao(label) {
	// cria node
	var node = document.createElement("div");
	node.className = "opcao-item";
	node.innerHTML = "<label>"+label+"</label>"
	+"<input type=\"text\" placeholder=\"Opção\" />"
	+"<img src=\"./images/remove-opcao.png\" onclick=\"removeOpcao(this.parentNode)\" class=\"opcao-remove\" />";

	return node;
}

function removeOpcao(node) {
	if(node.className != "opcao-item")
		return;

	var parentNode = node.parentNode;

	// mínimo 2
	if(parentNode.children.length < 4) {
		alert("São permitidas no mínimo 2 opções.");
		return;
	}

	// Removendo um nó a partir do pai
	parentNode.removeChild(node);

	// altera proximos nós
	var children = parentNode.children;
	var length = children.length;

	for(var i=0; i<length; i++) {
		children[i].getElementsByTagName("label")[0].innerHTML = i+1;
	}
}

function addOpcao() {
	var nodeParent = document.getElementById("opcoes");
	var addButton = document.getElementById("opcao-add");

	// máximo 10
	if(nodeParent.children.length > 10) {
		alert("São permitidas no máximo 10 opções.");
		return;
	}

	// remove botão add (ele é inserido ao final da operação)
	nodeParent.removeChild(addButton);

	// label ordem
	var label = nodeParent.children.length + 1;

	// cria node
	var node = novaOpcao(label);
	// insere node
	nodeParent.appendChild(node);
	// insere botão add novamente
	nodeParent.appendChild(addButton);
}

function validaForm(form) {
	var nome = form["nome"].value;
	var desc = form["desc"].value;
	var opcoes = [];

	var nodeOpcoes = document.getElementById("opcoes").children;
	var childs = nodeOpcoes.length-1;

	for(var i=0; i<childs; i++) {
		var opValue = nodeOpcoes[i].getElementsByTagName("input")[0].value;
		opcoes.push(opValue);
	}

	// valida dados
	var nomeValido = validaNome(nome);
	var descValido = validaDesc(desc);
	var opcoesValidas = true;

	for(var j=0; j<opcoes.length; j++) {
		var opcaoValida = validaOpcao(opcoes[j]);
		if(!opcaoValida) {
			opcoesValidas = false;
			break;
		}
	}

    if(!nomeValido) {
        alert("Preencha o 'Nome' corretamente.\n-Não deixe o campo em branco\n-Utilize até 100 caractéres");
        return false;
    }
    if(!descValido) {
        alert("Preencha a 'Descrição' corretamente.\n-Não deixe o campo em branco\n-Utilize até 200 caractéres");
        return false;
    }
    if(!opcoesValidas) {
        alert("Preencha as 'Opções' corretamente.\n-Não deixe nenhum campo em branco\n-Utilize até 100 caractéres");
        return false;
    }

    // form ok
    // grava enquete
    saveEnquete(nome, desc, opcoes);

	return true;
}

function saveEnquete(nome, desc, opcoes) {
    // salva dados com cookies
    var nextId = getNextEnqueteId();
    setCookie("enquete-nome-"+nextId, nome, 30);
    setCookie("enquete-desc-"+nextId, desc, 30);
    setCookie("enquete-valid-"+nextId, "true", 30);
    for(var i=0; i<opcoes.length; i++) {
		var opcao = opcoes[i];
	    setCookie("enquete-opcoes-"+nextId+"-opcao-"+i, opcao, 30);
    }

    alert("Enquete criada com sucesso!");
}

function getNextEnqueteId() {
	var count = 0;
	var hasNext = true;
	var e;

	while(hasNext) {
		e = getCookie("enquete-nome-"+count);
		if(e != "") {
			count++;
		}
		else {
			hasNext = false;
		}
	}

	return count;
}

function isEmpty(value) {
    return value == "" || value == null;
}

function validaNome(nome) {
    return nome.length<100 && !isEmpty(nome);
}

function validaDesc(desc) {
    return desc.length<200 && !isEmpty(desc);
}

function validaOpcao(opcao) {
	return validaNome(opcao);
}