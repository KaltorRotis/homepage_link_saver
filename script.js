const convertLinks = (input) => {
    const lines = input.split('\n');
    const output = [];
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i].trim();
        if (line === '') {
            output.push('<br />');
        } else {
            const linksFound = line.match(/(?:www|https?)[^\s]+/g);
            if (linksFound != null) {
                for (let j = 0; j < linksFound.length; j += 1) {
                    let replace = linksFound[j];
                    if (replace.slice(-1) === ')') {
                        replace = replace.slice(0, -1);
                    }
                    if (!(linksFound[j].match(/(http(s?)):\/\//))) {
                        replace = `http://${linksFound[j]}`;
                    }
                    let linkText = replace.split('/')[2];
                    if (linkText.substring(0, 3) === 'www') {
                        linkText = linkText.replace('www.', '');
                    }
                    output.push(`<a href="${replace}" target="_blank">${linkText}</a><br />`);
                }
            } else {
                output.push(`${line}<br />`);
            }
        }
    }
    return output.join('');
};

const editTextArea = document.getElementById('links');
const plainTextArea = document.getElementById('plaintxt');
if (editTextArea.addEventListener) {
    editTextArea.addEventListener('input', () => {
        const typedTxt = editTextArea.value;
        plainTextArea.innerHTML = convertLinks(typedTxt);
        localStorage.setItem('links', editTextArea.value);
        document.getElementById('links').style.height = '1px';
        document.getElementById('links').style.height = `${25 + editTextArea.scrollHeight}px`;
    }, false);
} else if (editTextArea.attachEvent) {
    editTextArea.attachEvent('onpropertychange', () => {
        const typedTxt = editTextArea.value;
        plainTextArea.innerHTML = convertLinks(typedTxt);
        localStorage.setItem('links', editTextArea.value);
    });
    document.getElementById('links').style.height = '1px';
    document.getElementById('links').style.height = `${25 + editTextArea.scrollHeight}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    plainTextArea.innerHTML = convertLinks(localStorage.getItem('links'));
});

editTextArea.value = localStorage.getItem('links');
