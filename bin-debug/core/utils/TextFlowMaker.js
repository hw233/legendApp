var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextFlowMaker = (function () {
    function TextFlowMaker() {
    }
    TextFlowMaker.generateTextFlow = function (sourceText) {
        if (!sourceText) {
            return new egret.HtmlTextParser().parser("");
        }
        var textArr = sourceText.split("|");
        var str = "";
        var result;
        for (var i = 0, len = textArr.length; i < len; i++) {
            str += TextFlowMaker.getSingleTextFlow1(textArr[i]);
        }
        try {
            result = new egret.HtmlTextParser().parser(str);
        }
        catch (e) {
            console.log("错误的HTML输入");
            return new egret.HtmlTextParser().parser("");
        }
        return result;
    };
    TextFlowMaker.generateTextFlow1 = function (sourceText) {
        if (!sourceText) {
            return new egret.HtmlTextParser().parser("");
        }
        var textArr = sourceText.split("|");
        var result = [];
        for (var i = 0, len = textArr.length; i < len; i++) {
            var ele = TextFlowMaker.getSingleTextFlow(textArr[i]);
            if (ele.text && ele.text != "")
                result.push(ele);
        }
        return result;
    };
    TextFlowMaker.getSingleTextFlow1 = function (text) {
        var arrText = text.split("&T:", 2);
        if (arrText.length == 2) {
            var str = "<font";
            var textArr = arrText[0].split("&");
            var tempArr = void 0;
            var t = void 0;
            var underline = false;
            for (var i = 0, len = textArr.length; i < len; i++) {
                tempArr = textArr[i].split(":");
                switch (tempArr[0]) {
                    case TextFlowMaker.STYLE_SIZE:
                        str += " size=\"" + Math.floor(+tempArr[1]) + "\"";
                        break;
                    case TextFlowMaker.STYLE_COLOR:
                        str += " color=\"" + Math.floor(+tempArr[1]) + "\"";
                        break;
                    case TextFlowMaker.UNDERLINE_TEXT:
                        underline = true;
                        break;
                }
            }
            if (underline) {
                str += "><u>" + arrText[1] + "</u></font>";
            }
            else {
                str += ">" + arrText[1] + "</font>";
            }
            return str;
        }
        else {
            return '<font>' + text + '</font>';
        }
    };
    TextFlowMaker.getSingleTextFlow = function (text) {
        var arrText = text.split("&T:", 2);
        var textFlow = { "style": {} };
        if (arrText.length == 2) {
            var style = arrText[0];
            var textArr = text.split("&");
            var tempArr = void 0;
            for (var i = 0, len = textArr.length; i < len; i++) {
                tempArr = textArr[i].split(":");
                switch (tempArr[0]) {
                    case TextFlowMaker.STYLE_SIZE:
                        textFlow.style.size = +(tempArr[1]);
                        break;
                    case TextFlowMaker.STYLE_COLOR:
                        textFlow.style.textColor = +(tempArr[1]);
                        break;
                    case TextFlowMaker.UNDERLINE_TEXT:
                        textFlow.style.underline = true;
                        break;
                    case TextFlowMaker.EVENT:
                        textFlow.style.href = "event:" + tempArr[1];
                        break;
                }
            }
            textFlow.text = arrText[1];
        }
        else {
            textFlow.text = text;
        }
        return textFlow;
    };
    TextFlowMaker.getCStr = function (num) {
        if (TextFlowMaker.numberList[num]) {
            return TextFlowMaker.numberList[num];
        }
        else {
            return "";
        }
    };
    TextFlowMaker.STYLE_COLOR = "C";
    TextFlowMaker.STYLE_SIZE = "S";
    TextFlowMaker.PROP_TEXT = "T";
    TextFlowMaker.UNDERLINE_TEXT = "U";
    TextFlowMaker.EVENT = "E";
    TextFlowMaker.numberList = ["零", '一', '二', '三', '四', '五', '六', '七', '八', '九',
        '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];
    return TextFlowMaker;
}());
__reflect(TextFlowMaker.prototype, "TextFlowMaker");
//# sourceMappingURL=TextFlowMaker.js.map