import * as Excel from 'exceljs/dist/exceljs.min.js';
import { saveAs } from 'file-saver';
import moment from 'moment';

export default async function tableGenerator(array, moduleName) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');

  moment.defaultFormat = 'YYYY-MM-DD';

  if (moduleName === 'penerimaan') {
    worksheet.columns = [
      { header: 'msisdn', key: 'msisdn', width: 20 },
      { header: 'iccid', key: 'iccid', width: 20 },
      { header: 'serialnumber', key: 'serialnumber', width: 20 },
      { header: 'expdate', key: 'expdate', width: 20 },
      { header: 'qty', key: 'qty', width: 5 },
      { header: 'smallbox', key: 'smallbox', width: 20 },
      { header: 'bigbox', key: 'bigbox', width: 20 },
    ];
    array.forEach(row =>
      worksheet.addRow({
        msisdn: row.msisdn ? row.msisdn : '',
        iccid: row.iccid ? row.iccid : '',
        serialnumber: row.serial_number ? row.serial_number : '',
        expdate: row.item_expdate
          ? moment(row.item_expdate).format('YYYY-MM-DD')
          : '', // konfigurasi nya harus seperti ini supaya work
        qty: row.stock_qty ? row.stock_qty : '',
        smallbox: row.smallbox ? row.smallbox : '',
        bigbox: row.bigbox ? row.bigbox : '',
        // stock_packaging_id: row.stock_packaging_id ? row.stock_packaging_id : "",
      }),
    );
  } else {
    worksheet.columns = [
      { header: 'msisdn', key: 'msisdn', width: 20 },
      { header: 'iccid', key: 'iccid', width: 20 },
      { header: 'serialnumber', key: 'serialnumber', width: 20 },
      { header: 'expdate', key: 'expdate', width: 20 },
      { header: 'qty', key: 'qty', width: 5 },
      { header: 'smallbox', key: 'smallbox', width: 20 },
      { header: 'bigbox', key: 'bigbox', width: 20 },
    ];

    array.forEach(row =>
      worksheet.addRow({
        msisdn: row.msisdn ? row.msisdn : '',
        iccid: row.iccid ? row.iccid : '',
        serialnumber: row.serial_number ? row.serial_number : '',
        expdate: row.item_expdate
          ? moment(row.item_expdate).format('YYYY-MM-DD')
          : '', // konfigurasi nya harus seperti ini supaya work
        qty: row.stock_qty ? row.stock_qty : '',
        smallbox: row.smallbox ? row.smallbox : '',
        bigbox: row.bigbox ? row.bigbox : '',
      }),
    );
  }

  const date = new Date();

  const fileName =
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDay().toString() +
    date.getMilliseconds().toString() +
    '-' +
    moduleName +
    '-';
  const fullFileName = `files/${fileName}export.xlsx`;

  // logger.debug(fullFileName);

  // save under fullFileName
  const buf = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buf]), fullFileName);
  // await workbook.xlsx.writeFile(fullFileName);

  // load a copy of export.xlsx
  // const newWorkbook = new Excel.Workbook();
  // await workbook.xlsx.readFile(fullFileName);

  return fullFileName;
}
