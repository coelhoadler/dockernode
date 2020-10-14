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
    UserCpf varchar(11) unique not null,
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
    constraint FK_ProductId_Wish foreign key (ProductId) references Product (ProductId),
    primary key (UserId, ProductId)
);