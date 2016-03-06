var parseJsObject = document.getElementById("parseJs");
function action(type){
    switch(type){
        case "anlyzJson":
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myJSONObject = JSON.parse(xmlhttp.responseText);
                    var iterateNodeSettings = {};
                    iterateNodeSettings.obj = myJSONObject;
                    iterateNodeSettings.flatArrays = true;
                    var parseJs = iterateNode(iterateNodeSettings);
                    parseJsObject.innerHTML = "";
                    parseJsObject.appendChild(parseJs);
                }
            };
            xmlhttp.open("GET", "./JSON/example.json", true);
            try {
                xmlhttp.send();
            }
            catch(e){
                alert("there seems to be a problem in REST connection ( maybe this page is not served by a Server? ) " +
                    "Try to load a file instead.")
            }
            break;
        case "anlyzDocument":
            var iterateNodeSettings = {};
            iterateNodeSettings.obj = document;
            var parseJs = iterateNode(iterateNodeSettings);
            parseJsObject.innerHTML = "";
            parseJsObject.appendChild(parseJs);
            break;
        case "anlyzDocumentFiltered":
            var filterFunction = function(obj){
                var target = {};
                var DOMtype = obj.tagName || obj.nodeName;
                var text = obj.nodeValue;
                var typeNode = Object.prototype.toString.call(obj);
                var iterateChildNodes = function(childNode){
                    target = [];

                    for(var k = 0; k < childNode.length; k++)
                    {
                        if( !childNode[k].nodeValue || childNode[k].nodeValue.trim() )
                            target.push(childNode[k]);
                        else if ( !childNode[k].tagName && childNode[k].nodeValue.trim() )
                            target.push({ innerText : childNode[k].nodeValue });
                    }
                    return target;
                };
                if ( typeNode == "[object NodeList]" && !text )
                    return iterateChildNodes(obj);

                if ( text )
                    return{ innerText : text };

                return iterateChildNodes(obj.childNodes);
            };
            var typeOfFilter = function(str,obj){
                var DOMtype = obj.tagName;
                var attributes = "";
                var returnString = "";

                if ( obj.attributes )
                    for(var i = 0; i<obj.attributes.length;i++)
                        attributes += " " + obj.attributes[i].nodeName + "=&quot;" + obj.attributes[i].nodeValue + "&quot;";

                if ( !DOMtype ){
                    if ( obj.nodeName == "#comment" )
                        returnString = "&lt;!--" + obj.nodeValue + "--&gt;";

                    if ( obj.nodeName == "#text" )
                        returnString = obj.nodeValue;

                    // obj = {};
                }
                else
                    returnString = "&lt;" + DOMtype + attributes + "&gt;";

                if ( !obj.childNodes.length ) {
                    obj = returnString;
                    returnString = str;
                    //obj = {};
                }

                var returnValue = {
                    typeofValue : returnString,
                    node : obj
                };
                return returnValue;
            };
            var iterateNodeSettings = {};
            iterateNodeSettings.obj = document.documentElement;
            iterateNodeSettings.filterFunction = filterFunction;
            iterateNodeSettings.typeOfFilter = typeOfFilter;
            iterateNodeSettings.flatArrays = function(obj){
                return obj.childNodes;
            };
            var parseJs = iterateNode(iterateNodeSettings);
            parseJsObject.innerHTML = "";
            parseJsObject.appendChild(parseJs);
            break;
        case "imadiv":
            var iterateNodeSettings = {};
            iterateNodeSettings.obj = document.getElementById("imadiv");
            var parseJs = iterateNode(iterateNodeSettings);
            parseJsObject.innerHTML = "";
            parseJsObject.appendChild(parseJs);
        default:
            break;
    }
}
var inputElement = document.getElementById("inputFiles");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    var fileList = this.files;
    var reader = new FileReader();
    reader.onload = function(res){
        try{
            var json = JSON.parse(res.target.result);
            var iterateNodeSettings = {};
            iterateNodeSettings.obj = json;
            var parseJs = iterateNode(iterateNodeSettings);
            parseJsObject.innerHTML = "";
            parseJsObject.appendChild(parseJs);
        }
        catch(e){
            alert("The file selected doesn't not appear to be a JSON")
        }
    };
    reader.readAsText(fileList[0]);
}