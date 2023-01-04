import React, { ChangeEvent, useState } from "react";

import { loadLyrics, loadPptxFile, LyricsData } from '../utils';

interface Props {
  onLoadComplete: (data: LyricsData) => void
}

const SlidesURLLoader = ({ onLoadComplete }: Props) => {
  const [url, setUrl] = useState('');
  const [isLoading, setLoading] = useState(false);
  async function loadLyricsData() {
    const urlElement = document.querySelector('#url') as HTMLInputElement
    const url = urlElement.value ?? '';
    if (!url.match(/letras.mus.br/g)) {
      alert('URL inválida!');
      return;
    }
    setLoading(true);
    const data = await loadLyrics(url);
    onLoadComplete(data ?? {});
    setLoading(false);
  }
  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      var files = event.target.files as FileList;
      if (files.length < 1) {
          alert('Precisa selecionar um arquivo');
          return;
      }
      var file = files[0];
      loadPptxFile(file, alert, onLoadComplete)
    } finally {
      setLoading(false);
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
