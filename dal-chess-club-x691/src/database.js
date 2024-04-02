const mysql = require("mysql2");
<<<<<<< HEAD

=======
 
>>>>>>> develop
const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "euro.cs.dal.ca",
            user: "chessclub",
            password: "Mee5shaong9kaiw4",
            database: "chessclub",
        });
        console.log("Connected to MySQL database");
        return connection;
    } catch (error) {
        throw new Error("Error connecting to MySQL database: " + error.message);
    }
};
<<<<<<< HEAD

=======
 
>>>>>>> develop
module.exports = connectDB;