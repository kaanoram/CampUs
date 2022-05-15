const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/camp-us');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30);
        const camp = new Campground({
            author: "62807296b37717882389e877",
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


