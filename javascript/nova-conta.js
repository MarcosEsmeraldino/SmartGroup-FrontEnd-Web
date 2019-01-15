function validaForm(form) {
    var nome = form["nome"].value;
    var email = form["email"].value;
    var senha = form["senha"].value;

    // valida campos
    var nomeValido = validaNome(nome);
    var emailValido = validaEmail(email);
    var senhaValido = validaSenha(senha);

    if(!nomeValido) {
        alert("Preencha o 'Nome' corretamente.\n-Não deixe o campo em branco\n-Utilize até 50 caractéres");
        return false;
    }

    if(!emailValido) {
        alert("Preencha o 'E-mail' corretamente.\n-Não deixe o campo em branco\n-Utilize '@'");
        return false;
    }

    if(!senhaValido) {
        alert("Preencha a 'Senha' corretamente.\n-Não deixe o campo em branco\n-Utilize entre 5 e 20 caractéres");
        return false;
    }

    // salva dados como cookies
    setCookie("nome", nome, 30);
    setCookie("email", email, 30);
    setCookie("senha", senha, 30);

    alert("Conta criada com sucesso!");

    return true;
}

function isEmpty(value) {
    return value == "" || value == null;
}

function validaNome(nome) {
    return nome.length<51 && !isEmpty(nome);
}

function validaSenha(senha) {
    return senha.length>4 && senha.length<20 && !isEmpty(senha);
}

function validaEmail(email) {
    var expReg = /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\d1,3(\.\d1,3)3)$/;
    return email.match(expReg) && !isEmpty(email);
}