if (typeof validateFirstRun === 'undefined') {
    /**
     * Allows the script to continue if it is only being run once otherwise it will throw an exception (that it hides)
     * And prevents further execution of the script.
     * Put this as the first line in your script and it will only run once.
     * NOTE: this is only unique to the window.  scripts run in an iframe or different window will run again.
     */
    function validateFirstRun(scriptObject) {
        // no var on purpose.
        try {
            scriptBay = scriptBay || {};
        } catch (exception) {
            scriptBay = {};
        }
        if (typeof (scriptBay[scriptObject.src]) !== 'undefined') {
            var errorEvent = { src: scriptObject.src };
            var listener = function(event) {
                if (typeof event.error === 'object' && (typeof event.error.src !== 'undefined) && event.error.src === scriptObject.src) {
                    event.preventDefault();event.stopPropagation();
                    window.removeEventListener('error', listener, true);
                }
            };
            window.addEventListener('error', listener, true);
            throw errorEvent;
        }
        scriptBay[scriptObject.src] = {};
    }
}



if (typeof validateFirstNameSpaceRun === 'undefined') {
    /**
     * Allows the script to continue if it is only being run once otherwise it will throw an exception (that it hides)
     * And prevents further execution of the script.
     * NOTE: this is only unique to the nameSpaceObject.  scripts run with a different object will run again.
     */
    function validateFirstNameSpaceRun(scriptObject, nameSpaceObject) {
        if (typeof nameSpaceObject === 'undefined') {
            throw new Error('name space object is not defined your script is being terminated and will never run');
        }
        // no var on purpose.
        try {
            nameSpaceObject.scriptBay = nameSpaceObject.scriptBay || {};
        } catch (exception) {
            nameSpaceObject.scriptBay = {};
        }
        if (typeof (nameSpaceObject.scriptBay[scriptObject.src]) !== 'undefined') {
            var errorEvent = { src: scriptObject.src };
            var listener = function(event) {
                if (typeof event.error === 'object' && (typeof event.error.src !=='undefined') && event.error.src === scriptObject.src) {
                    event.preventDefault();event.stopPropagation();
                    window.removeEventListener('error', listener, true);
                }
            };
            window.addEventListener('error', listener, true);
            throw errorEvent;
        }
        nameSpaceObject.scriptBay[scriptObject.src] = {};
    }
}

if (typeof validateFirstGlobalRun === 'undefined') {
    /**
     * This is a combination of the two functions above above.
     */
    function validateFirstGlobalRun(scriptObject, nameSpaceObject) {
        validateFirstRun(scriptObject);
        validateFirstNameSpaceRun(scriptObject, nameSpaceObject);
    }
}

if (typeof safeLoad === 'undefined') {
    /**
     * Loads a script but only once.
     * @param {String} url The url that is being loaded.
     * @param {String} uniqueGlobalObject An object that is unique to the script
     *              and only exist when the script is loaded.
     */
    function safeLoad(url, uniqueGlobalObject) {
        if (typeof window[uniqueGlobalObject] === 'undefined') {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }
}
