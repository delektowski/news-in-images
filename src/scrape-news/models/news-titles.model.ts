import {CountriesCodes} from "../../models/countries-codes.enum";

export interface NewsTitlesModel {
    title: string;
    newsProvider: string;
    country: CountriesCodes;
    link: string
}
