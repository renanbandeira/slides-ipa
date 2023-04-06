import React, { useState, useImperativeHandle, forwardRef, ChangeEvent } from 'react';
import type { StringKeyOf, ValueOf } from 'type-fest';
import { TwitterPicker } from 'react-color';
import { themePreview, THEME_OPTIONS } from '../themes';
import SlideThemeOption from './SlideThemeOption';

type BackgroundType = 'defaultSlide' | 'masterSlide';

interface FileEventTarget extends EventTarget {
  files: FileList;
  id: BackgroundType;
  result?: string;
}

interface ThemeEventTarget extends EventTarget {
  id: StringKeyOf<typeof THEME_OPTIONS>;
}

interface CustomSlidesData {
  masterSlide?: string;
  defaultSlide?: string;
}

export interface SlidesThemeRef {
  theme: ValueOf<typeof THEME_OPTIONS>;
  customSlidesData: CustomSlidesData;
  titleColor: string;
  lyricsColor: string;
  subtitleColor: string;
}

const SlidesTheme = forwardRef((_, ref) => {
  const [theme, setTheme] = useState(THEME_OPTIONS.TRADITIONAL);
  const [customSlidesData, setCustomSlidesData] = useState<CustomSlidesData>({});
  const [titleColor, setTitleColor] = useState('#FFFFFF');
  const [lyricsColor, setLyricsColor] = useState('#FFFFFF');
  const [subtitleColor, setSubtitleColor] = useState('#E4B44C');
  const isCustomTheme = theme === THEME_OPTIONS.CUSTOM;
  useImperativeHandle(
    ref,
    () =>
      ({
        theme,
        customSlidesData: customSlidesData,
        titleColor,
        lyricsColor,
        subtitleColor
      } as SlidesThemeRef)
  );
  const onSetTheme = (id: StringKeyOf<typeof THEME_OPTIONS>) => setTheme(THEME_OPTIONS[id]);
  const onFileLoaded =
    (backgroundType: BackgroundType) => (event: ProgressEvent<FileEventTarget>) => {
      const match = /^data:(.*);base64,(.*)$/.exec(event.target?.result ?? '');
      if (match == null) {
        alert('Erro ao caarregar os dados da imagem');
      }
      setCustomSlidesData({
        ...customSlidesData,
        [backgroundType]: event.target?.result
      });
    };
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target as FileEventTarget;
    const files = eventTarget.files;
    if (files.length < 1) {
      alert('Precisa selecionar um arquivo');
      return;
    }
    const file = files[0];
    const reader = new FileReader();

    // @ts-ignore there are some limitations on file event types
    reader.onload = onFileLoaded(eventTarget.id as BackgroundType);
    reader.readAsDataURL(file);
  };

  const rows = Object.keys(THEME_OPTIONS).reduce((acc, option, index, array) => {
    if (index % 2 === 0) {
      acc.push(array.slice(index, index + 2));
    }
    return acc;
  }, [] as string[][]);

  const generateOptions = () =>
    rows.map((themeOptions, i) => {
      console.log({ themeOptions });
      return (
        <div key={i} className="slide-option-row">
          {themeOptions.map((themeOption) => {
            const option = themeOption as StringKeyOf<typeof THEME_OPTIONS>;
            return (
              <SlideThemeOption
                id={option}
                isActive={theme === THEME_OPTIONS[option]}
                image={themePreview[THEME_OPTIONS[option]]?.img}
                key={themeOption}
                name={`Tema ${themePreview[THEME_OPTIONS[option]]?.name}`}
                onCheck={onSetTheme}
              />
            );
          })}
        </div>
      );
    });

  return (
    <div className="form-check">
      {generateOptions()}
      <small id="lyricsHelp" className="form-text text-muted">
        No tema personalizado, os botões de gerar hino ou gerar louvor tem o mesmo comportamento
      </small>

      {isCustomTheme && (
        <div>
          <label className="form-label" htmlFor="masterSlide">
            Background do título
          </label>
          <br />
          <input
            type="file"
            className="form-control-sm"
            id="masterSlide"
            accept=".jpeg"
            onChange={handleFileSelect}
          />
          <br />
          <br />
          <label className="form-label" htmlFor="titleColor">
            Cor do título:{' '}
          </label>
          <br />
          <TwitterPicker
            color={titleColor}
            onChangeComplete={(color) => setTitleColor(color.hex)}
          />
          <br />
          <br />
          <label className="form-label" htmlFor="subtitleColor">
            Cor do subtitulo:{' '}
          </label>
          <br />
          <TwitterPicker
            color={subtitleColor}
            onChangeComplete={(color) => setSubtitleColor(color.hex)}
          />
          <br />
          <br />
          <label className="form-label" htmlFor="defaultSlide">
            Background da letra:{' '}
          </label>
          <br />
          <input
            type="file"
            className="form-control-sm"
            accept=".jpeg"
            id="defaultSlide"
            onChange={handleFileSelect}
          />
          <br />
          <br />
          <label className="form-label" htmlFor="lyricsColor">
            Cor da letra
          </label>
          <br />
          <TwitterPicker
            color={lyricsColor}
            onChangeComplete={(color) => setLyricsColor(color.hex)}
          />
        </div>
      )}
    </div>
  );
});

export default SlidesTheme;
