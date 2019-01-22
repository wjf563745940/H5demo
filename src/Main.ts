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

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
     private img2: egret.Bitmap;
     private imgfirst: egret.Bitmap;
    private _arrayFirst: Array<any>;
    private _firstObj:Object;
      private _secondObj:Object;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
          let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let firstsky = this.createBitmapByName("2_jpg");
        this._firstObj={
            width:1175,
            heigth:933,
            fromw:152,
            fromh:260,
            fromx:880,
            fromy:148,
            tow:152*2,
            toh:260*2,
            tox:880-152,
            toy:148,
        }
        
        this._arrayFirst = [1175,933,152,260,880,148, 152*2, 260*2,880,148 ];
        this.addChild(firstsky);
        firstsky.width = this._firstObj['width']/this._firstObj['fromw'] * stageW ;
        firstsky.height =this._firstObj['heigth']/this._firstObj['fromh'] * stageH;
        firstsky.x=-this._firstObj['fromx']/this._firstObj['fromw']  * stageW;
        firstsky.y=-this._firstObj['fromy']/this._firstObj['fromh']* stageH;
        this.imgfirst=firstsky;
        
        console.log(firstsky.width)
        let sky = this.createBitmapByName("1_jpg");
         this._secondObj={
            width:sky['$sourceWidth'],
            heigth:sky['$sourceHeight'],
            fromw:sky['$sourceWidth'],
            fromh:sky['$sourceHeight'],
            fromx:0,
            fromy:0,
            tow:sky['$sourceWidth']*2,
            toh:sky['$sourceHeight']*2,
            tox:-sky['$sourceWidth'],
            toy:0,
        }
        this.addChild(sky);
        // sky.width = stageW/2;
        // sky.height = stageH/2;
        sky.width = this._secondObj['width']/this._secondObj['fromw'] * stageW ;
        sky.height =this._secondObj['heigth']/this._secondObj['fromh'] * stageH;
        sky.x=-this._secondObj['fromx']/this._secondObj['fromw']  * stageW;
        sky.y=-this._secondObj['fromy']/this._secondObj['fromh']* stageH;
        this.img2=sky;


        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        let button2 = new eui.Button();
        button2.label = "Click!2";
        button2.horizontalCenter = 100;
        button2.verticalCenter = 100;
        this.addChild(button2);
        button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick2, this);

//         var shape: egret.Shape = new egret.Shape();
//         shape.x = 100;
//         shape.y = 20;
//         shape.scaleX = 0.5; 
// shape.scaleY = 0.5;
// shape.alpha = 0.4;
// shape.rotation = 30;
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
       
        let count = -1;
        let imgx=0;
        let change = () => {
            count++;
            imgx-=10;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
             //img2.anchorOffsetX = imgx;
            
            // let tw2=egret.Tween.get(img2);
            // tw2.to({ "alpha": 1 }, 200);   
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 10);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 10);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
         let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
         let img2=this.img2;
         let imgfirst=this.imgfirst;

        let _firstObj=this._firstObj;
        egret.Tween.get(imgfirst).to({
            width:_firstObj['width']/_firstObj['tow']*stageW,
            height:_firstObj['heigth']/_firstObj['toh']*stageH,
             x:-_firstObj['tox']/_firstObj['tow']*stageW,
            y:-_firstObj['toy']/_firstObj['toh']*stageH,
        },800,egret.Ease.sineIn );

        let _secondObj=this._secondObj;
        egret.Tween.get(img2).to({
            width:_secondObj['width']/_secondObj['tow']*stageW,
            height:_secondObj['heigth']/_secondObj['toh']*stageH,
             x:-_secondObj['tox']/_secondObj['tow']*stageW,
            y:-_secondObj['toy']/_secondObj['toh']*stageH,
        },800,egret.Ease.sineIn );
        this.changeParams(this._firstObj,_firstObj['tow'],_firstObj['toh'],(_firstObj['tox']-_firstObj['fromw']*1.5),_firstObj['toy']);
         this.changeParams(this._secondObj,_secondObj['tow'],_secondObj['toh'],_secondObj['tox']-_secondObj['fromw']*1.5,0);
        // let panel = new eui.Panel();
        // panel.title = "Title";
        // panel.horizontalCenter = 0;
        // panel.verticalCenter = 0;
        // this.addChild(panel);
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick2(e: egret.TouchEvent) {
         let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
         let img2=this.img2;
         let imgfirst=this.imgfirst;

        let _firstObj=this._firstObj;
        egret.Tween.get(imgfirst).to({
            width:_firstObj['width']/_firstObj['tow']*stageW,
            height:_firstObj['heigth']/_firstObj['toh']*stageH,
             x:-_firstObj['tox']/_firstObj['tow']*stageW,
            y:-_firstObj['toy']/_firstObj['toh']*stageH,
        },800,egret.Ease.sineIn );

        let _secondObj=this._secondObj;
        egret.Tween.get(img2).to({
            width:_secondObj['width']/_secondObj['tow']*stageW,
            height:_secondObj['heigth']/_secondObj['toh']*stageH,
             x:-_secondObj['tox']/_secondObj['tow']*stageW,
            y:-_secondObj['toy']/_secondObj['toh']*stageH,
        },800,egret.Ease.sineIn );
        // let panel = new eui.Panel();
        // panel.title = "Title";
        // panel.horizontalCenter = 0;
        // panel.verticalCenter = 0;
        // this.addChild(panel);
    }
    private changeParams(obj,tow,toh,tox,toy){
        obj['fromw']=obj['tow'];
        obj['tow']=tow;
         obj['fromh']=obj['toh'];
        obj['toh']=toh;
         obj['fromx']=obj['tox'];
        obj['tox']=tox;
         obj['fromy']=obj['toy'];
        obj['toy']=toy;
    }
}
