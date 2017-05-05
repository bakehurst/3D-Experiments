/* 
    Created on : 24 avr. 2017, 10:23:46
    Author     : Brian Akehurst
*/

var baNS = baNS || {};

baNS.spaceTest = (function() {

var model = {
    objects : {
        cube   : {
            id:"cube",
            div:null,
            container:null,
            x:0,
            y:0,
            width:400,
            height:400,
            depth:400,
            perspective:0,
            originX:0,
            originY:0,
            rotateX:0,
            rotateY:0,            
            rotateZ:0,
            hidden:false,
            style : function() {
                this.container.style.display = this.hidden ? "none" : "block";
                var text = "";
                text += "width: "+this.width+"px; ";
                text += "height: "+this.height+"px; ";                
                text += "transform: translate("+this.x+"px, "+this.y+"px) ";
                text += "rotateX("+this.rotateX+"deg) ";
                text += "rotateY("+this.rotateY+"deg) ";
                text += "rotateZ("+this.rotateZ+"deg); ";                
                text += "perspective: "+this.perspective+"px; ";
                text += "perspective-origin: "+this.originX+"px "+this.originY+"px; ";
                return text;
            }            
        },      
        paddle    : {
            id: "paddle",
            div:null,
            x:150,
            y:150,
            z:0,
            width:300,
            height:300,           
            rotateX:0,
            rotateY:0,
            rotateZ:0,
            style: function() {
                var text = "";
                text += "width: "+this.width+"px; ";
                text += "height: "+this.height+"px; ";
                text += "transform: translate3d("+this.x+"px, "+this.y+"px, "+this.z+"px) ";
                text += "rotateX("+this.rotateX+"deg) ";
                text += "rotateY("+this.rotateY+"deg) ";
                text += "rotateZ("+this.rotateZ+"deg); ";
                return text;                 
            }
        }       
    },
    faces : {
        front:{
            div:null,
            width:function(){return model.objects.cube.width;},
            height:function(){return model.objects.cube.height;},            
            x:function(){return 0;},
            y:function(){return 0;},
            z:function(){return model.objects.cube.depth/2;},
            rotateX:0,
            rotateY:0,
            rotateZ:0          
        },
        back:{
            div:null,
            width:function(){return model.objects.cube.width;},
            height:function(){return model.objects.cube.height;},            
            x:function(){return 0;},
            y:function(){return 0;},
            z:function(){return -model.objects.cube.depth/2;},            
            rotateX:0,
            rotateY:180,
            rotateZ:0            
        },
        right:{
            div:null,
            width:function(){return model.objects.cube.depth;},
            height:function(){return model.objects.cube.height;},           
            x:function(){return model.objects.cube.width - model.objects.cube.depth/2;},
            y:function(){return 0;},
            z:function(){return 0;},
            rotateX:0,
            rotateY:90,
            rotateZ:0            
        },
        left:{
            div:null,
            width:function(){return model.objects.cube.depth;},
            height:function(){return model.objects.cube.height;},            
            x:function(){return -model.objects.cube.depth/2;},
            y:function(){return 0;},
            z:function(){return 0;},
            rotateX:0,
            rotateY:-90,
            rotateZ:0         
        },
        top:{
            div:null,
            width:function(){return model.objects.cube.width;},
            height:function(){return model.objects.cube.depth;},           
            x:function(){return 0;},
            y:function(){return -model.objects.cube.depth/2;},
            z:function(){return 0;},            
            rotateX:90,
            rotateY:0,
            rotateZ:0          
        },
        bottom:{
            div:null,
            width:function(){return model.objects.cube.width;},
            height:function(){return model.objects.cube.depth;},      
            x:function(){return 0;},
            y:function(){return model.objects.cube.height -
                        model.objects.cube.depth/2;},            
            z:function(){return 0;},
            rotateX:-90,
            rotateY:0,
            rotateZ:0       
        }
    }    
};

    var animate = (function() {
        var animates = {
            paddleY : function(go) {
                var paddle = model.objects.paddle; 
                if(go) {
                    paddle.rotateY += 0.25;
                    style("paddle");
                }
                else {
                    paddle.rotateY = 0;
                    style("paddle"); 
                }
            },
            paddleX : function(go) {
                var paddle = model.objects.paddle; 
                if(go) {
                    paddle.rotateX += 0.25;
                    style("paddle");
                }
                else {
                    paddle.rotateX = 0;
                    style("paddle"); 
                }
            },
            paddleZ : function(go) {
                var paddle = model.objects.paddle; 
                if(go) {
                    paddle.rotateZ += 0.25;
                    style("paddle");
                }
                else {
                    paddle.rotateZ = 0;
                    style("paddle"); 
                }
            }, 
            cubeY : function(go) {
                var cube = model.objects.cube; 
                if(go) {
                    cube.rotateY += 0.25;
                    style("cube");
                }
                else {
                    cube.rotateY = 0;
                    style("cube"); 
                }
           },
           cubeX : function(go) {
                var cube = model.objects.cube; 
                if(go) {
                    cube.rotateX += 0.25;
                    style("cube");
                }
                else {
                    cube.rotateX = 0;
                    style("cube"); 
                }
           },
           cubeZ : function(go) {
                var cube = model.objects.cube; 
                if(go) {
                    cube.rotateZ += 0.25;
                    style("cube");
                }
                else {
                    cube.rotateZ = 0;
                    style("cube"); 
                }
           }           
        };        
        var requestID = null;
        var func = null;
        function cancel() {
            window.cancelAnimationFrame(requestID);
            requestID = null;
            animates[func](false);
            func = null;
        };
        function animation() {
            requestID = window.requestAnimationFrame(animation);
            animates[func](true);
        };
        return {
            go : function (type){
                if(func !== null) {
                    cancel();
                }
                else {
                    if(animates.hasOwnProperty(type)) {
                        func = type;
                        animation();
                    }
                }              
            }
        };
    })();   

    var buttons = {
        animate : {
            button : null,
            handler : function() {
               animate.go(selects.animSelect.type);
               //animate.go("paddleY");
            }
        }
    };
    
    var selects = {
        cssSelect : {
            span : null,
            select : null,
            handler: function(){
                var text = "Inline css: ";
                if(this.selectedIndex === undefined) return;
                var value = this.options[this.selectedIndex].value;
                if(value) {
                    value = JSON.parse(value);
                    text += model[value.el][value.obj].div.getAttribute("style"); 
                }
                selects.cssSelect.span.textContent = text; 
            }
        },
        animSelect : {
            select: null,
            type : "paddleY",
            handler : function() {
                if(this.selectedIndex === undefined) return;
                selects.animSelect.type =  
                        this.options[this.selectedIndex].value;
            }
        }
    };
    
    function style(id) {
         function facesStyle() {
            function style(face) {
                var text = "";
                text += "width: "+face.width()+"px; ";
                text += "height: "+face.height()+"px; ";
                text += "transform: translate3d("+face.x()+"px, "+
                        face.y()+"px, "+face.z()+"px) ";
                text += "rotateX("+face.rotateX+"deg) ";
                text += "rotateY("+face.rotateY+"deg) ";
                text += "rotateZ("+face.rotateZ+"deg); ";
                return text;

            }
            for(var side in model.faces) {
                var face = model.faces[side];
                face.div.setAttribute("style",style(face));
                selects.cssSelect.handler.call(selects.cssSelect.select);                
            }           
        };       
        var obj = model.objects[id];        
        obj.div.setAttribute("style",obj.style());
        selects.cssSelect.handler.call(selects.cssSelect.select);
        if(id === "cube") {
            facesStyle();
        } 
    };    
 
    function changeHandler(e) {
        var obj = model.objects[this.parentNode.id];
        var val = this.value;    
        if(obj.hasOwnProperty(this.name)) {
            obj[this.name] = parseInt(val);
            if(this.type === "checkbox") {
                obj[this.name] = this.checked;;
            }              
        }
        if(e !== undefined) {
            style(this.parentNode.id);
        }              
    };
    
    function addListeners(div) {
        var inputs = div.querySelectorAll("input");
        for(var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if(input.type === "button") {
                buttons[input.name].button = input;
                buttons[input.name].button.addEventListener(
                        "click",buttons[input.name].handler,false);              
            }
            else {
                changeHandler.call(input);
                input.addEventListener("change",changeHandler,false); 
            }
        }
        style(div.id);
    };
    
    function addSelectListeners() {
        var controls = document.querySelectorAll("select");
        for(var i = 0; i < controls.length; i++) {
            selects[controls[i].name].select = controls[i];
            controls[i].addEventListener(
                    "change",selects[controls[i].name].handler,false);
        }
    };
    
    function setFaceDivs(surround) {
        var walls = surround.querySelectorAll(" .face");
        for(var i = 0; i < walls.length; i++) {
            var w = walls[i];
            var id = w.className.replace("face","").trim();
            model.faces[id].div = w;
        }
    };
        
    function init(){
        selects.cssSelect.span = document.querySelector("#style");
        addSelectListeners();
        model.objects.cube.div = document.querySelector(".cube");
        model.objects.cube.container = model.objects.cube.div.querySelector("#surround");
        model.objects.paddle.div = model.objects.cube.div.querySelector(".paddle");
        setFaceDivs(model.objects.cube.container);                
        addListeners(document.querySelector("#cube"));        
        addListeners(document.querySelector("#paddle"));    
    };
    
    return {
        init:init
    };
})();
