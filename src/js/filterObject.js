function filterObject( obj, predicate ) {
    var target = Array.isArray(obj) ? [] : {};
    for (var i in obj) {
        if (predicate.indexOf(i)) {
            target[i] = obj[i];
        }
    }
    return target;
};
