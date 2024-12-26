/**
 * HTML文字列からHtmlElementを生成する
 * @param {string} htmlText 
 * @returns {HtmlElement}
 */
export function createElementFromHtmlString(htmlText) {
    const tempEl = document.createElement('div');
    tempEl.innerHTML = htmlText;
    return tempEl.firstElementChild;
}