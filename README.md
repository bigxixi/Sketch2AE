2.03 update - support Sketch v49  
--------
Google release another 'Sketch2AE' plugin, if you are looking for that one, visit . 
https://google.github.io/sketch2ae/
---------------
<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/sk2aegif.gif">  

# Sketch2AE v2.0 - Shape Export support!  
Now you can export shapes! To AE Shape layer!  Then to Bodymovin or Lottie!    
将sketch中的矢量图层导入为AE形状图层，然后就可以接入bodymovin或者Lottie了！  
[中文版介绍点这里](https://github.com/bigxixi/SKetch2AE/blob/master/README_zh.md)  

## How to use:  
In Sketch， put the shape you want to eport in an artboard, go to Plungin -> Sketch2AE -> Export Shapes  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/en2.png">  

in the pop-up panel, choose the artboard, set the length and fps, then hit OK.  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/en.png">  

Open AE and run File -> Scripts -> Run Script File, select the ".jsx" file you exported.  
Then you will see the magic :)

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/shapedemo.gif">  

(image from https://dribbble.com/shots/3038928-Free-Download-Color-Vector-Characters)

## Limitations
Unfortunately, this plugin has some limitations:  
- Gradient Fill and Stroke are not supported. AE dosent allow script to generate gradients automaticly.  
- Uderlying Masks. I will do it in the future.  
- Texts not supported. I will do it in the future.  
- Flip layer not supported.
- Layer styles not supported.  
- Features that Sketch has but AE not. Stroke position, Arrow, etc.  


## How to install:  

1.Download the [`Plugin File(hit me)`](https://github.com/bigxixi/Sketch2AE/archive/master.zip) and unzip.  
2.Double click `Sketch2AE.sketchplugin.`   


--------------

````
## SK2AE v1.0 introduction.
```` 
A Sketch plugin to export sketch slice to Adobe After Effect and potisition them automatically.  
Whats more, you can use the `Save Frame As Photoshop Layers` inside AE to export contents to Photoshop!  


## How to use:  
1. Save your work on Sketch.  
2. Select the LAYERGROUPs your want to export on the layer list(group it if the layer is not a layergroup), Run `Plugins` -> `Sketch2AE` -> `Generate ExportSlices`.  
3.  Run `Plugins` -> `Sketch2AE` -> `Export Artboards`, then on the popup panel set the composition length and `FPS`, pick artboards you want to export. Hit `OK` and choose a location to save the generated `.jsx` script file and `slice` folder.  
4.  In After Effect，run `File` -> `Script` -> `Run Script File`, choose the `.jsx` file, it will generate compositions automaticly.  
````
**NOTE: Keep the ".jsx" file and "slice" folder under a same parent folder if you want to move it.
````  
Back to Sketch, you can run Plugins -> Sketch2AE -> Clear ExportSlices to clear exsiting ExportSlices.  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/step1.gif" width="50%" height="50%">  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/step2.gif" width="50%" height="50%">  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/step3.gif" width="50%" height="50%">  
## Known Issues:
 * Can not export vactor shapes, editable texts, layer styles.All flatten.  
 * By default it generate 1x slices. If you need 2x or other you have to export by hand.  
 * Rotating or scaling of a layer will result in a big rectangle of slice  
 * If there are missed fonts in the file, the ExportSlices might be clipping.（Try my Plungin:[`Font Packer`](https://github.com/bigxixi/Font-Packer) to pack and achive your sketch files:) ）  

## Shortcut list:
```
**Becareful of shortcut conflicting with other plugins
```
 * `Control` + `Alt` + `S` : Generate ExportSlices
 * `Control` + `Alt` + `E` : Export Artboards
 * `Control` + `Alt` + `C` : Clear ExportSlices
 * `Control` + `Alt` + `H` : Help
 
## License  
[CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)  
Special thanks to [Ashung's code](https://github.com/Ashung/Automate-Sketch).

## Donation:

Thank you very much!  

[<img src="http://bigxixi.com/donate/index.hyperesources/paypal.png" width="30%" height="30%">](https://www.paypal.me/bigxixi/)  

