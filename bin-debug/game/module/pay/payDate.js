var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var payDate = (function (_super) {
    __extends(payDate, _super);
    function payDate() {
        var _this = _super.call(this) || this;
        _this.payType = '1';
        _this._url = '';
        return _this;
    }
    payDate.ins = function () {
        return _super.ins.call(this);
    };
    return payDate;
}(BaseSystem));
__reflect(payDate.prototype, "payDate");
//# sourceMappingURL=payDate.js.map