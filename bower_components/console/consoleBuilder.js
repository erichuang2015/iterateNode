var consoleBuilder = (function(){

    var consoleOpened = [
        '#document',
        'html',
        'head'
    ];

    var elementsIdToNotParse = [
        'HTMLShock-context-menu',
        'importingResource'
    ];

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function consoleCreateDocument(doctype){
        var html = '<li> &lt;!DOCTYPE ' + doctype.name;
        if ( doctype.publicId.length ) html += ' PUBLIC "' + doctype.publicId + '"';
        if ( doctype.systemId.length ) html += ' "' + doctype.systemId + '"';
        html += "&gt; </li>";
        return html;
    }
    /*
     iterDOMNodes
     */

    var mainEl = null;
    var iterDOMNodes = function(el, doctype, bubbling){
        // if ( typeof el.childNodes === 'undefined') return false;

        var bubbling = typeof bubbling !== 'undefined' ? bubbling : false;

        if ( el.nodeName == '#document' ){
            var html = consoleCreateDocument(doctype);
        }
        else if ( el === mainEl ){ //el.nodeName.toLocaleLowerCase() == 'body'){
            var html = '<li>&lt;' + el.nodeName;

            if ( typeof el.attributes !== 'undefined' )
                for(var x =0;x<el.attributes.length;x++)
                    html += " " + el.attributes[x].name + "=\"" +  el.attributes[x].nodeValue  + " \"";

            html += "&gt; </li>";

        }
        else var html = "";

        for(var i = 0; i<el.childNodes.length; i++ ){
            if ( el.childNodes[i].nodeName == '#text' && el.childNodes[i].nodeValue ){
                if ( el.childNodes[i].nodeValue.trim().length )
                    html += '<li>' + el.childNodes[i].nodeValue + '</li>';
            }
            if ( el.childNodes[i].nodeName == '#comment' ){
                html += "<li> &lt;!--" + escapeHtml( el.childNodes[i].nodeValue )  +  "---&gt; </li>";
            }
            else if ( el.childNodes[i].nodeName != '#comment' && el.childNodes[i].nodeName != '#text' && elementsIdToNotParse.indexOf( el.childNodes[i].id ) < 0 ){
                html += '<li>&lt;' + el.childNodes[i].nodeName;

                if ( typeof el.childNodes[i].attributes !== 'undefined' && el.childNodes[i].attributes )
                    for(var x =0;x<el.childNodes[i].attributes.length;x++)
                        html += " " + el.childNodes[i].attributes[x].name + "=\"" +  el.childNodes[i].attributes[x].nodeValue  + " \"";

                //html += "---&gt; </li>";

                if ( el.childNodes[i].childNodes.length ){
                    /*var nodeValue = el.childNodes[i].nodeName.toLowerCase();
                     if ( bubbling || consoleOpened.indexOf(nodeValue) > -1 )
                     html +=  '&gt;' + iterDOMNodes( el.childNodes[i] , doctype, bubbling) + '</li>';
                     else {*/
                    html += '&gt;' + '<a class="dropdown" data-toggle="dropdown" href="javascript:void()"><span class="caret"></span></a>' +
                    iterDOMNodes( el.childNodes[i] , doctype, bubbling) + '</li>';
                    //}
                }

                else html +=  '&gt;';

                if ( el.childNodes[i].value ){
                    if ( el.childNodes[i].nodeValue.trim().length )
                        html += '<li>' +  el.childNodes[i].value + '</li>';
                }
            }
        }
        console.log( el.parentNode );
        var parentName = el.parentNode ? el.parentNode.nodeName.toLowerCase() : '';
        console.log( parentName, consoleOpened.indexOf(parentName), el.parentNode );
        if ( !el.parentNode || consoleOpened.indexOf(parentName) > -1 ) //  )
            return '<ul>' + html + '</ul>';
        else
            return '<ul style="display:none">' + html + '</ul>';
    }

    return {
        iterDOMNodes : function(a,b,c){
            mainEl = a;
            return iterDOMNodes(a,b,c);
        }
    }

})();