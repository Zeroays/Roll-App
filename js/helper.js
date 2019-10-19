function makeElem(elem, text, id) {
    var tag = document.createElement(elem);
    if (text) tag.innerText = text;
    if (id) tag.id = id;
    return (tag);
}