const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const{places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://0.0.0.0:27017/yelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error: "))
db.once("open", ()=>{
    console.log("Database connected")
});

const sample =  array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<200;i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random()* 20) + 10;
       const camp = new Campground({
            author: '65a1b6c20d5ecaba6054261e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta vel, facilis doloribus nobis iure amet iusto! Beatae, iusto dignissimos unde vel hic autem reprehenderit',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                        {
                          url: 'https://res.cloudinary.com/dyzjg6yur/image/upload/v1705352988/wfzn2wxnpnwhxgprd7rn.png',
                          filename: 'wfzn2wxnpnwhxgprd7rn',
                        }
            ],
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    db.close()
});