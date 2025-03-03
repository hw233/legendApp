var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseScene = (function () {
    function BaseScene() {
        this._layers = new Array();
    }
    BaseScene.prototype.onEnter = function () {
    };
    BaseScene.prototype.onExit = function () {
        ViewManager.ins().closeAll();
        this.removeAllLayer();
    };
    BaseScene.prototype.addLayer = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            StageUtils.ins().getStage().addChild(layer);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseEuiLayer) {
            StageUtils.ins().getUIStage().addChild(layer);
            this._layers.push(layer);
        }
    };
    BaseScene.prototype.addLayerAt = function (layer, index) {
        if (layer instanceof BaseSpriteLayer) {
            StageUtils.ins().getStage().addChildAt(layer, index);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseEuiLayer) {
            StageUtils.ins().getUIStage().addChildAt(layer, index);
            this._layers.push(layer);
        }
    };
    BaseScene.prototype.removeLayer = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            StageUtils.ins().getStage().removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
        else if (layer instanceof BaseEuiLayer) {
            StageUtils.ins().getUIStage().removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
    };
    BaseScene.prototype.layerRemoveAllChild = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            layer.removeChildren();
        }
        else if (layer instanceof BaseEuiLayer) {
            layer.removeChildren();
        }
    };
    BaseScene.prototype.removeAllLayer = function () {
        while (this._layers.length) {
            var layer = this._layers[0];
            this.layerRemoveAllChild(layer);
            this.removeLayer(layer);
        }
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map