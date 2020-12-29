/**
 * Test TypeScript Defs file
 */
import { IMGBASE64, MASTERBASE64, IMGADVENTBASE64, MASTERADVENTBASE64 } from "../worshipRes";
import { IMGHYMNBASE64, MASTERHYMNBASE64, IMGHYMNADVENTBASE64, MASTERHYMNADVENTBASE64 } from "../hymnRes";
import pptxgen from "pptxgenjs";

interface SlidesData {
	titleBackground: string,
	lyricsBackground: string
}

export function createSlides(title: string, subtitle: string, lyrics: string, isHymn: boolean, isAdvent: boolean, isCustomTheme: boolean, customSlidesData: SlidesData) {
	let pptx = new pptxgen();

	// PPTX Method 1:
	pptx.defineLayout({ name: "TST", width: 12, height: 7 });
	//pptx.layout = "TST";
	pptx.layout = "LAYOUT_WIDE";

	let theme = {
		masterSlide: MASTERHYMNBASE64,
		defaultSlide: IMGHYMNBASE64
	};

	if (isCustomTheme) {
		theme.masterSlide = customSlidesData.titleBackground;
		theme.defaultSlide = customSlidesData.lyricsBackground;
	} else {
		if (!isHymn) {
			if (isAdvent) {
				theme.masterSlide = MASTERADVENTBASE64;
				theme.defaultSlide = IMGADVENTBASE64;
			} else {
				theme.masterSlide = MASTERBASE64;
				theme.defaultSlide = IMGBASE64;
			}
		} else if (isAdvent) {
			theme.masterSlide = MASTERHYMNADVENTBASE64;
			theme.defaultSlide = IMGHYMNADVENTBASE64;
		}
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
	createSongTitleSlide(pptx, title, subtitle);
	const strophes = lyrics.split('\n\n') || [];
	strophes.forEach((strophe) => {
		createStropheSlide(pptx, strophe);
	});
	pptx.writeFile(`${title} - ${subtitle}${isAdvent ? ' (Advento)' : ''}`).then((fileName) => console.log(`writeFile: ${fileName}`));
}

function createSongTitleSlide(pptx: pptxgen, title: string, subtitle: string) {
	// LEGACY-TEST: @deprecated in v3.3.0
	//pptx.addSlide("masterName"); // slide0

	// pptx.addSection({ title: "SongTitle" });

	// PPTX Method 3:
	//pptx.addSlide(); // slide1
	//pptx.addSlide({ sectionTitle: "TypeScript" }); // slide2

	let slide3 = pptx.addSlide({ sectionTitle: "SongTitle", masterName: "MASTER_SLIDE" });
	let opts: pptxgen.TextPropsOptions = {
		x: 0.8,
		y: "40%",
		w: "100%",
		color: '#FFFFFF',
		h: 1.5,
		align: "left",
		fontSize: 75,
	};

	let opts2: pptxgen.TextPropsOptions = {
		x: 0.8,
		y: "50%",
		w: "100%",
		h: 1.5,
		color: '#E4B44C',
		align: "left",
		fontSize: 40,
	};
	slide3.addText(title, opts);
	slide3.addText(subtitle, opts2);
}

function createStropheSlide(pptx: pptxgen, data: string) {
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
		color: '#FFFFFF',
		h: '70%',
		align: "left",
		breakLine: true,
		fontSize: 65,
	};
	slide4.addText(dataLine, opts);
}
