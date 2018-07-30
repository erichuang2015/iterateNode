"use strict";

/**
 * Created by Simone on 01/09/15.
 */
function merge(add, base, extension) {
    var target = Array.isArray(base) ? [] : {};
    for (var i in base) {
        var typeNode = Object.prototype.toString.call(base[k]);
        if ((typeNode == "[object Object]" || typeNode == "[object Array]") && base[i]) target[i] = add[i] ? merge(add[i], base[i], extension) : base[i];else target[i] = add[i] || base[i];
    }
    // TODO Permit add keys to be included in target object
    if (extension) {
        for (var k in add) {
            target[k] = target[k] || add[k];
        }
    }

    return target;
}