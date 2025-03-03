var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ErrorLog = (function () {
    function ErrorLog() {
        this.stackObj = { stack: "" };
    }
    ErrorLog.ins = function () {
        this._ins = this._ins || new ErrorLog();
        return this._ins;
    };
    ErrorLog.prototype.show = function (str) {
        var tapFun = function () {
            DisplayUtils.removeFromParent(this);
            this.removeTouchEvent(this['notBtn'], tapFun);
        };
        var view = new BaseView();
        view.skinName = 'ErrorSkin';
        view['notBtn'].addEventListener(egret.TouchEvent.TOUCH_TAP, tapFun, view);
        view['lab'].text = str;
        StageUtils.ins().getUIStage().addChild(view);
    };
    ErrorLog.Assert = function (expr, msg) {
        if (expr)
            return false;
        msg += ErrorLog.ins().getErrorStackInfo();
        if (LocationProperty.isLocation) {
            ErrorLog.ins().show(msg);
        }
        if (ErrorLog.httpLog && !LocationProperty.isLocation && ReportData) {
            ReportData.getIns().report("" + msg, ReportData.ERROR);
        }
        else {
            console.log(msg);
        }
        return true;
    };
    ErrorLog.prototype.getErrorStackInfo = function () {
        var info = "";
        try {
            Error['captureStackTrace'](this.stackObj, ErrorLog.Assert);
            info = "----" + this.stackObj.stack;
            this.stackObj.stack = "";
        }
        catch (e) {
            info = "";
        }
        return info;
    };
    ErrorLog.httpLog = true;
    return ErrorLog;
}());
__reflect(ErrorLog.prototype, "ErrorLog");
var Assert = ErrorLog.Assert;
window.onerror = function () {
    var info = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        info[_i] = arguments[_i];
    }
    var funName = '';
    var callPos = '';
    if (info[4] && info[4].stack) {
        var list = info[4].stack.split("at ");
        funName = list[1].split(" ")[0];
        for (var i = 2; i < list.length; i++) {
            var arr = list[i].split("/");
            callPos += arr[arr.length - 1];
        }
    }
    var str = "\u517C\u5BB9\u95EE\u9898\u65E0\u6CD5\u83B7\u53D6\u503C";
    var resultStr = "\u9519\u8BEF\u4FE1\u606F\uFF1A" + info[0] + "\n" +
        ("\u51FA\u9519\u4F4D\u7F6E\uFF1A" + info[2] + "\u884C" + (info[3] ? info[3] + "列" : str) + "\n") +
        ("\u51FA\u9519\u51FD\u6570\uFF1A" + funName + "\n") +
        ("\u51FD\u6570\u8C03\u7528\uFF1A" + callPos);
    if (resultStr.indexOf(str) >= 0)
        return;
    alert(resultStr);
    if (!LocationProperty.isLocation && ReportData)
        ReportData.getIns().report("" + resultStr, ReportData.ERROR);
    window["getClientVersion"](function (ver) {
        var v = parseInt(ver) || 0;
        if (v === LocationProperty.v || v === 0) {
        }
        else {
            location.reload();
        }
    });
};
//# sourceMappingURL=ErrorLog.js.map