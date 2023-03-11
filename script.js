var linksArea = document.getElementById('links');
if (linksArea.addEventListener) {
    linksArea.addEventListener('input', function() {
        var typedTxt = linksArea.value;
        document.getElementById('plaintxt').innerHTML = convertLinks(typedTxt);
        localStorage.setItem('links', linksArea.value);
        console.log('Saved links');
    }, false);
} else if (linksArea.attachEvent) {
    linksArea.attachEvent('onpropertychange', function() {
        var typedTxt = linksArea.value;
        document.getElementById('plaintxt').innerHTML = convertLinks(typedTxt);
        localStorage.setItem('links', linksArea.value);
        console.log('Saved links');
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('plaintxt').innerHTML = convertLinks(localStorage.getItem('links'));
});

linksArea.value = localStorage.getItem('links');

const convertLinks = (input) => {

    let text = input;
    const linksFound = text.match(/(?:www|https?)[^\s]+/g);
    const aLink = [];

    if (linksFound != null) {
        var newTxt = "";
        for (let i = 0; i < linksFound.length; i++) {
            let replace = linksFound[i];
            if (replace.slice(-1) == ')') {
                replace = replace.slice(0, -1)
            }
            if (!(linksFound[i].match(/(http(s?)):\/\//))) {
                replace = 'http://' + linksFound[i]
            }
            let linkText = replace.split('/')[2];
            if (linkText.substring(0, 3) == 'www') {
                linkText = linkText.replace('www.', '')
            }
            aLink.push('<a href="' + replace + '" target="_blank">' + linkText + '</a><br />');
            newTxt += aLink[i];
            //text = text.split( linksFound[i] ).map(item => { return aLink[i].includes('iframe') ? item.trim() : item } ).join( aLink[i] );
        }
        return newTxt;
    } else {
        return input;
    }
}
