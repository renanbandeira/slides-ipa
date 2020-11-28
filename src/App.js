import React, { useState } from "react";
import cheerio from "cheerio";
import request from "request";
import { createSlides } from "./tstest/slideGenerator";
import "./App.css";

function loadLyrics() {
  const url = document.querySelector('#url').value || '';
  if (!url.match(/letras.mus.br/g)) {
    alert('URL inválida!');
    return;
  }
  request({
    method: 'GET',
		url: `https://lyrics-scrapping.herokuapp.com/?url=${url.trim()}`
	}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);
    // let title = $('title');
		document.querySelector('#title').value = $('.cnt-head_title h1').text().trim();
		document.querySelector('#subtitle').value = $('.cnt-head_title h2').text().trim();
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
    document.querySelector('#lyrics').value = lyrics.trim();
  });
}

function loadAndDownloadSlides(isHymn, isAdvent) {
  const title = document.querySelector('#title').value || '';
  const subtitle = document.querySelector('#subtitle').value || '';
  const lyrics = document.querySelector('#lyrics').value || '';
  if (title === '' || lyrics === '') {
    alert('Nome da música e letra são obrigatórios!');
    return;
  }
  createSlides(title, subtitle, lyrics, isHymn, isAdvent);
}

function App() {
  const [isAdvent, setIsAdvent] = useState(false);
  function updateAdventTheme(event) {
    setIsAdvent(event.target.checked)
  }
  return (
		<div>
			<main className="container">
				<div className="jumbotron mt-5">
					<h1 className="display-4">Slides IPA</h1>
            <div className="form-group">
              <label htmlFor="url">Digite a URL do letras.mus.br:</label>
              <input type="url" id="url" className="form-control" placeholder="URL" />
            </div>
          <button type="button" className="btn btn-secondary w-100" onClick={() => loadLyrics()}>
            Carregar Letra
          </button>
					<hr className="my-4" />
            <div className="row">
  						<div className="col">
                <div className="form-group">
                  <label htmlFor="lyrics">ou cole a letra aqui:</label>
    							<textarea className="form-control" id="lyrics" style={{ height: '440px' }}/>
                  <br />
                  <label htmlFor="title">Nome da música:</label>
                  <input type="text" id="title" className="form-control"/>
                  <br />
                  <label htmlFor="subtitle">Autor:</label>
                  <input type="subtitle" id="subtitle" className="form-control" />
                  <small id="lyricsHelp" className="form-text text-muted">Ao carregar a letra via URL, esses campos serão preenchido automaticamente.</small>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="adventCheck" checked={isAdvent} onChange={updateAdventTheme} />
                  <label className="form-check-label" htmlFor="adventCheck">Tema Advento</label>
                </div>
  						</div>
  					</div>
          <hr className="my-4" />
					<div className="row">
						<div className="col">
							<button type="button" className="btn btn-primary w-100" onClick={(_ev) => loadAndDownloadSlides(true, isAdvent)}>
								Gerar PPTx Hino
							</button>
						</div>

            <div className="col">
							<button type="button" className="btn btn-primary w-100" onClick={(_ev) => loadAndDownloadSlides(false, isAdvent)}>
								Gerar PPTx Louvor
							</button>
						</div>
					</div>
				</div>
			</main>
      <div className="text-center">
        <a className="nav-link px-1 mx-1 py-2" href="https://github.com/renanbandeira" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: '#ffffff'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="navbar-nav-svg" viewBox="0 0 512 499.36" role="img"><title>GitHub</title><path fill="currentColor" fillRule="evenodd" d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"></path></svg>
        <br />
        Desenvolvido por Renan Bandeira
        </a>
    </div>
		</div>
	);
}
export default App;
