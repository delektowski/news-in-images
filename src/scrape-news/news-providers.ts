import {NewsSelectorDataModel} from "../models/newsSelectorData.model";
import {CountriesCodes} from "../models/countries-codes.enum";

export let newsProvidersData: NewsSelectorDataModel[] = [];


export const dataNYT = {
    url: "https://www.nytimes.com/",
    mainSelector: "[data-hierarchy=feed]",
    subSelector: "h3",
    linkSelector: "section a",
    newsProvider: "New York Times",
    country: CountriesCodes.us,
};

export const dataTELEGRAPH = {
    url: "https://www.telegraph.co.uk/",
    mainSelector: "[data-test=package--medium]",
    subSelector: "[data-test=list-headline-link] [data-test=headline] span",
    linkSelector: "[data-test=list-headline-link]",
    newsProvider: "The Telegraph",
    country: CountriesCodes.gb,
};

export const dataDEUTSCHEWELLE = {
    url: "https://www.dw.com/en",
    mainSelector: "[data-tracking-name=section-top-story]",
    subSelector: "h3",
    linkSelector: "a:nth-child(1)",
    newsProvider: "Deutsche Welle",
    country: CountriesCodes.de,
};

export const dataLEMONDE = {
    url: "https://www.lemonde.fr/en",
    mainSelector: ".article--main",
    subSelector: "h1 > p",
    linkSelector: "a",
    newsProvider: "Le Monde",
    country: CountriesCodes.fr,
};

export const dataTASS = {
    url: "https://tass.com/",
    mainSelector: ".main-news",
    subSelector: "h1 > span",
    linkSelector: "a",
    newsProvider: "TASS",
    country: CountriesCodes.ru,
};

export const dataCHINADAILY = {
    url: "https://www.chinadaily.com.cn/",
    mainSelector: ".tMain .tmR",
    subSelector: "h2 > a",
    linkSelector: "h2 > a",
    newsProvider: "China Daily",
    country: CountriesCodes.cn,
};

export const dataHINDUSTANTIMES = {
    url: "https://www.hindustantimes.com/",
    mainSelector: "[data-vars-cardtype=top-news]",
    subSelector: "h3 > a",
    linkSelector: "h3 > a",
    newsProvider: "Hindustan Times",
    country: CountriesCodes.in,
};

export const dataARABNEWS = {
    url: "https://www.arabnews.com/",
    mainSelector: ".hero-area",
    subSelector: "h1",
    linkSelector: "h1 > a",
    newsProvider: "Arab News",
    country: CountriesCodes.sa,
};
export const dataBATIMES = {
    url: "https://www.batimes.com.ar/",
    mainSelector: "article",
    subSelector: "h1",
    linkSelector: "article > a",
    newsProvider: "Buenos Aires Times",
    country: CountriesCodes.ar,
};
export const dataTHESYDNEYMORNINGHERALD = {
    url: "https://www.smh.com.au/",
    mainSelector: "[data-an-cu-group=news-well]",
    subSelector: "[data-pb-type=hl] [data-testid=article-link]",
    linkSelector: "[data-pb-type=hl] [data-testid=article-link]",
    newsProvider: "The Sydney Morning Herald",
    country: CountriesCodes.au,
};
export const dataFOLHADESPAULO = {
    url: "https://www1.folha.uol.com.br/internacional/en/",
    mainSelector: ".c-main-headline__wrapper",
    subSelector: "a h2",
    linkSelector: "a.c-main-headline__url",
    newsProvider: "Folha De S.Paulo",
    country: CountriesCodes.br,
};
export const dataCTVNEWS = {
    url: "https://www.ctvnews.ca/",
    mainSelector: "article",
    subSelector: "h3",
    linkSelector: "a",
    newsProvider: "CTV News",
    country: CountriesCodes.ca,
};
export const dataEUOBSERVER = {
    url: "https://euobserver.com/",
    mainSelector: "main",
    subSelector: "h1 > a",
    linkSelector: "h1 > a",
    newsProvider: "EU Observer",
    country: CountriesCodes.eu,
};
export const dataANTARANEWS = {
    url: "https://en.antaranews.com/",
    mainSelector: "[data-stickyparent]",
    subSelector: "article:first-child h3 a",
    linkSelector: "article:first-child h3 a",
    newsProvider: "Antara News",
    country: CountriesCodes.id,
};
export const dataANSA = {
    url: "https://www.ansa.it/english/",
    mainSelector: "article.big",
    subSelector: "h3 a",
    linkSelector: "h3 a",
    newsProvider: "Ansa",
    country: CountriesCodes.it,
};
export const dataTHEJAPANTIMES = {
    url: "https://www.japantimes.co.jp/",
    mainSelector: ".lead_stories",
    subSelector: "a hgroup p",
    linkSelector: "a",
    newsProvider: "The Japan Times",
    country: CountriesCodes.jp,
};
export const dataMEXICONEWSDAILY = {
    url: "https://mexiconewsdaily.com/",
    mainSelector: "#td-outer-wrap",
    subSelector: "h3 a",
    linkSelector: "h3 a",
    newsProvider: "Mexico News Daily",
    country: CountriesCodes.mx,
};
export const dataSANEWS = {
    url: "https://www.sanews.gov.za//",
    mainSelector: "article h2",
    subSelector: "a span",
    linkSelector: "a",
    newsProvider: "SA News",
    country: CountriesCodes.za,
};
export const dataYONHAPNEWSAGENCY = {
    url: "https://en.yna.co.kr/",
    mainSelector: "article.top-news-zone",
    subSelector: "h1",
    linkSelector: "h1 a",
    newsProvider: "Yonhap News Agency",
    country: CountriesCodes.kr,
};
export const dataDAILYSABAH = {
    url: "https://www.dailysabah.com/",
    mainSelector: ".main_banner",
    subSelector: "h3",
    linkSelector: "h3 a",
    newsProvider: "Daily Sabah",
    country: CountriesCodes.tr,
};
