function openObject(e){
        var target = e.target;
        var li = target.parentElement;
        var ul = li.querySelector("ul");
        if (!ul){
            var newObj = li[defaults.dataKeyOnDOM];
            ITERATION(newObj,function(newUl){
                li.appendChild(newUl);
            });
        }

        target.classList.toggle('open');
}