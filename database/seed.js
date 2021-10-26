const db = require('./index.js');
var faker = require('faker');

let restaurants = ["Popeyes", "Michoachan", "Shabuya", "BulgogiHut", "ThaiGarden", "Savoys", "Pepes", "McDonalds", "WingStop", "Lucilles", "Hogwarts", "Phils BBQ", "Subway", "SushiStop", "HellsKitchen", "ThaiStop"]
let foods = ["Hamburger", "Pizza", "BeefBowl", "FriedChicken", "SpamMusubi", "MeatPasta", "ChickenBowl", "Salad", "Ribs", "CheeseCake"]

const randomFoodOrder = (numberOfItems) => {
    let foodList = []
    for (var i = 0; i < numberOfItems; i++) {
        foodList.push(foods[Math.floor(Math.random() * 10)])
    }

    return foodList
}

const generator = () => {
    let orderID = 1

    for (let i = 0; i < 50000; i++) {
        let numberOfItems = Math.floor(Math.random() * 4) + 1
        let listOfFood = randomFoodOrder(numberOfItems)
        let dummyRestaurant = restaurants[Math.floor(Math.random() * 15)]

        for (var j = 0; j < numberOfItems; j++) {
            const data = new db.SalesRecord({
                OrderID: orderID,
                Restaurant: dummyRestaurant,
                ItemName: listOfFood[j],
                Quantity: Math.floor(Math.random() * 2) + 1,
                ProductPrice: faker.commerce.price(6, 15),
                TotalProducts: numberOfItems
            })
            db.saveSalesRecords(data)
        }

        orderID++

    }
    
    return console.log("Data has successfully seeded!")

}

generator()
