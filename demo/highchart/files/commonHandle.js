
var DateUtil = function () {

    /**
     * 判断闰年
     * @param date Date日期对象
     * @return boolean true 或false
     */
    this.isLeapYear = function (date) {
        return (0 == date.getYear() % 4 && ((date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)));
    }

    /**
     * 日期对象转换为指定格式的字符串
     * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
     * @param date Date日期对象, 如果缺省，则为当前时间
     *
     * YYYY/yyyy/YY/yy 表示年份  
     * MM/M 月份  
     * W/w 星期  
     * dd/DD/d/D 日期  
     * hh/HH/h/H 时间  
     * mm/m 分钟  
     * ss/SS/s/S 秒  
     * @return string 指定格式的时间字符串
     */
    this.dateToStr = function (formatStr, date) {
        formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
        date = arguments[1] || new Date();
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
        str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
        str = str.replace(/M/g, date.getMonth());
        str = str.replace(/w|W/g, Week[date.getDay()]);

        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());

        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());

        return str;
    }


    /**
    * 日期计算  
    * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
    * @param num int
    * @param date Date 日期对象
    * @return Date 返回日期对象
    */
    this.dateAdd = function (strInterval, num, date) {
        date = arguments[2] || new Date();
        switch (strInterval) {
            case 's': return new Date(date.getTime() + (1000 * num));
            case 'n': return new Date(date.getTime() + (60000 * num));
            case 'h': return new Date(date.getTime() + (3600000 * num));
            case 'd': return new Date(date.getTime() + (86400000 * num));
            case 'w': return new Date(date.getTime() + ((86400000 * 7) * num));
            case 'm': return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            case 'y': return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        }
    }

    /**
    * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
    * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
    * @param dtStart Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
    * @param dtEnd Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒 
    */
    this.dateDiff = function (strInterval, dtStart, dtEnd) {
        switch (strInterval) {
            case 's': return parseInt((dtEnd - dtStart) / 1000);
            case 'n': return parseInt((dtEnd - dtStart) / 60000);
            case 'h': return parseInt((dtEnd - dtStart) / 3600000);
            case 'd': return parseInt((dtEnd - dtStart) / 86400000);
            case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7));
            case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
            case 'y': return dtEnd.getFullYear() - dtStart.getFullYear();
        }
    }

    /**
    * 字符串转换为日期对象
    * @param date Date 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
    */
    this.strToDate = function (dateStr) {
        var data = dateStr;
        var reCat = /(\d{1,4})/gm;
        var t = data.match(reCat);
        t[1] = t[1] - 1;
        eval('var d = new Date(' + t.join(',') + ');');
        return d;
    }

    /**
    * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
    * 
    */
    this.strFormatToDate = function (formatStr, dateStr) {
        var year = 0;
        var start = -1;
        var len = dateStr.length;
        if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
            year = dateStr.substr(start, 4);
        }
        var month = 0;
        if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
            month = parseInt(dateStr.substr(start, 2)) - 1;
        }
        var day = 0;
        if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
            day = parseInt(dateStr.substr(start, 2));
        }
        var hour = 0;
        if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len) {
            hour = parseInt(dateStr.substr(start, 2));
        }
        var minute = 0;
        if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
            minute = dateStr.substr(start, 2);
        }
        var second = 0;
        if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
            second = dateStr.substr(start, 2);
        }
        return new Date(year, month, day, hour, minute, second);
    }


    /**
    * 日期对象转换为毫秒数
    */
    this.dateToLong = function (date) {
        return date.getTime();
    }

    /**
    * 毫秒转换为日期对象
    * @param dateVal number 日期的毫秒数 
    */
    this.longToDate = function (dateVal) {
        return new Date(dateVal);
    }

    /**
    * 判断字符串是否为日期格式
    * @param str string 字符串
    * @param formatStr string 日期格式， 如下 yyyy-MM-dd
    */
    this.isDate = function (str, formatStr) {
        if (formatStr == null) {
            formatStr = "yyyyMMdd";
        }
        var yIndex = formatStr.indexOf("yyyy");
        if (yIndex == -1) {
            return false;
        }
        var year = str.substring(yIndex, yIndex + 4);
        var mIndex = formatStr.indexOf("MM");
        if (mIndex == -1) {
            return false;
        }
        var month = str.substring(mIndex, mIndex + 2);
        var dIndex = formatStr.indexOf("dd");
        if (dIndex == -1) {
            return false;
        }
        var day = str.substring(dIndex, dIndex + 2);
        if (!isNumber(year) || year > "2100" || year < "1900") {
            return false;
        }
        if (!isNumber(month) || month > "12" || month < "01") {
            return false;
        }
        if (day > getMaxDay(year, month) || day < "01") {
            return false;
        }
        return true;
    }

    this.getMaxDay = function (year, month) {
        if (month == 4 || month == 6 || month == 9 || month == 11)
            return "30";
        if (month == 2)
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                return "29";
            else
                return "28";
        return "31";
    }
    /**
    *   变量是否为数字
    */
    this.isNumber = function (str) {
        var regExp = /^\d+$/g;
        return regExp.test(str);
    }

    /**
    * 把日期分割成数组 [年、月、日、时、分、秒]
    */
    this.toArray = function (myDate) {
        myDate = arguments[0] || new Date();
        var myArray = Array();
        myArray[0] = myDate.getFullYear();
        myArray[1] = myDate.getMonth();
        myArray[2] = myDate.getDate();
        myArray[3] = myDate.getHours();
        myArray[4] = myDate.getMinutes();
        myArray[5] = myDate.getSeconds();
        return myArray;
    }

    /**
    * 取得日期数据信息  
    * 参数 interval 表示数据类型  
    * y 年 M月 d日 w星期 ww周 h时 n分 s秒  
    */
    this.datePart = function (interval, myDate) {
        myDate = arguments[1] || new Date();
        var partStr = '';
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        switch (interval) {
            case 'y': partStr = myDate.getFullYear(); break;
            case 'M': partStr = myDate.getMonth() + 1; break;
            case 'd': partStr = myDate.getDate(); break;
            case 'w': partStr = Week[myDate.getDay()]; break;
            case 'ww': partStr = myDate.WeekNumOfYear(); break;
            case 'h': partStr = myDate.getHours(); break;
            case 'm': partStr = myDate.getMinutes(); break;
            case 's': partStr = myDate.getSeconds(); break;
        }
        return partStr;
    }

    /**
    * 取得当前日期所在月的最大天数  
    */
    this.maxDayOfDate = function (date) {
        date = arguments[0] || new Date();
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        var time = date.getTime() - 24 * 60 * 60 * 1000;
        var newDate = new Date(time);
        return newDate.getDate();
    }

    return this;
}();



/**
@设置地图level
@api自带的setLevel()方法有问题，自己重写一个方法
@vTargetLevel--需要定位到的level
@----------------------------此方法未使用-------------------
****/
function SetMapLevel(vTargetLevel, pGraphic) {
    var maxLevel = map.getNumLevels() - 1;
    var targetLevel = vTargetLevel;
    if (targetLevel < 0) {
        targetLevel = 0;
    }
    else if (targetLevel > maxLevel) {
        targetLevel = maxLevel;
    }
    var numLevels = targetLevel - map.getLevel();
    var currentLevel = map.getLevel();
    var currentExtent = map.extent;
    var center = pGraphic.geometry;
    var size = map.__getExtentForLevel(currentLevel + numLevels, center, currentExtent).extent;


    ymax = currentExtent.ymax - ((size.getHeight() - currentExtent.getHeight()) * (center.y - currentExtent.ymax) / currentExtent.getHeight());

    xmin = currentExtent.xmin - ((size.getWidth() - currentExtent.getWidth()) * (center.x - currentExtent.xmin) / currentExtent.getWidth());

    targetExtent = new esri.geometry.Extent(xmin, ymax - size.getHeight(), xmin + size.getWidth(), ymax, map.spatialReference);
    map.setExtent(targetExtent);
}

function textTrim(txt) {
    return txt.replace(/(^\s*)|(\s*$)/g, "");
}

Date.prototype.GetMyString = function (i) {
    var pDate = new Date(i);
    var pMyString = pDate.getFullYear() + "/" + (pDate.getMonth() + 1) + "/" + pDate.getDay() + " " + pDate.getHours() + ":" + pDate.getMinutes() + ":" + pDate.getMilliseconds();
    return pMyString;
}

String.prototype.isCHS = function (i) {
    var pI = i;
    var reg = /^[A-Za-z]+$/;
    if (reg.test(i)) {//判断是否符合正则表达式{}
        pI = pI.toUpperCase();
    }

    //汉字
    if (this.charCodeAt(pI) > 255 || this.charCodeAt(pI) < 0)
        return "H";
        //字母
    else if (this.charCodeAt(pI) >= 65 && this.charCodeAt(pI) <= 90) {
        return "Z";
    }
        //数字
    else {
        return "S";
    }
    return false;
}
/***
*获取文字的宽度
****/
String.prototype.getWidth = function (fontSize) {
    var span = document.getElementById("__getwidth");
    if (span == null) {
        span = document.createElement("span");
        span.id = "__getwidth";
        document.body.appendChild(span);
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";
        span.style.fontFamily = "微软雅黑";
    }
    span.innerText = this;
    span.style.fontSize = fontSize + "px";
    return span.offsetWidth;
}

String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


/***
*获取url参数
****/
function GetRequest(vUrl, vName) {

    var url = vUrl; //获取url中"?"符后的字串

    var theRequest = new Object();

    if (url.indexOf("?") != -1) {

        var str = url.substr(1);

        strs = str.split("&");

        for (var i = 0; i < strs.length; i++) {

            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

        }

    }
    return theRequest[vName];

}
/**
*字符串处理函数
*去掉underfined,null,nan等
**/
function StOpe(vStr) {
    var pTem = (vStr == undefined || vStr == null) ? "--" : vStr;
    return pTem.toString();
}

/***
*设置日期格式。
*设置时间控件显示时间及格式
*返回当前时间
****/
function SetTime() {
    var pDate = new Date();
    var pM = pDate.getMinutes();
    pM = pM < 10 ? "0" + pM : pM;
    var pHour = pDate.getHours();
    pHour = pHour < 10 ? "0" + pHour : pHour;

    var pMonth = (pDate.getMonth() + 1);
    pMonth = pMonth < 10 ? "0" + pMonth : pMonth;
    var pDay = pDate.getDate();
    pDay = pDay < 10 ? "0" + pDay : pDay;

    //  var pStr = pDate.getFullYear() + "-" + pMonth + "-" + pDay + " " + pHour + ":" + pM + ":00";
    var pTem = pDate.getFullYear() + "-" + pMonth + "-" + pDay + " " + pHour + ":" + pM + ":00";
    //$("#spans").html(pStr);
    return pTem;
    //$("#" + vControl).attr("value", pTem);
    // $("#endtime").attr("value", pTem);
}

/*
*ajax请求数据通用方法，同步
*/
function MapGetDataByAjax(tURL, tDATA, tyb, data) {
    var asy = tyb;
    if (asy == undefined)
        asy = false;
    else {
        asy = true;
    }
    var rData = "";
    $.ajax({
        url: tURL,
        async: asy,
        //dataType: 'json',
        data: tDATA,
        cache: false,
        success: function (resp) {
            rData = resp;
            if (tyb == "weather") {
                var tCounty = data.a.split(",");
                var weather = eval("(" + resp + ")").results[0].weather_data;
                var wDataJson = {};
                wDataJson.w = weather;
                //注入从XML中读取的经纬度和天气网站的区县编码
                wDataJson.lat = parseFloat(tCounty[1]);
                wDataJson.lng = parseFloat(tCounty[2]);
                wDataJson.county = tCounty[0];
                wDataJson.code = tCounty[3];
                markWeatherOnMap(wDataJson, data.b);
            }
        },
        error: function (e) {
        }
    });
    return rData;
}

var timeHandle = {
    //获取前天、昨天、明天、后天、大后天等的日期
    GetDateStr: function (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期
        var d = dd.getDate();
        return y + "-" + this.cOTD(m) + "-" + this.cOTD(d);
    },
    //获取当前时间的时分秒
    getNowHMS: function () {
        var dd = new Date();
        var h = dd.getHours();
        var m = dd.getMinutes();//获取当前月份的日期
        var s = dd.getSeconds();
        return this.cOTD(h) + ":" + this.cOTD(m) + ":" + this.cOTD(s);
    },
    //如果时间某位的数字小于10，则追加0，比如5变成05
    cOTD: function (e) {
        var s = parseInt(e.toString()) < 10 ? ("0" + e) : e;
        return s;
    }
};

/* 
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* 返回精度为：秒，分，小时，天
*/
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}

//获取时间字符串
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}

String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

Array.prototype.indexOf = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
            return i;
        }
    }
    return -1;
}