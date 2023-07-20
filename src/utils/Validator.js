import languageResource from "src/i18n/LanguageContainer";
import { isNotNullOrEmpty, isNotNullOrUndefined } from "./funcUtils";
import { isValid as isValidDate } from "date-fns";
const phoneNumberRegex = /^\+?[0-9]\d{8,20}$/;
//const phoneNumberRegex = /(\+|00|0)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/;

const isValidPhoneNumber = (phone) => {
  return phoneNumberRegex.test(phone);
};
const isEmptyString = (value) => {
  return value?.trim() === "";
};

//const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@_#^]{6,999}$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{6,}$/;

const isValidPassword = (password) => {
  return passwordRegex.test(password);
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

const noAccentedRegex = /^[a-zA-Z0-9]+$/;
const IdcRegex =
  /^[a-zA-Z0-9\u0023\u002C\u002D\u002E\u002F\u003A\u003B\u0040\u005F\u007C\u007E]+$/;

// const NumberSign = "\u0023" // #
// const Comma = "\u002C" // ,
// const HyphenMinus = "\u002D" // -
// const FullStop = "\u002E" // .
// const Solidus = "\u002F" // /
// const Colon = "\u003A" // :
// const Semicolon = "\u003B" // ;
// const CommercialAt = "\u0040" // @
// const LowLine = "\u005F" // _
// const VerticalLine = "\u007C" // |
// const Tilde = "\u007E" // ~

//Hàm để validate từ obj rules truyền vào (validate thường ko dùng react hook form)
const _generateRulesAndValidate = (rule, func, name, value) => {
  const { required, pattern } = rule[name];

  if (required) {
    if (typeof value === "object") {
      func((state) => ({
        ...state,
        [name]: !isNotNullOrUndefined(value) ? { message: required.message } : null,
      }));
    } else {
      func((state) => ({
        ...state,
        [name]: !isNotNullOrEmpty(value) ? { message: required.message } : null,
      }));
    }
  }
  if (pattern) {
    if (required) {
      func((state) => ({
        ...state,
        [name]: !isNotNullOrEmpty(value)
          ? { message: required.message }
          : !pattern.value.test(value)
          ? { message: pattern.message }
          : null,
      }));
    } else {
      func((state) => ({
        ...state,
        [name]:
          value && !pattern.value.test(value)
            ? { message: pattern.message }
            : null,
      }));
    }
  }
};

//Rules dùng cho cả react hook form hoặc validate thường
const required = {
  value: true,
  message: languageResource.GeneralConfiguration_Required,
};

const phonePattern = {
  value: phoneNumberRegex,
  message: languageResource.GeneralConfiguration_InvalidFormat,
};
const emailPattern = {
  value: emailRegex,
  message: languageResource.GeneralConfiguration_InvalidFormat,
};
const IdcPattern = {
  value: IdcRegex,
  message:
    languageResource.GeneralConfiguration_NoAccentedOrWhiteSpaceOnlySomeSpecialCharacter,
};

const min = (value, message) => {
  return {
    value: value,
    message: message ?? languageResource.GeneralConfiguration_Invalid,
  };
};
const validateSchema = () => {
  const obj = {
    validate: {
      isWhiteSpaceOnly: (value) => {
        return (
          isNotNullOrEmpty(value?.trim()) ||
          languageResource.GeneralConfiguration_Required
        );
      },
      isValidDOB: (value) => {
        if (isNotNullOrUndefined(value)) {
          return (
            value < new Date() ||
            languageResource.GeneralConfiguration_DateOfBirthIsNotValid
          );
        }
      },
      isValidDateType: (value) => {
        if (isNotNullOrUndefined(value)) {
          return (
            isValidDate(value) || languageResource.GeneralConfiguration_Invalid
          );
        }
      },
    },
  };
  return obj;
};

const onCheckValidDateType = ((name, value, setError, clearErrors) => {
  if (value) {
      const result = isValidDate(value)
      if (!result) {
          setError(name, { type: "custom", message: languageResource.GeneralConfiguration_InvalidFormat })
          return true
      } else {
          clearErrors(name)
          return false;
      }
  }

})
const { isWhiteSpaceOnly, isValidDOB, isValidDateType } =
  validateSchema().validate;
export {
  isValidPhoneNumber,
  isEmptyString,
  isValidPassword,
  isValidEmail,
  phoneNumberRegex,
  passwordRegex,
  emailRegex,
  noAccentedRegex,
  IdcRegex,

  //react-hook-form rules
  required,
  phonePattern,
  IdcPattern,
  emailPattern,
  isWhiteSpaceOnly,
  isValidDOB,
  min,
  isValidDateType,
  _generateRulesAndValidate,
  onCheckValidDateType
};
