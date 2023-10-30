import socket
import threading
import os

def solicitacaoCliente(connection, address):
    print(f'Conectado a {connection}:{address} !!\n')  # Exibe uma mensagem quando um cliente se conecta.

    while 1:
        opcao = connection.recv(4096).decode()  # Recebe a opção do cliente.

        if opcao == '1':
            namefile = connection.recv(4096).decode()  # Recebe o nome do arquivo a ser baixado.
            file_path = os.path.join(os.getcwd(), namefile)  # Obtém o caminho completo do arquivo.

            if os.path.exists(file_path) and os.path.isfile(file_path):
                with open(file_path, 'rb') as file:
                    data = file.read(4096)
                    while data:
                        connection.send(data)  # Envia os dados do arquivo para o cliente.
                        data = file.read(4096)
                print('Arquivo enviado!\n')  # Exibe mensagem de sucesso.
            else:
                print('Arquivo não encontrado. Não foi possível enviar o arquivo\n')  # Exibe mensagem de erro.
            connection.close()  # Fecha a conexão com o cliente.
            break
        elif opcao == '2':
            namefile = connection.recv(4096).decode()  # Recebe o nome do arquivo a ser recebido.
            file_path = os.path.join(os.getcwd(), namefile)  # Obtém o caminho completo do arquivo.

            try:
                with open(file_path, 'wb') as file:
                    while True:
                        data = connection.recv(4096)  # Recebe dados do cliente.
                        if not data:
                            break
                        file.write(data)  # Escreve os dados no arquivo.
                print(f'{namefile} recebido!\n')  # Exibe mensagem de sucesso.
            except:
                print("Erro ao receber o arquivo!\n")  # Exibe mensagem de erro.
            connection.close()  # Fecha a conexão com o cliente.
            break
        elif opcao == '3':
            print(f'Encerrando a conexão de {address}\n')  # Exibe mensagem de encerramento.
            connection.close()  # Fecha a conexão com o cliente.
            break

server = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)
server.bind(('::1', 7777))  # Associa o servidor à porta 7777.
print("Conectando...\n")
server.listen()

while True:
    try:
        connection, address = server.accept()  # Aceita uma conexão de cliente.
    except Exception as erro:
        print("Erro ao tentar conexão: ", erro)
        continue
    client_thread = threading.Thread(target=solicitacaoCliente, args=(connection, address))
    client_thread.start()  # Inicia uma nova thread para lidar com o cliente.
