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
        text += getOpcaoDiv(e.opcoes[i]);

    document.getElementById("enquete-content").innerHTML = text;
}

function getOpcaoDiv(opcao) {
    var op = opcao[0];
    var apr = opcao[1];
    var div = "<div class=\"opcao-item\"><div class=\"desc\">"+op+"</div><div class=\"aprovacao\">"+apr+"%</div></div>";
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
            var aprovacao = Math.floor((Math.random() * 100) + 1);
            eOpcoes.push([eOpcao, aprovacao]);
            eCount++;
        }
        else {
            hasNext = false;
        }
    }

    // ordena opções por Aprovação
    var eOp = eOpcoes.sort(function(a, b){return b[1] - a[1]});

    var enquete = {id: eId, nome: eNome, desc: eDesc, opcoes: eOp};
    return enquete; 
}

function share() {
    alert("Compartilhe este link nas suas redes sociais:\n\nhttp://aula.inf.poa.ifrs.edu.br/~0216070/SmartGroup/enquete.html/fglkjqdgft65p64jh98hjk");
}

function remove() {
    var value = confirm("Deseja realmente apagar essa Enquete?\n\nEssa operação é irreversível!");

    if(value) {

        // remove cookie da enquete
        var e = getEnqueteShow();
        setCookie("enquete-valid-"+e.id, "", 30);

        // redireciona pagina
        window.location.href = "dashboard.html";
    }
}