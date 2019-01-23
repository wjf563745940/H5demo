//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.initImg = function (obj, obj2) {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var firstsky = this.createBitmapByName(obj.url);
        this._firstObj = obj.params;
        this.nextArrays = obj.nextAni;
        this.nextArray = obj.nextAni[0];
        firstsky.width = this._firstObj['width'] / this._firstObj['fromw'] * stageW;
        firstsky.height = this._firstObj['height'] / this._firstObj['fromh'] * stageH;
        firstsky.x = -this._firstObj['fromx'] / this._firstObj['fromw'] * stageW;
        firstsky.y = -this._firstObj['fromy'] / this._firstObj['fromh'] * stageH;
        this.imgfirst = firstsky;
        this.addChild(this.imgfirst);
        var sky = this.createBitmapByName(obj2.url);
        this._secondObj = obj2.params;
        sky.width = this._secondObj['width'] / this._secondObj['fromw'] * stageW;
        sky.height = this._secondObj['height'] / this._secondObj['fromh'] * stageH;
        sky.x = -this._secondObj['fromx'] / this._secondObj['fromw'] * stageW;
        sky.y = -this._secondObj['fromy'] / this._secondObj['fromh'] * stageH;
        this.img2 = sky;
        this.addChild(this.img2);
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        //this.removeChild(this.ing)
        this.initImg({
            url: '2_jpg',
            params: {
                width: 1175,
                height: 933,
                fromw: 152,
                fromh: 260,
                fromx: 880,
                fromy: 148,
                tow: 152 * 2,
                toh: 260 * 2,
                tox: 880 - 152,
                toy: 148,
            },
            nextAni: [[152 * 2, 260 * 2, 600, 148], [false, 930, 307, 0]]
        }, {
            url: '1_jpg',
            params: {
                width: 543,
                height: 932,
                fromw: 543,
                fromh: 932,
                fromx: 0,
                fromy: 0,
            }
        });
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        var button2 = new eui.Button();
        button2.label = "Click!2";
        button2.horizontalCenter = 100;
        button2.verticalCenter = 100;
        this.addChild(button2);
        button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick2, this);
        var button3 = new eui.Button();
        button3.label = "Click!3";
        button3.horizontalCenter = 200;
        button3.verticalCenter = 200;
        this.addChild(button3);
        button3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick3, this);
        var button4 = new eui.Button();
        button4.label = "next!3";
        button4.horizontalCenter = 0;
        button4.verticalCenter = 300;
        this.addChild(button4);
        button4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick4, this);
        //         var shape: egret.Shape = new egret.Shape();
        //         shape.x = 100;
        //         shape.y = 20;
        //         shape.scaleX = 0.5; 
        // shape.scaleY = 0.5;
        // shape.alpha = 0.4;
        // shape.rotation = 30;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var imgx = 0;
        var change = function () {
            count++;
            imgx -= 10;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            //img2.anchorOffsetX = imgx;
            // let tw2=egret.Tween.get(img2);
            // tw2.to({ "alpha": 1 }, 200);   
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 10);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 10);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var img2 = this.img2;
        var imgfirst = this.imgfirst;
        var _firstObj = this._firstObj;
        var _secondObj = this._secondObj;
        var wdefbp = _firstObj['tow'] / _firstObj['fromw'];
        var hdefbp = _firstObj['toh'] / _firstObj['fromh'];
        var xdefbp = (_firstObj['formx'] - _firstObj['tox']) * (_secondObj['fromw'] / _firstObj['fromw']);
        var ydefbp = (_firstObj['formy'] - _firstObj['toy']) * (_secondObj['fromh'] / _firstObj['fromh']);
        egret.Tween.get(imgfirst).to({
            width: _firstObj['width'] / _firstObj['tow'] * stageW,
            height: _firstObj['height'] / _firstObj['toh'] * stageH,
            x: -_firstObj['tox'] / _firstObj['tow'] * stageW,
            y: -_firstObj['toy'] / _firstObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        egret.Tween.get(img2).to({
            width: _secondObj['width'] / _secondObj['fromw'] * wdefbp * stageW,
            height: _secondObj['height'] / _secondObj['fromh'] * hdefbp * stageH,
            x: -(_secondObj['fromx'] - xdefbp) / _secondObj['tow'] * stageW,
            y: -(_secondObj['fromy'] - ydefbp) / _secondObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        // this.nextArray=[152*2,260*2,320,148];
        var defb = this.nextArray[1] / _firstObj['toh'];
        var xdefb = (_firstObj['tox'] - this.nextArray[2]) / _firstObj['tow'];
        var ydefb = (_firstObj['toy'] - this.nextArray[3]) / _firstObj['toh'];
        this.changeParams(this._firstObj, _firstObj['tow'] * defb, _firstObj['toh'] * defb, (_firstObj['tox'] - _firstObj['tow'] * xdefb), (_firstObj['toy'] - _firstObj['toh'] * ydefb));
        this.changeParams(this._secondObj, _secondObj['tow'] * defb, _secondObj['toh'] * defb, (_secondObj['tox'] - _secondObj['tow'] * xdefb), (_secondObj['toy'] - _secondObj['toh'] * ydefb));
        this.nextArray = this.nextArrays[1];
        // let panel = new eui.Panel();
        // panel.title = "Title";
        // panel.horizontalCenter = 0;
        // panel.verticalCenter = 0;
        // this.addChild(panel);
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick2 = function (e) {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var img2 = this.img2;
        var imgfirst = this.imgfirst;
        var _firstObj = this._firstObj;
        egret.Tween.get(imgfirst).to({
            width: _firstObj['width'] / _firstObj['tow'] * stageW,
            height: _firstObj['height'] / _firstObj['toh'] * stageH,
            x: -_firstObj['tox'] / _firstObj['tow'] * stageW,
            y: -_firstObj['toy'] / _firstObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        var _secondObj = this._secondObj;
        egret.Tween.get(img2).to({
            width: _secondObj['width'] / _secondObj['tow'] * stageW,
            height: _secondObj['height'] / _secondObj['toh'] * stageH,
            x: -_secondObj['tox'] / _secondObj['tow'] * stageW,
            y: -_secondObj['toy'] / _secondObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        // let defb=_firstObj['height']/ _firstObj['toh'];
        // let hb=_firstObj['toy']/_firstObj['height'];
        // let xdefb=(_firstObj['tox']-(_firstObj['width']-_firstObj['tow']*defb)/2)/_firstObj['width'];
        // this.changeParams(this._firstObj,_firstObj['tow']*defb,_firstObj['toh']*defb,(_firstObj['tox']-_firstObj['fromw']*1),(_firstObj['toy']-_firstObj['toh']*hb));
        //  this.changeParams(this._secondObj,_secondObj['tow']*defb,_secondObj['toh']*defb,_secondObj['tox']-_secondObj['fromw']*1,(_secondObj['toy']-_secondObj['toh']*hb));
        var defb = this.nextArray[1] / _firstObj['toh'];
        var xdefb = (_firstObj['tox'] - this.nextArray[2]) / _firstObj['tow'];
        var ydefb = (_firstObj['toy'] - this.nextArray[3]) / _firstObj['toh'];
        this.changeParams(this._firstObj, _firstObj['tow'] * defb, _firstObj['toh'] * defb, (_firstObj['tox'] - _firstObj['tow'] * xdefb), (_firstObj['toy'] - _firstObj['toh'] * ydefb));
        this.changeParams(this._secondObj, _secondObj['tow'] * defb, _secondObj['toh'] * defb, (_secondObj['tox'] - _secondObj['tow'] * xdefb), (_secondObj['toy'] - _secondObj['toh'] * ydefb));
    };
    /**
   * 点击按钮
   * Click the button
   */
    Main.prototype.onButtonClick3 = function (e) {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var img2 = this.img2;
        var imgfirst = this.imgfirst;
        var _firstObj = this._firstObj;
        egret.Tween.get(imgfirst).to({
            width: _firstObj['width'] / _firstObj['tow'] * stageW,
            height: _firstObj['height'] / _firstObj['toh'] * stageH,
            x: -_firstObj['tox'] / _firstObj['tow'] * stageW,
            y: -_firstObj['toy'] / _firstObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        var _secondObj = this._secondObj;
        egret.Tween.get(img2).to({
            width: _secondObj['width'] / _secondObj['tow'] * stageW,
            height: _secondObj['height'] / _secondObj['toh'] * stageH,
            x: -_secondObj['tox'] / _secondObj['tow'] * stageW,
            y: -_secondObj['toy'] / _secondObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        var defb = _firstObj['height'] / _firstObj['toh'];
    };
    Main.prototype.onButtonClick4 = function (e) {
        if (true) {
            this.removeChild(this.img2);
            this.removeChild(this.imgfirst);
            var lastObj = this._firstObj;
            this.initImg({
                url: '3_jpg',
                params: {
                    width: 482,
                    height: 930,
                    fromw: 32,
                    fromh: 58,
                    fromx: 393,
                    fromy: 286,
                    tow: 32 * 3,
                    toh: 58 * 3,
                    tox: 375,
                    toy: 286,
                },
                nextAni: [[152 * 2, 260 * 2, 600, 148], [false, 930, 307, 0]]
            }, {
                url: '2_jpg',
                params: {
                    width: lastObj['width'],
                    height: lastObj['height'],
                    fromw: lastObj['tow'],
                    fromh: lastObj['toh'],
                    fromx: lastObj['tox'],
                    fromy: lastObj['toy'],
                    tow: lastObj['tow'] * 3,
                    toh: lastObj['toh'] * 3,
                    tox: 0,
                    toy: 0,
                }
            });
        }
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var img2 = this.img2;
        var imgfirst = this.imgfirst;
        var _firstObj = this._firstObj;
        egret.Tween.get(imgfirst).to({
            width: _firstObj['width'] / _firstObj['tow'] * stageW,
            height: _firstObj['height'] / _firstObj['toh'] * stageH,
            x: -_firstObj['tox'] / _firstObj['tow'] * stageW,
            y: -_firstObj['toy'] / _firstObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        var _secondObj = this._secondObj;
        egret.Tween.get(img2).to({
            width: _secondObj['width'] / _secondObj['tow'] * stageW,
            height: _secondObj['height'] / _secondObj['toh'] * stageH,
            x: -_secondObj['tox'] / _secondObj['tow'] * stageW,
            y: -_secondObj['toy'] / _secondObj['toh'] * stageH,
        }, 800, egret.Ease.sineIn);
        var defb = _firstObj['height'] / _firstObj['toh'];
    };
    Main.prototype.changeParams = function (obj, tow, toh, tox, toy) {
        obj['fromw'] = obj['tow'];
        obj['tow'] = tow;
        obj['fromh'] = obj['toh'];
        obj['toh'] = toh;
        obj['fromx'] = obj['tox'];
        obj['tox'] = tox;
        obj['fromy'] = obj['toy'];
        obj['toy'] = toy;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
