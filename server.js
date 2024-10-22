const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConfig = require("./config/db");
const appConfig = require("./config/app");

// This will handle all uncaughtException
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION");
    console.log(err);
    console.log(err.name, err.message);

    process.exit(1);
});

dotenv.config();

const app = require("./app");

// For deprecation purposes
mongoose
    .connect(dbConfig.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to database");
    });

const port = appConfig.PORT;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// This will handle all unhandled exceptions (eg) Async without catch
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED EXCEPTION");
    // Close the server first before exit()
    // This way, it lets the server finish all the requests before shutting down
    server.close(() => {
        // 1 is for unhandled rejection
        process.exit(1);
    });
});
