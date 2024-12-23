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


// Galau (RANDOM)
app.get('/api/random-galau', async (req, res) => {
  try {
    const apiurl = 'https://api.vreden.my.id/api/galau';
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'video/mp4');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gore (RANDOM)
app.get('/api/random-gore', async (req, res) => {
  try {
    const apiurl = 'https://btch.us.kg/randomgore';
    const response = await axios.get(apiurl);
    const { title, url } = response.data.result;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      result: {
        title: title,
        url: url
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DarkBot (AI)
app.get('/api/dark-ai', async (req, res) => {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ error: 'Masukkan prompt terlebih dahulu.' });
    }
    const apiurl = `https://btch.us.kg/prompt/gpt?prompt=kamu%20adalah%20Dark%20ai%20buatan%20whyuxD,%20kamu%20harus%20bersikap%20sok%20asik%20dan%20gunakan%20emoji%20untuk%20pesan%20yang%20seru!&text=${encodeURIComponent(prompt)}`;
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

// Logic Detect (AI)
app.get('/api/logic-detect', async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ error: 'Masukkan text terlebih dahulu' });
    }
    const apiurl = `https://api.vreden.my.id/api/logic?query=${encodeURIComponent(text)}`;
    const response = await axios.get(apiurl);
    const { cmd, query } = response.data.result;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      data: {
        cmd: cmd,
        query: query
      }
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

// Dukun (AI)
app.get('/api/dukun-ai', async (req, res) => {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ error: 'Masukkan prompt terlebih dahulu!' });
    }
    const apiurl = `https://api.siputzx.my.id/api/ai/dukun?content=${encodeURIComponent(prompt)}`;
    const response = await axios.get(apiurl);
    const { data } = response.data;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      response: data,
    });
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

// Joko si jawa (AI)
app.get('/api/jawa-ai', async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ error: 'Masukkan text dulu woi!' });
    }
    const apiurl = `https://api.siputzx.my.id/api/ai/joko?content=${encodeURIComponent(text)}`;
    const response = await axios.get(apiurl);
    const { data } = response.data;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      response: data,
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

// Smeme (MAKER)
app.get('/api/smeme', async (req, res) => {
  try {
    const { link, atas, bawah } = req.query;
    if (!link || !atas || !bawah) {
      return res.status(400).json({ error: 'Isi (link) dengan url gambar, isi juga text atas, dan text bawah!' });
    }
    const apiurl = `https://api.siputzx.my.id/api/m/memgen?link=${link}&top=${atas}&bottom=${bawah}&font=1`
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Carbon coding (MAKER)
app.get('/api/carbon', async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ error: 'Masukkan text nya dulu' });
    }
    const apiurl = `https://api.siputzx.my.id/api/m/carbonify?input=${encodeURIComponent(text)}`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/png');
    response.data.pipe(res); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Level Up (MAKER)
app.get('/api/levelUp', async (req, res) => {
  try {
    const { background, name, level, levelup, avatar } = req.query;
    if (!background || !name || !level || !levelup || !avatar) {
      return res.status(400).json({ 
        error: 'Masukkan semua parameter: background, name, level, levelup, avatar'
      });
    }
    const apiurl = `https://api.vreden.my.id/api/levelup?background=${encodeURIComponent(background)}&name=${encodeURIComponent(name)}&level=${encodeURIComponent(level)}&levelup=${encodeURIComponent(levelup)}&avatar=${encodeURIComponent(avatar)}`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fake Tweeter comment (MAKER)
app.get('/api/tweet-maker', async (req, res) => {
  try {
    const { username, displayname, comment, avatar } = req.query;
    if (!username || !displayname || !comment || !avatar) {
      return res.status(400).json({ 
        error: 'Masukkan semua parameter: theme, username, displayname, comment, avatar' 
      });
    }
    const apiurl = `https://api.vreden.my.id/api/tweet?theme=dark&username=${encodeURIComponent(username)}&displayname=${encodeURIComponent(displayname)}&comment=${encodeURIComponent(comment)}&avatar=${encodeURIComponent(avatar)}`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tiktok mp4 (DOWNLOADER)
app.get('/api/tiktokMP4', async (req, res) => {
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

// Yt mp3 (DOWNLOADER)
app.get('/api/ytmp3', async (req, res) => {
  try {
    const { link } = req.query;
    if (!link) {
      return res.status(400).json({ error: 'Masukkan dulu link YouTube ny!' });
    }
    const apiurl = `https://api.siputzx.my.id/api/d/ytmp3?url=${link}`;
    const response = await axios.get(apiurl);
    const { title, dl } = response.data;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      data: {
        title: title,
        url: dl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yt mp4 (DOWNLOADER)
app.get('/api/ytmp4', async (req, res) => {
  try {
    const { link } = req.query;
    if (!link) {
      return res.status(400).json({ error: 'Masukkan dulu link YouTube nya' });
    }
    const apiurl = `https://api.siputzx.my.id/api/d/ytmp4?url=${link}`;
    const response = await axios.get(apiurl);
    const { title, dl } = response.data;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      data: {
        title: title,
        url: dl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MediaFire (DOWNLOADER)
app.get('/api/mediaFire', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Masukkan URL mediafire terlebih dahulu' });
    }
    const apiurl = `https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiurl);
    const { nama, mime, size, link } = response.data.result;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      result: {
        nama: nama,
        mime: mime,
        size: size,
        link: link
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ssweb (TOOLS)
app.get('/api/ssweb', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Masukkan URL website dulu woi!' });
    }
    const apiurl = `https://api.vreden.my.id/api/ssweb?url=${encodeURIComponent(url)}&type=tablet`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/png');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Audio to text (TOOLS)
app.get('/api/audio2text', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Mana URL audio nya!' });
    }
    const apiurl = `https://vapis.my.id/api/audio2txt?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiurl);
    const { result } = response.data;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      result: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remini (TOOLS)
app.get('/api/remini', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Masukkan URL gambar dulu!' });
    }
    const apiurl = `https://vapis.my.id/api/reminiv2?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google Drive (DOWNLOADER)
app.get('/api/drive', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Masukkan URL dari google drive' });
    }
    const apiurl = `https://api.vreden.my.id/api/drive?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiurl);
    const { fileName, sizeBytes, downloadUrl } = response.data.result;
    res.status(200).json({
      status: 200,
      creator: 'whyuxD',
      result: {
        fileName: fileName,
        sizeBytes: sizeBytes,
        downUrl: downloadUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate adult anime (AI)
app.get('/api/gen-adult-anim', async (req, res) => {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ error: 'Masukkan dulu prompt nya!' });
    }
    const apiurl = `https://love.neekoi.me/miseki?text=${encodeURIComponent(prompt)}`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    await new Promise(resolve => setTimeout(resolve, 5000)); // Delay 3000ms (3 detik)
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
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
