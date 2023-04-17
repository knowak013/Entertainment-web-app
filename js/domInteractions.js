export const createDomElement = (tagName, className, innerText, src) => {

    const tag = document.createElement(tagName);
    if (className)tag.classList = className;
    if (innerText)tag.innerText = innerText;
    if (src)tag.src = src;

    return tag;
}