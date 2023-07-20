import CIcon from "@coreui/icons-react";

const path_flag = "/assets/icons/flag/"

const flagIconDictionary = {
 "vi": path_flag + 'vi.png',
 "fr": path_flag + 'fr.png',
 "en": path_flag + 'en.png',
 "default": path_flag + 'default.png',
 "default-2": path_flag + 'default-2.png',
}
const flagIconArr = Object.entries(flagIconDictionary).map(([key, value]) => ({ name: key, value: createFlagIcon(value, { width: 25 }) }));
function getFlagIcon(name, props = {}) {
 if (flagIconDictionary[name])
     return createFlagIcon(flagIconDictionary[name], props)

 else return <div />
}

function createFlagIcon(value, props = {}, alt = "", size = "sm") {
 if (value.startsWith("/assets/"))
     return (
         <CIcon
             size={size}
             src={value}
             alt={alt}
             {...props}

         />
     )

 return <CIcon size={size} name={value} alt={""} {...props} />
}

export {
 flagIconDictionary,
 flagIconArr,
 createFlagIcon,
 getFlagIcon,
};