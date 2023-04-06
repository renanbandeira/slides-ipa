import React, { useState, useImperativeHandle, forwardRef, ChangeEvent } from 'react';
import {
  MASTERADVENTBASE64,
  MASTERCHRISTMASBASE64,
  MASTERBASE64,
  MASTERNEWYEARBASE64,
  MASTERRAMOSBASE64,
  MASTERMAUNDYTHURSDAYBASE64
} from '../worshipRes';
import type { StringKeyOf, ValueOf } from 'type-fest';
import { TwitterPicker } from 'react-color';
import { THEME_OPTIONS } from '../themes';
import SlideThemeOption from './SlideThemeOption';
import { MASTERACAMPBASE64 } from '../worshipRes/masterAcamp';

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

  const isTraditionalTheme = theme === THEME_OPTIONS.TRADITIONAL;
  const isAdvent = theme === THEME_OPTIONS.ADVENT;
  const isChristmas = theme === THEME_OPTIONS.CHRISTMAS;
  const isNewYear = theme === THEME_OPTIONS.NEW_YEAR;
  const isAcamp = theme === THEME_OPTIONS.ACAMP;
  const isRamos = theme === THEME_OPTIONS.RAMOS;
  const isMaundyThursday = theme === THEME_OPTIONS.MAUNDY_THURSDAY;
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
  return (
    <div className="form-check">
      <div className="slide-option-row">
        <SlideThemeOption
          id="TRADITIONAL"
          isActive={isTraditionalTheme}
          image={MASTERBASE64}
          name="Tema Tradicional"
          onCheck={onSetTheme}
        />
        <SlideThemeOption
          id="ADVENT"
          isActive={isAdvent}
          image={MASTERADVENTBASE64}
          name="Tema Advento"
          onCheck={onSetTheme}
        />
      </div>
      <div className="slide-option-row">
        <SlideThemeOption
          id="MAUNDY_THURSDAY"
          isActive={isMaundyThursday}
          name="Tema Quinta Santa"
          image={MASTERMAUNDYTHURSDAYBASE64}
          onCheck={onSetTheme}
        />
        <SlideThemeOption
          id="RAMOS"
          isActive={isRamos}
          name="Tema Ramos"
          image={MASTERRAMOSBASE64}
          onCheck={onSetTheme}
        />
      </div>
      <div className="slide-option-row">
        <SlideThemeOption
          id="CHRISTMAS"
          isActive={isChristmas}
          image={MASTERCHRISTMASBASE64}
          name="Tema Natal"
          onCheck={onSetTheme}
        />
        <SlideThemeOption
          id="NEW_YEAR"
          isActive={isNewYear}
          image={MASTERNEWYEARBASE64}
          name="Tema Ano Novo"
          onCheck={onSetTheme}
        />
      </div>
      <div className="slide-option-row">
        <SlideThemeOption
          id="ACAMP"
          isActive={isAcamp}
          image={MASTERACAMPBASE64}
          name="Tema Acampamento"
          onCheck={onSetTheme}
        />
        <SlideThemeOption
          id="CUSTOM"
          isActive={isCustomTheme}
          name="Tema Personalizado"
          onCheck={onSetTheme}
        />
      </div>
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
