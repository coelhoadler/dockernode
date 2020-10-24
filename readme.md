Case Amazon
---
__Suponho que você seja contratado para desenvolver algunas funcionalidades do e-commerce da
Amazon, alguns desejos dos usuários são descritos abaixo e você deve desenhar e implementar uma
solução baseada em Microserviços.__
  
- MSA
  - ms product
    - Adler
        - [x] Possibilidade de visualizar os produtos de um determinado gênero; ex (GET products/:category)
        - [x] Possibilidade de visualizar os detalhes de cada produto; ex (GET product/:productId)

  - ms wishlist 
    - Bea
        - [x] Possibilidade de adicionar itens na sua lista de desejo; ex (POST /wishes)
  - ms desk
    - Bea
        - [x] Possibilidade de abrir um chamado técnico de algum problema que está acontecendo;

  - ms search
    - Kelvin
        - [x] Possibilidade de buscar um produto por palavra-chave; ex (GET products/search?keyWord=Smart Tv)
        - [x] Possibilidade de exibir os produtos mais vistos por categorias; (GET products/search?mostSeen=true)
        - Nota: Os parâmetros "productPrice", "productAmount" e "limit" também são aceitos com valor numérico.

  - ms shipping (antigo ms tax)
    - Michel
        - [x] Possibilidade de calcular o frete de uma compra;  
  - ms order | [x] MySQL | [x] Consul | [ ] Kafka
    - Michel
        - [x] Possibilidade de acompanhar os dados do seu pedido;
        - [x] Possibilidade de fazer um pedido; (extra)

## Tecnologias usadas
- NodeJs
- Express
- Mysql
- Mysql Workbench
- Consul
- Kafka Node

### Na sua implementação deve ser utilizado: 
- [x] um banco de dados relacional (mysql ou postgree);
- [x] um serviço de mensageria, por exemplo Apache Kafka;
- [x] Integração com api de CEP;
- [x] um serviço de gerenciamento de configurações; (Consul)

### Implementar Consul no seu ms
- Acessar a pasta do ms-x `$ cd ms-x`
- Instalar consul `$ npm install consul`
- Instalar dotenv `$ npm install dotenv`
- Copiar arquivos da pasta ../shared/consul para a pasta ./ms-x/config/consul 
  (Este passo é necessário pois ainda não descobri como criar um modulo compartilhado)
  | Arquivo                 | Descrição                                                         |
  |-------------------------|-------------------------------------------------------------------|
  | configurationManager.js | Arquivo que possui as configurações globais compartilhadas        |
  |                         | entre os micro serviços via ConfigurationManager (Consul)         |
  | consul.js               | Arquivo que abstrai a implementação do consul                     |
  | serviceRegister.js      | Arquivo que possui as configurações do microserviço para o Consul |
  

- Modificar arquivo ./ms-x/config/consul/serviceRegister.js 
  | Propriedade                    | Tipo     | Descrição                                                                                |
  |--------------------------------|----------|------------------------------------------------------------------------------------------|
  | serviceName                    | string   | Nome do microserviço no consul                                                           |
  | serviceId                      | string   | ID do microserviço no consul                                                             |
  | serviceNote                    | string   | Nota para entendimento humano                                                            |
  | serviceTag                     | string[] | tags para busca no consul                                                                |
  | serviceHost                    | string   | host do microserviço http://serviceHost:servicePort                                      |
  | servicePort                    | number   | porta do host do microserviço http://HOST:PORT                                           |
  | consulHost                     | string   | host de acesso ao consul http://consulHost:consulPort                                    |
  | consulPort                     | number   | porta do host de acesso ao consul http://consulHost:consulPort                           |
  | registerIntervalTry            | number   | Intervalo entre as tentativas de registro do microserviço no consul                      |
  | defaultsConfigurations         | object   | Configurações pertinentes ao microserviço                                                |
  |                                |          | que devem ser iniciadas com valores padrão caso não exista valor.                        |
  |                                |          | Essas configurações DEVEM existir no arquivo ConfigurationManager                        |
  |                                |          | para que todos os microserviço possam acessa-la.                                         |
  | defaultConfigurations.Ms{name} | string   | Ms{name} - name é o nome do microserviço. ex. MsShipping.                                |
  |                                |          | Url de acesso ao microserviço. ex: http://serviceHost:servicePort                        |
  | defaultConfigurations.{chave}  | string   | {chave} - qualquer valor existente em ConfigurationManager que precise ser inicializado. |
  

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
  
## Integrantes
- Adler Coelho
- Beatriz Bafini
- Kelvin Marques
- Michel Santana
