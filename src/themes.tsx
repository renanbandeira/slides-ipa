import { MASTERHYMNADVENTBASE64, IMGHYMNADVENTBASE64, MASTERHYMNCHRISTMASBASE64, IMGHYMNCHRISTMASBASE64, MASTERHYMNBASE64, IMGHYMNBASE64 } from "./hymnRes"
import { IMGADVENTBASE64, IMGBASE64, IMGCHRISTMASBASE64, MASTERADVENTBASE64, MASTERBASE64, MASTERCHRISTMASBASE64 } from "./worshipRes"

export const THEME_OPTIONS = {
  TRADITIONAL: 0,
  ADVENT: 1,
  CHRISTMAS: 2,
  CUSTOM: 3,
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
	traditional: {
		masterSlide: MASTERBASE64,
		defaultSlide: IMGBASE64,
    titleColor: '#FFFFFF',
    lyricsColor: '#FFFFFF',
    subtitleColor: '#E4B44C'
	}
}
