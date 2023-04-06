import cheerio from 'cheerio';
import axios from 'axios';
import parse from 'pptx-parser';

export interface LyricsData {
  title?: string;
  subtitle?: string;
  lyrics?: string;
}

export const isURLFromLetras = (url: string) => url.match(/letras.mus.br/g);

export const isURLFromNovoCantico = (url: string) => url.match(/novocantico.com.br/g);

export const loadLyrics = async (url: string = '') => {
  const response = await axios.get(
    `https://lyrics-scrapping-git-master-renanbandeira-chilipiperc.vercel.app/?url=${url.trim()}`
  );
  let $ = cheerio.load(response.data);
  let lyrics = '';
  if (isURLFromLetras(url)) {
    $('.cnt-letra p').each(function (i, element) {
      let slideContent = '';
      element.children.forEach((node) => {
        if (node.data) {
          slideContent = slideContent + node.data + '\n';
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
  if (isURLFromNovoCantico(url)) {
    const chorus = $('coro')
      .first()
      .text()
      .split('\n')
      .map((verse) => verse.trim())
      .join('\n');
    console.log(chorus);
    $('estrofe').each(function (i, element) {
      let slideContent = '';
      const hasChorus = element.children.some((child) => child.name === 'coro');
      console.log({ hasChorus });
      const strophe = $(element)
        .text()
        .trim()
        .split('\n')
        .map((verse) => verse.trim())
        .join('\n');
      if (i > 0) {
        slideContent += '\n' + strophe;
      } else {
        slideContent += strophe + '\n';
      }
      console.log({ strophe });
      if (!hasChorus || (i > 0 && !hasChorus)) {
        slideContent += '\n' + chorus;
      }
      lyrics = lyrics + slideContent;
    });
    const data = {
      title: $('titulo').text().trim(),
      subtitle: `HNC ${$('numero').text().trim()}`,
      lyrics: lyrics.trim()
    } as LyricsData;
    console.log(data);
    return data;
  }
  return {} as LyricsData;
};

export const loadPptxFile = async (
  file: File,
  onError: (message: string) => void,
  onSuccess: (result: LyricsData) => void
) => {
  try {
    const pptxFile = await parse(file);
    let pptxContent = '';
    let title = '';
    let subtitle = '';
    if (pptxFile && pptxFile.slides) {
      pptxFile.slides.forEach((slide: { pageElements: any[] }, slideIndex: number) => {
        if (slide.pageElements) {
          slide.pageElements.forEach((pageElement) => {
            pageElement.shape?.text?.paragraphs.forEach((paragraph: { textSpans: any[] }) => {
              paragraph.textSpans?.forEach((textSpan) => {
                if (textSpan.textRun?.content) {
                  if (slideIndex === 0) {
                    if (!title) {
                      title = textSpan.textRun.content.trim();
                    } else {
                      subtitle = textSpan.textRun.content.trim();
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
};
