import mongoose from "mongoose";

interface tagType {
    tagMessage: string;
    tagCommand: string;
    user: string;
}

const schema:mongoose.Schema<tagType> = new mongoose.Schema({
    tagCommand: String,
    tagMessage: String,
    user: String,
});

const tagModel:mongoose.Model<tagType> = mongoose.model("tags", schema);

export default tagModel;