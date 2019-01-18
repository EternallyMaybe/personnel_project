const loadCss = (src) => {
    if (isInclude(src)) return;
    
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = src;
    head.appendChild(link);
}
const loadJs = (src, callback) => {
    if (isInclude(src)) {
        callback();
        return;
    }

    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (callback) {
        script.onload = function() {
            callback();
        }
    }
    script.src = src;
    document.body.appendChild(script);
} 


const isInclude = (src) => {
    let isJs = /\.js$/.test(src);
    let els = document.getElementsByTagName(isJs ? 'script' : 'link');
    for (var i = 0, total = els.length; i < total; i++) {
        if (els[i][isJs ? 'src' : 'href'].indexOf(src.replace(/\.\.\//g, '')) !== -1) {
            return true;
        }
    }
    return false;
}

export default {
    loadCss,
    loadJs
}