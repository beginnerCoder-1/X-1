var express = require("express"), cors = require("cors"), secure = require("ssl-express-www");
const path = require('path');
const os = require('os');
const fs = require('fs');
const wxd = require('./function/index') 
const axios = require('axios')

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;

app.get('/stats', (req, res) => {
  const stats = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    cpuModel: os.cpus()[0].model,
    numCores: os.cpus().length,
    loadAverage: os.loadavg(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
    osType: os.type(),
    osRelease: os.release(),
    userInfo: os.userInfo(),
    processId: process.pid,
    nodeVersion: process.version,
    execPath: process.execPath,
    cwd: process.cwd(),
    memoryUsage: process.memoryUsage()
  };
  res.json(stats);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

app.get('/api/ragbot', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await wxd.ragBot(message);
    res.status(200).json({
      status: 200,
      creator: "whyuxD",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk degreeGuru
app.get('/api/degreeguru', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await wxd.degreeGuru(message);
    res.status(200).json({
      status: 200,
      creator: "whyuxD",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bing image (AI)
app.get('/api/bing-image', async (req, res) => {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ error: 'Masukkan dulu promotnya!' });
    }
    const apiurl = `https://ryzendesu.vip/api/ai/v2/text2img?prompt=${prompt}&model=`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Character Ai (AI)
app.get('/api/chai', async (req, res) => {
  try {
    const { text, gaya } = req.query;
    if (!text || !gaya) {
      return res.status(400).json({ error: 'Masukkan dulu format text dan gaya dari Character nya' });
    }
    const apiurl = `https://api.nyxs.pw/ai/character-ai?prompt=${text}&gaya=${gaya}`;
    const response = await axios.get(apiurl);
    const { result } = response.data;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      response: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Brat (MAKER)
app.get('/api/brat', async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ error: 'Masukkan dulu text nya!' });
    }
    const apiurl = `https://api.siputzx.my.id/api/m/brat?text=${text}`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tiktok mp4 (DOWNLOADER)
app.get('/api/tiktok', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Mana url tiktok nya' });
    }
    const response = await axios.get(`https://api.neekoi.me/api/tiktok?url=${url}`);
    const { no_watermark } = response.data.result;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      url: no_watermark
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate adult real (AI)
app.get('/api/gen-adult-rl', async (req, res) => {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ error: 'Masukkan prompt nya dulu kocag' });
    }
    const apiurl = `https://sandipbaruwal.onrender.com/pussy?prompt=${prompt}`;
    const response = await axios.get(apiurl, {
      timeout: 20000, 
    });
    const { url } = response.data;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      url: url,
    });
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Timeout: API terlalu lama merespons!' });
    }
    res.status(500).json({ error: error.message });
  }
});


// Generate adult anime (AI)
app.get('/api/gen-adult-anim', async (req, res) => {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ error: 'Masukkan prompt nya' });
    }
    const apiurl = `https://love.neekoi.me/miseki?text=${text}`;
    const response = await axios.get(apiurl, {
      responseType: 'stream',
      timeout: 20000, // 20 detik
    });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Timeout: API tidak merespons dalam waktu yang ditentukan' });
    }
    res.status(500).json({ error: error.message });
  }
});


// Endpoint untuk smartContract
app.get('/api/smartcontract', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await wxd.smartContract(message);
    res.status(200).json({
      status: 200,
      creator: "whyuxD",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk blackboxAIChat
app.get('/api/blackboxAIChat', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await wxd.blackboxAIChat(message);
    res.status(200).json({
      status: 200,
      creator: "whyuxD",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat Gpt (AI)
app.get("/api/gpt", async (req, res) => {
const text = req.query.text;

if (!text) {
return res.status(400).send("Parameter 'text' is required!");
}

try {
const requestData = {
operation: "chatExecute",
params: {
text: text,
languageId: "6094f9b4addddd000c04c94b",
toneId: "60572a649bdd4272b8fe358c",
voiceId: ""
}
};

const config = {
headers: {
Accept: "application/json, text/plain, */*",
Authentication: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTZjMjFhMGE1NTNiNjE1MDhmNWIxOSIsImlhdCI6MTcxMjc2NzUxNH0.qseE0iNl-4bZrpQoB-zxVsc-pz13l3JOKkg4u6Y08OY",
"Content-Type": "application/json"
}
};
let {data} = await axios.post("https://api.rytr.me/", requestData, config)
data.data.content = data.data.content.replace(/<\/?p[^>]*>/g, '');
res.json(data);
} catch (error) {
console.error(error);
res.status(500).send("Internal Server Error");
}
});


app.use((req, res, next) => {
  res.status(404).send("Halaman tidak ditemukan");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ada kesalahan pada server');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
