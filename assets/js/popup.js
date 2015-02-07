/**
 * Author: SharkIng. Feb. 6, 2015
 */

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

    $('.btn-save').click(function (e) {
        e.preventDefault();
        save();

    });

}

function ShortenLink (url) {
    var yourlsLink;

    // Use Whatever YOURLS system
    var siteName = 'http://xna.me';

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