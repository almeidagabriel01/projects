from jogoteca import app, db
from flask import render_template, request, redirect, session, flash, url_for
from models import Usuarios
from helpers import FormularioUsuario, FormularioAutenticar
from flask_bcrypt import check_password_hash, generate_password_hash

@app.route('/login')
def login():
    # Pega o valor do parâmetro proxima da URL (se houver) e armazena na variável proxima
    proxima = request.args.get('proxima')
    
    form = FormularioUsuario()
    
    # Renderiza o template login.html passando a variável proxima como parâmetro
    return render_template('login.html', proxima=proxima, form=form)

@app.route('/autenticar', methods=['POST', ])
def autenticar():
    form = FormularioUsuario(request.form)
    
    # confere se existe o usuário e a senha no banco de dados e se existir, retorna true, se não, retorna false
    usuario = Usuarios.query.filter_by(nickname=form.nickname.data).first()
    
    # se o nickname for true, então o nickname existe no banco de dados
    if usuario:
        # Verifica se a senha do usuário dentro do bd é igual a senha digitada, retorna true, se não, retorna false
        senha = check_password_hash(usuario.senha, form.senha.data)
        if senha:
            # Adiciona o nickname do usuário na sessão
            session['usuario_logado'] = usuario.nickname
            flash(usuario.nickname + ' logado com sucesso!')
            # Pega o valor do campo oculto proxima
            proxima_pagina = request.form['proxima']
            # Redireciona para a rota que estava armazenada na variável proxima_pagina
            return redirect(proxima_pagina)
    else:
        flash('Usuário não logado, tente novamente!')
        # Redireciona para a rota login (função login)
        return redirect(url_for('login'))


@app.route('/logout')
def logout():
    session['usuario_logado'] = None
    flash('Logout efetuado com sucesso!')
    # Redireciona para a rota principal (função index)
    return redirect(url_for('index'))

@app.route('/cadastro')
def cadastro():
    form = FormularioAutenticar()
    return render_template('cadastro.html', form=form)

@app.route('/autenticar_cadastro', methods=['POST', ])
def autenticar_cadastro():
    form = FormularioAutenticar(request.form)
    
    nome = form.nome.data
    nickname = form.nickname.data
    senha = form.senha.data
    senha = generate_password_hash(senha).decode('utf-8')
    
    user = Usuarios.query.filter_by(nickname=nickname).first()
    if(user):
        flash('Nickname já existente!')
        return redirect(url_for('cadastro'))
    
    novo_user = Usuarios(nome=nome, nickname=nickname, senha=senha)
    db.session.add(novo_user)
    db.session.commit()
    
    # Adiciona o nickname do usuário na sessão
    flash(nickname + ' cadastrado com sucesso!')
    
    return redirect(url_for('login'))