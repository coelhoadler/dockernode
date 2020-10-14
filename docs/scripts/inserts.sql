insert into User (UserName, UserLogin, UserPassword, UserEmail, UserAddress, UserCep, UserCpf, UserBirth) values
('Adler Coelho', 'adlerc', '123@@1', 'adlercoelho2@gmail.com', 'Rua Clelia, 345', '05042000', '11111111111', '1995-01-01'),
('Beatriz Bafini', 'beab', '123@@2', 'beabafini2@gmail.com', 'Rua Manoel da Costa, 260', '05134160', '22222222222', '1997-06-18'),
('Kelvin Marques', 'kelvinm', '123@@3', 'kelvinmarques@gmail.com', 'Av Elisio Cordeiro, 1059', '05136001', '33333333333', '1995-01-01'),
('Michel Santana', 'michels', '123@@4', 'michelsantana@gmail.com', 'Av Sao Joao, 567', '02168060', '44444444444', '1995-01-01');
select * from user;

insert into Product (ProductName, ProductDesc, ProductPrice, ProductAmount, ProductCategory, ProductViews) values
('Playstation 5 (versão com leitor de jogos)', 'Nova geração de vídeo-game da Sony', 4999, 99, 'games;eletronico;entretenimento', 0),
('Smart Tv Oled 65\" Ultra Hd 4k Lg', 'Tenha efeito e qualidade de cinema na sua casa! E não é só um modo de dizer não, a nova geração de TV OLED da LG traz literalmente qualidade de imagem e som aplicados em cinema.',	11999,	50,	'TV e Home Theater;TV;TV 4K',	0),
('Monitor Gamer Curvo Samsung Odyssey 27', 'Verifique com os fabricantes do produto e de seus componentes eventuais limitações à utilização de todos os recursos e funcionalidades.',	4550,	100,	'PC Gamer;Perifericos Gamers;Monitor Gamer',	0),
('Geladeira/Refrigerador French Door Electrolux 579l Dm84x Inox 110v', 'Preserve seus alimentos com muito mais eficiência e economia com a Geladeira / Refrigerador Electrolux French Door. Com designer moderno e funções pensadas para manter seus alimentos fresquinhos por muito mais tempo, ela é a escolha perfeita para sua casa.',	5200,	10,	'Eletrodomesticos;Geladeira;Refrigerador;',	0);
select * from product;

insert into Wish (UserId, ProductId) values
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4),
(4, 2);
select * from wish order by userid;
