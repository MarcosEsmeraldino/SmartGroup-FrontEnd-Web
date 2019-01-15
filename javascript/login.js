function validaForm(form) {
    var email = form["email"].value;
    var senha = form["senha"].value;

    // valida campos
    var emailValido = validaEmail(email);
    var senhaValido = validaSenha(senha);

    if(!emailValido) {
        alert("E-mail incorreto");
        return false;
    }

    if(!senhaValido) {
        alert("Senha incorreta.");
        return false;
    }

    // registra login
    setCookie("logged", "true", 30);
    
    alert("Login realizado com sucesso!");

    return true;
}

function isEmpty(value) {
    return value == "" || value == null;
}

function validaSenha(senha) {
    var csenha = getCookie("senha");
    return csenha == senha && !isEmpty(senha);
}

function validaEmail(email) {
    var cemail = getCookie("email");
    return cemail == email && !isEmpty(email);
}