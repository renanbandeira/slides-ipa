/**
 * Test TypeScript Defs file
 */
import type { ValueOf } from 'type-fest';
import pptxgen from "pptxgenjs";
import { THEME_OPTIONS, hymnsThemes, worshipsThemes } from '../themes';

interface SlidesData {
	title: string,
	subtitle: string,
	lyrics: string,
	isHymn: boolean,
	selectedTheme: ValueOf<typeof THEME_OPTIONS>,
	masterSlide: string,
	defaultSlide: string,
	titleColor: string,
	subtitleColor: string,
	lyricsColor: string
}

export function createSlides(options: SlidesData) {
	let pptx = new pptxgen();
	const { title, subtitle, lyrics, isHymn,
		selectedTheme, titleColor,
		lyricsColor, subtitleColor,
		masterSlide, defaultSlide,
	} = options;

	// PPTX Method 1:
	pptx.defineLayout({ name: "TST", width: 12, height: 7 });
	//pptx.layout = "TST";
	pptx.layout = "LAYOUT_WIDE";
	const predefinedSlides = isHymn ? hymnsThemes : worshipsThemes

	let theme = predefinedSlides.traditional
	let suffix = ''

	switch (selectedTheme) {
		case THEME_OPTIONS.ADVENT:
			theme = predefinedSlides.advent
			suffix = '(Advento)'
			break
		case THEME_OPTIONS.CHRISTMAS:
			theme = predefinedSlides.christmas
			suffix = '(Natal)'
			break
		case THEME_OPTIONS.NEW_YEAR:
			theme = predefinedSlides.newYear
			suffix = '(Ano Novo)'
			break
		case THEME_OPTIONS.CUSTOM:
			theme = {
				masterSlide,
				defaultSlide,
				titleColor,
				lyricsColor,
				subtitleColor,
			}
			break
		default:
			break
	}

	// PPTX Method 2:
	pptx.defineSlideMaster({
		title: "MASTER_SLIDE",
		bkgd: { data: theme.masterSlide },
	});

	pptx.defineSlideMaster({
		title: "DEFAULT_SLIDE",
		bkgd: { data: theme.defaultSlide},
	});
	createSongTitleSlide(pptx, title, subtitle, theme.titleColor, theme.subtitleColor);
	const strophes = lyrics.split('\n\n') || [];
	strophes.forEach((strophe) => {
		createStropheSlide(pptx, strophe, theme.lyricsColor);
	});
	pptx.writeFile(`${title} - ${subtitle} ${suffix}`).then((fileName) => console.log(`writeFile: ${fileName}`));
}

function createSongTitleSlide(pptx: pptxgen, title: string, subtitle: string, titleColor: string, subtitleColor: string) {
	let slide3 = pptx.addSlide({ sectionTitle: "SongTitle", masterName: "MASTER_SLIDE" });
	let opts: pptxgen.TextPropsOptions = {
		x: 0.8,
		y: "40%",
		w: "100%",
		color: titleColor,
		h: 1.5,
		align: "left",
		fontSize: 75,
	};

	let opts2: pptxgen.TextPropsOptions = {
		x: 0.8,
		y: "50%",
		w: "100%",
		h: 1.5,
		color: subtitleColor,
		align: "left",
		fontSize: 40,
	};
	slide3.addText(title, opts);
	slide3.addText(subtitle, opts2);
}

function createStropheSlide(pptx: pptxgen, data: string, lyricsColor: string) {
	// LEGACY-TEST: @deprecated in v3.3.0
	//pptx.addSlide("masterName"); // slide0

	// pptx.addSection({ title: "SongLyrics" });

	let dataLine = data.split('\n').map((line) => ({ text: line, breakLine: true }));
	// PPTX Method 3:
	//pptx.addSlide(); // slide1
	//pptx.addSlide({ sectionTitle: "TypeScript" }); // slide2

	let slide4 = pptx.addSlide({ sectionTitle: "SongLyrics", masterName: "DEFAULT_SLIDE" });
	let opts: pptxgen.TextPropsOptions = {
		x: 0.8,
		y: '10%',
		w: "100%",
		color: lyricsColor,
		h: '70%',
		align: "left",
		breakLine: true,
		fontSize: 65,
	};
	slide4.addText(dataLine, opts);
}
