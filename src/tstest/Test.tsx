/**
 * Test TypeScript Defs file
 */
import { IMGBASE64, MASTERBASE64 } from "../worshipRes";
import { IMGHYMNBASE64, MASTERHYMNBASE64 } from "../hymnRes";
import pptxgen from "pptxgenjs";

export function createSlides(title: string, subtitle: string, lyrics: string, isHymn: boolean) {
	let pptx = new pptxgen();

	// PPTX Method 1:
	pptx.defineLayout({ name: "TST", width: 12, height: 7 });
	//pptx.layout = "TST";
	pptx.layout = "LAYOUT_WIDE";

	// PPTX Method 2:
	pptx.defineSlideMaster({
		title: "MASTER_SLIDE",
		bkgd: { data: isHymn ? MASTERHYMNBASE64 : MASTERBASE64},
	});

	pptx.defineSlideMaster({
		title: "DEFAULT_SLIDE",
		bkgd: { data: isHymn ? IMGHYMNBASE64 : IMGBASE64},
	});
	basicDemoSlide(pptx, title, subtitle);
	const strophes = lyrics.split('\n\n') || [];
	strophes.forEach((strophe) => {
		defaultSlide(pptx, strophe);
	});
	pptx.writeFile(`${title.replace(/ /g, '_')}-${subtitle.replace(/ /g, '_')}`).then((fileName) => console.log(`writeFile: ${fileName}`));
}

function basicDemoSlide(pptx: pptxgen, title: string, subtitle: string) {
	// LEGACY-TEST: @deprecated in v3.3.0
	//pptx.addSlide("masterName"); // slide0

	pptx.addSection({ title: "SongTitle" });

	// PPTX Method 3:
	//pptx.addSlide(); // slide1
	//pptx.addSlide({ sectionTitle: "TypeScript" }); // slide2

	let slide3 = pptx.addSlide({ sectionTitle: "SongTitle", masterName: "MASTER_SLIDE" });
	let opts: pptxgen.TextPropsOptions = {
		x: 0,
		y: "40%",
		w: "100%",
		color: '#FFFFFF',
		h: 1.5,
		align: "center",
		fontSize: 44,
	};

	let opts2: pptxgen.TextPropsOptions = {
		x: 0,
		y: "50%",
		w: "100%",
		h: 1.5,
		color: '#FFFFFF',
		align: "center",
		fontSize: 38,
	};
	slide3.addText(title, opts);
	slide3.addText(subtitle, opts2);
}

function defaultSlide(pptx: pptxgen, data: string) {
	// LEGACY-TEST: @deprecated in v3.3.0
	//pptx.addSlide("masterName"); // slide0

	pptx.addSection({ title: "SongLyrics" });

	let dataLine = data.split('\n').map((line) => ({ text: line, breakLine: true }));
	// PPTX Method 3:
	//pptx.addSlide(); // slide1
	//pptx.addSlide({ sectionTitle: "TypeScript" }); // slide2

	let slide4 = pptx.addSlide({ sectionTitle: "SongLyrics", masterName: "DEFAULT_SLIDE" });
	let opts: pptxgen.TextPropsOptions = {
		x: 0,
		y: '10%',
		w: "100%",
		color: '#FFFFFF',
		h: '70%',
		align: "center",
		breakLine: true,
		fontSize: 40,
	};
	slide4.addText(dataLine, opts);
}
