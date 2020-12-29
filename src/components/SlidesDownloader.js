import React from "react";

function SlidesDownloader({ loadAndDownloadSlides }) {
  return (
    <>
      <div className="col">
        <button type="button" className="btn btn-primary w-100" onClick={(_ev) => loadAndDownloadSlides(true)}>
          Gerar PPTx Hino
        </button>
      </div>

      <div className="col">
        <button type="button" className="btn btn-primary w-100" onClick={(_ev) => loadAndDownloadSlides(false)}>
          Gerar PPTx Louvor
        </button>
      </div>
    </>
	);
}
export default SlidesDownloader;
