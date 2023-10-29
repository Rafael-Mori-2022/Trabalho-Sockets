const net = require('net')           // Importa o módulo 'net' para comunicação via TCP.
const fs = require('fs')             // Importa o módulo 'fs' para manipulação de arquivos.
const readline = require('readline') // Importa o módulo 'readline' para leitura de entrada.

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function iniciarConexao() {
  const client = new net.Socket()     // Cria um novo objeto de soquete para o cliente.

  client.connect(7777, 'localhost', () => {
    console.log("Conectado ao Servidor!!\n") // Conecta ao servidor e exibe uma mensagem.
    listagemOpcoes(client)                   // Chama a função para mostrar opções.
  })
}

function listagemOpcoes(client) {
  rl.question("Opção (1 para baixar, 2 para enviar, 3 para sair): ", (opcao) => {
    client.write(opcao) // Envia a opção escolhida para o servidor.

    if (opcao === "1") {
      rl.question("Nome do arquivo a ser baixado: ", (fileName) => {
        client.write(fileName)                 // Envia o nome do arquivo para baixar.
        const receivedFile = fs.createWriteStream(fileName)
        let dataReceived = false

        client.on('data', (data) => {          // Recebe dados do servidor.
          receivedFile.write(data)
          dataReceived = true
        })

        client.on('end', () => {
          if (dataReceived) {
            console.log(`\n${fileName} Recebido!\n`) // Exibe mensagem após receber o arquivo.
          } else {
            console.log(`\nArquivo ${fileName} não encontrado no servidor.\n`)
            fs.unlinkSync(fileName)          // Remove o arquivo se não for encontrado.
          }
          receivedFile.end()
          client.end()                      // Encerra a conexão com o servidor.
          iniciarConexao()                  // Reinicia a conexão.
        })
      })
    } else if (opcao === "2") {
      rl.question("Nome do arquivo a ser enviado: ", (fileName) => {
        
        if (fs.existsSync(fileName)) {
          client.write(fileName)          // Envia o nome do arquivo a ser enviado.
          const fileStream = fs.createReadStream(fileName)
    
          fileStream.on('data', (data) => { // Envia dados do arquivo para o servidor.
            client.write(data)
          })
    
          fileStream.on('end', () => {
            client.end() 
            console.log('\nArquivo enviado para o servidor\n') // Exibe mensagem após envio.
            iniciarConexao() // Reinicia a conexão.
          })
        } else {
          console.log("\nO arquivo não existe...\n")
          client.end() 
          iniciarConexao() // Reinicia a conexão.
        }
      })
    } else if (opcao === "3") {
      console.log("\nEncerrando a conexão com o servidor.\n")
      client.end() 
      rl.close()   // Fecha a interface de leitura de entrada.
    } else {
      console.log("\nOpção inválida. Tente novamente.\n")
      listagemOpcoes(client) // Exibe mensagem de opção inválida e permite tentar novamente.
    }
  })
}

iniciarConexao() // Inicia a conexão quando o programa é executado.
