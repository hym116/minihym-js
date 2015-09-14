define('js/modules/pkgs/imgcut', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
/**
* 创建切割元素
* @author liuhy
* @return ImgCut.getPos() {JSON} {"x":切割范围距离左边的偏移量,
                            "y":切割范围距离上边的偏移量,
                            "width":切割范围的宽度,
                            "height":切割范围的高度,
                            "Zoom": 缩放比例
                            }
* @param container {htmlElement} 图片容器id
* @param drag {htmlElement} 切割容器id
* @param url {String} 被切割的图片的路径
* @param options {json} 其他配置
{
    Opacity:0.5, 透明度
    dragTop:0, 初始化时切割框距离左上角的宽度
    dragLeft:0, 初始化时切割框距离左上角的高度
    dragWidth:100, 初始化时切割框的宽度
    dragHeight:100, 初始化时切割框的高度
    Right:"", 右中拖拽点的css样式
    Left:"", 左中拖拽点的css样式
    Up:"", 上中拖拽点的css样式
    Down:"", 下中拖拽点的css样式
    RightDown:"", 右下拖拽点的css样式
    LeftDown:"", 左下拖拽点的css样式
    RightUp:"", 右上拖拽点的css样式
    LeftUp:"", 左上拖拽点的css样式
    Scale:false, 是否等比例缩放
    View:"", 预览区域的id－－字符串
    viewWidth:100, 预览区域的宽度
    viewHeight:100 预览区域的高度
}
* @example 
//给新建new IZZ.APP.ImgCut对象，传入容器div，dragDiv,传入要切割的图片的路径，以及容器的高度和宽度
var ic = new IZZ.APP.ImgCut("bgDiv", "dragDiv", "1.jpg",  {
    dragTop: 50, dragLeft: 50,dragWidth:100,dragHeight:150,Scale:true,
    Right: "rRight", Left: "rLeft", Up:    "rUp", Down: "rDown",
    RightDown: "rRightDown", LeftDown: "rLeftDown", RightUp: "rRightUp", LeftUp: "rLeftUp",
    View:[{viewId:"viewDiv", viewWidth: 160, viewHeight: 160},
          {viewId:"viewDiv1", viewWidth: 320, viewHeight: 320}]
})
function  aa(){
alert(IZZ.JSON.stringify(ic.getPos()));
}
* 
*/
var $ = require("jquery");

$.ImgCut=function(container,drag,url,options){
    var oCut=this;
    var isIE = !-[1,];
    var Class={
            create:function(){
                return function(){
                this.initialize.apply(this,arguments);
            }
        }
    };
    Object.extend=function(destination,source){
        for(var property in source){
            destination[property]=source[property]; 
        }
        return destination;
    };
    var Drag=Class.create();
    
    Drag.prototype={
        initialize:function(obj,drag,options){
            var oThis=this;
            this._obj=obj;
            this.Drag=drag;
            this._x=this._y=0;
            this._fM=function(e){oThis.Move(window.event||e);};
            this._fS=function(){oThis.Stop();};
            this.SetOptions(options);
            this.Limit=!!this.options.Limit;
            this.mxLeft=parseInt(this.options.mxLeft);
            this.mxRight=parseInt(this.options.mxRight);
            this.mxTop=parseInt(this.options.mxTop);
            this.mxBottom=parseInt(this.options.mxBottom);
            this.onMove=this.options.onMove;
            this._obj.css("position","absolute");
            this.Drag.mousedown(function(e){oThis.Start(e);});
        },
        SetOptions:function(options){
            this.options={
                Limit:false,
                mxLeft:0,
                mxRight:0,
                mxTop:0,
                mxBottom:0,
                onMove:function(){}
            };
            Object.extend(this.options,options||{});
        },
        Start:function(oEvent){
            this._x=oEvent.clientX-this._obj[0].offsetLeft;
            this._y=oEvent.clientY-this._obj[0].offsetTop;
            $(document).unbind("mousemove",window.mouseUpEventFS);
            $(document).unbind("mouseup",window.mouseUpEvent);
            $(document).unbind("mousemove",window.mouseMoveEvent);

            window.mouseMoveEvent=this._fM;$(document).mousemove(this._fM);
            window.mouseUpEvent=this._fS;$(document).mouseup(this._fS);
            if(isIE){
                this.Drag[0].detachEvent("losecapture",this._fS);
                this.Drag[0].setCapture();
            }else{
                $(window).blur(this._fS);
            }
        },
        Move:function(oEvent){
            window.getSelection&&window.getSelection().removeAllRanges();
            var iLeft=oEvent.clientX-this._x,iTop=oEvent.clientY-this._y;
            if(this.Limit){
                var iRight=iLeft+this._obj[0].offsetWidth-this.mxRight,iBottom=iTop+this._obj[0].offsetHeight-this.mxBottom;
                if(iRight>0)iLeft-=iRight;
                if(iBottom>0)iTop-=iBottom;
                if(this.mxLeft>iLeft)iLeft=this.mxLeft;
                if(this.mxTop>iTop)iTop=this.mxTop;
            }
            this._obj.css({"left":iLeft+"px","top":iTop+"px"});
            this.onMove();
        },
        Stop:function(){
            $(document).unbind("mousemove",window.mouseMoveEvent);
            $(document).unbind("mouseup",window.mouseUpEvent);
            if(isIE){
                this.Drag[0].detachEvent("losecapture",this._fS);
                this.Drag[0].releaseCapture();
            }else{
                $(window).unbind("blur",this._fS);
            }
        }
    };
    var Resize=Class.create();
    Resize.prototype={
        initialize:function(obj,options){
            var oThis=this;
            this._obj=obj;
            this._right=this._down=this._left=this._up=0;
            this._scale=1;
            this._touch=null;
            var _style=this._obj[0].currentStyle||document.defaultView.getComputedStyle(this._obj[0],null);
            this._xBorder=parseInt(_style.borderLeftWidth)+parseInt(_style.borderRightWidth);
            this._yBorder=parseInt(_style.borderTopWidth)+parseInt(_style.borderBottomWidth);
            this._fR=function(e){oThis.Resize(e);}
            this._fS=function(){oThis.Stop();}
            this.SetOptions(options);
            this.Limit=!!this.options.Limit;
            this.mxLeft=parseInt(this.options.mxLeft);
            this.mxRight=parseInt(this.options.mxRight);
            this.mxTop=parseInt(this.options.mxTop);
            this.mxBottom=parseInt(this.options.mxBottom);
            this.MinWidth=parseInt(this.options.MinWidth);
            this.MinHeight=parseInt(this.options.MinHeight);
            this.Scale=!!this.options.Scale;
            this.onResize=this.options.onResize;
            this._obj.css("position","absolute");
        },
        SetOptions:function(options){
            this.options={
                Limit:false,
                mxLeft:0,
                mxRight:0,
                mxTop:0,
                mxBottom:0,
                MinWidth:50,
                MinHeight:50,
                Scale:false,
                onResize:function(){}
            };
            Object.extend(this.options,options||{});
        },
        Set:function(resize,side){
            var oThis=this,resize=$("#"+resize),_fun,_cursor;
            if(resize.length==0)return;
            switch(side.toLowerCase()){
            case"up":
                _fun=function(e){if(oThis.Scale){oThis.scaleUpRight(e);}else{oThis.SetUp(e);}};
                _cursor="n-resize";
                break;
            case"down":
                _fun=function(e){if(oThis.Scale){oThis.scaleDownRight(e);}else{oThis.SetDown(e);}};
                _cursor="n-resize";
                break;
            case"left":
                _fun=function(e){if(oThis.Scale){oThis.scaleLeftUp(e);}else{oThis.SetLeft(e);}};
                _cursor="e-resize";
                break;
            case"right":
                _fun=function(e){if(oThis.Scale){oThis.scaleRightDown(e);}else{oThis.SetRight(e);}};
                _cursor="e-resize";
                break;
            case"left-up":
                _fun=function(e){if(oThis.Scale){oThis.scaleLeftUp(e);}else{oThis.SetLeft(e);oThis.SetUp(e);}};
                _cursor="nw-resize";
                break;
            case"right-up":
                _fun=function(e){if(oThis.Scale){oThis.scaleRightUp(e);}else{oThis.SetRight(e);oThis.SetUp(e);}};
                _cursor="ne-resize";
                break;
            case"left-down":
                _fun=function(e){if(oThis.Scale){oThis.scaleLeftDown(e);}else{oThis.SetLeft(e);oThis.SetDown(e);}};
                _cursor="ne-resize";
                break;
            case"right-down":
            default:
                _fun=function(e){if(oThis.Scale){oThis.scaleRightDown(e);}else{oThis.SetRight(e);oThis.SetDown(e);}};
                _cursor="nw-resize";
            }
            resize.css("cursor",_cursor);
            resize.mousedown(function(e){oThis._fun=_fun;oThis._touch=resize;oThis.Start(e);});
        },
        Start:function(oEvent,o){
            oEvent.stopPropagation();

            this.style_width=this._obj[0].offsetWidth;
            this.style_height=this._obj[0].offsetHeight;
            this.style_left=this._obj[0].offsetLeft;
            this.style_top=this._obj[0].offsetTop;
            
            if(this.Scale){this._scale=this.style_width/this.style_height;}
            this._left=oEvent.clientX-this.style_width;
            this._right=oEvent.clientX+this.style_width;
            this._up=oEvent.clientY-this.style_height;
            this._down=oEvent.clientY+this.style_height;
            if(this.Limit){
                this._mxRight=this.mxRight-this._obj[0].offsetLeft;
                this._mxDown=this.mxBottom-this._obj[0].offsetTop;
                this._mxLeft=this.mxLeft+this.style_width+this._obj[0].offsetLeft;
                this._mxUp=this.mxTop+this.style_height+this._obj[0].offsetTop;
            }
            
            $(document).unbind("mousemove",window.mouseMoveEventFR);
            $(document).unbind("mousemove",window.mouseMoveEvent);
            $(document).unbind("mouseup",window.mouseUpEventFS);

            window.mouseMoveEventFR=this._fR;$(document).mousemove(this._fR);
            window.mouseUpEventFS=this._fS;$(document).mouseup(this._fS);
            if(isIE){
                this._touch[0].detachEvent("losecapture",this._fS);
                this._touch[0].setCapture();
            }else{
                $(window).blur(this._fS);
            }
        },
        Resize:function(e){
            if(!this._touch)return;
            window.getSelection&&window.getSelection().removeAllRanges();
            this._fun(window.event||e);
            this._obj.css({"width":this.style_width-this._xBorder+"px","height":this.style_height-this._yBorder+"px","top":this.style_top+"px","left":this.style_left+"px"});
            this.onResize();
        },
        SetRight:function(oEvent){
            this.repairRight(oEvent.clientX-this._left);
        },
        SetDown:function(oEvent){
            this.repairDown(oEvent.clientY-this._up);
        },
        SetLeft:function(oEvent){
            this.repairLeft(this._right-oEvent.clientX);
        },
        SetUp:function(oEvent){
            this.repairUp(this._down-oEvent.clientY);
        },
        scaleRightDown:function(oEvent){
            this.SetRight(oEvent);
            this.repairDown(parseInt(this.style_width/this._scale));
            this.repairRight(parseInt(this.style_height*this._scale));
        },
        scaleLeftDown:function(oEvent){
            this.SetLeft(oEvent);
            this.repairDown(parseInt(this.style_width/this._scale));
            this.repairLeft(parseInt(this.style_height*this._scale));
        },
        scaleRightUp:function(oEvent){
            this.SetRight(oEvent);
            this.repairUp(parseInt(this.style_width/this._scale));
            this.repairRight(parseInt(this.style_height*this._scale));
        },
        scaleLeftUp:function(oEvent){
            this.SetLeft(oEvent);
            this.repairUp(parseInt(this.style_width/this._scale));
            this.repairLeft(parseInt(this.style_height*this._scale));
        },
        scaleDownRight:function(oEvent){
            this.SetDown(oEvent);
            this.repairRight(parseInt(this.style_height*this._scale));
            this.repairDown(parseInt(this.style_width/this._scale));
        },
        scaleUpRight:function(oEvent){
            this.SetUp(oEvent);
            this.repairRight(parseInt(this.style_height*this._scale));
            this.repairUp(parseInt(this.style_width/this._scale));
        },
        repairRight:function(iWidth){
            if(iWidth<this.MinWidth){iWidth=this.MinWidth;}
            if(this.Limit&&iWidth>this._mxRight){iWidth=this._mxRight;}
            this.style_width=iWidth;
        },
        repairDown:function(iHeight){
            if(iHeight<this.MinHeight){iHeight=this.MinHeight;}
            if(this.Limit&&iHeight>this._mxDown){iHeight=this._mxDown;}
            this.style_height=iHeight;
        },
        repairLeft:function(iWidth){
            if(iWidth<this.MinWidth){iWidth=this.MinWidth;}
            else if(this.Limit&&iWidth>this._mxLeft){iWidth=this._mxLeft;}
            this.style_width=iWidth;
            this.style_left=this._obj[0].offsetLeft+this._obj[0].offsetWidth-iWidth;
        },
        repairUp:function(iHeight){
            if(iHeight<this.MinHeight){iHeight=this.MinHeight;}
            else if(this.Limit&&iHeight>this._mxUp){iHeight=this._mxUp;}
            this.style_height=iHeight;
            this.style_top=this._obj[0].offsetTop+this._obj[0].offsetHeight-iHeight;
        },
        Stop:function(){
            $(document).unbind("mousemove",window.mouseMoveEventFR);
            $(document).unbind("mouseup",window.mouseUpEventFS);
            $(document).unbind("mouseup",window.mouseUpEvent);
            if(isIE){
                this._touch[0].detachEvent("losecapture",this._fS);
                this._touch[0].releaseCapture();
            }else{
                $(document).unbind("blur",this._fS);
            }
            this._touch=null;
        }
    };
    var ImgCropper=Class.create();
    ImgCropper.prototype={
        initialize:function(container,drag,url,options){
            var oThis=this;
            this.Container=$("#"+container);
            this.Container.css({"position":"relative","overflow":"hidden"});
            this.Drag=$("#"+drag);
            this.Drag.css({"cursor":"move","z-index":200});
            if(isIE){
                this.Drag[0].style.overflow="hidden";
                var obj=$("<div>");
                obj.width("100%").height("100%").css({"background-color":"#fff","filter":"alpha(opacity:0)"});
                this.Drag.append(obj);
            }
            
            var oldImgs=this.Container.find("img");
            
            if(oldImgs && oldImgs.length>0){
                for(var i=oldImgs.length-1;i>=0;i--){
                $(oldImgs[i]).remove();
                }
            }
            var oldCanvass=this.Container.find("canvas");
            if(oldCanvass && oldCanvass.length>0){
                for(var i=oldCanvass.length-1;i>=0;i--){
                    $(oldCanvass).remove();
                }
            }
            this.Container.append(this._pic=$("<img />"));
            this.Container.append(this._cropper=$("<img  />"));
            this._pic[0].style.position=this._cropper[0].style.position="absolute";
            this._pic[0].style.top=this._pic[0].style.left=this._cropper[0].style.top=this._cropper[0].style.left="0";
            this.Url=url;
            this._pic.load(function(){
                oThis.Init(options)
                });
            this._pic.attr("src",url);
            //if(isIE){
//              this._pic.onload=new function(){oThis.Init(options)};
//          }else{
//              this._pic.onload=function(){oThis.Init(options)};
//          }
            
        },
        SetOptions:function(options){
            this.options={
                Opacity:0.5,
                dragTop:0,
                dragLeft:0,
                dragWidth:100,
                dragHeight:100,
                Right:"",
                Left:"",
                Up:"",
                Down:"",
                RightDown:"",
                LeftDown:"",
                RightUp:"",
                LeftUp:"",
                Scale:false,
                View:"",
                viewWidth:100,
                viewHeight:100
            };
            Object.extend(this.options,options||{});
        },
        Init:function(options){
            var oThis=this;
            this.Width=parseInt(this._pic.width());
            this.Height=parseInt(this._pic.height());
            //this.Width=parseInt(width);
            //this.Height=parseInt(height);
            this._cropper[0].style.zIndex=100;
            this._cropper.load(function(){oThis.SetPos();});
            this.SetOptions(options);
            this.Opacity=this.options.Opacity;
            this.dragTop=parseInt(this.options.dragTop);
            this.dragLeft=parseInt(this.options.dragLeft);
            this.dragWidth=parseInt(this.options.dragWidth);
            this.dragHeight=parseInt(this.options.dragHeight);
            if(this.options.View){
                this.View=[];
                this._view=[];
                for(var i=0;i<this.options.View.length;i++){
                    this.View[i]=$("#"+this.options.View[i].viewId);
                    this.View[i].attr("viewWidth",parseInt(this.options.View[i].viewWidth));
                    this.View[i].attr("viewHeight",parseInt(this.options.View[i].viewHeight));
                    this._view[i]=null;
                    if(this.View[i]){
                        this.View[i].css({"position":"relative","overflow":"hidden"});
                        var oldImg=this.View[i].find("img");
                        if(oldImg && oldImg.length>0){
                            oldImg.remove();
                        }
                        var canvassImg=this.View[i].find("canvas");
                        if(canvassImg && canvassImg.length>0){
                            canvassImg.remove();
                        }
                        this.View[i].append(this._view[i]=$("<img />"));
                        this._view[i].attr("src",this.Url);
                        this._view[i].css("position","absolute");
                    }
                }
            }
            this.Scale=this.options.Scale;
            this._drag=new Drag(this.Drag,this.Drag,{Limit:true,onMove:function(){oThis.SetPos();}});
            this._resize=this.GetResize();
            this.InitOther();
        },
        InitOther:function(){
            var oThis=this;
            var Container_parent = this.Container.parent();
            var parent_width = Container_parent.width();
            var parent_height = Container_parent.height();
            var img_width = oThis.Width;
            var img_height = oThis.Height;

            var whratio = img_width / img_height;

            if ( img_width / img_height > parent_width / parent_height) {
                //横图
                this.Width = parent_width;
                this.Height = parent_width / whratio;
            }else{
                //竖图
                this.Width = parent_height * whratio;
                this.Height = parent_height;
            };

            this.Container.css({"width":this.Width+"px","height":this.Height+"px"});
            this.Drag.css({"top":this.dragTop+"px","left":this.dragLeft+"px","width":this.dragWidth+"px","height":this.dragHeight+"px"});
            this._cropper.css({"width":this.Width+"px","height":this.Height+"px"}).attr("src",this.Url);
            this._pic.css({"width":this.Width+"px","height":this.Height+"px","opacity":this.Opacity});
            //if(this.View){this._view.src=this.Url;}
            this._drag.mxRight=this.Width;this._drag.mxBottom=this.Height;
            if(this._resize){this._resize.mxRight=this.Width;this._resize.mxBottom=this.Height;this._resize.Scale=this.Scale;}
        },
        GetResize:function(){
            var op=this.options;
            if(op.RightDown||op.LeftDown||op.RightUp||op.LeftUp||op.Right||op.Left||op.Up||op.Down){
            var resOp={Limit:true,onResize:function(){oThis.SetPos();},MinWidth:op.MinWidth,MinHeight:op.MinHeight}
            var oThis=this,_resize=new Resize(this.Drag,resOp);
            if(op.RightDown){_resize.Set(op.RightDown,"right-down");}
            if(op.LeftDown){_resize.Set(op.LeftDown,"left-down");}
            if(op.RightUp){_resize.Set(op.RightUp,"right-up");}
            if(op.LeftUp){_resize.Set(op.LeftUp,"left-up");}
            if(op.Right){_resize.Set(op.Right,"right");}
            if(op.Left){_resize.Set(op.Left,"left");}
            if(op.Up){_resize.Set(op.Up,"up");}
            if(op.Down){_resize.Set(op.Down,"down");}
                return _resize;
            }else{
                return null;
            }
        },
        SetPos:function(){
            var o=this.Drag[0];
            this._cropper.css("clip","rect("+o.offsetTop+"px "+(o.offsetLeft+o.offsetWidth)+"px "+(o.offsetTop+o.offsetHeight)+"px "+o.offsetLeft+"px)");
            if(this.View && this.View.length>0){
                this.PreView();
            }
        },
        GetPos:function(){
            var o=this.Drag[0];
            var v=this.View;
            var zoom=1;
            if(this.options.viewWidth/this.options.viewHeight < o.offsetWidth/o.offsetHeight){
                zoom=this.options.viewWidth/o.offsetWidth;
            }else{
                zoom=this.options.viewHeight/o.offsetHeight;
            }
            return {x:o.offsetLeft,y:o.offsetTop,width:o.offsetWidth,height:o.offsetHeight,angle:this.angle,Zoom:zoom}
        },
  
        PreView:function(){
            var o=this.Drag[0];
            
            for(var i=0;i<this.View.length;i++){
                var h=parseInt(this.View[i].attr("viewWidth"));
                var w=h*(o.offsetWidth-2)/(o.offsetHeight-2);
                if(w>parseInt(this.View[i].attr("viewHeight"))){
                    w=parseInt(this.View[i].attr("viewHeight"));
                    h=w*(o.offsetHeight-2)/(o.offsetWidth-2);
                }
                
                var scale=h/(o.offsetHeight-2);
                var ph=this.Height*scale;
                var pw=this.Width*scale;
                var pt=o.offsetTop*scale;
                var pl=o.offsetLeft*scale;
                var styleView=this._view[i][0].style;
                //this._view[i].width=pw;this._view[i].height=ph;
                //alert(this._view[i].angle);
                if(isIE || !this._view[i].attr("angle") ||this._view[i].attr("angle")%180==0){
                    styleView.width=pw+"px";styleView.height=ph+"px";
                }else{
                    styleView.width=ph+"px";styleView.height=pw+"px";
                }
                styleView.top=-pt+"px ";styleView.left=-pl+"px";
                styleView.clip="rect("+pt+"px "+(pl+w)+"px "+(pt+h)+"px "+pl+"px)";
            }
        }
    }
    this.angle=0;
    this.setCanvas=function(obj,costheta,sintheta,rotation,angle){
        obj=obj[0];
        var canvas = document.createElement('canvas'); 
            if (!obj.oImage) { 
                canvas.oImage = new Image(); 
                canvas.oImage.src = obj.src; 
                canvas.style.opacity=obj.style.opacity;
                canvas.style.position=obj.style.position;
                canvas.style.zIndex=obj.style.zIndex
                canvas.style.clip=obj.style.clip;
            } else { 
                canvas = obj; 
            } 
            canvas.style.width = canvas.width = Math.abs(costheta*canvas.oImage.width) + Math.abs(sintheta*canvas.oImage.height); 
            canvas.style.height = canvas.height = Math.abs(costheta*canvas.oImage.height) + Math.abs(sintheta*canvas.oImage.width); 
            //canvas.clip="rect(10 10 20 20)";
            var context = canvas.getContext('2d'); 
            context.save(); 
            if (rotation <= Math.PI/2) { 
                context.translate(sintheta*canvas.oImage.height,0); 
            } else if (rotation <= Math.PI) { 
                context.translate(canvas.width,-costheta*canvas.oImage.height); 
            } else if (rotation <= 1.5*Math.PI) { 
                context.translate(-costheta*canvas.oImage.width,canvas.height); 
            } else { 
                context.translate(0,-sintheta*canvas.oImage.width); 
            } 
            context.rotate(rotation); 
            context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height); 
            context.restore(); 
            canvas.angle =angle;
            canvas.id = obj.id; 
            //obj.parentNode.replaceChild(canvas, obj); 
            //obj=canvas;
            return canvas;
    }
    this.rotate=function(angle,whence){
        
        if (!whence) { 
        this.angle = (this.angle + angle) % 360; 
        } else { 
        this.angle = angle; 
        } 
        if (this.angle >= 0) { 
        var rotation = Math.PI * this.angle / 180; } else { var rotation = Math.PI * (360+this.angle) / 180; 
        } 
        var costheta = Math.cos(rotation); 
        var sintheta = Math.sin(rotation); 
        if(this.angle % 180!=0){
            this.ic.Container.width(this.ic.Height+'px');
            this.ic.Container.height(this.ic.Width+'px');
            this.ic._drag.mxRight=this.ic.Height;
            this.ic._drag.mxBottom=this.ic.Width;
        }else{
            this.ic.Container.width(this.ic.Width+'px');
            this.ic.Container.height(this.ic.Height+'px');
            this.ic._drag.mxRight=this.ic.Width;
            this.ic._drag.mxBottom=this.ic.Height;
        }
        if (document.all && !window.opera) {
            
            var turnFilter="progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
            this.ic._pic[0].style.filter = "alpha(opacity:50) "+turnFilter ; 
            this.ic._cropper[0].style.filter = turnFilter;
            for(var i=0;i<this.ic.View.length;i++){
                this.ic._view[i][0].style.filter = turnFilter;
            }
        
        } else { 
        
            var canvasPic=this.setCanvas(this.ic._pic,costheta,sintheta,rotation,this.angle);
            this.ic._pic[0].parentNode.replaceChild(canvasPic, this.ic._pic[0]); 
            this.ic._pic=$(canvasPic);
            var canvasCropper=this.setCanvas(this.ic._cropper,costheta,sintheta,rotation,this.angle);
            this.ic._cropper[0].parentNode.replaceChild(canvasCropper, this.ic._cropper[0]); 
            this.ic._cropper=$(canvasCropper);
            for(var i=0;i<this.ic.View.length;i++){
                var canvasView=this.setCanvas(this.ic._view[i],costheta,sintheta,rotation,this.angle);
                this.ic._view[i][0].parentNode.replaceChild(canvasView, this.ic._view[i][0]); 
                this.ic._view[i]=$(canvasView);
            }
            
            
        }
        
        this.ic.Drag[0].style.top='20px';
        this.ic.Drag[0].style.left='20px';
        this.ic.SetPos();

        //this.ic._cropper.style.left=0+'px';
        //this.ic._cropper.style.top=0+'px';
        //canvas.id = p.id; 
        //canvas.angle = p.angle; 
        //p.parentNode.replaceChild(canvas, p); 
    }
    this.ic=new ImgCropper(container,drag,url,options);
    this.getPos=function(){
        var returnObj=this.ic.GetPos();
        returnObj.angle=this.angle;
        return returnObj;
    }
    
}
});