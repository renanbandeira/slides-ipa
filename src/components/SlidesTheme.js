import React, { useState, useImperativeHandle, forwardRef } from "react";
import { TwitterPicker } from 'react-color';

const RADIO_DATA = {
  TRADITIONAL: 0,
  ADVENT: 1,
  CUSTOM: 2
}

const SlidesTheme = forwardRef((props, ref) => {
  const [theme, setTheme] = useState(RADIO_DATA.TRADITIONAL);
  const [customSlidesData, setCustomSlidesData] = useState({});
  const [titleColor, setTitleColor] = useState('#FFFFFF');
  const [lyricsColor, setLyricsColor] = useState('#FFFFFF');
  const [subtitleColor, setSubtitleColor] = useState('#E4B44C');

  const isTraditionalTheme = theme === RADIO_DATA.TRADITIONAL;
  const isAdvent = theme === RADIO_DATA.ADVENT;
  const isCustomTheme = theme === RADIO_DATA.CUSTOM;
  useImperativeHandle(ref, () => ({
    isAdvent,
    isCustomTheme,
    customSlidesData: customSlidesData,
    titleColor,
    lyricsColor,
    subtitleColor
  }));
  const updateTheme = (ev) => {
    setTheme(RADIO_DATA[ev.target.id]);
  }
  const onFileLoaded = (backgroundType) => (event) => {
      const match = /^data:(.*);base64,(.*)$/.exec(event.target.result);
      if (match == null) {
          alert('Erro ao caarregar os dados da imagem');
      }
      setCustomSlidesData({
        ...customSlidesData,
        [backgroundType]: event.target.result
      });
  }
  const handleFileSelect = (e) => {
    var files = e.target.files;
    if (files.length < 1) {
        alert('Precisa selecionar um arquivo');
        return;
    }
    var file = files[0];
    var reader = new FileReader();
    reader.onload = onFileLoaded(e.target.id);
    reader.readAsDataURL(file);
}
  return (
    <div className="form-check">
      <input type="radio" name="theme" className="form-check-input" id="TRADITIONAL" checked={isTraditionalTheme} onChange={updateTheme} />
      <label className="form-check-label" htmlFor="TRADITIONAL">Tema Tradicional</label>
      <br />

      <input type="radio" name="theme" className="form-check-input" id="ADVENT" checked={isAdvent} onChange={updateTheme} />
      <label className="form-check-label" htmlFor="ADVENT">Tema Advento</label>
      <br />

      <input type="radio" name="theme" className="form-check-input" id="CUSTOM" checked={isCustomTheme} onChange={updateTheme} />
      <label className="form-check-label" htmlFor="CUSTOM">Tema Personalizado</label>
      <small id="lyricsHelp" className="form-text text-muted">No tema personalizado, os botões de gerar hino ou gerar louvor tem o mesmo comportamento</small>

      {isCustomTheme &&
        <div>
          <label className="form-label" htmlFor="titleBackground">Background do título</label>
          <br />
          <input type="file" className="form-control-sm" id="titleBackground" accept=".jpeg" onChange={handleFileSelect} />
          <br />
          <br />
          <label className="form-label" htmlFor="titleColor">Cor do título</label>
          <br />
          <TwitterPicker
            id="titleColor"
            color={ titleColor }
            onChangeComplete={ (color) => setTitleColor(color.hex) }
          />
          <br />
          <br />
          <label className="form-label" htmlFor="subtitleColor">Cor do subtitulo</label>
          <br />
          <TwitterPicker
            id="subtitleColor"
            color={ subtitleColor }
            onChangeComplete={ (color) => setSubtitleColor(color.hex) }
          />
          <br />
          <br />
          <label className="form-label" htmlFor="lyricsBackground">Background da letra</label>
          <br />
          <input type="file" className="form-control-sm" accept=".jpeg" id="lyricsBackground" onChange={handleFileSelect} />
          <br />
          <br />
          <label className="form-label" htmlFor="lyricsColor">Cor da letra</label>
          <br />
          <TwitterPicker
            id="lyricsColor"
            color={ lyricsColor }
            onChangeComplete={ (color) => setLyricsColor(color.hex) }
          />
        </div>
      }
    </div>
	);
});
export default SlidesTheme;
