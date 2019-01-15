function updateHeader() {
    var divHeader = document.getElementById("header-right");
    // verifica login
    var logged = getCookie("logged");

    // -> add 'Criar Conta' e 'Entrar'
    if(logged == "") {
        var header = getHeader();
        divHeader.innerHTML += header;
    }
    // -> add header menu
    else {
        var nome = getCookie("nome");
        var headerMenu = getHeaderMenu(nome);
        divHeader.innerHTML += headerMenu;
    }

    // add por último botão 'Nova Enquete'
    var novaEnquete = getButtonNovaEnquete();
    divHeader.innerHTML += novaEnquete;
}

function getButtonNovaEnquete() {
    var button = "<div class=\"header-item-right\"><a href=\"nova-enquete.html\" class=\"header-button\">Criar Enquete</a></div>";
    return button;
}

function getHeaderMenu(nome) {
    var headerMenu = "<div class=\"header-item-right\"><button class=\"header-menu\" onclick=\"showHeaderMenu()\">"+nome+"<span class=\"seta-baixo\"></span></button>"
        +"<div id=\"header-menu\" class=\"dropdown-content\"><a href=\"dashboard.html\">Painel</a><a href=\"conta.html\">Perfil</a><a href=\"#\" onclick=\"clickSair()\">Sair</a></div></div>";

    // fecha menu dropdown
    window.onclick = function(event) {
        hideHeaderMenu(event);
    }

    return headerMenu;
}

function getHeader() {
    var div = "<div class=\"header-item-right\"><a href=\"nova-conta.html\">Criar Conta</a></div><div class=\"header-item-right\" onclick=\"criaLogin()\"><a href=\"login.html\">Entrar</a></div>";
    return div;
}

function showHeaderMenu() {
    document.getElementById("header-menu").classList.toggle("show");
}

function hideHeaderMenu(event) {
    if (!event.target.matches('.header-menu')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function clickSair() {
    var value = confirm("Deseja realmente sair?");
    if(value) {

        // remove cookie de login
        setCookie("logged", "", 30);

        // redireciona pagina
        window.location.href = "index.html";
    }
}