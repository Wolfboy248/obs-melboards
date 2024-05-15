const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const PORT = 3000;

app.use(cors({
    origin: "*",
}))
app.use(express.static(path.join(__dirname, "website", "files")))
app.use(express.static(path.join(__dirname, "website", "files", "icons")))
app.use(express.static(path.join(__dirname, "website", "pages", "obs")))
app.use(express.static(path.join(__dirname, "website", "pages", "setup")))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./website/pages/obs/index.html"))
})

app.get("/setup", (req, res) => {
    res.sendFile(path.join(__dirname, "./website/pages/setup/index.html"))
})

app.post("/shutdown", (req, res) => {
  process.exit(0);
})

app.post("/set-name", (req, res) => {
    const name = req.body["name"];
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "./website/files/settings.json")))
    data.name = name;
    data.isAdv = req.body["isCoop"];
    console.log(data)

    fs.writeFileSync(path.join(__dirname, "./website/files/settings.json"), JSON.stringify(data))
})

app.get('/profile/:username/json', async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://mel.board.portal2.sr/profile/${username}/json`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log("!! DO NOT CLOSE THIS WINDOW, IT WILL STOP THE SERVER !!")
    console.log("!! ONLY STOP WHEN YOU'RE DONE USING THE SERVER !!")
    console.log(`Server is listening on port ${PORT}`)
})
