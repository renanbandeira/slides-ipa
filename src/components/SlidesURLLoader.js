import React, { useState } from "react";
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

    </>
	);
}
export default SlidesURLLoader;
