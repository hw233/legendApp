var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Algorithm = (function () {
    function Algorithm() {
    }
    Algorithm.sortAsc = function (b1, b2) {
        if (b1 < b2)
            return -1;
        else if (b1 > b2)
            return 1;
        else
            return 0;
    };
    Algorithm.sortAscAttr = function (obj1, obj2, attr) {
        var result;
        if (attr == undefined) {
            result = Algorithm.sortAsc(obj1, obj2);
        }
        else {
            var attr1 = obj1[attr];
            var attr2 = obj2[attr];
            if (attr1 < attr2) {
                result = -1;
            }
            else if (attr1 > attr2) {
                result = 1;
            }
            else {
                result = 0;
            }
        }
        return result;
    };
    Algorithm.sortDesc = function (b1, b2) {
        if (b1 > b2)
            return -1;
        else if (b1 < b2)
            return 1;
        else
            return 0;
    };
    Algorithm.sortDescAttr = function (obj1, obj2, attr) {
        var result;
        if (attr == undefined) {
            result = Algorithm.sortDesc(obj1, obj2);
        }
        else {
            var attr1 = obj1[attr];
            var attr2 = obj2[attr];
            if (attr1 > attr2) {
                result = -1;
            }
            else if (attr1 < attr2) {
                result = 1;
            }
            else {
                result = 0;
            }
        }
        return result;
    };
    Algorithm.binSearch = function (tab, item, binFunc) {
        if (binFunc === void 0) { binFunc = null; }
        if (!tab || tab.length == 0)
            return 0;
        if (!binFunc)
            binFunc = Algorithm.sortAsc;
        var low = 0;
        var high = tab.length - 1;
        while (low <= high) {
            var mid = (high + low) >> 1;
            var val = tab[mid];
            if (binFunc(val, item) <= 0) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return low;
    };
    Algorithm.test = function () {
        var arr = [];
        var MAX = 10;
        for (var i = 0; i < MAX; i++) {
            var r = Math.floor(Math.random() * 100000);
            var index = Algorithm.binSearch(arr, r);
            arr.splice(index, 0, r);
        }
        if (arr.length != MAX)
            debug.log("test fail!count is " + arr.length + ", except:" + MAX);
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var val = arr_1[_i];
            debug.log(val);
        }
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                debug.log("test fail!index:" + i);
                break;
            }
        }
    };
    return Algorithm;
}());
__reflect(Algorithm.prototype, "Algorithm");
//# sourceMappingURL=Algorithm.js.map