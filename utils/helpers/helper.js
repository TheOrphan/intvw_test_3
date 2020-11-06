import { Alert, notification, message } from 'antd';
import moment from 'moment';

export function sorting(a, b) {
  let return_sort = 0;
  let alpha = null;
  let beta = null;

  // 14/01/2019
  let totalStr = 0;
  try {
    totalStr = a.length;
  } catch (e) {}

  let dateSplit = '';
  let dateSplitB = '';
  try {
    dateSplit = a.split('/');
  } catch (e) {}

  try {
    dateSplitB = b.split('/');
  } catch (e) {}

  // console.log(totalStr + " " + dateSplit.length);
  if (totalStr == 10 && dateSplit.length == 3 && totalStr > 0) {
    // Date
    alpha = dateSplit[2] + '' + dateSplit[1] + '' + dateSplit[0];
    beta = dateSplitB[2]
      ? dateSplitB[2] + '' + dateSplitB[1] + '' + dateSplitB[0]
      : 0;
    // alpha = alpha?alpha:0;
    // beta  = beta?beta:0;
    // console.log(alpha + " " + beta);
  } else {
    // Besides Date
    // console.log(
    //   "ku akan selalu berada disini walau dalam keramaian fibuconto " + typeof a
    // );
    switch (typeof a) {
      case 'string': // Setelah dibuat dinamis semua column, semua larinya ke case ini, meskipun date
        try {
          alpha = a
            .toString()
            .replace(/[-]/g, '')
            .toLowerCase();
          beta = b
            .toString()
            .replace(/[-]/g, '')
            .toLowerCase();
        } catch (err) {
          alpha = a;
          beta = b;
        }
        break;
      case 'object': // type date object
        try {
          alpha = a.toString().replace(/[.:-_*+?^${}()|[\]\\]/g, '');
          beta = b.toString().replace(/[.:-_*+?^${}()|[\]\\]/g, '');
        } catch (err) {
          alpha = a;
          beta = b;
        }
        break;
      case 'number':
        alpha = a;
        beta = b;
        break;
    }
  }

  if (alpha > beta) {
    return_sort = -1;
  }
  if (alpha < beta) {
    return_sort = 1;
  }

  return return_sort;
}

export function compare(a, b) {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
}

/**
 * Return prevent user to apply typing if no number typed. except backspace (keyCode = 8)
 *
 * @param ev {Any} Value get from user input (onkeyup , onkeydown) event
 */
export function numberOnly(ev) {
  const keyCode = ev.keyCode || ev.which;
  const keyValue = String.fromCharCode(keyCode);
  if (ev.keyCode !== 8 && ev.keyCode !== 37 && ev.keyCode !== 39) {
    if (!/^\d*$/.test(keyValue)) ev.preventDefault();
  }
}

/**
 * Return prevent user to apply typing if no number typed and only accept positive number. except backspace (keyCode = 8)
 *
 * @param ev {Any} Value get from user input (onkeyup , onkeydown) event
 */
export function numberOnlyPositive(ev) {
  const keyCode = ev.keyCode || ev.which;
  const keyValue = String.fromCharCode(keyCode);
  if (ev.keyCode !== 8 && ev.target > 0) {
    if (!/^\d*$/.test(keyValue)) ev.preventDefault();
  }
}

/**
 * Return number as a counter for remaining left character user can input.
 *
 * @param ev {Any} Value get from user input (onkeyup , onkeydown) event
 * @param maxLength {Integer} Maximum character user can input
 */
export function remainingTextCounter(ev, maxLength) {
  const text = ev.target.value;
  if (text.length > maxLength) ev.preventDefault();
  return (maxLength - text.length).toString();
}

/**
 * Return prevent user to apply typing if maxLength reached.
 *
 * @param ev {Any} Value get from user input (onkeyup , onkeydown) event
 * @param maxLength {Integer} Maximum character user can input
 */
export function preventInputLimit(ev, maxLength) {
  const text = ev.target.value;
  if (text.length >= maxLength) ev.preventDefault();
}

/**
 * Return true value if data is empty.
 *
 * @param data {Any} Any type of data to check if its empty
 */
export function isEmpty(data) {
  switch (typeof data) {
    case 'string':
      return data === '';
      break;
    case 'object': //array known as an object tho
      return data === null
        ? true
        : Array.isArray(data)
        ? data.length === 0
        : Object.entries(data).length === 0 && data.constructor === Object;
      break;
    case 'undefined':
      return true;
      break;
    default:
  }
}

/**
 * Return Time format from integer value to HH:mm:ss.
 * Usually using by data from database or BACKEND
 *
 * @param time {Integer} Integer from backend
 */
export function displayTime(time) {
  let hourTemp = parseInt(time / 3600);
  let minTemp = parseInt((time / 3600 - hourTemp) * 60);
  let secTemp = parseInt(time - hourTemp * 3600 - minTemp * 60);
  const hour = hourTemp < 10 ? '0' + hourTemp : hourTemp;
  const min = minTemp < 10 ? '0' + minTemp : minTemp;
  const sec = secTemp < 10 ? '0' + secTemp : secTemp;
  return hour + ':' + min + ':' + sec;
}

export function timeFormat(time) {
  return moment.utc(time * 1000).format('HH:mm');
}

/**
 * Return true value if data is empty.
 *
 * @param columns {Object} Object of column registered
 */
export function columnWidth(columns) {
  const tableWidth = [];
  columns.map(col =>
    typeof col.children !== 'undefined'
      ? col.children.map(children => tableWidth.push(children.width))
      : tableWidth.push(col.width),
  );
  const sumWidht = tableWidth.reduce((a, b) => a + b, 0);
  return sumWidht;
}

/**
 * Return alert for UX .
 *
 * @param status {String} string to decide witch on is needed Alert
 */
export function alert(status, message) {
  switch (status) {
    case 'running':
      return (
        <Alert
          message={`Menyimpan...  ${message ? message : ''}`}
          type="info"
        />
      );
    case 'success':
      return (
        <Alert message={`Berhasil! ${message ? message : ''}`} type="success" />
      );
    case 'error':
      return (
        <Alert message={`Gagal! ${message ? message : ''}`} type="error" />
      );
    default:
      return '';
  }
}
/**
 * Return notification for UX .
 *
 * @param type {String} type of notification
 * @param title {String} title of notification
 * @param message {String} message of notification
 * @param placement {String} placement of notification
 */

export function openNotification({ type, title, message, placement }) {
  notification.destroy();
  notification[type]({
    message: title && title.toUpperCase(),
    description: message ? message : '',
    placement: placement ? placement : 'bottomRight',
    duration: 8,
  });
}

/**
 * Return true if element reached bottom of itself .
 *
 * @param e {any} event return of element activity
 */
export function onPopupScroll(e) {
  e.persist();
  let target = e.target;
  if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
    return true;
  }
}

/**
 * Return true value == other .
 *
 * @param value {any} array want to compared
 * @param other {any} array compare with
 */
export function isEqual(value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  var valueLen =
    type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen =
    type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  var compare = function(item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
}

export function loadMore(postData, GET_ALL_API) {
  if (onPopupScroll(e)) {
    refetchsubDistricts(GET_ALL_API, {
      page: state.pageSubDistricts + 1,
      size: 10,
      orderBy: 'DESC',
    });
  }
}

export function messageLoading(params) {
  if (!isEmpty(params)) {
    const { status, msg, text, duration, fx } = params;
    const customDuration = duration ? duration : 1.5;
    const customText = text ? text : 'Getting latest...';
    const currStatus = status ? status : false;
    const customFunc = !isEmpty(fx) ? fx() : null;
    if (currStatus) {
      openNotification({
        type: currStatus,
        title: currStatus,
        message: msg,
      });
    }
    setTimeout(function() {
      message.config({ maxCount: 1 });
      message.loading(customText, customDuration, customFunc);
    }, 1000);
  }
}

/**
 * Return true if fileType and fileSize fulfill the terms.
 *
 * @param file  {string} file uploaded
 * @param fileType {array} type aloowed of file ex. ['image/jpg','image/png']
 * @param fileSize {integer} size max allowed of file ex. 2 on bytes
 */
export function beforeUpload(file, fileType, fileSize) {
  const fileTypeAllowed = fileType.includes(file.type);
  if (!fileTypeAllowed) {
    message.error(
      'Hanya dapat mengunggah file ' + fileType.toString().toUpperCase() + '!',
    );
  }
  const isLtX = fileSize ? file.size < fileSize : true;
  if (!isLtX) {
    message.error('File harus lebih kecil dari ' + formatBytes(fileSize) + '!');
  }
  return fileTypeAllowed && isLtX;
}

/**
 * Convert bytes to an understandable word of bytes.
 *
 * @param bytes  {integer} bytes to convert
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Return boolean true, the option will be included in the filtered set
 * Otherwise, it will be excluded
 *
 * @param inputValue {string} value of user type
 * @param path {array} each options of cascader
 */
export function filterCascader(inputValue, path) {
  return path.some(option => {
    return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  });
}

export function ANTD_GetBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function enlarge(image, title, dispatch) {
  dispatch({
    type: 'success',
    results: { title, message: image },
  });
}

export function formatPrice(price) {
  const formattedPrice =
    typeof price === 'string'
      ? parseFloat(price.replace(/[^0-9.]/g, ''))
      : price;
  return formattedPrice;
}

export function extractOnlyNumber(string, convertToNumber) {
  const theString = string ? string.toString() : '';
  const extractedNumber = theString.match(/\d/g);
  const reJoinStrings = extractedNumber ? extractedNumber.join('') : 0;
  const isConverting = convertToNumber || true;
  return isConverting ? parseFloat(reJoinStrings) : reJoinStrings;
}

export const removeSpesificChar = (function() {
  'use strict';

  function escapeRegex(string) {
    return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, '\\$&');
  }

  return function trim(str, characters, flags) {
    flags = flags || 'g';
    if (
      typeof str !== 'string' ||
      typeof characters !== 'string' ||
      typeof flags !== 'string'
    ) {
      throw new TypeError('argument must be string');
    }

    if (!/^[gi]*$/.test(flags)) {
      throw new TypeError(
        "Invalid flags supplied '" + flags.match(new RegExp('[^gi]*')) + "'",
      );
    }

    characters = escapeRegex(characters);

    return str.replace(
      new RegExp('^[' + characters + ']+|[' + characters + ']+$', flags),
      '',
    );
  };
})();

export function dateToString(date) {
  return date.toISOString().substring(0, 10);
}

export function s3Url(nextURI) {
  return `https://files-activgenesis.s3-ap-southeast-1.amazonaws.com/${
    nextURI ? nextURI : ''
  }`;
}

export function cc_brand_id(input_val) {
  // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
  // regexp string length {0} provided for soonest detection of beginning of the card numbers this way it could be used for BIN CODE detection also

  //JCB
  const jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); //2131, 1800, 35 (3528-3589)
  // American Express
  const amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
  // Diners Club
  const diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); //300-305, 309, 36, 38-39
  // Visa
  const visa_regex = new RegExp('^4[0-9]{0,}$'); //4
  // MasterCard
  const mastercard_regex = new RegExp(
    '^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$',
  ); //2221-2720, 51-55
  const maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$'); //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
  //Discover
  const discover_regex = new RegExp(
    '^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$',
  );
  ////6011, 622126-622925, 644-649, 65

  // get rid of anything but numbers
  if (input_val) {
    const cur_val = input_val.toString().replace(/\D/g, '');

    // checks per each, as their could be multiple hits
    //fix: ordering matter in detection, otherwise can give false results in rare cases
    let sel_brand = '';
    if (cur_val.match(jcb_regex)) {
      sel_brand = 'jcb';
    } else if (cur_val.match(amex_regex)) {
      sel_brand = 'amex';
    } else if (cur_val.match(diners_regex)) {
      sel_brand = 'diners_club';
    } else if (cur_val.match(visa_regex)) {
      sel_brand = 'visa';
    } else if (cur_val.match(mastercard_regex)) {
      sel_brand = 'mastercard';
    } else if (cur_val.match(discover_regex)) {
      sel_brand = 'discover';
    } else if (cur_val.match(maestro_regex)) {
      if (cur_val[0] == '5') {
        //started 5 must be mastercard
        sel_brand = 'mastercard';
      } else {
        sel_brand = 'maestro'; //maestro is all 60-69 which is not something else, thats why this condition in the end
      }
    }
    return sel_brand;
  }
}
