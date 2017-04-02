// All initial state listed here is stored for gameplay only and does not need to be stored in the db
const initialState = {
    status: {
        uid: null,
        authenticated: false, 
        authenticationError: false,
        authenticationMessage: null,
        authenticationRedirect: false,
        travelled: false,
        apiLoading: false,
        apiLoaded: false,
        apiMessage: null,
        fighting: {
            active: false,
            recruits: null,
            health: null
        },
        gameEnd: {
            active: false,
            win: false
        },
        news: {
            active: false,
            display: null
        },
        drugsDisplayed: null,
        ammo: {
            quantity: null,
            price: null
        },
        userError: {
            active: false,
            display: null
        },
    },
    game: { // new game + library data gets stored here (this data shouldn't change in game)
        options: {
            finances: {
                debtFactor: 0.1
            },
            drugs: {
                baseQuantity: 10
            },
            health: {
                options: [25, 50, "Full"],
                costPerPoint: 50
            },
            fight: {
                recruits: {
                    max: 5,
                    min: 1
                },
                damageFactor: {
                    max: 3,
                    min: 0
                },
                recruitHealth: 50
            },
            ammo: {
                price: 10,
                quantity: 100
            },
        },
        drugs: [
            {
                name: "Heroine",
                price: 2000,
                index: 0
            }, {
                name: "Cocaine",
                price: 1000,
                index: 1
            }, {
                name: "Opium",
                price: 500,
                index: 2
            }, {
                name: "LSD",
                price: 450,
                index: 3
            }, {
                name: "Mushrooms",
                price: 350,
                index: 4
            }, {
                name: "Hash",
                price: 300,
                index: 5
            }, {
                name: "Mandrax",
                price: 250,
                index: 6
            }, {
                name: "Tik",
                price: 200,
                index: 7
            }, {
                name: "Ecstasy",
                price: 150,
                index: 8
            }, {
                name: "Weed",
                price: 100,
                index: 9
            }
        ],
        locations: [{
            city: "Cape Town",
            suburbs: ["Long Street", "Observatory", "Tableview", "Newlands", "Camps Bay"]
        }, {
            city: "Johannesburg",
            suburbs: ["Benoni", "Sandton", "Midrand", "Randburg", "Fourways"]
        }, {
            city: "Port Elizabeth",
            suburbs: ["Kamma Park", "Gelvandale", "Summerstrand", "Newton Park", "Walmer"]
        }, {
            city: "Durban",
            suburbs: ["Bluff", "Umhlanga", "Queensburgh", "Hillcrest", "Pinetown"]
        }, {
            city: "East London",
            suburbs: ["Oxford Street", "Nahoon", "Dorchester Heights", "Southernwood", "Beacon Bay"]
        }],
        weapons: [{
            damage: 10,
            name: "Fists",
            price: 0
        }, {
            damage: 20,
            name: "Baseball Bat",
            price: 500
        }, {
            damage: 50,
            name: "Glock",
            price: 2500
        }, {
            damage: 75,
            name: "Mac-10",
            price: 5000
        }, {
            damage: 100,
            name: "AK47",
            price: 10000
        }, {
            damage: 200,
            name: "Minigun",
            price: 25000
        }],
        clothing: [
            {
                name: "Jeans",
                price: 0,
                space: 100
            }, {
                name: "Backpack",
                price: 500,
                space: 150
            }, {
                name: "Trenchcoat",
                price: 2000,
                space: 300
            }, {
                name: "Pack Mule",
                price: 10000,
                space: 500
            }],
    },
    newGame: {  // new game data (references gameData)
        currentLocation: {
            city: 0, // Eg. Cape Town
            suburb: 0 // Eg. Long Street
        },
        currentFinances: {
            cash: 5000,
            bank: 0,
            debt: 5000
        },
        currentDrugs: [
            {
                name: 9, // Eg. Weed
                price: 100, // need this because the purchase price changes
                quantity: 10
            }
        ],
        currentSpace: {
            clothing: 0,
            total: 100,
            used: 10 // we start with 10 units of weed
        },
        currentWeapon: {
            name: 0,
            ammo: 0,
            damage: 10
        },
        currentHealth: 100,
        daysLeft: 30
    },
    currentGame: {
        currentLocation: {
            city: 0, // Eg. Cape Town
            suburb: 0 // Eg. Long Street
        },
        currentFinances: {
            cash: 5000,
            bank: 0,
            debt: 5000
        },
        currentDrugs: [
            {
                name: 9, // Eg. Weed
                price: 100, // need this because the purchase price changes
                quantity: 10
            }
        ],
        currentSpace: {
            clothing: 0, // we'll get total space from gameData
            used: 0
        },
        currentWeapon: {
            name: 0,
            ammo: 0,
            damage: 10
        },
        currentHealth: 100,
        daysLeft: 30
    }
}

export default initialState;
