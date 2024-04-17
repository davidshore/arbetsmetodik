import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const serverPassword = "afuwenfudlnjskflhwueilfhuwe";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Kolla att username och password stämmer ger tillbaka userId

  const userId = 156;

  const token = jwt.sign({ id: userId }, serverPassword);

  // Spara token i en httpOnly cookie
  res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

  res.json({ token });
});

app.post("/saldo", (req, res) => {
  const { token } = req.body;

  // Med cookies: Läs cookie
  const tokenFromCookie = req.cookies.token;

  jwt.verify(token, serverPassword, (err, data) => {
    if (!err) {
      console.log("data", data);
    }
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
