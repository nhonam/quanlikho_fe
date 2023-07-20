import configService from "src/configService";
import CryptoJS from "crypto-js";
import { addMinutes, isValid } from "date-fns";
import { FileUploadActions } from "src/actions";

const getLocaleDateFNSName = (name) => {
  switch (name) {
    case "en":
      return "en-US";
    default:
      return name;
  }
};
/**
 * Decrypt value
 * @param {*} data value to decrypted
 * @param {*} key keyword
 * @returns Decrypt value if success, null if fail
 */
function decrypt(data, key = configService.TOKEN_SECRET_KEY) {
  try {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
}
/**
 * Ecrypt value
 * @param {*} data value to ecrypted
 * @param {*} key keyword
 * @returns ecrypt value if success, null if fail
 */
function ecrypt(data, key = configService.TOKEN_SECRET_KEY) {
  try {
    return CryptoJS.AES.encrypt(data, key).toString();
  } catch {
    return null;
  }
}

function forMatMinuteToDate(data, date, hour, minutes) {
  if (data > 1440) {
    return `${Math.floor(data / 1440)} ${date} ${Math.floor(
      (data % 1440) / 60
    )} ${hour} ${(data % 1440) % 60} ${minutes}  `;
  } else if (data < 1440 && data > 60) {
    return ` ${Math.floor((data % 1440) / 60)} ${hour} ${
      (data % 1440) % 60
    } ${minutes} `;
  } else if (data == null || data === undefined || data === 0) {
    return "";
  } else {
    return `${(data % 1440) % 60} ${minutes}  `;
  }
}

function formatDate(m) {
  new Date(m);
  const dateString =
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getDate()).slice(-2) +
    "  " +
    ("0" + m.getHours()).slice(-2) +
    ":" +
    ("0" + m.getMinutes()).slice(-2);
  return dateString + `${m.getHours() > 12 ? " PM" : " AM"}`;
}
/**
 * returns version of IE or false, if browser is not Internet Explorer
 * */
function detectIE() {
  let ua = window.navigator.userAgent;
  // Test values; Uncomment to check result …
  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
  let msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }
  let trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    let rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }
  let edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }
  // other browser
  return false;
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : r && 0x3 | 0x8;
    return v.toString(16);
  });
}
function replaceCharByValidate(string, validateStr) {
  return string ? string.replaceAll(validateStr, "") : string;
}
function removeWhiteSpace(string) {
  return string ? string.replace(/[\s]/g, "") : string;
}
function removeAccentedCharacters(string) {
  return string
    ? removeVietnameseTones(
        string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      )
    : string;
}
function removeAccentedCharactersWhiteSpace(string) {
  return string
    ? removeVietnameseTones(
        string.normalize("NFD").replace(/[\u0300-\u036f-\s]/g, "")
      )
    : string;
}
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt

  // eslint-disable-next-line no-useless-escape
  // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

function openInNewTab(event, urlWeb) {
  event?.preventDefault();
  window.open(urlWeb, "_blank", "noopener,noreferrer");
}

function compareIgnoreCass(word1, word2) {
  return word1.match(RegExp(word2, "i"));
}

function removeEmtyFromUrl(str) {
  return str.replace(/[^?=&]+=(&|$)/g, "").replace(/&$/, "");
}

function isNotNullOrUndefined(val) {
  return val !== null && val !== undefined;
}

function isNotNullOrEmpty(item) {
  return item?.length > 0;
}

function goToPath(path, push, locationState) {
  try {
    path = new URL(path).toString();
  } catch {
    if (typeof path === "string" && !path.startsWith("/")) {
      path = "/" + path;
    }
  }
  return push(path, locationState);
}

function ParseLocalDateToUTC(dateLocal) {
  if (isValid(dateLocal)) {
    return addMinutes(dateLocal, new Date().getTimezoneOffset());
  }
}
function ParseUTCDateToLocal(dateUTC) {
  if (isValid(dateUTC)) {
    return addMinutes(dateUTC, 0 - new Date().getTimezoneOffset());
  }
}
function isArrayEqual(array1, array2) {
  // if the other array2 is a falsy value, return
  if (!array2) return false;
  // if the argument is the same array2, we can be sure the contents are same as well
  if (array2 === array1) return true;
  // compare lengths - can save a lot of time
  if (array1.length !== array2.length) return false;

  for (let i = 0, l = array1.length; i < l; i++) {
    // Check if we have nested arrays
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!array1[i].equals(array2[i])) return false;
    } else if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
function isObjectEqual(object1, object2) {
  //For the first loop, we only check for types
  for (const propName in object1) {
    //Check for inherited methods and properties - like .equals itself
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    //Return false if the return value is different
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false;
    }
    //Check instance type
    else if (typeof object1[propName] !== typeof object2[propName]) {
      //Different types => not equal
      return false;
    }
  }
  //Now a deeper check using other objects property names
  for (const propName in object2) {
    //We must check instances anyway, there may be a property that only exists in object2
    //I wonder, if remembering the checked values from the first loop would be faster or not
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false;
    } else if (typeof object1[propName] !== typeof object2[propName]) {
      return false;
    }
    //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if (!object1.hasOwnProperty(propName)) continue;

    //Now the detail check and recursion

    //This returns the script back to the array comparing
    /**REQUIRES Array.equals**/
    if (
      object1[propName] instanceof Array &&
      object2[propName] instanceof Array
    ) {
      // recurse into the nested arrays
      if (!object1[propName].equals(object2[propName])) return false;
    } else if (
      object1[propName] instanceof Object &&
      object2[propName] instanceof Object
    ) {
      // recurse into another objects
      //console.log("Recursing to compare ", object1[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (!object1[propName].equals(object2[propName])) return false;
    }
    //Normal value comparison for strings and numbers
    else if (object1[propName] !== object2[propName]) {
      return false;
    }
  }
  //If everything passed, let's say YES
  return true;
}

const getTreeDepth = (obj, columnName, depth = 0) =>
  isNotNullOrEmpty(obj[columnName])
    ? getTreeDepth(obj[columnName][0], columnName, depth + 1)
    : depth;

const mappingObject = (from, to, allowEmptyString = false) => {
  const newTo = { ...to };
  if (!from) return newTo;

  const newFrom = { ...from },
    arrCheck = [undefined, null, ""];
  if (allowEmptyString) arrCheck.pop();

  for (const property in newTo) {
    if (!arrCheck.includes(newFrom[property])) {
      newTo[property] = newFrom[property];
    }
  }

  return newTo;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const formatDateToMonthDay = (date) => {
  let dateArr = date.split("/");
  return dateArr[1] + "/" + dateArr[0] + "/" + dateArr[2];
};
//Đổi trường dữ liệu text trống thành null
const convertDataText = (data) => {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") data[key] = value?.trim();
    if (typeof value === "string" && value?.trim() === "") data[key] = null;
    if (value === "") data[key] = null;
  }
  return data;
};

//========= MẢNG EXAMPLE TEST
// const arr = [
//   {
//     name: "a",
//     dataType: "document",
//   },
//   {
//     name: "b",
//     dataType: [{ name: "a", title: "A", fullname: "a" }],
//   },
// ];

// const arrEdit = [
//   {
//     dataType: "document",
//     name: "a",
//   },
//   {
//     name: "b",
//     dataType: [{ name: "a", title: "A", fullname: "b" }],
//   },
// ];
//---->  console.log(isArrayChange(arr, arrEdit, ["name", "dataType"]))

//deep compare 2 objects (can compare 2 array object)
const isDeepEqual = (object1, object2) => {
  const objKeys1 = Object?.keys(object1);
  const objKeys2 = Object?.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if (
      (isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

//check if is object or not
const isObject = (object) => {
  // eslint-disable-next-line eqeqeq
  return object != null && typeof object === "object" && object != undefined;
};

//hàm kiểm tra value
// const compareValue = (defaultArr, editedArr, comparisionKey) => {
//   const result = editedArr?.filter((item) => {
//     if (isObject(item[comparisionKey])) {
//       return !defaultArr.some((secondItem) => {
//         if (isObject(secondItem[comparisionKey])) {
//           return isDeepEqual(item[comparisionKey], secondItem[comparisionKey]);
//         }
//         return item[comparisionKey] === secondItem[comparisionKey];
//       });
//     }

//     return !defaultArr.some(
//       (secondItem) =>
//         item[comparisionKey] ===
//         secondItem[comparisionKey]
//     );
//   });
//   if (result.length > 0) {
//     return true; // trả ra khác nhau
//   } else {
//     return false; // giống nhau
//   }
// };

//hàm map array theo key list
const mapArrayObject = (arr, comparisionKey) => {
  const keyObj = comparisionKey.reduce((a, v) => ({ ...a, [v]: v }), {});
  const mappedArray = arr.map((x) => {
    let result = {};
    Object.keys(keyObj).forEach((key) => {
      result[key] = x[key];
    });
    return result;
  });
  return mappedArray;
};

// return true if array change
// nếu compare 1 trường đơn giản như ID, IDC (unique key) thì truyền string vào comparisionKey
// compare nhiều trường thì truyền array string, tên trường
// const isArrayChange = (defaultArr, editedArr, comparisionKey) => {
//   const isArray = Array.isArray(comparisionKey);
//   if (isArray) {
//     for (const x of comparisionKey) {
//       // so sánh từng trường (nếu có sự khác nhau sẽ ko tiếp tục kiểm tra trường tiếp theo)
//       if (compareValue(defaultArr, editedArr, x)) {
//         return true; // array có sự thay đổi (có khác)
//       } else {
//         compareValue(defaultArr, editedArr, x);
//       }
//     }
//     return false; // array ko có sự thay đổi (ko khác)
//   } else {

//     // trường hợp comparisionKey là string ko phải array
//     const arrComparisonKeys = defaultArr?.map((x) => x[comparisionKey]);
//     const arrFound = editedArr?.filter(
//       (item) => {
//         console.log((item[comparisionKey]))
//       return  !arrComparisonKeys?.includes(item[comparisionKey])
//       }
//     );

//     if (arrFound?.length > 0 || editedArr?.length !== defaultArr?.length) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };
const isArrayChange = (defaultArr, editedArr, comparisionKey) => {
  if (comparisionKey) {
    const isArray = Array.isArray(comparisionKey);
    if (isArray) {
      return !isDeepEqual(
        mapArrayObject(defaultArr, comparisionKey),
        mapArrayObject(editedArr, comparisionKey)
      );
    } else {
      // trường hợp comparisionKey là string ko phải array (unique key như ID, IDC)
      const arrComparisonKeys = defaultArr?.map((x) => x[comparisionKey]);
      const arrFound = editedArr?.filter((item) => {
        return !arrComparisonKeys?.includes(item[comparisionKey]);
      });
      //trả ra true nếu có thay đổi
      return arrFound?.length > 0 || editedArr?.length !== defaultArr?.length;
    }
  }
  return !isDeepEqual(defaultArr, editedArr);
};

//HANDLE INPUT NUMBER (ELIMINATE E,e, +, -)
const _handledNumberInput = (event) => {
  ["e", "E", "+", "-"].includes(event.key) && event.preventDefault();
};

const _removeDotInput = (event) => {
  event.key === "." && event.preventDefault();
};



//Hàm lấy format dd/mm/yyyy theo quốc gia
const getDateFormatString = (locale) => {
  const options = {
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const formatObj = new Intl.DateTimeFormat(locale, options).formatToParts(
    Date.now()
  );

  return formatObj
    .map((obj) => {
      switch (obj.type) {
        // case "hour":
        //     return "HH";
        // case "minute":
        //     return "MM";
        // case "second":
        //     return "SS";
        case "day":
          return "dd";
        case "month":
          return "MM";
        case "year":
          return "yyyy";
        default:
          return obj.value;
      }
    })
    .join("");
};
// const arrYears = [];

const arrMonths = [
  "GeneralConfiguration_January",
  "GeneralConfiguration_February",
  "GeneralConfiguration_March",
  "GeneralConfiguration_April",
  "GeneralConfiguration_May",
  "GeneralConfiguration_June",
  "GeneralConfiguration_July",
  "GeneralConfiguration_August",
  "GeneralConfiguration_September",
  "GeneralConfiguration_October",
  "GeneralConfiguration_November",
  "GeneralConfiguration_December",
];
const arrDate = [
  "GeneralConfiguration_First",
  "GeneralConfiguration_Second",
  "GeneralConfiguration_Third",
  "GeneralConfiguration_April",
  "GeneralConfiguration_May",
  "GeneralConfiguration_June",
  "GeneralConfiguration_July",
  "GeneralConfiguration_August",
  "GeneralConfiguration_September",
  "GeneralConfiguration_October",
  "GeneralConfiguration_November",
  "GeneralConfiguration_December",
];

const convertDateTimeToWords = (date) => {
  let d;
  if (typeof date === "string") {
    d = new Date(date);
  } else d = date;

  const day = arrDate[d.getDate() - 1];
  const month = arrMonths[d.getMonth()];
  const year = d.getFullYear();
  return {
    day,
    month,
    year,
  };
};

//hàm click download file


//hàm deep clone array
const deepCloneArray = (items) => items.map(item => Array.isArray(item) ? deepCloneArray(item) : item);

export {
  getLocaleDateFNSName,
  decrypt,
  ecrypt,
  detectIE,
  uuidv4,
  replaceCharByValidate,
  removeWhiteSpace,
  removeAccentedCharacters,
  removeAccentedCharactersWhiteSpace,
  removeVietnameseTones,
  openInNewTab,
  compareIgnoreCass,
  removeEmtyFromUrl,
  isNotNullOrUndefined,
  isNotNullOrEmpty,
  goToPath,
  ParseUTCDateToLocal,
  ParseLocalDateToUTC,
  isArrayEqual,
  isObjectEqual,
  getTreeDepth,
  mappingObject,
  sleep,
  formatDateToMonthDay,
  convertDataText,
  isDeepEqual,
  isObject,
  isArrayChange,
  mapArrayObject,
  _handledNumberInput,
  _removeDotInput,
  getDateFormatString,
  convertDateTimeToWords,
  forMatMinuteToDate,
  formatDate,
  deepCloneArray
};
