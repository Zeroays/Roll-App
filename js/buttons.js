var PLUS = "-plus";
var MINUS = "-minus";

function makeButton(func, id) {
    var button = document.createElement("input");
    button.type = "button";
    button.onclick = func;
    if (id) button.id = id;
    return (button);
}

function decrementOption() {
    var choiceElem = this.parentNode.childNodes[2];
    choiceElem.innerHTML -= 1;
    choices[choiceElem.id] -= 1;
    if (choices[choiceElem.id] == 0) {
       choiceElem.parentNode.remove();
       delete choices[choiceElem.id];
    }
}

function incrementOption() {
    var choiceElem = this.parentNode.childNodes[2];
    choiceElem.innerHTML = parseInt(choiceElem.innerHTML) + 1;
    choices[choiceElem.id] += 1;
}

function plusMinusButtonsExist(option) {
    var minusElem = document.getElementById(option + MINUS);
    var plusElem = document.getElementById(option + PLUS);
    var foodChoices = document.getElementById("food-choices");
    if (foodChoices.contains(minusElem) && foodChoices.contains(plusElem))
        return (1);
    return (0);
}

function makePlusMinusButtons(option) {
    var elem = document.getElementById(option);
    var parentElem = elem.parentNode;
    if (!(plusMinusButtonsExist(option))) {
        var minus = makeButton(decrementOption, id=option + MINUS);
        var plus = makeButton(incrementOption, id=option + PLUS);
        minus.style.display = plus.style.display = "none";
        parentElem.insertBefore(minus, elem);
        parentElem.insertBefore(plus, elem.nextSibling);
    }
    elem.addEventListener("click", togglePlusMinus);
}

function togglePlusMinus(e) {
    var option = e.target.id;
    var mTarget = document.getElementById(option + MINUS).style;
    var pTarget = document.getElementById(option + PLUS).style;
    if (mTarget.display != "" && pTarget.display != "")
        mTarget.display = pTarget.display = "";
    else
        pTarget.display = mTarget.display = "none";
}