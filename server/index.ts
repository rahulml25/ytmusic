import express from 'express';
import prismaClient from './prisma';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const allowlist = ['http://127.0.0.1:5500'];

function corsOptionsDelegate(req: any, callback: any) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}

app.get('/songs', cors(corsOptionsDelegate), async (req, res) => {
  const musics = await prismaClient.music.findMany({
    select: { title: true, musicUrl: true, posterUrl: true },
  });
  res.status(200).json(musics);
});

app.use(express.static('data'));

app.listen(port, () => console.log(`listening on port ${port}`));
