const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURL = process.env.MONGO_URL;

const mongoDB = async () => {
    await mongoose.connect(mongoURL);
    console.log("Connected");
    const food_category_collection = await mongoose.connection.db.collection("food-category");
    const fetched_category = await food_category_collection.find({}).toArray();
    const category_list = [];
    for (const cat_type of fetched_category) {
        category_list.push(cat_type);
    }
    global.category_list = category_list;
    const food_items_collection = await mongoose.connection.db.collection("food-items");
    const fetched_data = await food_items_collection.find({}).toArray();
    const item_list = [];
    for (const data of fetched_data) {
        item_list.push(data);
    }
    global.food_items = item_list;
};

module.exports = mongoDB;