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
var WJBattleChatItem = (function (_super) {
    __extends(WJBattleChatItem, _super);
    function WJBattleChatItem() {
        return _super.call(this) || this;
    }
    WJBattleChatItem.prototype.dataChanged = function () {
        this.msg.text = this.data;
    };
    return WJBattleChatItem;
}(BaseItemRender));
__reflect(WJBattleChatItem.prototype, "WJBattleChatItem");
//# sourceMappingURL=WJBattleChatItem.js.map