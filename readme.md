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
- Kafka

### Na sua implementação deve ser utilizado: 
- [x] um banco de dados relacional (mysql ou postgree);
- [ ] um serviço de mensageria, por exemplo Apache Kafka;
- [x] Integração com api de CEP;
- [x] um serviço de gerenciamento de configurações; (Consul)

### Implementar Consul no seu ms
- Instalar consul $ npm install consul
- Copiar a pasta shared/consul (Este passo é necessário pois ainda não descobri como criar um modulo compartilhado)
- Colar em ms-x/config/consul
- Criar arquivo ms-x/serviceRegister.js (exemplo em ms-shipping)
- Em ms-x/index.js
  - Importar const consul = require('consul');
  - Importar const serviceRegister = require('./serviceRegister');
  - Importar const consulRegistration = require('./config/consul/consul')(consul, serviceRegister);
- Chamar consulRegistration.register(); após o server subir.

## Integrantes
- Adler Coelho
- Beatriz Bafini
- Kelvin Marques
- Michel Santana
