from sqlite3 import Timestamp
from flask import render_template, request, redirect, session, flash, url_for,send_from_directory
from jogoteca import app, db
from models import Jogos, Usuarios
from helpers import recupera_imagem, deleta_arquivo
import time

@app.route('/')  # Rota principal
def index():
    lista = Jogos.query.order_by(Jogos.id)
    return render_template('lista.html', titulo='Jogos', jogos=lista)


@app.route('/novo')  # Rota para o formulário de criação de novo jogo
def novo():
    # se não houver nenhuma chave 'usuario_logado' no dicionário session, redireciona para a rota login
    if 'usuario_logado' not in session or session['usuario_logado'] == None:
        # Redireciona para a rota login com o parâmetro proxima = novo (para que o usuário seja redirecionado para a rota novo após o login)
        return redirect(url_for('login', proxima=url_for('novo')))
    return render_template('novo.html', titulo='Novo Jogo')


@app.route('/criar', methods=['POST', ])  # Aceita apenas o método POST
def criar():
    nome = request.form['nome']  # Pega o valor do campo nome
    categoria = request.form['categoria']  # Pega o valor do campo categoria
    console = request.form['console']  # Pega o valor do campo console
    
    #conferindo se o jogo ja existe no banco de dados
    jogo = Jogos.query.filter_by(nome=nome).first()
    
    if jogo:
        flash('Jogo já existente!')
        return redirect(url_for('index'))
    
    novo_jogo = Jogos(nome=nome, categoria=categoria, console=console)  # Cria um novo jogo
    db.session.add(novo_jogo)  # Adiciona o novo jogo ao banco de dados
    db.session.commit()  # Confirma a operação
    
    arquivo = request.files['arquivo'] # Pega o arquivo enviado no formulário
    upload_path = app.config['UPLOAD_PATH'] # Pega o caminho de upload definido no arquivo config.py
    timestamp = time.time() # Pega o tempo atual
    arquivo.save(f'{upload_path}/capa{novo_jogo.id}-{timestamp}.jpg') # Salva o arquivo na pasta de upload com um nome unico para contornar o cache do navegador
    
    # Redireciona para a rota principal função index (rota principal)
    return redirect(url_for('index'))

@app.route('/editar/<int:id>')# Rota para o formulário de edição de jogo pegando o id do jogo passado na lista.html
def editar(id):
    # se não houver nenhuma chave 'usuario_logado' no dicionário session, redireciona para a rota login
    if ('usuario_logado' not in session or session['usuario_logado'] == None):
        # Redireciona para a rota login com o parâmetro proxima = novo (para que o usuário seja redirecionado para a rota editar após o login)
        return redirect(url_for('login', proxima=url_for('editar')))
    jogo = Jogos.query.filter_by(id=id).first() #pega o jogo pelo id
    capa_jogo = recupera_imagem(id) #pega a capa do jogo pelo id
    return render_template('editar.html', titulo='Editando Jogo', jogo=jogo, capa_jogo=capa_jogo)

@app.route('/atualizar', methods=['POST',])# Aceita apenas o método POST
def atualizar():
    jogo = Jogos.query.filter_by(id=request.form['id']).first() #pega o jogo pelo id
    jogo.nome = request.form['nome']  # Pega o valor do campo nome
    jogo.categoria = request.form['categoria']  # Pega o valor do campo categoria
    jogo.console = request.form['console']  # Pega o valor do campo console

    db.session.add(jogo)  # Adiciona o novo jogo ao banco de dados
    db.session.commit()  # Confirma a operação
    
    arquivo = request.files['arquivo'] # Pega o arquivo enviado no formulário
    upload_path = app.config['UPLOAD_PATH'] # Pega o caminho de upload definido no arquivo config.py
    timestamp = time.time() #pega o tempo atual
    deleta_arquivo(jogo.id) #deleta arquivos antigos
    arquivo.save(f'{upload_path}/capa{jogo.id}-{timestamp}.jpg') # Salva o arquivo na pasta de upload com um nome unico para contornar o cache do navegador
    
    return redirect(url_for('index'))

@app.route('/deletar/<int:id>')# Rota para o deletar o jogo pegando o id passado na lista.html
def deletar(id):
     # se não houver nenhuma chave 'usuario_logado' no dicionário session, redireciona para a rota login
    if 'usuario_logado' not in session or session['usuario_logado'] == None:
        return redirect(url_for('login'))
    
    Jogos.query.filter_by(id=id).delete() #deleta o jogo pelo id
    db.session.commit()  # Confirma a operação
    flash('Jogo deletado com sucesso!')
    
    return redirect(url_for('index'))

@app.route('/login')
def login():
    # Pega o valor do parâmetro proxima da URL (se houver) e armazena na variável proxima
    proxima = request.args.get('proxima')
    # Renderiza o template login.html passando a variável proxima como parâmetro
    return render_template('login.html', proxima=proxima)


@app.route('/autenticar', methods=['POST', ])
def autenticar():
    # confere se existe o usuário e a senha no banco de dados e se existir, retorna true, se não, retorna false
    usuario = Usuarios.query.filter_by(nickname=request.form['usuario']).first()
    # se o usuario for true, então o usuário existe no banco de dados
    if usuario:
        # Verifica se a senha do usuário demtro do bd é igual a senha digitada
        if request.form['senha'] == usuario.senha:
            # Adiciona o nickname do usuário na sessão
            session['usuario_logado'] = usuario.nickname
            flash(usuario.nickname + ' logado com sucesso!')
            # Pega o valor do campo oculto proxima
            proxima_pagina = request.form['proxima']
            # Redireciona para a rota que estava armazenada na variável proxima_pagina
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

@app.route('/uploads/<nome_arquivo>') # Rota para exibir a imagem
def imagem(nome_arquivo):
    return send_from_directory('uploads', nome_arquivo) #retorna a imagem do jogo