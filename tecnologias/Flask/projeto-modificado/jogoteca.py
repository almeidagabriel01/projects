from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_bcrypt import Bcrypt

app = Flask(__name__)  # Instancia a classe Flask
app.config.from_pyfile('config.py')  # Carrega as configurações do arquivo config.py

db = SQLAlchemy(app)  # Instancia o banco de dados do SQLAlchemy
csrf = CSRFProtect(app)  # Instancia o CSRFProtect
bcrypt = Bcrypt(app)  # Instancia o Bcrypt

from views_game import *
from views_user import *

# quando o arquivo for executado diretamente, o __name__ será igual a __main__ e rodará o app.run() no modo debug
if(__name__ == '__main__'):
    app.run(debug=True) # Inicia o servidor Flask em modo debug