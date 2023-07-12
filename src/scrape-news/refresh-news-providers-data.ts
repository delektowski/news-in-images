import logger from "../logger/logger";
import * as dayjs from "dayjs";
import { shuffleArrayOrder } from "../lib/helpers";
import {
  dataANSA,
  dataANTARANEWS,
  dataARABNEWS,
  dataBATIMES,
  dataCHINADAILY,
  dataCTVNEWS,
  dataDEUTSCHEWELLE,
  dataEUOBSERVER,
  dataFOLHADESPAULO,
  dataHINDUSTANTIMES,
  dataLEMONDE,
  dataMEXICONEWSDAILY,
  dataNYT,
  dataPAP,
  dataTASS,
  dataTELEGRAPH,
  dataTHEJAPANTIMES,
  dataTHESYDNEYMORNINGHERALD,
  newsProvidersData,
} from "./news-providers";

export function refreshNewsProvidersData() {
  logger.log(
    "info",
    `Content of newsProvidersData on ${dayjs().hour()}: ${JSON.stringify(
      newsProvidersData
    )}`,
    {
      function: "handleSaveNewsImages()",
    }
  );
  newsProvidersData.splice(0, newsProvidersData.length);
  newsProvidersData.push(
    ...shuffleArrayOrder([
      dataANSA,
      dataANTARANEWS,
      dataARABNEWS,
      dataBATIMES,
      dataCHINADAILY,
      dataCTVNEWS,
      dataDEUTSCHEWELLE,
      dataEUOBSERVER,
      dataFOLHADESPAULO,
      dataHINDUSTANTIMES,
      dataLEMONDE,
      dataMEXICONEWSDAILY,
      dataNYT,
      dataPAP,
      dataTASS,
      dataTELEGRAPH,
      dataTHEJAPANTIMES,
      dataTHESYDNEYMORNINGHERALD,
    ])
  );
}
