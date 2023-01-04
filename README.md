This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is a fork from react-demo of [PptxGenJS](https://github.com/gitbrent/PptxGenJS/tree/master/demos/react-demo) and is hosted on Heroku.

The main goal of this project is to create song gospel lyrics pptx presentations faster. All the customisation in this project is for the Presbyterian Church of Aldeota (Igreja Presbiteriana da Aldeota), in Fortaleza, Brazil.

## Pre-requisites

Due to CORS errors, I had to create a scrapping API to get DOM from letras.mus.br. The API code is available [here](https://github.com/renanbandeira/lyrics-scrapping). It is also hosted on Heroku and can be easily used with this application. If you do not want to use the load lyrics from letras.mus.br field, you should ignore this.

You also will need npm, Node and yarn to run this project.

## Instalation

To run locally, you should fork this project and run:

```
yarn install
```

This will install all the dependencies. Then, just run:
```
yarn start
```
to run locally this project

## Customisation

If you want to customize for your church or project, you should:

1- Change background images from presentations (they are base64 images loaded from `src/worshipRes` and `hymnRes` folders). They have two base64 images for each theme, one for the master slide (with song title and artist) and the other for all the following slides. You just need to change the Base64 in those files (if you need help to get the Base64 from your image, you can get it [here](https://www.base64-image.de/)).

2- Change, if you think is necessary, the text colors for each theme [here](https://github.com/renanbandeira/slides-ipa/blob/master/src/themes.ts). [These](https://github.com/renanbandeira/slides-ipa/blob/master/src/themes.ts#L5-L31) two functions are responsible for advanced styling like alignment, font size and padding. You can find more formatting options [here](https://gitbrent.github.io/PptxGenJS/docs/api-text.html).

3- Run locally to get your presentations or deploy it on somewhere!
