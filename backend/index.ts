import express, { Express, Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

const app: Express = express();
const port = process.env.PORT;

// Configure middleware
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//data: { error: 'user not found' }
app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post("https://reqres.in/api/login", {
      email,
      password,
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// NOTE: data: { error: 'Note: Only defined users succeed registration' }
app.post("/auth/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const response = await axios.post("https://reqres.in/api/register", {
      username,
      email,
      password,
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/auth/logout", async (req: Request, res: Response) => {
  try {
    const response = await axios.post("https://reqres.in/api/logout");
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/resource", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get("https://reqres.in/api/unknown");
    console.log(data)
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving resources" });
  }
});

app.get("/api/resource/:id", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(
      `https://reqres.in/api/unknown/${req.params.id}`
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the resource" });
  }
});

app.put("/api/resource/:id", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.put(
      `https://reqres.in/api/unknown/${req.params.id}`
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the resource" });
  }
});

app.delete("/api/resource/:id", async (req: Request, res: Response) => {
  try {
    // This is a mock delete as reqres.in doesn't allow actual deletion
    res.json({ data: { id: req.params.id, status: "deleted" } });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the resource" });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;