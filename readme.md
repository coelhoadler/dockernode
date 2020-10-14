Case Amazon
---
__Suponho que você seja contratado para desenvolver algunas funcionalidades do e-commerce da
Amazon, alguns desejos dos usuários são descritos abaixo e você deve desenhar e implementar uma
solução baseada em Microserviços.__
  
- MSA
  - ms product
    - Adler
        - [x] Possibilidade de visualizar os produtos de um determinado gênero; ex (GET products/:category)
        - [x] Possibilidade de visualizar os detalhes de cada produto; ex (GET product-detail/:productId)

  - ms wishlist 
    - Bea
        - [x] Possibilidade de adicionar itens na sua lista de desejo; ex (POST /wishes)
  - ms desk
    - Bea
        - [ ] Possibilidade de abrir um chamado técnico de algum problema que está acontecendo;

  - ms search
    - Kelvin
        - [ ] Possibilidade de buscar um produto por palavra-chave;
        - [ ] Possibilidade de exibir os produtos mais vistos por categorias;

  - ms tax
    - Michel
        - [ ] Possibilidade de acompanhar os dados do seu pedido;
  - ms order
    - Michel
        - [ ] Possibilidade de calcular o frete de uma compra;  

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
- [ ] um serviço de gerenciamneto de configurações;

## Integrantes
- Adler Coelho
- Beatriz Bafini
- Kelvin Marques
- Michel Santana
