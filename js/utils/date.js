const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export function getDates(content) {
    return content.match(/(\d{1,2}\/\d{1,2}\/\d{4})/g) || [];
}

export function NowDate() {
    const date = new Date();
    let day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    if (day < 10) day = '0' + day;
    return `${month} ${day}, ${year}`;
}
