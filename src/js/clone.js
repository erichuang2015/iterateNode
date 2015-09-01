/**
 * Created by Simone on 01/09/15.
 */
function clone(obj) {
    var target = {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            target[i] = obj[i];
        }
    }
    return target;
}
