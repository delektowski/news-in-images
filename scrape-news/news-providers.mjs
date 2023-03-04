export const dataPAP = {
    url: "https://www.pap.pl/en",
    mainSelector: "h1",
    subSelector: "a",
    newsProvider: "PAP",
    country: "pl",
};

export const dataNYT = {
    url: "https://www.nytimes.com/",
    mainSelector: "[data-hierarchy=feed]",
    subSelector: "h3",
    newsProvider: "New York Times",
    country: "us",
};

export const dataTELEGRAPH = {
    url: "https://www.telegraph.co.uk/",
    mainSelector: "[data-test=headline]",
    subSelector: "span",
    newsProvider: "The Telegraph",
    country: "gb",
};

export const dataDEUTSCHEWELLE = {
    url: "https://www.dw.com/en",
    mainSelector: "[data-tracking-name=section-top-story]",
    subSelector: "h3",
    newsProvider: "Deutsche Welle",
    country: "de",
};

export const dataLEMONDE = {
    url: "https://www.lemonde.fr/en",
    mainSelector: "h1",
    subSelector: "p",
    newsProvider: "Le Monde",
    country: "fr",
};

export const dataTASS = {
    url: "https://tass.com/",
    mainSelector: "h1",
    subSelector: "span",
    newsProvider: "TASS",
    country: "ru",
};

export const dataCHINADAILY = {
    url: "https://www.chinadaily.com.cn/",
    mainSelector: ".banner_top .MainBlock_Right",
    subSelector: "h4 > a",
    newsProvider: "China Daily",
    country: "cn",
};

export const dataHINDUSTANTIMES = {
    url: "https://www.hindustantimes.com//",
    mainSelector: "[data-vars-cardtype=top-news]",
    subSelector: "h3 > a",
    newsProvider: "Hindustan Times",
    country: "in",
};

export const dataARABNEWS = {
    url: "https://www.arabnews.com/",
    mainSelector: ".hero-area",
    subSelector: "h1",
    newsProvider: "Arab News",
    country: "sa",
};
