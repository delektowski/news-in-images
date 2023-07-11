import logger from "../logger/logger";
import * as dayjs from "dayjs";
import { shuffleArrayOrder } from "../lib/helpers";
import {
  dataARABNEWS,
  dataBATIMES,
  dataCHINADAILY,
  dataDEUTSCHEWELLE,
  dataHINDUSTANTIMES,
  dataLEMONDE,
  dataNYT,
  dataPAP,
  dataTASS,
  dataTELEGRAPH,
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
      dataARABNEWS,
      dataCHINADAILY,
      dataDEUTSCHEWELLE,
      dataHINDUSTANTIMES,
      dataLEMONDE,
      dataNYT,
      dataPAP,
      dataTASS,
      dataTELEGRAPH,
      dataBATIMES,
      dataTHESYDNEYMORNINGHERALD,
    ])
  );
}
