USE [master]
GO

/****** Object:  Database [HomeworkAssignment3_17039917]    Script Date: 2020/05/09 14:24:17 ******/
CREATE DATABASE [HomeworkAssignment3_17039917]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HomeworkAssignment3_17039917', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\HomeworkAssignment3_17039917.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'HomeworkAssignment3_17039917_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\HomeworkAssignment3_17039917_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET COMPATIBILITY_LEVEL = 120
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HomeworkAssignment3_17039917].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET ARITHABORT OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET  DISABLE_BROKER 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET RECOVERY FULL 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET  MULTI_USER 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET DB_CHAINING OFF 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [HomeworkAssignment3_17039917] SET  READ_WRITE 
GO




use HomeworkAssignment3_17039917
go

CREATE TABLE [Title](
    [TitleID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [Title] [nvarchar](5) NOT NULL
);


CREATE TABLE [Gender](
    [GenderID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [Gender] [nvarchar](50) NOT NULL
);


CREATE TABLE [UserType] (
    [TypeID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [TypeDescription] [varchar](50) NOT NULL
);


CREATE TABLE [User] (
    [UserID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [UserEmail] [varchar](200) NOT NULL,
	[UserPassword] [varchar](MAX) NOT NULL,	
	[GUID] [varchar](100) NULL,
	[GUIDExpiry] [datetime] NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Surname] [nvarchar](50) NOT NULL,
	[DOB] [datetime] NOT NULL,
	[TitleID] [int] FOREIGN KEY REFERENCES [Title]([TitleID]),
	[GenderID] [int] FOREIGN KEY REFERENCES [Gender]([GenderID]),
    [TypeID] [int] FOREIGN KEY REFERENCES [UserType]([TypeID]),
);


CREATE TABLE [Customer](
    [CustomerID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [Name] [nvarchar](50) NOT NULL,
    [Surname] [nvarchar](50) NOT NULL,
	[Cell] [nvarchar] (10) NOT NULL,
    [Company] [nvarchar](30) NOT NULL
);

CREATE TABLE [Supplier](
    [SupplierID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [SupplierName] [nvarchar](40) NOT NULL,
	[ContactPersonName] [nvarchar](40) NOT NULL,
	[ContactPersonSurname] [nvarchar](40) NOT NULL,
	[ContactPersonCell] [nvarchar](40) NOT NULL,
	[ContactPersonEmail] [nvarchar](40) NOT NULL,
);


CREATE TABLE [Product](
    [ProductID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [ProductName] [nvarchar](40) NOT NULL,
	[Image] [nvarchar] (200) NULL,
	[Quantity] [smallint] NOT NULL,
	[Price] [money] NOT NULL,
	[SupplierID] [int] FOREIGN KEY REFERENCES [Supplier]([SupplierID]),	
);


CREATE TABLE [Order] (
    [OrderID] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[OrderDate] [datetime] NOT NULL,
	[CustomerID] [int] FOREIGN KEY REFERENCES [Customer]([CustomerID]),
	[UserID] [int] FOREIGN KEY REFERENCES [User]([UserID]),
	[ProductID] [int] FOREIGN KEY REFERENCES [Product]([ProductID]),	
);

insert into [Order]
values ('3/22/2020', '4', '2', '1');
insert into [Order]
values ('3/6/2020', '3', '1', '1');
insert into [Order]
values ('3/3/2020', '2', '1', '4');
insert into [Order]
values ('3/6/2020', '4', '1', '1');
insert into [Order]
values ('2/25/2020', '4', '2', '1');
insert into [Order]
values ('2/26/2020', '3', '1', '6');
insert into [Order]
values ('1/9/2020', '2', '1', '7');
insert into [Order]
values ('1/11/2020', '4', '1', '6');
insert into [Order]
values ('1/20/2020', '3', '1', '1');
insert into [Order]
values ('2/21/2020', '1', '2', '5');
insert into [Order]
values ('2/5/2020', '1', '2', '1');
insert into [Order]
values ('3/25/2020', '3', '1', '3');
insert into [Order]
values ('3/27/2020', '4', '2', '2');
insert into [Order]
values ('3/28/2020', '3', '2', '5');
insert into [Order]
values ('5/22/2020', '1', '2', '4');
insert into [Order]
values ('6/1/2020', '4', '1', '3');
insert into [Order]
values ('6/5/2020', '3', '2', '5');
insert into [Order]
values ('6/11/2020', '1', '2', '1');
insert into [Order]
values ('6/14/2020', '1', '2', '3');
insert into [Order]
values ('6/18/2020', '2', '2', '6');
insert into [Order]
values ('6/26/2020', '2', '2', '6');
insert into [Order]
values ('6/24/2020', '2', '2', '2');
insert into [Order]
values ('2/2/2020', '2', '1', '3');
insert into [Order]
values ('2/12/2020', '1', '1', '3');
insert into [Order]
values ('6/23/2020', '4', '1', '4');
insert into [Order]
values ('6/18/2020', '4', '2', '1');
insert into [Order]
values ('3/6/2020', '3', '1', '1');
insert into [Order]
values ('3/3/2020', '2', '1', '4');
insert into [Order]
values ('2/21/2020', '4', '1', '1');
insert into [Order]
values ('3/3/2020', '4', '2', '1');
insert into [Order]
values ('6/18/2020', '3', '1', '6');
insert into [Order]
values ('6/23/2020', '2', '1', '7');
insert into [Order]
values ('1/11/2020', '4', '1', '6');
insert into [Order]
values ('6/14/2020', '3', '1', '1');
insert into [Order]
values ('2/21/2020', '1', '2', '5');
insert into [Order]
values ('2/5/2020', '1', '2', '1');
insert into [Order]
values ('3/25/2020', '3', '1', '3');
insert into [Order]
values ('6/23/2020', '4', '2', '2');
insert into [Order]
values ('3/28/2020', '3', '2', '5');
insert into [Order]
values ('5/22/2020', '1', '2', '4');
insert into [Order]
values ('2/21/2020', '4', '1', '3');
insert into [Order]
values ('6/5/2020', '3', '2', '5');
insert into [Order]
values ('6/23/2020', '1', '2', '1');
insert into [Order]
values ('6/14/2020', '1', '2', '3');
insert into [Order]
values ('6/18/2020', '2', '2', '6');
insert into [Order]
values ('6/23/2020', '2', '2', '6');
insert into [Order]
values ('6/24/2020', '2', '2', '2');
insert into [Order]
values ('6/18/2020', '2', '1', '3');
insert into [Order]
values ('6/18/2020', '1', '1', '3');
insert into [Order]
values ('6/23/2020', '4', '1', '4');

insert into [Title]
values ('Mr');
insert into [Title]
values ('Ms');
insert into [Title]
values ('Mrs');
insert into [Title]
values ('Miss');
insert into [Title]
values ('Dr');
insert into [Title]
values ('Prof');

insert into [Gender]
values ('Male');
insert into [Gender]
values ('Female');
insert into [Gender]
values ('Other');

insert into [UserType]
values ( 'Sales Employee');
insert into [UserType]
values ( 'Sales Manager');

insert into [Customer]
values ('Bill', 'Gates', '0768645689', 'Microsoft');
insert into [Customer]
values ('Jacka', 'Ma', '0735467689', 'Alibaba');
insert into [Customer]
values ('Jeff', 'Bezoz', '0798657169', 'Amazon');
insert into [Customer]
values ('Elon', 'Musk', '0876539274', 'Tesla');

insert into [Supplier]
values ('FarmersMeat', 'John', 'Fred', '0763627849', 'john@farmersmeat.co.za');
insert into [Supplier]
values ('Fruit&Veg', 'George', 'Mercury', '0727484849', 'george@fruitandveg.co.za');
insert into [Supplier]
values ('MrItaly', 'Luca', 'Ferrari', '0727484849', 'luca@mritaly.co.za');
insert into [Supplier]
values ('FizzDrinks', 'Natasha', 'Rose', '0727484849', 'natasha@fizzdrinks.co.za');
insert into [Supplier]
values ('CorndogInc', 'Joe', 'Manly', '0727484849', 'joe@hotdoginc.co.za');

insert into [Product] 
values ('Burger', 'https://cdn.discordapp.com/attachments/681909743073230954/704449772060278885/burger.png', '1', '39', '1')
insert into [Product] 
values ('Chips', 'https://cdn.discordapp.com/attachments/681909743073230954/704449772563726336/fried-potatoes.png', '1', '14', '2')
insert into [Product] 
values ('Corn Dog', 'https://cdn.discordapp.com/attachments/681909743073230954/704449774430060604/corn-dog.png', '2', '19', '5')
insert into [Product] 
values ('Vegie Wrap', 'https://cdn.discordapp.com/attachments/681909743073230954/704449775864381540/kebab.png', '1', '24', '2')
insert into [Product] 
values ('Coke', 'https://cdn.discordapp.com/attachments/681909743073230954/704449777185849475/coke.png', '1', '8', '4')
insert into [Product] 
values ('Pizza Slice', 'https://cdn.discordapp.com/attachments/681909743073230954/704449778737610832/pizza-slice.png', '1', '19', '3')
insert into [Product] 
values ('Steak', 'https://cdn.discordapp.com/attachments/681909743073230954/704449782185328710/meat.png', '1', '89', '1')

