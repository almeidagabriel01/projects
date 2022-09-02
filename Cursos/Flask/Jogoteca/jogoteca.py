from flask import Flask, render_template, request, redirect, session, flash

class Jogo:
    def __init__(self, nome, categoria, console): # Construtor
        self.nome = nome
        self.categoria = categoria
        self.console = console

jogo1 = Jogo('Tetris', 'Puzzle', 'Atari')
jogo2 = Jogo('God of War', 'Rack n Slash', 'PS2')
jogo3= Jogo ('Mortal Kombat', 'Luta', 'PS2')
lista = [jogo1, jogo2, jogo3]

app = Flask(__name__) # Instancia a classe Flask
app.secret_key = 'Gabriel'

@app.route('/') # Rota principal
def index():
    return render_template('lista.html', titulo='Jogos', jogos = lista)

@app.route('/novo') # Rota para o formulário de criação de novo jogo
def novo():
    return render_template('novo.html', titulo='Novo Jogo')
  
@app.route('/criar', methods=['POST',]) # Aceita apenas o método POST
def criar():
    nome = request.form['nome'] # Pega o valor do campo nome
    categoria = request.form['categoria'] # Pega o valor do campo categoria
    console = request.form['console'] # Pega o valor do campo console
    jogo = Jogo(nome, categoria, console) # Cria um novo jogo com os valores
    lista.append(jogo) # Adiciona o novo jogo na lista
    return redirect('/') # Redireciona para a rota principal

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/autenticar', methods=['POST',])
def autenticar():
  if request.form['usuario'] == 'admin' and request.form['senha'] == 'admin':
    session['usuario_logado'] = request.form['usuario']
    flash(session['usuario_logado'] + ' logado com sucesso!')
    return redirect('/')
  else:
    flash('Usuário não logado, tente novamente!')
    return redirect('/login')
  
@app.route('/logout')
def logout():
  session['usuario_logado'] = None
  flash('Logout efetuado com sucesso!')
  return redirect('/')
  
app.run(debug=True) # Inicia o servidor Flask em modo debug