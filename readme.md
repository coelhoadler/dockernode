Case Amazon
---
__Suponha que você seja contratado para desenvolver algunas funcionalidades do e-commerce da
Amazon, alguns desejos dos usuários são descritos abaixo e você deve desenhar e implementar uma
solução baseada em Microserviços.__

## Integrantes
- Adler Coelho
- Beatriz Bafini
- Kelvin Marques
- Michel Santana

## Subindo a aplicação
   - clone o atual repositório: `git clone https://github.com/coelhoadler/dockernode.git `;
   - certifique-se que você tenha o __Docker__ e o __docker-compose__ instalados corretamente no seu ambiente;
   - na raíz do projeto, execute: `docker-compose up`.
   
### Identificação dos Microservices
  | Nome do Microservice    | Porta        | Descrição        |
  |-------------------------|--------------|------------------|
  | adminer                 | 8080         | Plataforma de gerenciamento do banco mysql. |
  | db (mysql)              | 3306         | Banco de dados relacional.                  |
  | consul                  | 8500         | Gerenciador de configurações.               |
  | zookeeper               | 2181         | Service Discovery.                          |
  | kafka                   | 9092         | Plataforma distribuída.                     |
  | consumer                | ----         | MS de consumer.                             |
  | product                 | 3001         | MS de product.                              |
  | order                   | 3536         | MS de order.                                |
  | shipping                | 3535         | MS de shipping.                             |
  | desk                    | 3002         | MS de desk.                                 |
  | wishlist                | 3003         | MS de wishlist.                             |
  | swagger                 | 8091         | Swagger UI                                  |
  
## O que foi feito?
- Adler
    - [x] Possibilidade de visualizar os produtos de um determinado gênero (ms product);
    - [x] Possibilidade de visualizar os detalhes de cada produto (ms product);
    - [ ] Kafka
- Bea
    - [x] Possibilidade de adicionar itens na sua lista de desejo (ms wishlist);
    - [x] Possibilidade de abrir um chamado técnico de algum problema que está acontecendo (ms desk);
- Kelvin
    - [x] Possibilidade de buscar um produto por palavra-chave (ms product);
    - [x] Possibilidade de exibir os produtos mais vistos por categorias (ms product);
    - [x] Documentação da API no Swagger (swagger-ui-master);
    - [x] Documentação da API no Postman;
- Michel
    - [x] Possibilidade de calcular o frete de uma compra (ms shipping);
    - [x] Possibilidade de acompanhar os dados do seu pedido (ms order);
    - [x] Possibilidade de fazer um pedido (ms order);
    - [x] Consul
    - [x] MySql

## Tecnologias usadas
- NodeJs
- Express
- Mysql
- Mysql Workbench
- Consul
- Kafka Node
- Swagger UI

## Documentação da API
- Ao subir a aplicação, uma documentação da API em Swagger pode ser encontrada em `localhost:8091`.
- Há uma collection do Postman para testes na raíz do projeto: `api.postman_collection.json`

## Requisitos atendidos
- [x] um banco de dados relacional (mysql ou postgree);
- [x] um serviço de mensageria, por exemplo Apache Kafka;
- [x] Integração com api de CEP;
- [x] um serviço de gerenciamento de configurações; (Consul)

## Implementar Consul no seu ms
- Acessar a pasta do ms-x `$ cd ms-x`
- Instalar consul `$ npm install consul`
- Instalar dotenv `$ npm install dotenv`
- Copiar arquivos da pasta `../shared/consul` para a pasta `./ms-x/config/consul`
  (Este passo é necessário pois ainda não descobri como criar um modulo compartilhado)
  | Arquivo                 | Descrição                                                         |
  |-------------------------|-------------------------------------------------------------------|
  | configurationManager.js | Arquivo que possui as configurações globais compartilhadas        |
  |                         | entre os micro serviços via ConfigurationManager (Consul)         |
  | consul.js               | Arquivo que abstrai a implementação do consul                     |
  | serviceRegister.js      | Arquivo que possui as configurações do microserviço para o Consul |
  

- Modificar arquivo ./ms-x/config/consul/serviceRegister.js 
  | Propriedade                    | Tipo     | Descrição                                                                                            |
  |--------------------------------|----------|------------------------------------------------------------------------------------------------------|
  | serviceName                    | string   | Nome do microserviço no consul                                                                       |
  | serviceId                      | string   | ID do microserviço no consul                                                                         |
  | serviceNote                    | string   | Nota para entendimento humano                                                                        |
  | serviceTag                     | string[] | tags para busca no consul                                                                            |
  | serviceHost                    | string   | host do microserviço http://serviceHost:servicePort                                                  |
  | servicePort                    | number   | porta do host do microserviço http://HOST:PORT                                                       |
  | consulHost                     | string   | host de acesso ao consul http://consulHost:consulPort                                                |
  | consulPort                     | number   | porta do host de acesso ao consul http://consulHost:consulPort                                       |
  | registerIntervalTry            | number   | Intervalo entre as tentativas de registro do microserviço no consul                                  |
  | defaultsConfigurations         | object   | Configurações pertinentes ao microserviço                                                            |
  |                                |          | que devem ser iniciadas com valores padrão caso não exista valor.                                    |
  |                                |          | Essas configurações DEVEM existir no arquivo ConfigurationManager                                    |
  |                                |          | para que todos os microserviços possam acessa-la.                                                    |
  | defaultConfigurations.Ms{name} | string   | Ms{name} - name é o nome do microserviço. ex. MsShipping.                                            |
  |                                |          | Url de acesso ao microserviço. ex: http://serviceHost:servicePort                                    |
  | defaultConfigurations.{chave}  | string   | {chave} - qualquer chave/propriedade existente em ConfigurationManager que precise ser inicializado. |
  

- Criar arquivo ./ms-x/.env (exemplo em ms-shipping)
- O arquivo .env pode ser usado para parametrizar os valores do serviceRegister e outras váriáveis de ambiente necessárias (ex. PORT (porta) que será escutada)

- Em ./ms-x/src/index.js
  - Importar const serviceRegister = require('./config/consul/serviceRegister');
- Chamar serviceRegister.register(); após o server subir. (em .listen)
- Criar arquivo HealthCheckController.js
  ```
  module.exports = {
    async health(req, res) {
        return res.json({ status: true });
      }
  }
  ```
- Criar rota '/health' e apontar para o HealthCheckController.js 
