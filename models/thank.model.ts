import mongoose from "mongoose";

interface thankModel {
    userId: String;
    thanks: Number;
}

const schema:mongoose.Schema<thankModel> = new mongoose.Schema({
    userId: String,
    thanks: Number,
});

const thankModel:mongoose.Model<thankModel> = mongoose.model('thanks', schema);
export default thankModel;