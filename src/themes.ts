import {
  MASTERHYMNADVENTBASE64,
  IMGHYMNADVENTBASE64,
  MASTERHYMNCHRISTMASBASE64,
  IMGHYMNCHRISTMASBASE64,
  MASTERHYMNBASE64,
  IMGHYMNBASE64,
  MASTERHYMNNEWYEARBASE64,
  IMGHYMNNEWYEARBASE64,
  MASTERHYMNRAMOSBASE64,
  IMGHYMNRAMOSBASE64,
  MASTERHYMNMAUNDYTHURSDAYBASE64,
  IMGHYMNMAUNDYTHURSDAYBASE64
} from './hymnRes';
import {
  IMGADVENTBASE64,
  IMGBASE64,
  IMGCHRISTMASBASE64,
  MASTERADVENTBASE64,
  MASTERBASE64,
  MASTERCHRISTMASBASE64,
  MASTERNEWYEARBASE64,
  IMGNEWYEARBASE64,
  MASTERRAMOSBASE64,
  IMGRAMOSBASE64,
  MASTERMAUNDYTHURSDAYBASE64,
  IMGMAUNDYTHURSDAYBASE64
} from './worshipRes';
import pptxgen from 'pptxgenjs';
import { MASTERACAMPBASE64 } from './worshipRes/masterAcamp';
import { IMGACAMPBASE64 } from './worshipRes/imgAcamp';

export const formattingOptions = {
  title: {
    x: 0.8,
    y: '40%',
    w: '100%',
    h: 1.5,
    align: 'left',
    fontSize: 75
  } as pptxgen.TextPropsOptions,
  subtitle: {
    x: 0.8,
    y: '50%',
    w: '100%',
    h: 1.5,
    align: 'left',
    fontSize: 40
  } as pptxgen.TextPropsOptions,
  lyrics: {
    x: 0.8,
    y: '10%',
    w: '100%',
    h: '70%',
    align: 'left',
    breakLine: true,
    fontSize: 65
  } as pptxgen.TextPropsOptions
};

export const THEME_OPTIONS = {
  TRADITIONAL: 0,
  ADVENT: 1,
  CHRISTMAS: 2,
  NEW_YEAR: 3,
  ACAMP: 4,
  RAMOS: 5,
  MAUNDY_THURSDAY: 6,
  CUSTOM: 7
};

export const hymnsThemes = {
  advent: {
    masterSlide: MASTERHYMNADVENTBASE64,
    defaultSlide: IMGHYMNADVENTBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
  },
  acamp: {
    masterSlide: MASTERACAMPBASE64,
    defaultSlide: IMGACAMPBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
  },
  christmas: {
    masterSlide: MASTERHYMNCHRISTMASBASE64,
    defaultSlide: IMGHYMNCHRISTMASBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
  },
  ramos: {
    masterSlide: MASTERHYMNRAMOSBASE64,
    defaultSlide: IMGHYMNRAMOSBASE64,
    titleColor: '#AF111C',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#B5923C'
  },
  maundyThursday: {
    masterSlide: MASTERHYMNMAUNDYTHURSDAYBASE64,
    defaultSlide: IMGHYMNMAUNDYTHURSDAYBASE64,
    titleColor: '#AF111C',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#B5923C'
  },
  newYear: {
    masterSlide: MASTERHYMNNEWYEARBASE64,
    defaultSlide: IMGHYMNNEWYEARBASE64,
    titleColor: '#B5923C',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#DECA7B'
  },
  traditional: {
    masterSlide: MASTERHYMNBASE64,
    defaultSlide: IMGHYMNBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
  }
};

export const worshipsThemes = {
  advent: {
    masterSlide: MASTERADVENTBASE64,
    defaultSlide: IMGADVENTBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#9900EF',
    subtitleColor: '#E4B44C'
  },
  acamp: {
    masterSlide: MASTERACAMPBASE64,
    defaultSlide: IMGACAMPBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
  },
  christmas: {
    masterSlide: MASTERCHRISTMASBASE64,
    defaultSlide: IMGCHRISTMASBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#AF111C',
    subtitleColor: '#E4B44C'
  },
  ramos: {
    masterSlide: MASTERRAMOSBASE64,
    defaultSlide: IMGRAMOSBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#AF111C',
    subtitleColor: '#E4B44C'
  },
  maundyThursday: {
    masterSlide: MASTERMAUNDYTHURSDAYBASE64,
    defaultSlide: IMGMAUNDYTHURSDAYBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#AF111C',
    subtitleColor: '#E4B44C'
  },
  newYear: {
    masterSlide: MASTERNEWYEARBASE64,
    defaultSlide: IMGNEWYEARBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#B5923C',
    subtitleColor: '#DECA7B'
  },
  traditional: {
    masterSlide: MASTERBASE64,
    defaultSlide: IMGBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
  }
};
