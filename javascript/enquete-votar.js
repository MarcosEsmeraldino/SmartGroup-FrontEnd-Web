function onLoad() {
    updateHeader();
    updateBody();
}

function updateBody() {
    // preenche enquete
    var e = getEnqueteShow();

    if(e == "") {
        alert("Nenhuma enquete selecionada!");

        // redireciona pagina
        window.location.href = "dashboard.html";

        return;
    }

    var text = "<h2>"+e.nome+"</h2>"+e.desc+"<h3>Opções</h3>";
    
    for(var i=0; i<e.opcoes.length; i++)
        text += getOpcaoDiv(e.opcoes[i], i);

    document.getElementById("enquete-content").innerHTML = text;
}

function getOpcaoDiv(opcao, order) {
    var div = "<div class=\"opcao-item\"><div class=\"desc\">"+order+" - "+opcao+"</div><div class=\"aprovacao\"><label><input type=\"radio\" name=\""+order+"\"value=\"gostei\"><img src=\"images/like-down.png\" title=\"Amei\"></label><label><input type=\"radio\" name=\""+order+"\" value=\"talvez\" checked><img src=\"images/meh-down.png\" title=\"Tanto faz\"></label><label><input type=\"radio\" name=\""+order+"\" value=\"nao-gostei\"><img src=\"images/hate-down.png\" title=\"Odiei\"></label></div></div>";

    return div;
}

function getEnqueteShow() {
    var eId = getCookie("enquete-show");
    if(eId == "")
        return "";

    var eNome = getCookie("enquete-nome-"+eId);
    var eDesc = getCookie("enquete-desc-"+eId);
    var eOpcoes = [];
    var eCount = 0;
    var hasNext = true;

    while(hasNext) {
        var eOpcao = getCookie("enquete-opcoes-"+eId+"-opcao-"+eCount);

        if(eOpcao != "") {
            eOpcoes.push(eOpcao);
            eCount++;
        }
        else {
            hasNext = false;
        }
    }

    var enquete = {id: eId, nome: eNome, desc: eDesc, opcoes: eOpcoes};
    return enquete; 
}

function validaForm(form) {
    alert("Voto concluído com sucesso!");
    return true;
}