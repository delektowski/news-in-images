import { shuffleArrayOrder } from "../lib/helpers";
import {
  dataANSA,
  dataANTARANEWS,
  dataARABNEWS,
  dataBATIMES,
  dataCHINADAILY,
  dataCTVNEWS,
  dataDAILYSABAH,
  dataDEUTSCHEWELLE,
  dataEUOBSERVER,
  dataFOLHADESPAULO,
  dataHINDUSTANTIMES,
  dataLEMONDE,
  dataMEXICONEWSDAILY,
  dataNYT,
  dataSANEWS,
  dataTASS,
  dataTELEGRAPH,
  dataTHEJAPANTIMES,
  dataTHESYDNEYMORNINGHERALD,
  dataYONHAPNEWSAGENCY,
  newsProvidersData,
} from "./news-providers";

export function refreshNewsProvidersData() {
  newsProvidersData.splice(0, newsProvidersData.length);
  newsProvidersData.push(
    ...shuffleArrayOrder([
      dataANSA,
      dataANTARANEWS,
      dataARABNEWS,
      dataBATIMES,
      dataCHINADAILY,
      dataCTVNEWS,
      dataDAILYSABAH,
      dataDEUTSCHEWELLE,
      dataEUOBSERVER,
      dataFOLHADESPAULO,
      dataHINDUSTANTIMES,
      dataLEMONDE,
      dataMEXICONEWSDAILY,
      dataNYT,
      dataSANEWS,
      dataTASS,
      dataTELEGRAPH,
      dataTHEJAPANTIMES,
      dataTHESYDNEYMORNINGHERALD,
      dataYONHAPNEWSAGENCY,
    ])
  );
}
