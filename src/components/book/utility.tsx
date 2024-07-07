export default function slugify(str: string): string {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    let splitStr = str.split("-");
    let newStringArray: string[] = [];
    if (splitStr.includes("mentioned")) {
        splitStr.forEach((newstr) => {
            if (newstr != "mentioned") {
                newStringArray.push(newstr);
            }
        });
        return newStringArray.join("-");
    } else {
        return str

    }

}