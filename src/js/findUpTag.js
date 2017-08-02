function findUpTag(el, tag) {
    console.log("el, el.parentNode ",el, el.parentNode)
    while (el.parentNode) {
        el = el.parentNode;
        if (el.nodeName.toLowerCase() == tag)
            return el;
    }
    return null;
}