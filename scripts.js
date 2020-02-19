document.addEventListener('DOMContentLoaded', () => {
    result();
    editValues();

    document.querySelector('#set-file').addEventListener('click', function(){
        download( result(), 'grid.css', 'text/css' );
    });
});

function editValues() {
    let input = document.querySelectorAll('input[type="number"], ' + 'input[type="checkbox"]');
    Array.from(input).forEach( function(e){
        e.addEventListener('change', function() {
            result();
        });
    });
}

function result() {
    var grid = '/* A COLLER DANS LE FOOTER DU SITE */\n/* <div id="get-grid" data-nb="' + document.querySelector('#columns').value + '" data-width="' + document.querySelector('#maxwidth').value + '" data-margin="' + spaces() + '"></div> */\n\n';

    var generic;
    if(!document.querySelector('#flex').checked){
        generic = '[class^="col-"] {\ndisplay: inline-block; \nvertical-align: top; \npadding: 0 ' + parseInt(spaces() / 2) + 'px;\nfont-size: 1rem;\n}\n';
    } else {
        generic = '[class^="col-"] {\npadding: 0 ' + parseInt(spaces() / 2) + 'px; \n}\n';
    }

    return grid + generic + maxwidth() + columns();
}

function maxwidth() {
    var maxwidth;
    if(!document.querySelector('#flex').checked){
        maxwidth = '.row {\nwidth: 100%; \nmargin: 0 auto; \npadding: 0 ' + parseInt(spaces() / 2) + 'px; \nfont-size: 0; \n';
    } else {
        maxwidth = '.row {\nwidth: 100%; \nmargin: 0 auto; \npadding: 0 ' + parseInt(spaces() / 2) + 'px; \ndisplay: flex; \nflex-wrap: wrap;\n';
    }

    if(parseInt(document.querySelector('#maxwidth').value) != 0){
        maxwidth += 'max-width: ' + (parseInt(document.querySelector('#maxwidth').value) + parseInt(spaces())) + 'px;\n}\n';
    } else {
        maxwidth += '}\n';
    }

    return maxwidth;
}

function columns() {
    var columns = document.querySelector('#columns').value;

    var desktop = '.col-0{display: none;}\n',
        offset = '.offset-0 {margin-left: 0;}\n',
        medium = '.m-col-0{display: none;}\n',
        offsetMedium = '.m-offset-0 {margin-left: 0;}\n',
        small = '.s-col-0{display: none;}\n',
        offsetSmall = '.s-offset-0 {margin-left: 0;}\n',
        xSmall = '.xs-col-0{display: none;}\n',
        offsetxSmall = '.xs-offset-0 {margin-left: 0;}\n',
        tablet = '@media only screen and (max-width: 1024px) {\n',
        tabletVertical = '@media only screen and (max-width: 1023px) {\n',
        mobile = '@media only screen and (max-width: 767px) {\n',
        getGrid = '#get-grid{\nposition: fixed; \nleft: 0; \ntop: 0; \nheight: 100vh; \nwidth: 100%; \nz-index: 9999; \npointer-events: none;\n}\n#get-grid > div {\nmargin: 0 auto; \nposition: relative; \nwidth: 100%;\n}\n#get-grid > div > span {\nposition: absolute; \nleft: 0; \ntop: 0; \nheight: 100vh; \nwidth: 100vw; \nbackground: rgba(10, 108, 241, .1); \ndisplay: block;\n}';

    for(var cpt = 1; cpt < columns; cpt++){
        desktop += '.col-'+ cpt +' {width: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
        offset += '.offset-' + cpt + ' {margin-left: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
        medium += '.m-col-'+ cpt +' {width: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
        offsetMedium += '.m-offset-'+ cpt +' {margin-left: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
        small += '.s-col-'+ cpt +' {width: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
        offsetSmall += '.s-offset-'+ cpt +' {margin-left: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
        xSmall += '.xs-col-'+ cpt +' {width: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
        offsetxSmall += '.xs-offset-'+ cpt +' {margin-left: calc(100% / ' + columns + ' * ' + cpt + ');}\n';
    }

    desktop += '.col-'+ columns +' {width: 100%;}\n';
    medium += '.m-col-'+ columns +' {width: 100%;}\n';
    small += '.s-col-'+ columns +' {width: 100%;}\n';
    xSmall += '.xs-col-'+ columns +' {width: 100%;}\n';

    return desktop + offset + '}\n' + tablet + medium + offsetMedium + '}\n' + tabletVertical + small + offsetSmall + '}\n' + mobile + xSmall + offsetxSmall + '}\n' + getGrid;
}

function spaces() {
    var spaces = document.querySelector('#spaces').value;
    return spaces;
}

function download(data, filename, type) {
    var a = document.createElement('a'),
    file = new Blob([data], {type: type});

    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
    }
    else {
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout( () => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}