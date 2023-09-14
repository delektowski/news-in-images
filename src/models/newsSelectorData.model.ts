import {CountriesCodes} from "./countries-codes.enum";

export interface NewsSelectorDataModel {
    url: string;
    mainSelector: string;
    subSelector: string;
    linkSelector: string;
    newsProvider: string;
    country: CountriesCodes;
}
