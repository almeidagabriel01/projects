from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)  # Instancia a classe Flask
app.config.from_pyfile('config.py')  # Carrega as configurações do arquivo config.py

db = SQLAlchemy(app)  # Instancia o banco de dados do SQLAlchemy

from views import *

# quando o arquivo for executado diretamente, o __name__ será igual a __main__ e rodará o app.run() no modo debug
if(__name__ == '__main__'):
    app.run(debug=True) # Inicia o servidor Flask em modo debug