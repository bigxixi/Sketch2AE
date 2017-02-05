var local_saveDoc = 'Please save your sketch file first!';
var local_warning = 'Warning!';
var local_tooMuchArtboards = 'You have to many artboards in this file, which might lead to UI crash.';
var local_pickArtboardDsp = 'Pick Artboards(current page:';
var local_exportDsp = 'Picked Artboards will get a snapshot for reference.';
var local_inputLength = 'The length of the composition(in seconds):';
var local_inputFPS = 'The FPS of the composition:';
var local_noArtboards = 'There are no Artboards in this page:(';
var local_done = "Done, would you like to clean the 'ExportSlice's?";
var local_clsBtn = "Clean";
var local_notNowBtn = "Not Now";
var local_noArtboardExpoted = 'Nothing selected.Nothing exported.';
var local_chooseTips = "Please select at least 1 layer(group).";
var local_groupTips = "Group them first if you want to export a non-group layer.";
var local_helpText = 'How to use：\n' +
                    '1.Select the layergroups your want to export on the layer list'+
                    '(group it if the layer is not a layergroup)\n'+
                    'Run Plugins -> Sketch2AE -> Generate ExportSlices。\n' +
                    '2.Run Plugins -> Sketch2AE -> Export Artboards, then on the popup panel set the composition length and FPS, pick artboards you want to export. \n'+
                    'Hit OK and choose a location to save the generated ".jsx" script file and "slice" folder.\n' +
                    '3.In After Effect，run File -> Script -> Run Script File, choose the ".jsx" file, it will generate compositions automaticly.\n' +
                    '**NOTE: Keep the ".jsx" file and "slice" folder under a same parent folder if you want to move it.\n' +
                    '4.Back to Sketch,you can run Plugins -> Sketch2AE -> Clear ExportSlices to clear exsiting ExportSlices.\n' +
                    '\n' +
                    'Known Issues:\n' +
                    '1.Can not export vactor shapes, editable texts, layer styles.All flatten.\n' +
                    '2.By default it generate 1x slices.If you need 2x or other you have to export by hand.\n' +
                    '3.Rotating or scaling of a layer will result in a big rectangle of slice\n' +
                    '4.If there are missed fonts in the file, the ExportSlices might be clipping.\n（Try my Plungin:Font Packer to pack and achive your sketch files:) ）。\n' +
                    '\nShortcut list:\n' +
                    '**Becareful of shortcut conflicting with other plugins\n' +
                    'Control + Alt + S : Generate ExportSlices\n' +
                    'Control + Alt + E : Export Artboards\n' +
                    'Control + Alt + C : Clear ExportSlices\n' +
                    'Control + Alt + H : Help\n' +
                    '\n\n' +
                    'Any questions -> xixi@bigxixi.com\n';
var local_updateText1 = "You are using the latest version v";
var local_updateText2 = "You are up to date!";
var local_updateText3 = "New verision available (v";
var local_updateText4 = "You are using old version (v";
var local_updateText5 = "Click OK to download the latest version.";
var local_updateText6 = "Failed to check for new version,contact xixi@bigxixi.com for help!\n";
var local_updateText7 = "Can not check for updates.";
