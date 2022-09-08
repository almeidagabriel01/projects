import os
from jogoteca import app
from flask_wtf import FlaskForm
from wtforms import StringField, validators, SubmitField, PasswordField

# Classe para criar campos do formulário de jogo
class FormularioJogo(FlaskForm):
    # Criando os campos do formulário com label e validadores
    nome = StringField('Nome do Jogo', [validators.data_required(), validators.length(min=1, max=50)])
    categoria = StringField('Categoria', [validators.data_required(), validators.length(min=1, max=40)])
    console = StringField('Console', [validators.data_required(), validators.length(min=1, max=20)])
    salvar = SubmitField('Salvar')
   
# Classe para criar campos do formulário de login de usuários
class FormularioUsuario(FlaskForm):
    # Criando os campos do formulário com label e validadores
    nickname = StringField('Nickname', [validators.data_required(), validators.length(min=1, max=12)])
    senha = PasswordField('Senha', [validators.data_required(), validators.length(min=1, max=100)])
    submitLogin = SubmitField('Login')
    
# Classe para criar campos do formulário de cadastro de usuários
class FormularioAutenticar(FlaskForm):
    nome = StringField('Nome', [validators.data_required(), validators.length(min=1, max=20)])
    nickname = StringField('Nickname', [validators.data_required(), validators.length(min=1, max=12)])
    senha = PasswordField('Senha', [validators.data_required(), validators.length(min=1, max=100)])
    submitCadastro = SubmitField('Cadastrar')
    
# Função para recuperar o nome da imagem do jogo
def recupera_imagem(id):
    # Verifica se o arquivo existe na pasta de upload
    for nome_arquivo in os.listdir(app.config['UPLOAD_PATH']):
        # verifica se a string esta dentro do nome unico
        if f'capa{id}' in nome_arquivo:
            # Retorna o nome do arquivo
            return nome_arquivo
    
    # Se não encontrar o arquivo, retorna o arquivo padrão    
    return 'capa_padrao.jpg'

# Função para remover o arquivo de imagem do jogo
def deleta_arquivo(id):
    arquivo = recupera_imagem(id) # pega o nome da imagem que quer deletar
    
    # deleta o arquivo que tem o nome diferente da capa padrão
    if arquivo != 'capa_padrao.jpg':
        os.remove(os.path.join(app.config['UPLOAD_PATH'], arquivo)) # deleta o arquivo da pasta de upload