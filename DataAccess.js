"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess = /** @class */ (function () {
    //tatic DB_CONNECTION_STRING:string = "mongodb+srv://dbAdmin:test@cluster0-hmc1e.azure.mongodb.net/foodhunter?retryWrites=true"
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING, { useNewUrlParser: true });
        return this.mongooseInstance;
    };
    // local connect
    DataAccess.DB_CONNECTION_STRING = "mongodb://dbAdmin:test@localhost:3000/foodhunter?authSource=admin";
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
