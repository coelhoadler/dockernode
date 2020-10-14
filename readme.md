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
        - [ ] Possibilidade de abrir um chamado técnico de algum problema que está acontecendo;

  - ms search
    - Kelvin
        - [x] Possibilidade de buscar um produto por palavra-chave; ex (GET product/search?keyWord=Smart Tv)
          - Os parâmetros "productPrice" e "productAmount" também são aceitos com valor numérico.
        - [x] Possibilidade de exibir os produtos mais vistos por categorias; (GET product/most-seen)
          - O parâmetro "limit" é opcional. O limite padrão é 5.

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
