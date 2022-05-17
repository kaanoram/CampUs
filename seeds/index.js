const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const User = require('../models/user');
require('dotenv').config();
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/camp-us";

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected", dbUrl);
});

let timId;
let appleId;

const sample = array => array[Math.floor(Math.random() * array.length)];

if (dbUrl === process.env.DB_URL) {
    timId = process.env.TIM_ID_CLOUD;
    appleId = process.env.APPLE_ID_CLOUD;
}
else{
    timId = process.env.TIM_ID_LOCAL;
    appleId = process.env.APPLE_ID_LOCAL;
}


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30);
        const randomUser = (Math.random() < 0.5) ? timId : appleId;
        const camp = new Campground({
            author: randomUser,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'+
            'Integer at metus elit. Cras quam mi, consectetur eu nulla at, ornare malesuada purus. Ut sit amet congue turpis.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/des4kcezr/image/upload/v1642507523/CampUs/img1_bhishk.png',
                    filename: 'CampUs/img1_bhishk'
                },
                {
                    url: 'https://res.cloudinary.com/des4kcezr/image/upload/v1642507580/CampUs/img2_gltbc5.png',
                    filename: 'CampUs/img2_gltbc5'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


