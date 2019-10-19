var rollAmt;
var rollDelay = 1000;
var stopRoll = false;
var stopRollClickAmt = 0;
var choices = {};
var rolled = {};

function updateKeys(option, ref) {
    if (ref.hasOwnProperty(option))
        ref[option] += 1;
    else
        ref[option] = 1;
}

function addAsOption(option, tag, tagAdj, ref) {
    var lst = document.getElementById(tag);
    if (!document.getElementById(option + tagAdj)) {
        var sel = makeElem(elem="li", text=option);
        var sel_id = makeElem(elem="span", text="", id=option + tagAdj);
        sel.appendChild(sel_id);
        lst.appendChild(sel);
    }
    document.getElementById(option + tagAdj).innerHTML = ref[option];
}

function add() {
    var op = document.getElementById("food-add");
    var options = op.value;
    var optionList = options.split(",");
    optionList = optionList.map(x => x.trim());
    for (var i = 0; i < optionList.length; i++) {
        if (/\S/.test(optionList[i])) {
            updateKeys(optionList[i], choices);
            addAsOption(optionList[i], "food-choices", "", choices);
            makePlusMinusButtons(optionList[i]);      
        }
    }
}

function checkRollAmt() {
    var tmp = rollAmt || 0;
    rollAmt = parseInt(prompt("How many times to roll?"));
    return (tmp < rollAmt && rollAmt > 0 && Object.entries(choices).length !== 0);
}

function endRoll() {
    for (keys in rolled)
        if (rolled[keys] == rollAmt)
            return (1);
    return (0);
}

function stopRolls(e) {
    if (stopRollClickAmt % 2 == 0)
        stopRoll = true, e.value = "Resume";
    else
        stopRoll = false, e.value = "Reset";
    stopRollClickAmt++; 
}

function roll() {
    if (checkRollAmt()) {
        setInterval( function() {
            if (!endRoll() && !stopRoll) {
                var keys = Object.keys(choices);
                var len = keys.length;
                for (var i = 0; i < len; i++) {
                    keys.push(...Array(choices[keys[i]]).fill(keys[i]));
                }
                var ran_key = keys[Math.floor(Math.random() * keys.length)];
                updateKeys(ran_key, rolled);
                addAsOption(ran_key, "result", " result", rolled);
            }
        }, rollDelay)
    }
}