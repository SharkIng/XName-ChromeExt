/**
 * Author: SharkIng. Feb. 6, 2015
 */

/*
* Default Setting
*/
// Use Whatever YOURLS system
var siteName = 'http://xna.me';

// Programming
var $xlink = $('#xlink');

init();

function init(){
    // Init Func
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

        var currentUrl = tabs[0].url;
        if(currentUrl.length > 0){
            ShortenLink(currentUrl);
        }
    });

    /*
    * Copy Button
    */
    $('.btn-copy').click(function (e) {
        e.preventDefault();
        copy();
    });

    /*
    * QR Code Button
    */
    // This will Open a new window/tab
    $('.btn-qr').click(function (e) {
        e.preventDefault();
        getQRCode(); // Use Default YOURLS Plugin
    });

}

/*
* Main Function that Shorten URL link by Using YOURLS API
*/
function ShortenLink (url) {
    var yourlsLink;

    // Get Yourls API from XNa.me
    // You can use your own API as well
    yourlsLink = siteName + '/yourls-api.php?format=simple&action=shorturl&url=' + url;


    var rqst = new XMLHttpRequest();
    rqst.onreadystatechange = function () {
            if (rqst.readyState == 4 && rqst.status == 200) {
                $xlink.val(rqst.responseText);
        }
    }
    rqst.open("GET", yourlsLink, false);
    rqst.send();

}

/*
* Get QRCode Function
*/
function getQRCode(){
    var link= document.getElementById('xlink').value;
    window.open(link + '.qr','Links QR Code');
}

/*
* Copy function
*/
function copy(){
    var link= document.getElementById('xlink').value;
    copyTextToClipboard(link);
}

/*
* Copy to Clipboard
*/
function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}