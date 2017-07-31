
CREATE TABLE IF NOT EXISTS `departments` (
  `DepartmentID` int(15) NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar(80) NOT NULL,
  `OverHeadCosts` int(11) DEFAULT NULL,
  `TotalSales` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`DepartmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


INSERT INTO `departments` (`DepartmentID`, `DepartmentName`, `OverHeadCosts`, `TotalSales`) VALUES
	(1, 'Instruments', 1500, 15125.50),
	(2, 'School Supplies', 1000, 1330.03),
	(3, 'Attire', 2300, 1854.87),
	(4, 'Household', 4000, 234.76),
	(5, 'Electronics', 1700, 74500.50);



CREATE TABLE IF NOT EXISTS `products` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(100) NOT NULL,
  `DepartmentName` varchar(100) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `StockQuantity` int(100) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;


INSERT INTO `products` (`itemID`, `ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES
	(1, 'Clarinet', 'Instruments', 999.99, 10),
	(2, 'Microwave', 'Household', 20.00, 111),
	(3, 'Apple Watch', 'Attire', 100.00, 120),
	(4, 'Jordan 1', 'Attire', 39.99, 15),
	(5, 'Versaci Dress', 'Attire', 20.00, 23),
	(6, 'Color Pencils', 'School Supplies', 2.99, 141),
	(7, 'Hurley T-shirt', 'Attire', 15.99, 3),
	(8, 'Grand Piano', 'Instruments', 200.00, 21),
	(9, 'California King Bedframe', 'Household', 123.00, 353),
	(10, 'Amazon Echo', 'Household', 50.00, 75),
