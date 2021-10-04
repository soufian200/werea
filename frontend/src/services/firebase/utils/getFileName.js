// get img name from firebase url
export const getFileName = (url, folder) => {
    const splitedUrl = url.split("?")[0].split(`${folder}%2F`)
    return splitedUrl[splitedUrl.length - 1]
}
