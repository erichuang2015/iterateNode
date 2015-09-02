/**
 * Created by Simone on 26/07/15.
 */
var sanitize = function(html){
    if ( html )
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    else
        return html;
};
