/**
 * Created by Simone on 01/09/15.
 */
function clone(obj) {
    var target = {};
    for (var i in obj) {
        var typeNode = Object.prototype.toString.call(obj[k]);
        if ( ( typeNode == "[object Object]" || typeNode == "[object Array]" ) &&
            obj[i] )
            target[i] = clone(obj)
        else
            target[i] = obj[i];
    }
    return target;
}
