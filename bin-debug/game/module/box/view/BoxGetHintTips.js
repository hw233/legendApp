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
var BoxGetHintTips = (function (_super) {
    __extends(BoxGetHintTips, _super);
    function BoxGetHintTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChestInformationSkin";
        _this.horizontalCenter = 0;
        _this.bottom = 0;
        return _this;
    }
    Object.defineProperty(BoxGetHintTips.prototype, "data", {
        set: function (type) {
            var boxCfg = GlobalConfig.TreasureBoxConfig[type];
            if (boxCfg) {
                this.information.text = "\u606D\u559C\u83B7\u5F97" + boxCfg.name;
                this.box.source = boxCfg.imgClose;
            }
        },
        enumerable: true,
        configurable: true
    });
    return BoxGetHintTips;
}(BaseView));
__reflect(BoxGetHintTips.prototype, "BoxGetHintTips");
//# sourceMappingURL=BoxGetHintTips.js.map