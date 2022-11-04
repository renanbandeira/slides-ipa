import cheerio from "cheerio";
import axios from "axios";

export async function loadLyrics(url = '') {
  if (!url.match(/letras.mus.br/g)) {
    alert('URL inválida!');
    return;
  }
  const response = await axios.get(`https://lyrics-scrapping-git-master-renanbandeira-chilipiperc.vercel.app/?url=${url.trim()}`);
  let $ = cheerio.load(response.data);
  let lyrics = '';
  $('.cnt-letra p').each(function (i, element) {
    let slideContent = "";
    element.children.forEach((node) => {
      if (node.data) {
        slideContent = slideContent + node.data + "\n";
      }
    });
    lyrics = lyrics + slideContent + '\n';
  });
  const data = {
    title: $('.cnt-head_title h1').text().trim(),
    subtitle: $('.cnt-head_title h2').text().trim(),
    lyrics: lyrics.trim()
  };
  return data;
}
