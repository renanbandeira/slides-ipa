import React from "react";
import cheerio from "cheerio";
import request from "request";
import { createSlides } from "./tstest/Test";
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

function loadAndDownloadSlides(isHymn) {
  const title = document.querySelector('#title').value || '';
  const subtitle = document.querySelector('#subtitle').value || '';
  const lyrics = document.querySelector('#lyrics').value || '';
  if (title === '' || lyrics === '') {
    alert('Nome da música e letra são obrigatórios!');
    return;
  }
  createSlides(title, subtitle, lyrics, isHymn);
}

function App() {
  return (
		<div>
			<main className="container">
				<div className="jumbotron mt-5">
					<h1 className="display-4">Slides IPA</h1>
            <div class="form-group">
              <label for="url">Digite a URL do letras.mus.br:</label>
              <input type="url" id="url" className="form-control" placeholder="URL" />
            </div>
          <button type="button" className="btn btn-secondary w-100" onClick={() => loadLyrics()}>
            Carregar Letra
          </button>
					<hr className="my-4" />
            <div className="row">
  						<div className="col">
                <div class="form-group">
                  <label for="lyrics">ou cole a letra aqui:</label>
    							<textarea className="form-control" id="lyrics" style={{ height: '440px' }}/>
                  <br />
                  <label for="title">Nome da música:</label>
                  <input type="text" id="title" className="form-control"/>
                  <br />
                  <label for="subtitle">Autor:</label>
                  <input type="subtitle" id="subtitle" className="form-control" />
                  <small id="lyricsHelp" class="form-text text-muted">Ao carregar a letra via URL, esses campos serão preenchido automaticamente.</small>
                </div>
  						</div>
  					</div>
          <hr className="my-4" />
					<div className="row">
						<div className="col">
							<button type="button" className="btn btn-primary w-100" onClick={(_ev) => loadAndDownloadSlides(true)}>
								Gerar PPTx Hino
							</button>
						</div>

            <div className="col">
							<button type="button" className="btn btn-primary w-100" onClick={(_ev) => loadAndDownloadSlides(false)}>
								Gerar PPTx Louvor
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
export default App;
