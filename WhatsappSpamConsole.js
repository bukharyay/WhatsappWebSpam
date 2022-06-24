//
//  __          ___           _                         _____                         __
//  \ \        / / |         | |                       / ____|                        \ \
//   \ \  /\  / /| |__   __ _| |_ ___  __ _ _ __  _ __| (___  _ __   __ _ _ __ ___   (_) |
//    \ \/  \/ / | '_ \ / _` | __/ __|/ _` | '_ \| '_ \\___ \| '_ \ / _` | '_ ` _ \    | |
//     \  /\  /  | | | | (_| | |_\__ \ (_| | |_) | |_) |___) | |_) | (_| | | | | | |  _| |
//      \/  \/   |_| |_|\__,_|\__|___/\__,_| .__/| .__/_____/| .__/ \__,_|_| |_| |_| (_) |
//                                         | |   | |         | |                      /_/
//                                         |_|   |_|         |_|
//
//      How to run :
//      1. Open (https://web.whatsapp.com/)
//      2. (Ctrl + A, Ctrl + C) Select All this Script and Copy
//      3. (Ctrl + Shift + J) Open Console (Ctrl + V) Paste Script and Enter
//      4. Select Whatsapp Contact or Group
//      5. Write message and Click SPAM button on the right side of the message column.
//      6. Enter how many message will be sent and Click OK
//      7. To stop SPAM, Click STOP button on the right side of the message column.
//
//
//      [However, to avoid banned or blocking, should send spam chat amount not excessive.]
//
//      Update : 25-06-2022 by:Bukharyay

var repeatingSpamFunction = null;
var message = '';

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

document.onclick = function() {
    createSpamButton();
};

function createSpamButton() {
    if (document.getElementById('spamButton') != null)
        return;
    var composeBar = getElementByXpath("//*[@id=\"main\"]/footer/div[1]");
    if (composeBar == null)
        return;
    composeBar.oninput = function() {
        editSpamButton();
    };

    var spamButton = document.createElement('button');
    spamButton.setAttribute("id", "spamButton");
    spamButton.innerHTML = 'SPAM';
    spamButton.style.fontSize = '1rem';
    spamButton.style.border = '1px solid transparent';
    spamButton.style.padding = '.375rem .75rem';
    spamButton.style.lineHeight = '1.5';
    spamButton.style.borderRadius = '.25rem';
    spamButton.style.margin = '0.5% 0';
    spamButton.style.color = '#fff';
    spamButton.style.backgroundColor = '#343a40';
    spamButton.style.borderColor = '#343a40';
    composeBar.append(spamButton);
    editSpamButton();
}

function sendMessage() {
    var evt = new Event('input', {
        bubbles: true
    });

    var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[2]");
    input.innerHTML = message;
    input.dispatchEvent(evt);

    getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div/span[2]/div/div[2]/div[2]/button").click();
}

function doSpam(element) {
    if (element.innerHTML == 'SPAM') {
        var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[2]");
        if (input.innerHTML == '' || input.innerHTML == null) {
            window.alert('Please Enter a Text to be spammed before using the spam button.');
            return;
        }
        element.innerHTML = 'STOP';
        message = input.innerHTML;
        var interval = parseInt(prompt('Please enter spam-interval:', '500'));
        repeatingSpamFunction = window.setInterval(function() {
            sendMessage();
        }, interval);
    } else {
        element.innerHTML = 'SPAM';
        window.clearInterval(repeatingSpamFunction);
    }
    editSpamButton();
}

function editSpamButton() {
    var spamButton = document.getElementById('spamButton');
    var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[2]");
    if (input.innerHTML == '' || input.innerHTML == null) {
        spamButton.style.cursor = 'not-allowed';
        spamButton.style.backgroundColor = '#343a40';
        spamButton.style.color = '#D3D3D3';
        spamButton.onclick = null;
    } else {
        spamButton.style.cursor = 'pointer';
        spamButton.style.backgroundColor = '#056162';
        spamButton.style.color = '#D3D3D3';
        spamButton.onclick = function() {
            doSpam(this);
        };
    }
}
