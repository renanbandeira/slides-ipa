import cheerio from "cheerio";
import axios from "axios";
import parse from 'pptx-parser'

export interface LyricsData {
  title?: string
  subtitle?: string
  lyrics?: string
}

export const loadLyrics = async (url: string = '') => {
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
  } as LyricsData;
  return data;
}

export const loadPptxFile = async (file: File, onError: (message: string) => void, onSuccess: (result: LyricsData) => void) => {
  try {
    const pptxFile = await parse(file);
    let pptxContent = '';
    let title = '';
    let subtitle = '';
    if (pptxFile && pptxFile.slides) {
      pptxFile.slides.forEach((slide: { pageElements: any[]; }, slideIndex: number) => {
        if (slide.pageElements) {
          slide.pageElements.forEach((pageElement) => {
            pageElement.shape?.text?.paragraphs.forEach((paragraph: { textSpans: any[]; }) => {
              paragraph.textSpans?.forEach((textSpan) => {
                if (textSpan.textRun?.content) {
                  if (slideIndex === 0) {
                    if (!title) {
                      title = textSpan.textRun.content.trim()
                    } else {
                      subtitle = textSpan.textRun.content.trim()
                    }
                  } else {
                    pptxContent += `${textSpan.textRun.content}\n`;
                  }
                }
              });
            });
          });
        }
        pptxContent += '\n';
      });
      onSuccess({
        title,
        subtitle,
        lyrics: pptxContent.trim()
      });
    } else {
      onError('Não foram encontrados slides no arquivo!');
    }
  } catch (error) {
    onError('Não foi possível abrir esse arquivo!');
  }
}
