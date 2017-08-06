var local_saveDoc = '请先保存文件！';
var local_warning = '警告';
var local_tooMuchArtboards = '本文件中画板太多，建议减少一点或者分批导出.';
var local_pickArtboardDsp = '选择画板导出(当前页面：';
var local_exportDsp = '如要没设置导出切片，将导出整张画板快照。';
var local_inputLength = '输入合成时长（秒）';
var local_inputFPS = '输入合成帧率（FPS）';
var local_noArtboards = '当前页面没有画板:(';
var local_done = "导出完成，是否清理'导出标记'？";
var local_clsBtn = "清理";
var local_notNowBtn = "暂不";
var local_noArtboardExpoted = '未选择任何画板，什么都没导出。';
var local_chooseTips = "请至少选择1个图层(组)。";
var local_groupTips = "请检查所选的是否图层组。如果不是，请先将它们打组。";
var local_helpText = '使用步骤：\n' +
                    '1、在图层列表选中要导出的图层组（不是图层组请先打组），执行 Plugins -> Sketch2AE -> 生成‘导出切片’。\n' +
                    '2、执行 Plugins -> Sketch2AE -> 导出文件，在弹出的面板设置合成时长和帧率并选择要导出的画板，点击OK然后选择导出地址。执行后会在该地址创建一个.jsx脚本和slice文件夹。\n' +
                    '3、打开After Effect，执行 文件 -> 脚本 -> 运行脚本文件，选择刚才导出的.jsx文件，这样就好自动导入图片并创建合成了。\n' +
                    '**注意，如需移动该jsx文件请带上slice文件夹并保持他们在同一父文件夹下。\n' +
                    '4、在sketch中，如有需要，可以执行 Plugins -> Sketch2AE -> 清除‘导出切片’来清理导出标记。\n' +
                    '\n' +
                    '本插件局限性&下一阶段目标：\n' +
                    '1、不支持路径、字体、图层样式等的导出。\n' +
                    '2、目前只能自动导出1x图，如需导出多倍图请单独处理。\n' +
                    '3、如果对图层组进行旋转、缩放后，导出的切片是变换后的矩形。\n' +
                    '4、如果字体丢失，则导出的字体层切片可能会不全\n（硬广：请使用FontPacker插件打包字体）。\n' +
                    '\n快捷键列表:\n' +
                    '**如果与其他插件冲突，快捷键也许会失效，慎用\n' +
                    'Control + Alt + S : 生成‘导出切片’\n' +
                    'Control + Alt + E : 导出画板\n' +
                    'Control + Alt + C : 清除‘导出切片’\n' +
                    'Control + Alt + H : 帮助\n' +
                    '\n\n' +
                    '任何问题或建议欢迎联系 xixi@bigxixi.com\n';
var local_updateText1 = "您正在使用的是最新版，版本 v";
var local_updateText2 = "这是最新版哦";
var local_updateText3 = "有新版本！(v";
var local_updateText4 = "您正在使用旧版本 (v";
var local_updateText5 = "点击 OK 下载最新版.";
var local_updateText6 = "无法查询最新版,请联系 xixi@bigxixi.com 需求帮助！\n";
var local_updateText7 = "更新查询失败";
//20170807更新
var local_exportDsp2 = '把想要导出的矢量图层放到单独的画板中。';
var local_shapeExported = '导出成功! 打开 AE 点击 文件 -> 脚本 -> 运行脚本文件. 选择刚才导出的.jsx文件，这样就导入AE了。';
var local_endMSG1 = '完成！';
var local_endMSG2 = '有些效果无法从sketch转到AE，请检查导入的资源并手动调整！\n';
var local_endMSG3 = '矢量图已被导入为AE形状图层。';
var local_shapeHelp = '帮助还没空写。。。';