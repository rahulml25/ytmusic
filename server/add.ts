import { copyFile, mkdir } from 'fs/promises';
import prismaClient from './prisma';

async function main() {
  const title = process.argv[2];
  const musicPath = process.argv[3];
  const imagePath = process.argv[4];

  let music = await prismaClient.music.create({
    data: { title, musicUrl: '', posterUrl: '' },
  });

  const id = music.id;

  const musicUrl = `/${id}/music.mp3`;
  const posterUrl = `/${id}/poster.png`;

  await mkdir(`data/${id}`);

  await Promise.all([
    copyFile(musicPath, `data/${musicUrl}`),
    copyFile(imagePath, `data/${posterUrl}`),
  ]);

  music = await prismaClient.music.update({
    where: { id },
    data: { musicUrl, posterUrl },
  });

  console.log(music);
}

main();
