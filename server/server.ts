import bodyParser from "body-parser";
import express from "express";
import { postMessages, putMessage } from "./routes/messages";
import { getUser } from "./routes/users";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.get("/api/users/:id", getUser);

// messages
app.post("/api/messages", postMessages);
app.put("/api/messages/:id", putMessage);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
