import bodyParser from "body-parser";
import express from "express";
import { userController } from "./routes/users"
import { messagesController } from "./routes/messages"

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.use("/api/users", userController)
// messages
app.use("/api/messages", messagesController)

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`))