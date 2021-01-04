import React, { useState } from "react";
import parse from 'pptx-parser'

import { loadLyrics } from '../utils';

function SlidesURLLoader({ onLoadComplete }) {
  const [url, setUrl] = useState('');
  const [isLoading, setLoading] = useState(false);
  async function loadLyricsData() {
    const url = document.querySelector('#url').value || '';
    if (!url.match(/letras.mus.br/g)) {
      alert('URL inválida!');
      return;
    }
    setLoading(true);
    const data = await loadLyrics(url);
    onLoadComplete(data);
    setLoading(false);
  }
  const handleFileSelect = async (e) => {
    var files = e.target.files;
    if (files.length < 1) {
        alert('Precisa selecionar um arquivo');
        return;
    }
    var file = files[0];
    try {
      const pptxFile = await parse(file);
      let pptxContent = '';
      if (pptxFile && pptxFile.slides) {
        pptxFile.slides.forEach((slide) => {
          if (slide.pageElements) {
            slide.pageElements.forEach((pageElement) => {
              if (pageElement.shape && pageElement.shape.text && pageElement.shape.text.paragraphs) {
                pageElement.shape.text.paragraphs.forEach((paragraph) => {
                  if (paragraph.textSpans) {
                    paragraph.textSpans.forEach((textSpan) => {
                      if (textSpan.textRun && textSpan.textRun.content) {
                        pptxContent += `${textSpan.textRun.content}\n`;
                      }
                    });
                  }
                });
              }
            });
          }
          pptxContent += '\n';
        });
        onLoadComplete({
          title: '',
          subtitle: '',
          lyrics: pptxContent.trim()
        });
      } else {
        alert('Não foram encontrados slides no arquivo!');
      }
    } catch (error) {
      alert('Não foi possível abrir esse arquivo!');
    }
  }
  return (
    <>
      <div className="form-group">
        <label htmlFor="url">Digite a URL do letras.mus.br:</label>
        <input type="url" id="url" className="form-control" placeholder="URL" value={url} onChange={(ev) => setUrl(ev.target.value)} />
      </div>
      <button type="button" className="btn btn-secondary w-100" onClick={async () => isLoading ? null : loadLyricsData()}>
        {isLoading ?
          <div className="spinner-grow" role="status" />
          : 'Carregar Letra'
        }
      </button>
      <div className="form-group">
        <br />
        <label className="form-label" htmlFor="presentation">ou carregue a letra a partir de uma apresentação existente (PPT ou PPTx):</label>
        <br />
        <input type="file" className="form-control-sm" id="presentation" accept=".ppt,.pptx" onChange={handleFileSelect} />
      </div>
    </>
	);
}
export default SlidesURLLoader;
