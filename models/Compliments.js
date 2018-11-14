const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ComplimentSchema=new Schema({
    userTo:{
        type:String
    },
    userFrom:{
        type:String
    },
    title:{
        type:String
    },
    body:{
        type:String
    }
});

const Compliments = mongoose.model("Compliments",ComplimentSchema);

module.exports=Compliments;