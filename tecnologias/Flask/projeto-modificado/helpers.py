import os
from jogoteca import app

def recupera_imagem(id):
    # Verifica se o arquivo existe na pasta de upload
    for nome_arquivo in os.listdir(app.config['UPLOAD_PATH']):
        # verifica se a string esta dentro do nome unico
        if f'capa{id}' in nome_arquivo:
            # Retorna o nome do arquivo
            return nome_arquivo
    
    # Se não encontrar o arquivo, retorna o arquivo padrão    
    return 'capa_padrao.jpg'

def deleta_arquivo(id):
    arquivo = recupera_imagem(id) # pega o nome da imagem que quer deletar
    if arquivo != 'capa_padrao.jpg':
        os.remove(os.path.join(app.config['UPLOAD_PATH'], arquivo)) # deleta o arquivo da pasta de upload