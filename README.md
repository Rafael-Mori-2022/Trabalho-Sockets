# Sistema de Comunicação TCP para Transferência de Arquivos

Este documento tem como objetivo fornecer uma visão geral de uma implementação de um modelo Cliente/Servidor utilizando Sockets, composto por dois códigos, um em Node.js e outro em Python. O sistema implementado viabiliza que um cliente crie requisições para baixar arquivos do servidor e enviar arquivos para o servidor.

## Visão Geral

 O cliente é estruturado em Node.js, enquanto o servidor é em Python. Um passo-a-passo do funcionamento do sistema é dado abaixo:

- O cliente se conecta ao servidor através do protocolo TCP na porta 7777 (IP: localhost).
- O cliente escolhe entre três opções: baixar um arquivo (opção 1), enviar um arquivo (opção 2) ou sair (opção 3).
- Caso o cliente escolha baixar um arquivo, ele fornece o nome do arquivo desejado, e o servidor verifica se o arquivo é existente. Em caso afirmativo, o servidor envia o arquivo para o cliente, que o salva localmente.
- Caso o cliente escolha enviar um arquivo, ele fornece o nome do arquivo a ser enviado. O cliente verifica se o arquivo existe localmente e, se existir, envia o arquivo para o servidor.
- Quando uma operação é concluída, a conexão é encerrada, e o cliente pode optar por realizar outra operação ou sair do programa.

- É presente na implementação alguns tratamentos de exceções, visando um maior conforto ao usuário.

## Funcionamento

Para testagem do sistema, é de suma importância que os arquivos testes estejam presentes no mesmo diretório dos códigos!

- `Cliente.js` (código do cliente em Node.js) 
- `Servidor.py` (código do servidor em Python)

## Execução

Siga os passos para testar o sistema de comunicação:

1. Certifique-se de que os arquivos de teste mencionados anteriormente estejam no mesmo diretório dos códigos.

2. Abra dois terminais separados, sendo possível a presença de várias instâncias de clientes.

3. No primeiro terminal, execute o servidor Python com o seguinte comando:

   ```bash
   python Servidor.py
4. Nos próximos terminais, execute os clientes Node.js com o comando:

    ```bash
   node Cliente.js
5. Caso tudo corra bem, o cliente se conectará ao servidor e será fornecido um menu interativo!
6. Quando terminar de realizar as operações desejadas, escolha a opção "3" para encerrar a conexão.

## Observações

- Certifique-se de que o servidor esteja em execução antes de tentar se conectar com o cliente.
- Em detrimento da organização em pastas, é possível que com a alteração do SO utilizado sejam necessárias simples alterações da localização dos inputs de teste (para dentro da pasta ou para fora)!
   - Windows: foi necessário que se deixasse os inputs do servidor para fora da pasta do servidor!
   - Linux: os inputs foram deixados dentro da pasta do servidor!
- Este sistema de comunicação é destinado APENAS para fins de aprendizado e demonstração, não determinando o uso final de sockets em ambientes comerciais.
    
- Código e documentação gerada por Rafael Mori Pinheiro (RA: 813851)