import random

def jogar():
    
    imprime_mensagem_abertura() 
    palavra_secreta = carrega_palavra_secreta()
    
    letras_acertadas = inicializa_letras_acertadas(palavra_secreta)
    mostra_letras_acertadas(letras_acertadas)
    
    letras_usadas = []

    enforcou = False
    acertou = False
    erros = 0
    
    while (not acertou and not enforcou): #Enquanto não acertou e não enforcou
        chute = pede_chute()
        letras_usadas.append(chute)

        if(chute in palavra_secreta): #Se o chute estiver na palavra secreta
            marca_chute_correto(chute, letras_acertadas, palavra_secreta)
        else:
            erros += 1
            print("Ops, você errou! Faltam {} tentativas.".format(7 - erros))
            desenha_forca(erros)
        
        enforcou = erros == 7 #Se tiver 7 erros, enforcou
        acertou = "_" not in letras_acertadas #Se não tiver mais "_" na lista, acertou
        
        print("Letras usadas:", end=" ")
        mostra_letras_usadas(letras_usadas)
        
        mostra_letras_acertadas(letras_acertadas)

    if(acertou):
        imprime_mensagem_vencedor()
    else:
        imprime_mensagem_perdedor(palavra_secreta)

def mostra_letras_usadas(letras_usadas):
    for letra in letras_usadas:
        print(letra, end=" ")
    
    print() #Pula uma linha


def mostra_letras_acertadas(letras_usadas):
    for letra in letras_usadas:
        print(letra, end=" ")
    
    print() #Pula linha

def desenha_forca(erros):
    print("  _______     ")
    print(" |/      |    ")

    if(erros == 1):
        print (" |      (_)   ")
        print (" |            ")
        print (" |            ")
        print (" |            ")

    if(erros == 2):
        print (" |      (_)   ")
        print (" |      \     ")
        print (" |            ")
        print (" |            ")

    if(erros == 3):
        print (" |      (_)   ")
        print (" |      \|    ")
        print (" |            ")
        print (" |            ")

    if(erros == 4):
        print (" |      (_)   ")
        print (" |      \|/   ")
        print (" |            ")
        print (" |            ")

    if(erros == 5):
        print (" |      (_)   ")
        print (" |      \|/   ")
        print (" |       |    ")
        print (" |            ")

    if(erros == 6):
        print (" |      (_)   ")
        print (" |      \|/   ")
        print (" |       |    ")
        print (" |      /     ")

    if (erros == 7):
        print (" |      (_)   ")
        print (" |      \|/   ")
        print (" |       |    ")
        print (" |      / \   ")

    print(" |            ")
    print("_|___         ")
    print()



def imprime_mensagem_vencedor():
    print("Parabéns, você ganhou!")
    print("       ___________      ")
    print("      '._==_==_=_.'     ")
    print("      .-\\:      /-.    ")
    print("     | (|:.     |) |    ")
    print("      '-|:.     |-'     ")
    print("        \\::.    /      ")
    print("         '::. .'        ")
    print("           ) (          ")
    print("         _.' '._        ")
    print("        '-------'       ")


def imprime_mensagem_perdedor(palavra_secreta):
    print("Puxa, você foi enforcado!")
    print("A palavra era {}".format(palavra_secreta))
    print("    _______________         ")
    print("   /               \       ")
    print("  /                 \      ")
    print("//                   \/\  ")
    print("\|   XXXX     XXXX   | /   ")
    print(" |   XXXX     XXXX   |/     ")
    print(" |   XXX       XXX   |      ")
    print(" |                   |      ")
    print(" \__      XXX      __/     ")
    print("   |\     XXX     /|       ")
    print("   | |           | |        ")
    print("   | I I I I I I I |        ")
    print("   |  I I I I I I  |        ")
    print("   \_             _/       ")
    print("     \_         _/         ")
    print("       \_______/           ")
        

def marca_chute_correto(chute, letras_acertadas, palavra_secreta):
    index = 0
    for letra in palavra_secreta:
        if (chute == letra):
            letras_acertadas[index] = letra
        index += 1

def pede_chute():
    chute = input("Qual letra? ")
    chute = chute.strip().upper() #Remove espaços e coloca em maiúsculo
    return chute

def inicializa_letras_acertadas(palavra):
    return ["_" for letra in palavra]

def imprime_mensagem_abertura():
    print("*********************************")
    print("***Bem vindo ao jogo da Forca!***")
    print("*********************************")
    
def carrega_palavra_secreta(nome_arquivo = "..\\Cursos\\Python\\Jogos\\palavras.txt", primeira_linha_valida = 0):
    palavras = []

    with open(nome_arquivo, "r") as arquivo:
        for linha in arquivo:
            linha = linha.strip()
            palavras.append(linha)

    numero = random.randrange(primeira_linha_valida, len(palavras))
    palavra_secreta = palavras[numero].upper()
    return palavra_secreta

if(__name__ == "__main__"): #Se for rodado como principal, executa a função
    jogar()