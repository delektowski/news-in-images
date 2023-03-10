export const dataPAP = {
    url: "https://www.pap.pl/en",
    mainSelector: "h1",
    subSelector: "a",
    linkSelector: "a",
    newsProvider: "PAP",
    country: "pl",
};

export const dataNYT = {
    url: "https://www.nytimes.com/",
    mainSelector: "[data-hierarchy=feed]",
    subSelector: "h3",
    linkSelector: "section a",
    newsProvider: "New York Times",
    country: "us",
};

export const dataTELEGRAPH = {
    url: "https://www.telegraph.co.uk/",
    mainSelector: "[data-track-wrapper=major-news]",
    subSelector: "[data-test=list-headline-link] [data-test=headline] span",
    linkSelector: "[data-test=list-headline-link]",
    newsProvider: "The Telegraph",
    country: "gb",
};

export const dataDEUTSCHEWELLE = {
    url: "https://www.dw.com/en",
    mainSelector: "[data-tracking-name=section-top-story]",
    subSelector: "h3",
    linkSelector: "a:nth-child(1)",
    newsProvider: "Deutsche Welle",
    country: "de",
};

export const dataLEMONDE = {
    url: "https://www.lemonde.fr/en",
    mainSelector: ".article--main",
    subSelector: "h1 > p",
    linkSelector: "a",
    newsProvider: "Le Monde",
    country: "fr",
};

export const dataTASS = {
    url: "https://tass.com/",
    mainSelector: ".main-news",
    subSelector: "h1 > span",
    linkSelector: "a",
    newsProvider: "TASS",
    country: "ru",
};

export const dataCHINADAILY = {
    url: "https://www.chinadaily.com.cn/",
    mainSelector: ".banner_top .MainBlock_Right",
    subSelector: "h4 > a",
    linkSelector: "h4 > a",
    newsProvider: "China Daily",
    country: "cn",
};

export const dataHINDUSTANTIMES = {
    url: "https://www.hindustantimes.com//",
    mainSelector: "[data-vars-cardtype=top-news]",
    subSelector: "h3 > a",
    linkSelector: "h3 > a",
    newsProvider: "Hindustan Times",
    country: "in",
};

export const dataARABNEWS = {
    url: "https://www.arabnews.com/",
    mainSelector: ".hero-area",
    subSelector: "h1",
    linkSelector: "h1 > a",
    newsProvider: "Arab News",
    country: "sa",
};
