
import CIcon from "@coreui/icons-react";

const path_functions = "/assets/img/functions/"
const path_iconsMenu = "/assets/img/iconsMenu/"


const iconDictionary = {
    "alarm": path_functions + 'alarm.svg',
    "product":path_iconsMenu+'product-44.svg',
    "user":path_iconsMenu+'user.svg',
    "LOGO":path_iconsMenu+'logomanager.svg',
    "founder": path_iconsMenu+'founder-2.svg',
    "employee": path_iconsMenu+ 'employee.svg',
    "arrow-counterclockwise": path_functions + 'arrow-counterclockwise.svg',
    "arrow-down-bold": path_functions + 'arrow-down-bold.svg',
    "arrow-up-bold": path_functions + 'arrow-up-bold.svg',
    "book-account-outline": path_functions + 'book-account-outline.svg',
    "book-cancel-outline": path_functions + 'book-cancel-outline.svg',
    "book-check-outline": path_functions + 'book-check-outline.svg',
    "book-cog-outline": path_functions + 'book-cog-outline.svg',
    "book-search-outline": path_functions + 'book-search-outline.svg',
    "booksearch": path_functions + 'booksearch.svg',
    "briefcase-check-outline": path_functions + 'briefcase-check-outline.svg',
    "cancel-line": path_functions + 'cancel-line.svg',
    "check-circle": path_functions + 'check-circle.svg',
    "content-copy": path_functions + 'content-copy.svg',
    "delete": path_functions + 'delete.svg',
    "edit": path_functions + 'edit.svg',
    "email-send-outline": path_functions + 'email-send-outline.svg',
    "eye": path_functions + 'eye.svg',
    "fast": path_functions + 'fast.svg',
    "file-check": path_functions + 'file-check.svg',
    "file-delete": path_functions + 'file-delete.svg',
    "file-excel": path_functions + 'file-excel.svg',
    "file-publish": path_functions + 'file-publish.svg',
    "file-search-outline": path_functions + 'file-search-outline.svg',
    "file-send-outline": path_functions + 'file-send-outline.svg',
    "file-tree": path_functions + 'file-tree.svg',
    "file-unpublish": path_functions + 'file-unpublish.svg',
    "folder": path_functions + 'folder.svg',
    "format-list-bulleted": path_functions + 'format-list-bulleted.svg',
    "formatlistbulleted": path_functions + 'formatlistbulleted.svg',
    "history": path_functions + 'history.svg',
    "list": path_functions + 'list.svg',
    "lock-open-variant-outline": path_functions + 'lock-open-variant-outline.svg',
    "lock-outline": path_functions + 'lock-outline.svg',
    "monthly-calendar-svgrepo-com": path_functions + 'monthly-calendar-svgrepo-com.svg',
    "paperclip": path_functions + 'paperclip.svg',
    "password": path_functions + 'password.svg',
    "plus": path_functions + 'plus.svg',
    "printer": path_functions + 'printer.svg',
    "refresh": path_functions + 'refresh.svg',
    "renew": path_functions + 'renew.svg',
    "reply-1": path_functions + 'reply-1.svg',
    "reply": path_functions + 'reply.svg',
    "save-off": path_functions + 'save-off.svg',
    "save": path_functions + 'save.svg',
    "server": path_functions + 'server.svg',
    "share-outline": path_functions + 'share-outline.svg',
    "shield-account": path_functions + 'shield-account.svg',
    "stamper": path_functions + 'stamper.svg',
    "tasks": path_functions + 'tasks.svg',
    "trash-can-outline": path_functions + 'trash-can-outline.svg',
    "un-stamper": path_functions + 'un-stamper.svg',
    "save-white": path_functions + 'save-white.svg',
    "sync-data": path_functions + 'sync-data.svg',
    //
    "4-dots": path_iconsMenu + '4-dots.svg',
    "barChartOutlined": path_iconsMenu + 'barChartOutlined.svg',
    "bell-ring": path_iconsMenu + 'bell-ring.svg',
    "bellDot": path_iconsMenu + 'bellDot.svg',
    "bellDot01": path_iconsMenu + 'bellDot01.svg',
    "bellDot02": path_iconsMenu + 'bellDot02.svg',
    "bellDot03": path_iconsMenu + 'bellDot03.svg',
    "bellDot04": path_iconsMenu + 'bellDot04.svg',
    "bellDot05": path_iconsMenu + 'bellDot05.svg',
    "book": path_iconsMenu + 'book.svg',
    "btnClose": path_iconsMenu + 'btnClose.svg',
    "calendar": path_iconsMenu + 'calendar.svg',
    "edit-outlined": path_iconsMenu + 'edit-outlined.svg',
    "file-check-white": path_iconsMenu + 'file-check.svg',
    "file-edit": path_iconsMenu + 'file-edit.svg',
    "file-go": path_iconsMenu + 'file-go.svg',
    "file-new": path_iconsMenu + 'file-new.svg',
    "file-tray-full-outline": path_iconsMenu + 'file-tray-full-outline.svg',
    "file-wait": path_iconsMenu + 'file-wait.svg',
    "fileSetting": path_iconsMenu + 'fileSetting.svg',
    "list-outlined": path_iconsMenu + 'list-outlined.svg',
    "list-white": path_iconsMenu + 'list.svg',
    "listUnordered": path_iconsMenu + 'listUnordered.svg',
    "mdi_content-save-outline": path_iconsMenu + 'mdi_content-save-outline.svg',
    "notebook": path_iconsMenu + 'notebook.svg',
    "send-check": path_iconsMenu + 'send-check.svg',
    "send": path_iconsMenu + 'send.svg',
    "sharp-add": path_iconsMenu + 'sharp-add.svg',
    "shieldAccount": path_iconsMenu + 'shieldAccount.svg',
    "stop-outlined": path_iconsMenu + 'stop-outlined.svg',
    "storageLine": path_iconsMenu + 'storageLine.svg',
    "task": path_iconsMenu + 'task.svg',
    "time-business": path_iconsMenu + 'time-business.svg',
    "time": path_iconsMenu + 'time.svg',
    "times-calendar-o": path_iconsMenu + 'times-calendar-o.svg',
    "trash-line": path_iconsMenu + 'trash-line.svg',
    "usersCog": path_iconsMenu + 'usersCog.svg',
    "location": path_iconsMenu + 'location.svg',
    "globe-solid" : path_iconsMenu + 'globe-solid.svg',
    "tag-solid" : path_iconsMenu + 'tag-solid.svg',
    "address-card-regular" : path_iconsMenu + 'address-card-regular.svg',
}
const iconArr = Object.entries(iconDictionary).map(([key, value]) => ({ name: key, value: createIcon(value, { width: 25 }) }));
function getIcon(name, props = {}) {
    if (iconDictionary[name])
        return createIcon(iconDictionary[name], props)

    else return <div />
}

function createIcon(value, props = {}, alt = "", size = "sm") {
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
    iconDictionary,
    iconArr,
    createIcon,
    getIcon,
};