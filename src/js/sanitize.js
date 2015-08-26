/**
 * Created by Simone on 26/07/15.
 */
var sanitize = function(html){
    var newHTML = html.replace(/</g,"&lt")
    .replace(/>/g,"&gt")
    .replace(/&/g,"&amp");
    return newHTML;
};
