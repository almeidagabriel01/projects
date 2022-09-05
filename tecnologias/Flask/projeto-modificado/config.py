SECRET_KEY = 'Gabriel'

# Configurações do banco de dados
SQLALCHEMY_DATABASE_URI = \
    '{SGBD}://{usuario}:{senha}@{servidor}/{database}'.format(
        SGBD='mysql+mysqlconnector',  # SGBD e o conectador
        usuario='root',  # Usuário do banco de dados
        senha='root',  # Senha do banco de dados
        servidor='localhost',  # Servidor do banco de dados
        database='jogoteca'  # Nome do banco de dados
)