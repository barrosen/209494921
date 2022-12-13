class User {
    constructor(Username, Password, First, Last, Age) {
        this.Username = Username;
        this.Password = Password;
        this.First = First;
        this.Last = Last;
        this.Age = Age;
    }

    getUsername() {
        return this.Username;
    }

    getPassword() {
        return this.Password;
    }
}
var Users = []
User1 = new User('bar123@gmail.com','1234','Bar','Rosen','40')
User2 = new User('david00@yahoo.com','12345','David','Vicky','26')
User3 = new User('simon45@walla.co.il','12345','Simon','Forth','36')
User4 = new User('jackyk@gmail.com','12345','Jacky','Kay','56')
User5 = new User('nickppp@yahoo.com','12345','Nick','Pearse','42')
Users.push(User1);
Users.push(User2);
Users.push(User3);
Users.push(User4);
Users.push(User5);

class Item {
    constructor(Name, Type, Brand, Year, Value, Info,Link) {
        this.Name = Name;
        this.Type = Type;
        this.Brand = Brand;
        this.Year = Year;
        this.Value = Value;
        this.Info = Info;
        this.Link = Link;
    }

    getName() {
        return this.Name;
    }

    getType() {
        return this.Type;
    }
    getBrand() {
        return this.Brand;
    }

    getYear() {
        return this.Year;
    }
    getValue() {
        return this.Value;
    }
}
var Items =[];
Item1 = new Item('Jordan Retro 11','High','Jordans','1996','225','Basketball','https://www.footlocker.com/product/jordan-retro-11-mens/C8012116.html');
Item2 = new Item('Nike Air Max 95 Essential','Low','Nike','1995','175','Sports and Casual','https://www.footlocker.com/product/nike-air-max-95-essential-mens/M0011002.html');
Item3 = new Item('Adipower Weightlifting 3','Low','Adidas','2020','165','Weightlifting and Workout','https://www.adidas.com/us/adipower-weightlifting-3-shoes/GY8926.html');
Item4 = new Item('Made in UK 920','Low','New Balance','2021','250','Casual Sneakers','https://www.newbalance.com/pd/made-in-uk-920/ML920V1-37395.html');
Items.push(Item1);
Items.push(Item2);
Items.push(Item3);
Items.push(Item4);