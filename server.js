var express = require('express');
var url = require('url');
var path = require('path');
var app = express();

//app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '/index.html')); 
});
app.get('/:query', function (req, res) {
  var query = req.params.query;
  //query = query.substring(1);
  res.json(inputToOutput(query));
  res.end();
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 8080!');
});



function isNatLangDate(natLangDateArr) {
    var arr = natLangDateArr;
    var m = getMonthNum(arr[0]);
    var d = getDay(arr[1]);
    if (m === null) { return false; }
    if (d > 31) { return false; }
    return true;
}

function isUnixTime(numberStr) {
    var len = numberStr.length;
    var isTime = parseInt(numberStr, 10);
    if (len <= 10 && !Number.isNaN(isTime)) {
        return true;
    } else {
        return false;
    }
}

function formatNum (number) {
    var result;
    if (number < 10) {
        result = "0" + number;
    } else {
        result = number;
    }
    return result;
}

function getMonthName(num) {
    var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    return months[num];
}

function getMonthNum(month) {
    var months = {
        "January": 00,
        "February": 01,
        "March": 02,
        "April": 03,
        "May": 04,
        "June": 05,
        "July": 06,
        "August": 07,
        "September": 08,
        "October": 09,
        "Novermber": 10,
        "December": 11
    };
    if (months[month] === undefined) { return null; }
    return months[month];
}

function getDay(day) {
    var dae = parseInt(day, 10);
    return formatNum(dae);
}

function getNatLangDate(unixtime) {
    var date = new Date(unixtime * 1000);
    var result;
    result = getMonthName(date.getMonth()) + " " + formatNum(date.getDate()) + ", " + date.getFullYear();
    return result;
}

function formatNatLangDate(natLangDateArr) {
    var arr = natLangDateArr;
    var result = arr[0] + " " + arr[1] + ", " + arr[2];
    return result;
}

function getNatLangDateArr(natLangDateStr) {
    var arr = [];
    if (natLangDateStr.includes("%20")) {
        arr = natLangDateStr.split("%20");
    } else if (natLangDateStr.includes(" ")) {
        arr = natLangDateStr.split(' ');
    }
    arr[1] = arr[1].substring(0, arr[1].length - 1);
    return arr;
}

function getUnixTime(natLangDateArr) {
    var dateInMillisec = new Date(natLangDateArr[0] + " " + natLangDateArr[1] + ", " + natLangDateArr[2]);
    var unixTime = Math.round(dateInMillisec.getTime()/1000);
    return unixTime;
}

function formatOutput(unixtime, natLangDate) {
    return { unix: unixtime, natural: natLangDate };
}

function inputToOutput(input) {
    if (isUnixTime(input)) {
        return formatOutput(parseInt(input, 10), getNatLangDate(input));
    } else {
        var arr = getNatLangDateArr(input);
        if (isNatLangDate(arr)) {
            return formatOutput(getUnixTime(arr), formatNatLangDate(arr));
        } else if (!isUnixTime(input) && !isNatLangDate(arr)) {
            return formatOutput(null, null);
        }
    }
}