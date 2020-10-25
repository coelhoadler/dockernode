drop database if exists amazondb;
create database amazondb;
use amazondb;

create table User (
	UserId smallint unsigned not null auto_increment,
	UserName varchar(100) not null,
    UserLogin varchar(10) not null,
    UserPassword varchar(8) not null,
    UserEmail varchar(30) not null,
    UserAddress varchar(200) not null,
    UserCep varchar(8) not null,
    UserCpf varchar(11) not null,
    UserBirth datetime not null,
    constraint PK_UserId primary key (UserId)
);

create table Product (
	ProductId smallint unsigned not null auto_increment,
	ProductName varchar(100) not null,
    ProductDesc varchar(500) not null,
    ProductPrice decimal(10,0) not null,
    ProductAmount int not null,
    ProductCategory varchar(50) not null,
    ProductViews int not null,
    constraint PK_ProductId primary key (ProductId)
);

create table Keywords (
	ProductId smallint unsigned not null,
    Keyword varchar(100),
    constraint FK_ProductId_Keywords foreign key (ProductId) references Product (ProductId)
);

create table Desk (
	DeskId smallint unsigned not null auto_increment,
    UserId smallint unsigned not null,
    DeskDesc varchar(500) not null,
    DeskDate datetime,
    constraint PK_DeskId primary key (DeskId),
    constraint FK_UserId_Desk foreign key (UserId) references User (UserId)
);

create table Orders (
	OrderId smallint unsigned not null auto_increment,
    OrderPayment varchar(15) not null,
    OrderTax decimal(10,0) not null,
    UserId smallint unsigned not null,
    constraint PK_OrderId primary key (OrderId),
    constraint FK_UserId_Orders foreign key (UserId) references User (UserId)
);

create table OrderProduct (
    OrderId smallint unsigned not null,
    ProductId smallint unsigned not null,
    constraint FK_OrderId_OrderProduct foreign key (OrderId) references Orders (OrderId),
    constraint FK_ProductId_OrderProduct foreign key (ProductId) references Product (ProductId)
);

create table Wish (
    UserId smallint unsigned not null,
    ProductId smallint unsigned not null,
    constraint FK_UserId_Wish foreign key (UserId) references User (UserId),
    constraint FK_ProductId_Wish foreign key (ProductId) references Product (ProductId)
);

-- Insert into Product
INSERT INTO `Product` (`ProductId`, `ProductName`, `ProductDesc`, `ProductPrice`, `ProductAmount`, `ProductCategory`, `ProductViews`) VALUES
(1,	'Playstation 5 (versão com leitor de jogos)',	'Nova geração de vídeo-game da Sony',	4999,	99,	'games;eletronico;entretenimento',	0),
(2,	'Smart Tv Oled 65\" Ultra Hd 4k Lg',	'Tenha efeito e qualidade de cinema na sua casa! E não é só um modo de dizer não, a nova geração de TV OLED da LG traz literalmente qualidade de imagem e som aplicados em cinema.',	11999,	50,	'TV e Home Theater;TV;TV 4K',	0),
(3,	'Monitor Gamer Curvo Samsung Odyssey 27',	'Verifique com os fabricantes do produto e de seus componentes eventuais limitações à utilização de todos os recursos e funcionalidades.',	4550,	100,	'PC Gamer;Perifericos Gamers;Monitor Gamer',	0),
(4,	'Geladeira/Refrigerador French Door Electrolux 579l Dm84x Inox 110v',	'Preserve seus alimentos com muito mais eficiência e economia com a Geladeira / Refrigerador Electrolux French Door. Com designer moderno e funções pensadas para manter seus alimentos fresquinhos por muito mais tempo, ela é a escolha perfeita para sua casa.',	5200,	10,	'Eletrodomesticos;Geladeira;Refrigerador;',	0);

-- Insert into User
insert into User (UserName, UserLogin, UserPassword, UserEmail, UserAddress, UserCep, UserCpf, UserBirth)
values('Adler Coelho', 'adlerc', 'MTIzQEAx', 'adlercoelho2@gmail.com', 'Rua Clelia, 345', '05042000', '11111111111', '1995-01-01'),
('Beatriz Bafini', 'beab', 'MTIzQEAy', 'beabafini2@gmail.com', 'Rua Manoel da Costa, 260', '05134160', '22222222222', '1997-06-18'),
('Kelvin Marques', 'kelvinm', 'MTIzQEAz', 'kelvinmarques@gmail.com', 'Av Elisio Cordeiro, 1059', '05136001', '33333333333', '1995-01-01'),
('Michel Santana', 'michels', 'MTIzQEA0', 'michelsantana@gmail.com', 'Av Sao Joao, 567', '02168060', '44444444444', '1995-01-01');

-- Insert into Wish
insert into Wish (UserId, ProductId) values
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4),
(4, 2);

-- Insert into Orders
insert into Orders (OrderPayment, OrderTax, UserId) values
('Credit card', 58, 1),
('Debit card', 84, 2),
('Money', 0, 3),
('Check', 0, 4);

-- Insert into OrderProduct
insert into OrderProduct (OrderId, ProductId) values
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4),
(4, 2);