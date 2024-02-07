const mongoose = require('mongoose');
const mongoURL = `mongodb://GoFood:GoFood9998@ac-x73geen-shard-00-00.n7jk9r0.mongodb.net:27017,ac-x73geen-shard-00-01.n7jk9r0.mongodb.net:27017,ac-x73geen-shard-00-02.n7jk9r0.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-5o68jm-shard-0&authSource=admin&retryWrites=true&w=majority`;

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