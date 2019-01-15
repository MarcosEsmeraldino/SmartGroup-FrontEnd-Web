function onLoad() {
    updateHeader();
    updateBody();
}

function updateBody() {
    var enquetes = getEnquetes();
    var dash = document.getElementById("dash-enquetes");
    var content = "";

    if(enquetes.length == 0) {
        content = getEmptyDiv();
    }
    else {
        var enqueteDivs = getEnqueteDivs(enquetes);
        for(var i=0; i<enqueteDivs.length; i++)
            content += enqueteDivs[i];
    }

    dash.innerHTML = content;
}

function getEmptyDiv() {
    var div = "<div class=\"enquete-item-empty\"><i>Não há nenhuma Enquete</i></div>"
        + "<a href=\"nova-enquete.html\" class=\"nova-enquete-button\">Crie uma Enquete agora</a>";
    return div;
}

function getEnqueteDivs(enquetes) {
    var divs = [];

    for(var i=0; i<enquetes.length; i++) {
        var enquete = enquetes[i];
        var div = "<div class=\"enquete-item\" id=\""+enquete.id+"\" onclick=\"showEnquete(this)\"><h2>"+enquete.nome+"</h2>"+enquete.desc+"</div>";

        divs.push(div);
    }

    return divs;
}

function getEnquetes() {
    // carrega todas Enquetes
    var enquetes = [];
    var count = 0;
    var hasNext = true;

    while(hasNext) {
        var nome = getCookie("enquete-nome-" + count);
        if(nome == "") {
            hasNext = false;
            break;
        }

        // registro existe
        var isValid = getCookie("enquete-valid-" + count);
        if(isValid != "") {

            // registro ativo
            var desc = getCookie("enquete-desc-" + count);
            var enquete = {nome: nome, desc: desc, id:count};
            enquetes.push(enquete);
        }

        count++;
    }

    return enquetes;
}

function showEnquete(div) {
    // guarda id da enquete em cookie
    var id = div.id;
    setCookie("enquete-show", id, 30);

    // redireciona pagina
    window.location.href = "enquete.html";
}