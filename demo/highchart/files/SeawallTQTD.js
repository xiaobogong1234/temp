var bm = '';
var zh = '';
var stimes = [];
var colors = [];
var colorList = ["#0000FF", "#00FFFF", "#00FF00", "#FF00FF", "#FFFF00"];
$(function () {
    bm = GetRequest(window.location.search, "bm");//桩号
    bm='E330109061';
    $('#cc').combo({
        required: true,
        editable: false,
        multiple: true
    });
    $('#sp').appendTo($('#cc').combo('panel'));
    $('#sp input').click(function () {
        var v = $(this).val();
        var s = $(this).next('span').text();
        $('#cc').combo('setValue', v).combo('setText', s).combo('hidePanel');
    });
    InitZh();
    loadTimes();
});

var zhArr = [];
var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: zTreeOnCheck2
    }

};

function InitZh() {
    $.ajax({
        url: "http://qtjfc.qgj.cn/MapQGJ/QGJService.ashx?Method=getPileNoBySeawallID&swId=" + bm,
        type: 'GET',
        dataType: 'json',
        error: function (x, e) {

        },
        success: function (response) { //回调函数，result，返回值
            if (response != "[]") {
                var json = response;
                if (json != null && json.length > 0) {
                    for (var i = 0; i < json.length; i++) {
                        var obj = json[i];
                        var jsonObj = { id: obj.Pile_No, pId: 0, name: obj.Pile_No };
                        zhArr.push(jsonObj);
                        if (i == 0) {
                            zh = obj.Pile_No;
                            loadTimes();
                        }
                    }
                } else {

                }
                $.fn.zTree.init($("#contactsTree_area"), setting, zhArr);
            }
        }
    });
}

function loadTimes() {
    $.ajax({
        url: "http://qtjfc.qgj.cn/MapQGJ/QGJService.ashx?Method=GetZhTimes",
        type: 'GET',
        data: { "zh": zh },
        dataType: 'json',
        error: function (x, e) {

        },
        success: function (response) { //回调函数，result，返回值
            if (response != []) {
                var json = response;
                var tableString = '';
                var curSel = '';
                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                    if (i < json.length - 1) {
                        tableString += '<input type="checkbox" name="lang" value="' + obj.Observation_Time + '" /><span>' + obj.Observation_Time + '</span><br />';
                    } else {
                        tableString += '<input type="checkbox" checked="checked" name="lang" value="' + obj.Observation_Time + '" /><span>' + obj.Observation_Time + '</span><br />';
                        stimes.push(obj.Observation_Time);
                        curSel = obj.Observation_Time;
                    }
                }
                $("#stime").html(tableString);
                $('#sp').appendTo($('#cc').combo('panel'));
                $('#sp input').click(function () {
                    var v = $(this).val();
                    var s = $(this).next('span').text();
                    var isChecked = this.checked;
                    if (isChecked) {
                        stimes.push(s);
                        addChart(stimes.length, s);
                    } else {
                        stimes.remove(s);
                        removeChart(s);
                    }
                    $('#cc').combo('setValue', v).combo('setText', s).combo('hidePanel');
                });
            }

            loadChart();
        }
    });
}

function changeTime() {
    addChart();
}

function loadChart() {
    if (stimes && stimes.length > 0) {
        var selectedTime = stimes[0];

        $.ajax({
            url: "http://qtjfc.qgj.cn/MapQGJ/QGJService.ashx?Method=GetZhData",
            type: 'GET',
            data: { "zh": zh, "stime": selectedTime },
            dataType: 'json',
            error: function (x, e) {

            },
            success: function (response) { //回调函数，result，返回值
                if (response) {
                    var data = response;
                    if (data && data.length > 0) {
                        //var alarmValue = data[0].Critical_Scour_Altitude;   //警戒值
                        var statdata1 = [];
                        var statdata2 = [];
                        for (var i = 0; i < data.length; i++) {
                            var alt1 = [];
                            alt1.push(data[i].Distance);
                            alt1.push(data[i].Beach_Altitude);
                            var alt2 = [];
                            alt2.push(data[i].Distance);
                            alt2.push(data[i].Critical_Scour_Altitude);
                            statdata1.push(alt1);
                            statdata2.push(alt2);
                        }
                        $('#container').highcharts({
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: '塘前滩地演变图'
                            },
                            //subtitle: {
                            //    text: 'Source: WorldClimate.com'
                            //},
                            xAxis: {
                                type: 'int',
                                title: {
                                    text: '距离(m)'
                                }
                            },
                            yAxis: {
                                title: {
                                    text: '高程(m)'
                                }
                            },
                            tooltip: {
                                //enabled: false,
                                //formatter: function () {
                                //    return '<b>' + this.series.name + '</b><br>' + this.x + ': ' + this.y + '';
                                //}
                                valueSuffix: 'm'
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: false
                                    },
                                    enableMouseTracking: true
                                }
                            },
                            series: [{
                                name: '警戒线',
                                data: statdata2,
                                color: "#ff0000"
                            }, {
                                name: selectedTime.substring(2),
                                data: statdata1,
                                color: "#0000FF"
                            }]
                        });
                        //记录已绘制的
                        stimes.push(selectedTime);
                        colors.push(0);
                    }
                }
            }
        });
    }
}

function addChart(num, stime) {
    if (stime && stime.length > 0) {
        var series = {};

        $.ajax({
            url: "http://qtjfc.qgj.cn/MapQGJ/QGJService.ashx?Method=GetZhData",
            type: 'GET',
            data: { "zh": zh, "stime": stime },
            dataType: 'json',
            error: function (x, e) {
                //alert(x);
            },
            success: function (response) { //回调函数，result，返回值
                if (response) {
                    var data = response;
                    if (data && data.length > 0) {
                        //var alarmValue = data[0].Critical_Scour_Altitude;   //警戒值
                        var statdata = [];
                        for (var i = 0; i < data.length; i++) {
                            var alt = [];
                            alt.push(data[i].Distance);
                            alt.push(data[i].Beach_Altitude);
                            statdata.push(alt);
                        }
                        var color = colorList[num];
                        if (colors.indexOf(num) == -1) {
                            color = colorList[num];
                            colors.push(num);
                        } else {
                            color = colorList[num + 1];
                            colors.push(num + 1);
                        }

                        series = {
                            name: stime.substring(2),
                            data: statdata,
                            color: color
                        };
                        var chart = $('#container').highcharts();
                        chart.addSeries(series);
                        stimes.push(stime);
                    }
                }
            }
        });
    }
}

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function removeChart(stime) {
    var chart = $('#container').highcharts();
    var color = "";
    for (var i = 0; i < chart.series.length; i++) {
        var series = chart.series[i];
        if (series.name == stime.substring(2)) {
            color = series.color;
            chart.series[i].remove();
            break;
        }
    }
    stimes.remove(stime);
    for (var i = 0; i < colorList.length; i++) {
        if (color == colorList[i]) {
            colors.remove(i);
            break;
        }
    }
}

function zTreeOnCheck2(event, treeId, treeNode) {
    var name = treeNode.name;
    zh = name;
    stimes = [];
    colors = [];
    loadTimes();
}
function QueryString() {
    var name, value, i;
    var str = location.href;
    var num = str.indexOf("?")
    str = str.substr(num + 1);
    var arrtmp = str.split("&");
    for (i = 0; i < arrtmp.length; i++) {
        num = arrtmp[i].indexOf("=");
        if (num > 0) {
            name = arrtmp[i].substring(0, num);
            value = arrtmp[i].substr(num + 1);
            this[name] = value;
        }
    }
}
