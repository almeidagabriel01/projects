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
    
    # confere se existe o usuário e a senha no banco de dados e se existir, retorna true, se não, retorna none
    usuario = Usuarios.query.filter_by(nickname=form.nickname.data).first()
    
    # verificando se o usuário digitado existe no banco de dados
    if usuario == None:
        flash('Usuário não cadastrado!')
        return redirect(url_for('login'))
    
    # se existir, verifica se a senha digitada é igual a senha do banco de dados
    else:
        senha = check_password_hash(usuario.senha, form.senha.data) # a senha é colocada depois da verificação do usuário pois se o usuário não existir, o usuario.senha é None e da erro
        if senha:
            session['usuario_logado'] = usuario.nickname
            flash(usuario.nickname + ' logado com sucesso!')
            proxima_pagina = request.form['proxima']
            # Redireciona para a rota que estava armazenada na variável proxima_pagina
            return redirect(proxima_pagina)
        else:
            flash('Senha incorreta!')
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