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
var ChristmasDayWin = (function (_super) {
    __extends(ChristmasDayWin, _super);
    function ChristmasDayWin() {
        var _this = _super.call(this) || this;
        _this.activityPanelList = [];
        _this.skinName = "christmasDayWin";
        _this.isTopLevel = true;
        _this.selectIndex = 0;
        return _this;
    }
    ChristmasDayWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this._pageStyle = ActivityPageStyle.CHRISTMAS;
        this.menuList.itemRenderer = ActivityBtnRenderer;
    };
    ChristmasDayWin.prototype.checkIndexByActivityId = function (actId) {
        for (var i = 0; i < this.activityPanelList.length; i++) {
            if (this.activityPanelList[i].activityID == actId) {
                return i;
            }
        }
        return 0;
    };
    ChristmasDayWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        for (var k in Activity.ins().activityData) {
            if (Activity.ins().activityData[k] && Activity.ins().activityData[k].pageStyle != ActivityPageStyle.CHRISTMAS)
                continue;
            if (Activity.ins().getActivityDataById(+k).isOpenActivity()) {
                return true;
            }
        }
        UserTips.ins().showTips("|C:0xff0000&T:\u5F88\u9057\u61BE,\u6D3B\u52A8\u5DF2\u7ECF\u7ED3\u675F\u4E86");
        return false;
    };
    ChristmasDayWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.actId = param[0];
        this.updateView();
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.closeBtn0, this.onClick);
        this.addChangeEvent(this.menuList, this.onClickMenu);
        this.observe(Activity.ins().postActivityPanel, this.updatePanel);
        this.observe(Activity.ins().postActivityIsGetAwards, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRecharge, this.refushRedPoint);
        this.observe(Recharge.ins().postRechargeTotalDay, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRechargeEx, this.refushRedPoint);
        this.addChangeEvent(this.menuScroller, this.onChange);
    };
    ChristmasDayWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        for (var i = 0; i < this.activityPanelList.length; i++) {
            this.activityPanelList[i].close();
        }
    };
    ChristmasDayWin.prototype.refushRedPoint = function () {
        this.dataArr.replaceAll(this.BtnArr);
        this.menuList.dataProvider = this.dataArr;
    };
    ChristmasDayWin.prototype.updateView = function () {
        var index = 0;
        var i = 0;
        for (i = 0; i < this.viewStack.numElements; i++) {
            ObjectPool.push(this.viewStack.getElementAt(i));
        }
        this.viewStack.removeChildren();
        this.activityPanelList = [];
        this._datas = [];
        i = 0;
        for (var k in Activity.ins().activityData) {
            if (Activity.ins().activityData[k] && Activity.ins().activityData[k].pageStyle != this._pageStyle) {
                continue;
            }
            if (Activity.ins().getActivityDataById(+k).isOpenActivity()) {
                var data = Activity.ins().getbtnInfo(k);
                if (!ErrorLog.Assert(data, "christmas  data   " + k))
                    this._datas.push(data);
            }
        }
        this._datas.sort(this.sort);
        this.BtnArr = [];
        for (var k in this._datas) {
            var id = this._datas[k].id;
            var act = Activity.ins().getActivityDataById(+id);
            if (act && act.id == id) {
                var hide = act.getHide();
                if (!hide) {
                    var panel = ActivityPanel.create(id, act.activityType);
                    if (!panel)
                        continue;
                    panel.top = 0;
                    panel.left = 0;
                    panel.bottom = 0;
                    panel.right = 0;
                    this.activityPanelList[i] = panel;
                    this.viewStack.addChild(this.activityPanelList[i]);
                    this.BtnArr.push(this._datas[k]);
                    if (this.actId && this.actId == id) {
                        index = i;
                    }
                    i++;
                }
            }
        }
        this.dataArr = new eui.ArrayCollection(this.BtnArr);
        this.menuList.dataProvider = this.dataArr;
        this.onChange();
        if (this.viewStack.numElements > 0) {
            this.setOpenIndex(index);
        }
        this.viewStack.validateNow();
        this.menuList.validateNow();
        if (index >= 5) {
            var scrollH = 92 * index;
            if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                scrollH = this.menuList.contentWidth - this.menuScroller.width;
            }
            this.menuList.scrollH = scrollH;
        }
    };
    ChristmasDayWin.prototype.updatePanel = function (activityID) {
        for (var k in this.activityPanelList) {
            if (this.activityPanelList[k].activityID == activityID) {
                this.activityPanelList[k].updateData();
                break;
            }
        }
    };
    ChristmasDayWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    ChristmasDayWin.prototype.setOpenIndex = function (selectedIndex) {
        this.activityPanelList[selectedIndex].open();
        this.viewStack.selectedIndex = selectedIndex;
        this.menuList.selectedIndex = selectedIndex;
        Activity.ins().setPalyEffListById(this.activityPanelList[selectedIndex].activityID, true);
        this.refushRedPoint();
    };
    ChristmasDayWin.prototype.onClickMenu = function (e) {
        this.actId = 0;
        if (this.selectIndex != e.currentTarget.selectedIndex) {
            SoundUtil.ins().playEffect(SoundUtil.WINDOW);
            if (this.activityPanelList[this.selectIndex])
                this.activityPanelList[this.selectIndex].close();
        }
        this.selectIndex = e.currentTarget.selectedIndex;
        if (this.activityPanelList[this.selectIndex].activityID > 10000)
            this.setOpenIndex(this.selectIndex);
        else {
            var config = GlobalConfig.ActivityConfig[this.activityPanelList[this.selectIndex].activityID];
            if (config) {
                if (config.activityType == 3) {
                    this.setOpenIndex(this.selectIndex);
                }
                else {
                    this.setOpenIndex(this.selectIndex);
                }
            }
        }
    };
    ChristmasDayWin.prototype.ChangePageCallBack = function () {
        if (this.actId)
            this.selectIndex = this.checkIndexByActivityId(this.actId);
        this.setOpenIndex(this.selectIndex);
    };
    ChristmasDayWin.prototype.onChange = function () {
    };
    ChristmasDayWin.prototype.onTouchBtn = function (e) {
    };
    ChristmasDayWin.prototype.sort = function (a, b) {
        if (a.sort > b.sort)
            return 1;
        else if (a.sort < b.sort)
            return -1;
        else
            return 0;
    };
    return ChristmasDayWin;
}(BaseEuiView));
__reflect(ChristmasDayWin.prototype, "ChristmasDayWin");
ViewManager.ins().reg(ChristmasDayWin, LayerManager.UI_Main);
//# sourceMappingURL=ChristmasDayWin.js.map