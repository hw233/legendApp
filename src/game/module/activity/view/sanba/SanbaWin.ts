/**
 * Created by hrz on 2018/3/1.
 */

class SanbaWin extends BaseEuiView {

    public roleSelect: RoleSelectPanel;
    public viewStack: eui.ViewStack;
    public menuScroller: eui.Scroller;
    public menuList: eui.List;
    public closeBtn: eui.Button;
    public leftBtn0: eui.Button;
    public leftRed0: eui.Image;
    public rightBtn0: eui.Button;
    public rightRed0: eui.Image;


    public activityPanelList: any[] = [];
    private _datas: ActivityBtnConfig[];
    private dataArr: eui.ArrayCollection;

    private selectIndex: number = 0;

    public constructor() {
        super();
        this.skinName = "sanbaWin";
        this.isTopLevel = true;
    }

    public initUI(): void {
        super.initUI();
        this.menuList.itemRenderer = ActivityBtnRenderer;
    }

    public open(...param: any[]): void {
        this.updateView();

        this.addTouchEvent(this, this.onTouch);
        this.addChangeEvent(this.menuList, this.onClickMenu);
        this.addEvent(eui.UIEvent.CHANGE_END, this.menuScroller, this.onChange);
        this.observe(Activity.ins().postActivityIsGetAwards, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRecharge, this.refushRedPoint);
        this.observe(Recharge.ins().postRechargeTotalDay, this.refushRedPoint);
        //this.observe(Recharge.ins().postUpdateRechargeEx, this.refushRedPoint);
        //this.observe(UserBag.ins().postItemAdd, this.refushRedPoint);
        //this.observe(UserBag.ins().postItemChange, this.refushRedPoint);

        this.selectIndex = 0;
        if (param && param.length) {
            let id: number = param[0];
            let i: number = 0;
            for (let k in this._datas) {
                if (this._datas[k].id == id) {
                    this.selectIndex = i;
                    break;
                }

                i++;
            }
        }

        SoundUtil.ins().playEffect(SoundUtil.WINDOW);
        if (this.selectIndex != 0)
            this.activityPanelList[0].close();

        this.activityPanelList[this.selectIndex].open();
        this.viewStack.selectedIndex = this.selectIndex;
        this.menuList.selectedIndex = this.selectIndex;
        Activity.ins().setPalyEffListById(this.activityPanelList[this.selectIndex].activityID, true);
        this.onChange();
    }

    public close(): void {
        for (let i: number = 0; i < this.activityPanelList.length; i++) {
            this.activityPanelList[i].close();
        }
    }

    private onChange(): void {
        if (this.menuList.scrollH < 20) {
            this.leftBtn0.visible = false;
            this.rightBtn0.visible = true;
        } else if (this.menuList.scrollH > (this.menuList.dataProvider.length - 5) * 88 + 2) {
            this.leftBtn0.visible = true;
            this.rightBtn0.visible = false;
        } else {
            this.leftBtn0.visible = true;
            this.rightBtn0.visible = true;
        }

        this.leftRed0.visible = this.rightRed0.visible = false;
        let len: number = this.menuList.dataProvider.length;
        if (len <= 5) {
            this.leftBtn0.visible = false;
            this.rightBtn0.visible = false;
        }
        else {
            let curIndex: number = Math.floor(this.menuList.scrollH / 82) + 4;
            if (this.leftBtn0.visible) {
                for (let i: number = 0; i <= curIndex - 5; i++) {
                    if (Activity.ins().getActivityDataById(this._datas[i].id).canReward()) {
                        this.leftRed0.visible = true;
                        break;
                    }
                }
            }

            if (this.rightBtn0.visible) {
                for (let i: number = curIndex + 1; i < len; i++) {
                    if (Activity.ins().getActivityDataById(this._datas[i].id).canReward()) {
                        this.rightRed0.visible = true;
                        break;
                    }
                }
            }
        }
    }

    private updateView(): void {
        let i = 0;
        for (i = 0; i < this.viewStack.numElements; i++)
            ObjectPool.push(this.viewStack.getElementAt(i));

        this.viewStack.removeChildren();
        this.activityPanelList = [];
        this._datas = [];

        for (let k in Activity.ins().activityData) {
            if (Activity.ins().activityData[k].pageStyle == ActivityPageStyle.SANBA && Activity.ins().getActivityDataById(+k).isOpenActivity() && !Activity.ins().getActivityDataById(+k).getHide())
                this._datas.push(Activity.ins().getbtnInfo(k));
        }

        this._datas.sort(this.sort);

        i = 0;
        for (let k in this._datas) {
            let id: number = this._datas[k].id;
            let act: ActivityBaseData = Activity.ins().getActivityDataById(+id);
            let panel: ActivityPanel = ActivityPanel.create(id, act.activityType);
            panel.top = 0;
            panel.left = 0;
            panel.bottom = 0;
            panel.right = 0;
            this.activityPanelList[i] = panel;
            this.viewStack.addChild(this.activityPanelList[i]);
            i++;
        }

        this.dataArr = new eui.ArrayCollection(this._datas);
        this.menuList.dataProvider = this.dataArr;
        this.viewStack.validateNow();
        this.menuList.validateNow();
    }

    private refushRedPoint(): void {
        this.dataArr.replaceAll(this._datas);
        this.menuList.dataProvider = this.dataArr;
    }

    private sort(a: ActivityBtnConfig, b: ActivityBtnConfig): number {
        if (a.sort > b.sort)
            return 1;
        else if (a.sort < b.sort)
            return -1;
        else
            return 0;
    }

    private onTouch(e: egret.TouchEvent): void {
        let num: number = 92 * 5;
        let scrollH: number = 0;
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.leftBtn0:
                scrollH = this.menuList.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.menuList.scrollH = scrollH;
                this.onChange();
                break;
            case this.rightBtn0:
                scrollH = this.menuList.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                    scrollH = this.menuList.contentWidth - this.menuScroller.width;
                }
                this.menuList.scrollH = scrollH;
                this.onChange();
                break;
        }
    }

    /** 点击菜单列表 */
    private onClickMenu(e: egret.TouchEvent): void {
        if (this.selectIndex != e.currentTarget.selectedIndex) {
            SoundUtil.ins().playEffect(SoundUtil.WINDOW);
            this.activityPanelList[this.selectIndex].close();
        }
        else
            return;

        this.selectIndex = e.currentTarget.selectedIndex;
        this.activityPanelList[this.selectIndex].open();
        this.viewStack.selectedIndex = this.selectIndex;
        this.menuList.selectedIndex = this.selectIndex;
        Activity.ins().setPalyEffListById(this.activityPanelList[this.selectIndex].activityID, true);
    }

}

ViewManager.ins().reg(SanbaWin, LayerManager.UI_Main);