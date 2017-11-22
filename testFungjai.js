var URLS = ['https://newfront.fungjai.net/home',
            'https://newfront.fungjai.net/trending',
            'https://newfront.fungjai.net/playlists',
            'https://newfront.fungjai.net/new',
            'https://newfront.fungjai.net/chart',
            'https://newfront.fungjai.net/artists/zero-hero'
            ]

var SCREENSHOT_WIDTH = [544, 992, 1280];
var SCREENSHOT_HEIGHT = 900;
var LOAD_WAIT_TIME = 5000;

var getPageTitle = function(page) {
    var documentTitle = page.evaluate(function(){
        return document.title;
    })
    console.log('getting title:', documentTitle)
    return documentTitle;
}

var getPageHeight = function(page) {
    var documentHeight = page.evaluate(function() {
        return document.body.offsetHeight;
    })
    console.log('getting height:', documentHeight)
    return documentHeight;
}

var renderPage = function(page) {

    var title =  getPageTitle(page);

    var pageHeight = getPageHeight(page);

    page.clipRect = {
        top: 0, left: 0, width: SCREENSHOT_WIDTH[index],
        height: pageHeight
    };
    page.render(SCREENSHOT_WIDTH[index] + title + '.png');
    console.log('rendered:', title + '.png')
}

var exitIfLast = function(index, array) {
    console.log(array.length - index - 1, 'more screenshots!')
    console.log('~~~~~~~~~~~~~~')
    if (index == array.length - 1) {
        console.log('exit')
        phantom.exit();
    }
}

var takeScreenshot = function(element) {

    console.log('opening URL:', element)

    var page = require('webpage').create();

    // page.settings.userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 6_0_1 like Mac OS X; en-us) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25';
    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
    page.viewportSize = {width:SCREENSHOT_WIDTH[index], height:SCREENSHOT_HEIGHT};

    page.open(element);

    console.log('waiting for page to load...')

    page.onLoadFinished = function() {
        setTimeout(function() {
            console.log("LOAD_TIME")
            renderPage(page)
            exitIfLast(index,URLS)
            index++;
            takeScreenshot(URLS[index]);
        }, LOAD_WAIT_TIME)
    }

}

var index = 0;

takeScreenshot(URLS[index]);
