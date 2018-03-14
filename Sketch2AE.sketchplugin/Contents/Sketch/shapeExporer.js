//暂不支持：渐变、underlying mask、分组、镜像、描边位置
//not surpported feature: gradient, underlying mask, group, mirror, stroke position
@import "../Resources/Localization.js"

var shapeExport = function(context) {
    var doc = context.document;
    //var version = context.plugin.version();
    var artboards = doc.currentPage().artboards();
    if(!doc.fileName()){
        NSApplication.sharedApplication().displayDialog_withTitle(local_saveDoc, local_warning);
    }
    var docName = doc.fileName().substring(doc.fileName().lastIndexOf("."),doc.fileName().lastIndexOf("/")+1);

    //读取混合模式forAE
    //get blend mode
    function getBlendModeForAE(blendModeCode){
        var AEblendMode;
        switch (blendModeCode) {
            case 0://normal
            AEblendMode = "1"; 
                break;
            case 1://darken
            AEblendMode = "3"; 
                break;
            case 2://multiply
            AEblendMode = "4"; 
                break;
            case 3://color burn
            AEblendMode = "5"; 
                break;
            case 4://lighten
            AEblendMode = "9"; 
                break;
            case 5://screen
            AEblendMode = "10"; 
                break;
            case 6://color dodge
            AEblendMode = "11"; 
                break;
            case 7://overlay
            AEblendMode = "15"; 
                break;
            case 8://soft light
            AEblendMode = "16"; 
                break;
            case 9://hard light
            AEblendMode = "17"; 
                break;
            case 10://difference'
            AEblendMode = "23"; 
                break;
            case 11://EXCLUSION
            AEblendMode = "24"; 
                break;
            case 12://hue
            AEblendMode = "26"; 
                break;
            case 13://SATURATION
            AEblendMode = "27"; 
                break;
            case 14://color
            AEblendMode = "28"; 
                break;
            case 15://luminosity
                AEblendMode = "29"; 
                break;
            default:
            AEblendMode = "1"; 
                break;
        };
        return AEblendMode;
    }

    //读取颜色
    // get color info
    function getColorInfo(color){
        var cInfo = [color.red(),color.green(),color.blue(),color.alpha()];
        return cInfo;
    }

    //读取渐变(shouldSmoothenOpacity()方法有问题)
    // get gradient info
    function getGradientInfo(gradient){
        var gInfo = {
                "gradientType":gradient.gradientType(),
                //1 - linear;2 - Radial;3 - Angular
                "elipseLength":gradient.elipseLength(),
                "from":[gradient.from().x,gradient.from().y],
                "to":[gradient.to().x,gradient.to().y],
                //"shouldSmoothenOpacity":gradient.shouldSmoothenOpacity(),
                "gradientPointStops":[],
                "gradientColors":[]
        }
        for(var i=0;i<gradient.stops().length;i++){
            gInfo.gradientPointStops.push(
                gradient.stops()[i].position()
            );
            gInfo.gradientColors.push(getColorInfo(gradient.stops()[i].color()));
        }
        return gInfo;
    }

    //读取描边
    //get border info
    function getBorderInfo(style){
        var border = [];
        if(style.borders().length>0){
            for(var i=0;i<style.borders().length;i++){
                border.push({
                    "strokeEnabled":style.borders()[i].isEnabled(),
                    "strokeWith":style.borders()[i].thickness(),
                    "strokePosition":style.borders()[i].position(),
                    //postition:0 - center; 1 - inside; 2 - outside;
                    "miterLimit":style.miterLimit(),
                    "strokeEndType":style.borderOptions().lineCapStyle(),
                    "strokeJointType":style.borderOptions().lineJoinStyle(),
                    "strokeStartArrow":style.startDecorationType(),
                    "strokeEndArrow":style.endDecorationType(),
                    "strokeDashPattern":style.borderOptions().dashPattern(),
                    "strokeType":style.borders()[i].fillType(),
                    //0 - color;1 - gradient
                    "strokeColor":getColorInfo(style.borders()[i].color()),
                    "strokeBlending":getBlendModeForAE(style.borders()[i].contextSettings().blendMode()),
                    "strokeOpacity":getColorInfo(style.borders()[i].color())[3]*100,
                    "strokeGradient":getGradientInfo(style.borders()[i].gradient())
                });
            }
        }
        return border;
    }

    //读取填充
    //get fill info
    function getFillInfo(style){
        var fill = [];
        if(style.fills().length>0){
            for(var i=0;i<style.fills().length;i++){
                fill.push({
                    "fillEnabled":style.fills()[i].isEnabled(),
                    "noiseIndex":style.fills()[i].noiseIndex(),
                    "fillType":style.fills()[i].fillType(),
                    //0 - color;1 - gradient
                    "patternFillType":style.fills()[i].patternFillType(),
                    "patternTileScale":style.fills()[i].patternTileScale(),
                    "fillImage":{},
                    "fillColor":getColorInfo(style.fills()[i].color()),
                    "fillGradient":getGradientInfo(style.fills()[i].gradient()),
                    "fillBlending":getBlendModeForAE(style.fills()[i].contextSettings().blendMode()),
                    "fillOpacity":getColorInfo(style.fills()[i].color())[3]*100
                }); 
            }
        }
        return fill;
    }

    //读取投影
    //get shadow info
    function getShadowInfo(style){
        var shadow = [];
        if(style.shadows().length>0){
            for(var i=0;i<style.shadows().length;i++){
                shadow.push({
                    "blurRadius":style.shadows()[i].blurRadius(),
                    "blurEnable":style.shadows()[i].isEnabled(),
                    "offsetX":style.shadows()[i].offsetX(),
                    "offsetY":style.shadows()[i].offsetY(),
                    "spread":style.shadows()[i].spread(),
                    "shadowBlending":getBlendModeForAE(style.shadows()[i].contextSettings().blendMode()),
                    "shadowOpacity":style.shadows()[i].contextSettings().opacity()*100
                });
            }
        }
        return shadow;
    }

    //读取内阴影
    //gte innerShadow info
    function getInnerShadowInfo(style){
        var innerShadow = [];
        if(style.innerShadows().length>0){
            for(var i=0;i<style.innerShadows().length;i++){
                innerShadow.push({
                    "blurRadius":style.innerShadows()[i].blurRadius(),
                    "blurEnable":style.innerShadows()[i].isEnabled(),
                    "offsetX":style.innerShadows()[i].offsetX(),
                    "offsetY":style.innerShadows()[i].offsetY(),
                    "spread":style.innerShadows()[i].spread(),
                    "innerShadowBlending":getBlendModeForAE(style.innerShadows()[i].contextSettings().blendMode()),
                    "innerShadowOpacity":style.innerShadows()[i].contextSettings().opacity()*100
                });
            }
        }
        return innerShadow;
    }

    //获取形状图层信息
    //get shape layer info
    function getPathInfo(curLayer){
        if(curLayer.parentArtboard() != null){
            var offsetX = Number(curLayer.parentGroup().absoluteRect().x()-curLayer.parentArtboard().absoluteRect().x()-curLayer.parentArtboard().absoluteRect().width()/2);
            var offsetY = Number(curLayer.parentGroup().absoluteRect().y()-curLayer.parentArtboard().absoluteRect().y()-curLayer.parentArtboard().absoluteRect().height()/2);
            //var translateX = translateY =0;
            var translateX = Number(curLayer.absoluteRect().x() - curLayer.parentArtboard().absoluteRect().x() - 0.5*(curLayer.parentArtboard().absoluteRect().width() - curLayer.absoluteRect().width()));
            var translateY = Number(curLayer.absoluteRect().y() - curLayer.parentArtboard().absoluteRect().y() - 0.5*(curLayer.parentArtboard().absoluteRect().height() - curLayer.absoluteRect().height()));
                // var offsetX = Number(-curLayer.frame().x()-0.5*(curLayer.absoluteRect().width()));
                // var offsetY = Number(-curLayer.frame().y()-0.5*(curLayer.absoluteRect().height()));
        }else{
            var offsetX = offsetY = translateX = translateY = 0;
        }

        if(curLayer.children().length == 2){//single shape
            var Path = {
                "isClosed":false,
                "isVisible":curLayer.isVisible(),
                "isLocked":curLayer.isLocked(),
                "points":[],
                "isMasked":curLayer.isMasked(),
                "rotation":curLayer.rotation(),
                "isFlippedHorizontal":curLayer.isFlippedHorizontal(),
                "isFlippedVertical":curLayer.isFlippedVertical(),
                "translate":[translateX,translateY],
                "opacity":curLayer.style().contextSettings().opacity()*100,
                "strokes":getBorderInfo(curLayer.style()),
                "fills":getFillInfo(curLayer.style()),
                "fillRule":curLayer.bezierPath().windingRule(),
                "shadows":getShadowInfo(curLayer.style()),
                "innerShadows":getInnerShadowInfo(curLayer.style()),
                "blurEnable":curLayer.style().blur().isEnabled(),
                "blurType":curLayer.style().blur().type(),
                // blur types:
                // 0 - Gaussian Blur,
                // 1 - Motion Blur,
                // 2 - Zoom Blur,
                // 3 - Background Blur.
                "blurAmount":curLayer.style().blur().radius(),
                "blurAngle":curLayer.style().blur().motionAngle(),
                "blurOrigin":[curLayer.style().blur().center().x,curLayer.style().blur().center().y]
            };
        }else if(curLayer.children().length == 1){//shape in the shape group
            var Path = {
                "isClosed":false,
                "isVisible":curLayer.isVisible(),
                "isLocked":curLayer.isLocked(),
                "points":[],
                "isMasked":curLayer.isMasked(),
                "rotation":curLayer.rotation(),
                "isFlippedHorizontal":curLayer.isFlippedHorizontal(),
                "isFlippedVertical":curLayer.isFlippedVertical(),
                "translate":[translateX,translateY]
            }; 
        }else if(curLayer.children().length > 2){//shape group
            var Path = {
                "isClosed":false,
                "isVisible":curLayer.isVisible(),
                "isLocked":curLayer.isLocked(),
                "points":[],
                "isMasked":curLayer.isMasked(),
                "rotation":curLayer.rotation(),
                "isFlippedHorizontal":curLayer.isFlippedHorizontal(),
                "isFlippedVertical":curLayer.isFlippedVertical(),
                "translate":[translateX,translateY],//______//
                "opacity":curLayer.style().contextSettings().opacity()*100,
                "strokes":getBorderInfo(curLayer.style()),
                "fills":getFillInfo(curLayer.style()),
                "fillRule":curLayer.bezierPath().windingRule(),
                "shadows":getShadowInfo(curLayer.style()),
                "innerShadows":getInnerShadowInfo(curLayer.style()),
                "blurEnable":curLayer.style().blur().isEnabled(),
                "blurType":curLayer.style().blur().type(),
                // blur types:
                // 0 - Gaussian Blur,
                // 1 - Motion Blur,
                // 2 - Zoom Blur,
                // 3 - Background Blur.
                "blurAmount":curLayer.style().blur().radius(),
                "blurAngle":curLayer.style().blur().motionAngle(),
                "blurOrigin":[curLayer.style().blur().center().x,curLayer.style().blur().center().y]
            }; 
            return Path;
        }else{
            log("shape layer type error");
        }

        var tempStringGroup = curLayer.bezierPath().toString().split("\n");
        var checkClose = tempStringGroup[tempStringGroup.length-2].split(" ");
        if(checkClose[checkClose.length-1] == "closepath"){
            Path.isClosed = true;
            for(var i=3;i<tempStringGroup.length-2;i++){
                var tempStringLine = tempStringGroup[i].split(" ");
                if(tempStringLine[tempStringLine.length-1] == "moveto" || tempStringLine[tempStringLine.length-1] == "lineto"){
                    var x = Number(tempStringLine[tempStringLine.length-3]) + offsetX;
                    var y = Number(tempStringLine[tempStringLine.length-2]) + offsetY;
                    Path.points.push({
                        "x":x,
                        "y":y,
                        "xIn":x,
                        "yIn":y,
                        "xOut":x,
                        "yOut":y
                    });
                }else if(tempStringLine[tempStringLine.length-1] == "curveto"){
                    var x = Number(tempStringLine[tempStringLine.length-3]) + offsetX;
                    var y = Number(tempStringLine[tempStringLine.length-2]) + offsetY;
                    var xIn = Number(tempStringLine[tempStringLine.length-5]) + offsetX;
                    var yIn = Number(tempStringLine[tempStringLine.length-4]) + offsetY;
                    var xOut = Number(tempStringLine[tempStringLine.length-7]) + offsetX;
                    var yOut = Number(tempStringLine[tempStringLine.length-6]) + offsetY;
                    Path.points.push({
                        "x":x,
                        "y":y,
                        "xIn":xIn,
                        "yIn":yIn,
                        "xOut":x,
                        "yOut":y
                    });
                    Path.points[i-4].xOut = xOut;
                    Path.points[i-4].yOut = yOut;
                    if(i == tempStringGroup.length-3){
                        Path.points[0].xIn = xIn;
                        Path.points[0].yIn = yIn;
                    }
                    // Path.points[0].xIn = xIn;
                    // Path.points[0].yIn = yIn;

                }else{
                    log("unknown path type")
                }
            }
        }else{
            isClosed = false;
            for(var i=3;i<tempStringGroup.length;i++){
                var tempStringLine = tempStringGroup[i].split(" ");
                if(tempStringLine[tempStringLine.length-1] == "moveto" || tempStringLine[tempStringLine.length-1] == "lineto"){
                    var x = Number(tempStringLine[tempStringLine.length-3]) + offsetX;
                    var y = Number(tempStringLine[tempStringLine.length-2]) + offsetY;
                    Path.points.push({
                        "x":x,
                        "y":y,
                        "xIn":x,
                        "yIn":y,
                        "xOut":x,
                        "yOut":y
                    });
                }else if(tempStringLine[tempStringLine.length-1] == "curveto"){
                    var x = Number(tempStringLine[tempStringLine.length-3]) + offsetX;
                    var y = Number(tempStringLine[tempStringLine.length-2]) + offsetY;
                    var xIn = Number(tempStringLine[tempStringLine.length-5]) + offsetX;
                    var yIn = Number(tempStringLine[tempStringLine.length-4]) + offsetY;
                    var xOut = Number(tempStringLine[tempStringLine.length-7]) + offsetX;
                    var yOut = Number(tempStringLine[tempStringLine.length-6]) + offsetY;
                    Path.points.push({
                        "x":x,
                        "y":y,
                        "xIn":xIn,
                        "yIn":yIn,
                        "xOut":x,
                        "yOut":y
                    });
                    Path.points[i-4].xOut = xOut;
                    Path.points[i-4].yOut = yOut;
                }else{
                    log("unknown path type")
                }
            }

        }
        return Path;
    }


    //check artboard number
    if(artboards.length > 35){
            NSApplication.sharedApplication().displayDialog_withTitle(local_tooMuchArtboards, local_warning);
    }

    function createUI() {
        var pickArtboardDsp = local_pickArtboardDsp + doc.currentPage().name()+ "):";
        var UI = COSAlertWindow.new();
            UI.setMessageText('Sk2AE Shape Exporter v1.1');
            UI.addTextLabelWithValue( local_exportDsp2 );
            UI.addTextLabelWithValue( local_inputLength );
            UI.addTextFieldWithValue( '15' );
            UI.addTextLabelWithValue( local_inputFPS );
            UI.addTextFieldWithValue( '25' );
            UI.addTextLabelWithValue( pickArtboardDsp );
        if( artboards.length > 0 ) {
            for(var i = artboards.length-1;i>=0;i--){
                var subLayer = artboards[i].children();
                var checkbox = NSButton.alloc().initWithFrame(NSMakeRect( 0, i * 24, 300, 18 ));
                    checkbox.setButtonType(NSSwitchButton);
                    checkbox.setTitle(artboards[i].name());
                        checkbox.setState(false);
            for(var j=0;j<subLayer.length;j++){
                    checkbox.setState(subLayer[j].isSelected());   
                }
                UI.addAccessoryView( checkbox );
            }
        }else{
            UI.addTextLabelWithValue( local_noArtboards );
        }
        UI.addButtonWithTitle('OK');
        UI.addButtonWithTitle('Cancel');
        UI.addButtonWithTitle('HELP');
        return UI;
    }


        var UIresp = createUI()
        var clickBtn = UIresp.runModal();
        var choosenIdx = [];
        for(var j=0;j<artboards.length;j++){
            if(UIresp.viewAtIndex(j+6).selectedCell().state() == 1){
                choosenIdx.push(artboards.length-j-1);
            }
        }
    if(clickBtn == "1000"){
        if(UIresp.viewAtIndex(6).className() != "NSTextField" && choosenIdx.length > 0){
        var compLength = UIresp.viewAtIndex(2).stringValue();
        var compFPS = UIresp.viewAtIndex(4).stringValue();
        //check the input ?
        var save = NSSavePanel.savePanel();
            save.setNameFieldStringValue(docName);
            save.setExtensionHidden(false);
            if (save.runModal() == NSFileHandlingPanelOKButton){

    //________________export shape begin________________//        
            var notSurportFlag = 0;
            var script = 
                        '//This Script is Generated by Sketch2AE\n' +
                        '//\n' +
                        '//contact: xixi@bigxixi.com\n' +
                        '{\n' +
                        'app.beginUndoGroup("DrawShape");\n';

                for(var m=0;m<choosenIdx.length;m++){
                    var idxTemp = choosenIdx[m];
                    var sLayers = artboards[idxTemp].children();
                    var compX = artboards[idxTemp].absoluteRect().width();
                    var compY = artboards[idxTemp].absoluteRect().height();
                    script +=
                    'var compName_'+m+' = "'+ artboards[idxTemp].name() + '";\n' +
                    'var compLength_'+m+' = ' + compLength + ";\n" +
                    'var compFPS_'+m+' = ' + compFPS + ";\n" +
                    'var comp_'+m+' = app.project.items.addComp(compName_'+m+','+ compX+','+compY+',1,'+'compLength_'+m+','+'compFPS_'+m+');\n' +           
                    'comp_'+m+'.openInViewer();\n' +
                    'var endMSG="'+local_endMSG1+'\\n";\n';

            function setStrokeAndFill(thePathInfo){
                //set strokes
                if(thePathInfo.strokes.length > 0){
                    for(var i=0;i<thePathInfo.strokes.length;i++){
                        if(thePathInfo.strokes[i].strokeType == 0){
                            script += 'var shapeStroke'+n+'_'+i+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");\n' +
                            '    shapeStroke'+n+'_'+i+'.enabled = ' + thePathInfo.strokes[i].strokeEnabled + ';\n' + 
                            '    shapeStroke'+n+'_'+i+'.blendMode.setValue(' + thePathInfo.strokes[i].strokeBlending + ');\n' + 
                            '    shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Width").setValue(' + thePathInfo.strokes[i].strokeWith + ');\n' +
                            '    shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Line Cap").setValue(' + (thePathInfo.strokes[i].strokeEndType + 1) +');\n' +
                            '    shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Line Join").setValue(' + (thePathInfo.strokes[i].strokeJointType + 1) + ');\n'+
                            //'    shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Miter Limit").setValue(' + thePathInfo.strokes[i].miterLimit + ');\n'+
                            '    shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Opacity").setValue('+ thePathInfo.strokes[i].strokeOpacity +');\n'+
                            '    shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Color").setValue([' + thePathInfo.strokes[i].strokeColor + ']);\n';
                            if(thePathInfo.strokes[i].strokeJointType == 0){
                                script += '    shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Miter Limit").setValue(' + thePathInfo.strokes[i].miterLimit + ');\n';
                            }
                            //dash
                            if(thePathInfo.strokes[i].strokeDashPattern.length > 0){
                                script +='var shapeStrokeDash'+n+'_'+i+' = shapeStroke'+n+'_'+i+'.property("ADBE Vector Stroke Dashes");\n';
                                switch(thePathInfo.strokes[i].strokeDashPattern.length){
                                    case 1:
                                    {
                                        script += '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Dash 1");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Dash 1").setValue(' + thePathInfo.strokes[i].strokeDashPattern[0] + ');\n';

                                    }
                                    break;
                                    case 2:
                                    {
                                        script += '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Dash 1");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Dash 1").setValue(' + thePathInfo.strokes[i].strokeDashPattern[0] + ');\n' +
                                                '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Gap 1");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Gap 1").setValue(' + thePathInfo.strokes[i].strokeDashPattern[1] + ');\n';
                                    }
                                    break;
                                    case 3:
                                    {
                                        script += '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Dash 1");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Dash 1").setValue(' + thePathInfo.strokes[i].strokeDashPattern[0] + ');\n' +
                                                '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Gap 1");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Gap 1").setValue(' + thePathInfo.strokes[i].strokeDashPattern[1] + ');\n' +
                                                '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Dash 2");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Dash 2").setValue(' + thePathInfo.strokes[i].strokeDashPattern[2] + ');\n';
                                    }
                                    break;
                                    case 4:
                                    {
                                        script += '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Dash 1");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Dash 1").setValue(' + thePathInfo.strokes[i].strokeDashPattern[0] + ');\n' +
                                                '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Gap 1");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Gap 1").setValue(' + thePathInfo.strokes[i].strokeDashPattern[1] + ');\n' +
                                                '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Dash 2");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Dash 2").setValue(' + thePathInfo.strokes[i].strokeDashPattern[2] + ');\n' +
                                                '    shapeStrokeDash'+n+'_'+i+'.addProperty("ADBE Vector Stroke Gap 2");\n' + 
                                                '    shapeStrokeDash'+n+'_'+i+'.property("ADBE Vector Stroke Gap 2").setValue(' + thePathInfo.strokes[i].strokeDashPattern[3] + ');\n';
                                    }
                                    break;
                                    default:
                                    break;
                                }
                        }
                        
                    }
                    // }else if(thePathInfo.strokes[i].strokeType == 1){
                    //             if(thePathInfo.strokes[i].strokeGradient.gradientType == 0 ){
                    //                 //linear gradient set
                    //                 script += 'var gradientStroke'+n+'_'+i+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - G-Stroke");\n' +
                    //                             //'    gradientStroke'+n+'_'+i+'.enabled = ' + thePathInfo.strokes[i].strokeEnabled + ';\n' + 
                    //                             '    gradientStroke'+n+'_'+i+'.enabled = 0;\n' + 
                    //                             '    gradientStroke'+n+'_'+i+'.blendMode.setValue(' + thePathInfo.strokes[i].strokeBlending + ');\n' + 
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Stroke Width").setValue(' + thePathInfo.strokes[i].strokeWith + ');\n' +
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Grad Type").setValue(1);\n' +
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Stroke Line Cap").setValue(' + (thePathInfo.strokes[i].strokeEndType + 1) +');\n' +
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Stroke Line Join").setValue(' + (thePathInfo.strokes[i].strokeJointType + 1) + ');\n';//+
                    //                             //not surppoted gradient color
                    //                             script += 'endMSG +="Linear gradient color is not surpported now.\\n"\n';
                    //             }else if(thePathInfo.strokes[i].strokeGradient.gradientType == 1 ){
                    //                 //radial gradient set
                    //                 script += 'var gradientStroke'+n+'_'+i+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - G-Stroke");\n' +
                    //                             '    gradientStroke'+n+'_'+i+'.enabled = 0;\n' + 
                    //                             //'    gradientStroke'+n+'_'+i+'.enabled = ' + thePathInfo.strokes[i].strokeEnabled + ';\n' + 
                    //                             '    gradientStroke'+n+'_'+i+'.blendMode.setValue(' + thePathInfo.strokes[i].strokeBlending + ');\n' + 
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Stroke Width").setValue(' + thePathInfo.strokes[i].strokeWith + ');\n' +
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Grad Type").setValue(2);\n' +
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Stroke Line Cap").setValue(' + (thePathInfo.strokes[i].strokeEndType + 1) +');\n' +
                    //                             '    gradientStroke'+n+'_'+i+'.property("ADBE Vector Stroke Line Join").setValue(' + (thePathInfo.strokes[i].strokeJointType + 1) + ');\n';//+
                    //                             //not surppoted gradient color
                    //                             script += 'endMSG +="Radient gradient color is not surpported now.\\n"\n';
                    //             }else if(thePathInfo.strokes[i].strokeGradient.gradientType == 2 ){
                    //                 script += 'endMSG +="Angular gradient is not surppoted by AE Shape.\\n"\n';
                    //             }else if(thePathInfo.strokes[i].strokeGradient.gradientType == 3){
                    //                 script += 'endMSG +="Pattern fill is not surppoted by AE Shape.\\n"\n';
                    //             }else if(thePathInfo.strokes[i].strokeGradient.gradientType == 4 ){
                    //                 script += 'endMSG +="Noise fill is not surppoted by AE Shape.\\n"\n';
                    //             }else{   
                    //                 //not surppoted gradient type
                    //                 script += 'endMSG +="Some stroke fill types are not surppoted by AE Shape.\\n"\n';
                    //         }

                        }
                    }else{
                        log("no strokes");
                    }
                    //set fills
                    if(thePathInfo.fills.length > 0){
                        for(var i=0;i<thePathInfo.fills.length;i++){
                            if(thePathInfo.fills[i].fillType == 0){
                                script += 'var shapeFill'+n+'_'+i+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");\n' +
                                '    shapeFill'+n+'_'+i+'.enabled = ' + thePathInfo.fills[i].fillEnabled + ';\n' + 
                                '    shapeFill'+n+'_'+i+'.blendMode.setValue(' + thePathInfo.fills[i].fillBlending + ');\n' + 
                                '    shapeFill'+n+'_'+i+'.property("ADBE Vector Fill Rule").setValue('+ (thePathInfo.fillRule + 1) +');\n'+
                                '    shapeFill'+n+'_'+i+'.property("ADBE Vector Fill Opacity").setValue('+ thePathInfo.fills[i].fillOpacity +');\n'+
                                '    shapeFill'+n+'_'+i+'.property("ADBE Vector Fill Color").setValue([' + thePathInfo.fills[i].fillColor + ']);\n';
                            }else{
                                notSurportFlag = 1;
                                //not surppoted gradient type
                                //script += 'endMSG +="Gradient is not surpported now.\\n"\n';
                            }
                        }
                    }else{
                        log("no fills");
                    }
            }

            for(var n=0;n<sLayers.length;n++){
                //判断形状图层
                //check if shape layer
                var checkFlip = [100,100];
                if(sLayers[n].class() == "MSShapeGroup"){
                    if(sLayers[n].children().length == 2){//单个形状图层 single shape layer        
                        thePath = getPathInfo(sLayers[n]);
                        if(thePath.isFlippedHorizontal == 1 || thePath.isFlippedVertical == 1){
                            notSurportFlag = 1;
                        }
                        // if(thePath.isFlippedHorizontal == 1){
                        //     checkFlip[0] = -100;
                        // }
                        // if(thePath.isFlippedVertical == 1){
                        //     checkFlip[1] = -100;
                        // }
                        var pPos=inTang=outTang="";
                        var pointCount;
                        if(thePath.isClosed == true){
                            pointCount=thePath.points.length-1;
                        }else{
                            pointCount=thePath.points.length;
                        }
                        for(var i=0;i<pointCount;i++){
                            if(i != pointCount){
                                pPos += '[' + thePath.points[i].x + ',' + thePath.points[i].y + '],';
                                inTang += '[' + (thePath.points[i].xIn - thePath.points[i].x) + ',' + (thePath.points[i].yIn - thePath.points[i].y) + '],';
                                outTang += '[' + (thePath.points[i].xOut - thePath.points[i].x) + ',' + (thePath.points[i].yOut - thePath.points[i].y) + '],';
                            }else{
                                pPos += '[' + thePath.points[i].x + ',' + thePath.points[i].y + ']';
                                inTang += '[' + (thePath.points[i].xIn - thePath.points[i].x) + ',' + (thePath.points[i].yOut - thePath.points[i].y) + ']';
                                outTang += '[' + (thePath.points[i].xOut - thePath.points[i].x) + ',' + (thePath.points[i].yOut - thePath.points[i].y) + ']';
                            }
                        }

                        script += 'var SKShape'+n+' = new Shape();\n' +
                                'SKShape'+n+'.vertices = [' + pPos + '];\n' +
                                'SKShape'+n+'.inTangents = [' + inTang + '];\n' +
                                'SKShape'+n+'.outTangents = [' + outTang + '];\n' +
                                'SKShape'+n+'.closed = ' + thePath.isClosed + ';\n' + 
                                'var newShape'+n+' = comp_'+m+'.layers.addShape();\n' +
                                '    newShape'+n+'.name = "' + sLayers[n].name() + '";\n' +
                                '    newShape'+n+'.transform.opacity.setValue(' + thePath.opacity + ');\n' +
                                'var shapeGroup'+n+' = newShape'+n+'.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");\n' +
                                'var shapePathGroup'+n+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");\n' +
                                'var shapePath'+n+' = shapePathGroup'+n+'.property("ADBE Vector Shape");\n' +
                                '    shapePath'+n+'.setValue(SKShape'+n+');\n' +
                                '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Position").setValue(['+ thePath.translate[0] +','+ thePath.translate[1] +']);\n'+
                                '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Anchor").setValue(['+ thePath.translate[0] +','+ thePath.translate[1] +']);\n'+
                                '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Rotation").setValue('+ (-thePath.rotation) +');\n'+
                                // '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Scale").setValue(['+ checkFlip[0] +','+ checkFlip[1] +']);\n'+
                                '\n';
                                
                            setStrokeAndFill(thePath);

                            }else if(sLayers[n].children().length > 2){//形状图层组 shape group
                                script += 'var newShape'+n+' = comp_'+m+'.layers.addShape();\n' +
                                        '    newShape'+n+'.name = "' + sLayers[n].name() + '";\n' +
                                        'var shapeGroup'+n+' = newShape'+n+'.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");\n';
                                var subShape = sLayers[n].children();
                                //for(var k=subShape.length-2;k》=0;k--){
                                if(subShape[0].class() == "MSShapeGroup"){
                                    var kMin = 0;
                                    var kBegin = subShape.length-1;
                                }else{
                                    var kMin = -1;
                                    var kBegin = subShape.length-2;
                                }

                                for(var k=kBegin;k>kMin;k--){
                                    thePath = getPathInfo(subShape[k]);
                                    var pPos=inTang=outTang="";
                                    var pointCount;
                                    if(thePath.isClosed == true){
                                        pointCount=thePath.points.length-1;
                                    }else{
                                        pointCount=thePath.points.length;
                                    }
                                    for(var i=0;i<pointCount;i++){
                                        if(i != pointCount){
                                            pPos += '[' + thePath.points[i].x + ',' + thePath.points[i].y + '],';
                                            inTang += '[' + (thePath.points[i].xIn - thePath.points[i].x) + ',' + (thePath.points[i].yIn - thePath.points[i].y) + '],';
                                            outTang += '[' + (thePath.points[i].xOut -thePath.points[i].x) + ',' + (thePath.points[i].yOut - thePath.points[i].y) + '],';
                                        }else{
                                            pPos += '[' + thePath.points[i].x + ',' + thePath.points[i].y + ']';
                                            inTang += '[' + (thePath.points[i].xIn - thePath.points[i].x) + ',' + (thePath.points[i].yOut - thePath.points[i].y) + ']';
                                            outTang += '[' + (thePath.points[i].xOut - thePath.points[i].x) + ',' + (thePath.points[i].yOut - thePath.points[i].y) + ']';
                                        }
                                    }
                                        //
                                        //注意路径顺序
                                        script += 'var SKShape'+n+'_'+k+' = new Shape();\n' +
                                                'SKShape'+n+'_'+k+'.vertices = [' + pPos + '];\n' +
                                                'SKShape'+n+'_'+k+'.inTangents = [' + inTang + '];\n' +
                                                'SKShape'+n+'_'+k+'.outTangents = [' + outTang + '];\n' +
                                                'SKShape'+n+'_'+k+'.closed = ' + thePath.isClosed + ';\n';
                                        if(thePath.isFlippedHorizontal == 1 || thePath.isFlippedVertical == 1){
                                                notSurportFlag = 1;
                                            }
                                        if(thePath.rotation != 0){
                                        //if((thePath.rotation != 0) || (thePath.isFlippedHorizontal == 1) || (thePath.isFlippedVertical == 1)){
                                            // if(thePath.isFlippedHorizontal == 1){
                                            //     checkFlip[0] = -100;
                                            // }
                                            // if(thePath.isFlippedVertical == 1){
                                            //     checkFlip[1] = -100;
                                            // }
                                            script += 'var shapePathGroup'+n+'_'+k+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Group");\n' +         
                                                        'var shapePathGroup'+n+'_'+k+'_'+k+' = shapePathGroup'+n+'_'+k+'.addProperty("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");\n' +
                                                        'var shapePath'+n+'_'+k+' = shapePathGroup'+n+'_'+k+'_'+k+'.property("ADBE Vector Shape");\n' +        
                                                        '    shapePath'+n+'_'+k+'.setValue(SKShape'+n+'_'+k+');\n' +
                                                        // '    shapePathGroup'+n+'_'+k+'.property("ADBE Vector Transform Group").property("ADBE Vector Scale").setValue(['+ checkFlip[0] +','+ checkFlip[1] +']);\n'+
                                                        '    shapePathGroup'+n+'_'+k+'.property("ADBE Vector Transform Group").property("ADBE Vector Position").setValue(['+ thePath.translate[0] +','+ thePath.translate[1] +']);\n' +
                                                        '    shapePathGroup'+n+'_'+k+'.property("ADBE Vector Transform Group").property("ADBE Vector Anchor").setValue(['+ thePath.translate[0] +','+ thePath.translate[1] +']);\n' +
                                                        '    shapePathGroup'+n+'_'+k+'.property("ADBE Vector Transform Group").property("ADBE Vector Rotation").setValue('+ (-thePath.rotation) +');\n';

                                        }else{
                                            script += 'var shapePathGroup'+n+'_'+k+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");\n' +         
                                                        'var shapePath'+n+'_'+k+' = shapePathGroup'+n+'_'+k+'.property("ADBE Vector Shape");\n' +
                                                        '    shapePath'+n+'_'+k+'.setValue(SKShape'+n+'_'+k+');\n' +
                                                        '\n';
                                        }
                                        script += 'shapePathGroup'+n+'_'+k+'.name = "'+subShape[k].name()+'";\n';
                                        if((k+1<subShape.length) && (subShape[k+1].class() != "MSShapeGroup")){
                                            if(subShape[k+1].booleanOperation() != -1){
                                                script += 'var shapeMerge'+n+k+' = shapeGroup'+n+'.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Merge");\n' +
                                                        '    shapeMerge'+n+k+'.property("ADBE Vector Merge Type").setValue('+(subShape[k+1].booleanOperation()+2)+');\n'; 
                                            }
                                        }
                                    }
                                var parentPath = getPathInfo(sLayers[n]);
                                if(parentPath.isFlippedHorizontal == 1 || parentPath.isFlippedVertical == 1){
                                        notSurportFlag = 1;
                                    }
                                // if(parentPath.isFlippedHorizontal == 1){
                                //     checkFlip[0] = -100;
                                // }
                                // if(parentPath.isFlippedVertical == 1){
                                //     checkFlip[1] = -100;
                                // }
                                setStrokeAndFill(parentPath);
                                script += '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Position").setValue(['+ parentPath.translate[0] +','+ parentPath.translate[1] +']);\n' +
                                            '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Anchor").setValue(['+ parentPath.translate[0] +','+ parentPath.translate[1] +']);\n'+
                                            '    newShape'+n+'.transform.opacity.setValue(' + parentPath.opacity + ');\n' +
                                            '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Rotation").setValue('+ (-parentPath.rotation) +');\n';
                                            // '    shapeGroup'+n+'.property("ADBE Vector Transform Group").property("ADBE Vector Scale").setValue(['+ checkFlip[0] +','+ checkFlip[1] +']);\n';
                        
                        }else{
                                    log("layer error");
                            }

                }
            }

                }
            if(notSurportFlag == 1){
                script += 'endMSG += "'+local_endMSG2+'";\n';
            }
            script += 'endMSG += "'+local_endMSG3+'";\n' +
                    'app.endUndoGroup();\n' +
                    'alert(endMSG);\n}';


            function writeTextToFile(text, filePath) {
                var t = [NSString stringWithFormat:@"%@", text],
                f = [NSString stringWithFormat:@"%@", filePath];
                return [t writeToFile:f atomically:true encoding:NSUTF8StringEncoding error:nil];
            }
                    var collectPath = save.URL().path();
                    var jsxPath = collectPath + ".jsx";

                    writeTextToFile(script,jsxPath);
                    var failedAlert = COSAlertWindow.new();
                    failedAlert.setMessageText(local_shapeExported);
                    failedAlert.runModal();
                    //打开脚本所在位置
                    NSWorkspace.sharedWorkspace().selectFile_inFileViewerRootedAtPath(jsxPath, nil);
            }
        }

    }else if(clickBtn == "1001"){
        var failedAlert = COSAlertWindow.new();
        failedAlert.setMessageText(local_noArtboardExpoted);
        failedAlert.runModal();
    }else{
        var url = "https://github.com/bigxixi/Sketch2AE/";
        NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
    }

};
