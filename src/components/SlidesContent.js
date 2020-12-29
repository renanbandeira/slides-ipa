import React, { useState, forwardRef, useImperativeHandle } from "react";

const SlidesContent = forwardRef((props, ref) => {
  const [songTitle, setSongTitle] = useState('');
  const [songSubtitle, setSongSubtitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const setSongData = (data) => {
    setSongTitle(data.title);
    setSongSubtitle(data.subtitle);
    setLyrics(data.lyrics);
  }
  useImperativeHandle(ref, () => ({
    setSongData: setSongData,
    songTitle,
    songSubtitle,
    lyrics
  }));
  return (
    <div className="form-group">
      <label htmlFor="lyrics">ou cole a letra aqui:</label>
      <textarea className="form-control" id="lyrics" style={{ height: '440px' }} onChange={(ev) => setLyrics(ev.target.value)} value={lyrics} />
      <br />
      <label htmlFor="title">Nome da música:</label>
      <input type="text" id="title" className="form-control" onChange={(ev) => setSongTitle(ev.target.value)} value={songTitle}/>
      <br />
      <label htmlFor="subtitle">Autor:</label>
      <input type="subtitle" id="subtitle" className="form-control" onChange={(ev) => setSongSubtitle(ev.target.value)}  value={songSubtitle} />
      <small id="lyricsHelp" className="form-text text-muted">Ao carregar a letra via URL, esses campos serão preenchido automaticamente.</small>
    </div>
	);
});
export default SlidesContent;
