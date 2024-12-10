const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const app = express();
const authRouter = require("./routes/auth-route")
const adminRouter = require("./routes/admin-route")
const courseRouter = require("./routes/course-route")
const studentRouter = require("./routes/student-route")
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth",authRouter);
// app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/student",studentRouter);

port = process.env.PORT || 8090

// connection to db and the server
connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    })
});