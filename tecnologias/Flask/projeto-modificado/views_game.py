from flask import render_template, request, redirect, session, flash, url_for,send_from_directory
from jogoteca import app, db
from models import Jogos
from helpers import recupera_imagem, deleta_arquivo, FormularioJogo
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
    
    form = FormularioJogo()
    return render_template('novo.html', titulo='Novo Jogo', form = form)


@app.route('/criar', methods=['POST', ])  # Aceita apenas o método POST
def criar():
    form = FormularioJogo(request.form)
    
    # retorna true ou false se o formulário é válido ou não
    if not form.validate_on_submit():
        return redirect(url_for('novo'))
    
    nome = form.nome.data  # Pega o nome do jogo do formulário pelo WTForms
    categoria = form.categoria.data  # Pega a categoria do jogo do formulário pelo WTForms
    console = form.console.data  # Pega o console do jogo do formulário pelo WTForms
    
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
        return redirect(url_for('login', proxima=url_for('editar', id=id)))
    
    jogo = Jogos.query.filter_by(id=id).first() #pega o jogo pelo id no banco de dados
    form = FormularioJogo() #pega o formulário de jogo
    
    form.nome.data = jogo.nome #mudando nome do jogo pelo WTForms  
    form.categoria.data = jogo.categoria #mudando categoria do jogo pelo WTForms
    form.console.data = jogo.console #mudando console do jogo pelo WTForms
    
    capa_jogo = recupera_imagem(id) #pega a capa do jogo pelo id
    return render_template('editar.html', titulo='Editando Jogo', id=id, capa_jogo=capa_jogo, form=form)

@app.route('/atualizar', methods=['POST',])# Aceita apenas o método POST
def atualizar():
    form = FormularioJogo(request.form)
    
    # Se o formulário for validado, atualiza o jogo
    if form.validate_on_submit():
        jogo = Jogos.query.filter_by(id=request.form['id']).first() #pega o jogo pelo id passado do editar.html
        jogo.nome = form.nome.data  # atualiza o nome do jogo pelo WTForms
        jogo.categoria = form.categoria.data  # atualiza a categoria do jogo pelo WTForms
        jogo.console = form.console.data  # atualiza o console do jogo pelo WTForms

        db.session.add(jogo)  # Adiciona o novo jogo ao banco de dados
        db.session.commit()  # Confirma a operação
        
        arquivo = request.files['arquivo'] # Pega o arquivo enviado no formulário
        upload_path = app.config['UPLOAD_PATH'] # Pega o caminho de upload definido no arquivo config.py
        timestamp = time.time() #pega o tempo atual
        deleta_arquivo(jogo.id) #deleta arquivos antigos
        arquivo.save(f'{upload_path}/capa{jogo.id}-{timestamp}.jpg') # Salva o arquivo novo na pasta de upload com um nome unico para contornar o cache do navegador
    
    return redirect(url_for('index'))

@app.route('/deletar/<int:id>')# Rota para o deletar o jogo pegando o id passado na lista.html
def deletar(id):
     # se não houver nenhuma chave 'usuario_logado' no dicionário session, redireciona para a rota login
    if 'usuario_logado' not in session or session['usuario_logado'] == None:
        return redirect(url_for('login'))
    
    deleta_arquivo(id) #deleta arquivos antigos
    
    Jogos.query.filter_by(id=id).delete() #deleta o jogo pelo id
    db.session.commit()  # Confirma a operação
    flash('Jogo deletado com sucesso!')
    
    return redirect(url_for('index'))

@app.route('/uploads/<nome_arquivo>') # Rota para exibir a imagem
def imagem(nome_arquivo):
    return send_from_directory('uploads', nome_arquivo) #retorna a imagem do jogo