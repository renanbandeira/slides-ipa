import { MASTERHYMNADVENTBASE64, IMGHYMNADVENTBASE64, MASTERHYMNCHRISTMASBASE64, IMGHYMNCHRISTMASBASE64, MASTERHYMNBASE64, IMGHYMNBASE64, MASTERHYMNNEWYEARBASE64, IMGHYMNNEWYEARBASE64 } from "./hymnRes"
import { IMGADVENTBASE64, IMGBASE64, IMGCHRISTMASBASE64, MASTERADVENTBASE64, MASTERBASE64, MASTERCHRISTMASBASE64, MASTERNEWYEARBASE64, IMGNEWYEARBASE64 } from "./worshipRes"

export const THEME_OPTIONS = {
  TRADITIONAL: 0,
  ADVENT: 1,
  CHRISTMAS: 2,
  NEW_YEAR: 3,
  CUSTOM: 4,
}

export const hymnsThemes = {
	advent: {
		masterSlide: MASTERHYMNADVENTBASE64,
		defaultSlide: IMGHYMNADVENTBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C',
	},
	christmas: {
		masterSlide: MASTERHYMNCHRISTMASBASE64,
		defaultSlide: IMGHYMNCHRISTMASBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
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
}

export const worshipsThemes = {
  advent: {
		masterSlide: MASTERADVENTBASE64,
		defaultSlide: IMGADVENTBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#9900EF',
    subtitleColor: '#E4B44C',
	},
	christmas: {
		masterSlide: MASTERCHRISTMASBASE64,
		defaultSlide: IMGCHRISTMASBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#AF111C',
    subtitleColor: '#E4B44C',
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
}
