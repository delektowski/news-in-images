import logger from "../logger/logger";
import * as dayjs from "dayjs";
import { shuffleArrayOrder } from "../lib/helpers";
import {
  newsProvidersData,
  dataARABNEWS,
  dataCHINADAILY,
  dataDEUTSCHEWELLE,
  dataHINDUSTANTIMES,
  dataLEMONDE,
  dataNYT,
  dataPAP,
  dataTASS,
  dataTELEGRAPH,
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
      dataPAP,
      dataNYT,
      dataTELEGRAPH,
      dataDEUTSCHEWELLE,
      dataLEMONDE,
      dataTASS,
      dataCHINADAILY,
      dataHINDUSTANTIMES,
      dataARABNEWS,
    ])
  );
}
