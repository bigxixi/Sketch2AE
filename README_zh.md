2.04 update - 支持 Sketch v50  
--------
2.03 update - 支持 Sketch v49  
--------
Google 也搞了个叫Sketch2AE的插件，和我这个版本的区别见：https://zhuanlan.zhihu.com/p/28828769  <br>
----------------------
<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/sk2aegif.gif">  

# Sketch2AE v2.0 - 支持矢量图层导出!   
将sketch中的矢量图层导入为AE形状图层，然后就可以接入bodymovin或者Lottie了！  

## 使用方法:  
0. （可选）切换语言为中文版，点击`Plugins` -> `Sketch2AE` -> `语言 language`.  
1. 把需要导出的形状放到一个画板里, 然后执行 `Plugins` -> `Sketch2AE` -> `导出矢量形状`.  
2. 在弹出的面板设置合成`时长`和`帧率`并选择要导出的画板，点击`OK` K然后选择导出地址。执行后会在该地址创建一个 `.jsx` 脚本文件.  
3. 打开After Effect，执行 `文件` -> `脚本` -> `运行脚本文件`, 选择刚才导出的 `.jsx` 文件, 这样会以画板为尺寸新建一个合成，你将看到图像被一点点的画出来.  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/ch2.png">  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/ch.png">  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/shapedemo.gif">  

有没有很带感:-D
(插画来自https://dribbble.com/shots/3038928-Free-Download-Color-Vector-Characters)

## 局限性
这个插件现在功能还有限，以下这些特性还不支持 
- 不支持渐变描边/渐变填充。 从SK读取没问题，AE用脚本无法自动建立渐变，只能手动。也发现了一些奇技淫巧但是不确定能不能跑通。  
- 不支持蒙版（Uderlying Masks）。主要是没时间弄，以后会解决。  
- 文字暂不支持。 主要是没时间弄，以后会加入。 
- 不支持图层的翻转。
- 不支持图层样式，以后应该会解决。   
- 还有一些SK有而AE没有的特性比如描边居中/靠外/靠内，还有箭头这些。  

其他的一些细节比如叠加模式、布尔运算、虚线是支持的，好好利用也是能出效果的。  
这个插件适合导出那种扁平纯色、线条风格的图，也是bodymovin和Lottie支持较好的风格。  

## How to install:

1.下载压缩包 [`点我`](https://github.com/bigxixi/Sketch2AE/archive/master.zip) 并解压.  
2.双击 `Sketch2AE.sketchplugin.`安装。  

--------------

````
## 旧版SK2AE v1.0 介绍
```` 


# Sketch2AE

轻松导出skech文件中的切片到Adobe After Effect并自动定位。  
利用帧另存为Photoshop图层功能，还可以实现Sketch导出到Photoshop哦。  

## 如何使用:  
0. （可选）切换语言为中文版，点击`Plugins` -> `Sketch2AE` -> `语言 language`.  
1. 保存sketch文件.  
2. 在图层列表选中要导出的图层组（不是图层组请先打组）, 执行 `Plugins` -> `Sketch2AE` -> `生成‘导出切片’`.  
3. 执行 `Plugins` -> `Sketch2AE` -> `导出画板`, 在弹出的面板设置合成`时长`和`帧率`并选择要导出的画板，点击`OK` K然后选择导出地址。执行后会在该地址创建一个 `.jsx` 脚本文件和 `slice` 文件夹.  
4. 打开After Effect，执行 `文件` -> `脚本` -> `运行脚本文件`, 选择刚才导出的 `.jsx` 文件, 这样就好自动导入图片并创建合成了.  
````
**注意，如需移动该jsx文件请带上slice文件夹并保持他们在同一父文件夹下。
````  
在sketch中，如有需要，可以执行 Plugins -> Sketch2AE -> 清除‘导出切片’ 来清理导出标记。  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/step1.gif" width="50%" height="50%">  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/step2.gif" width="50%" height="50%">  

<img src="https://raw.githubusercontent.com/bigxixi/ReadMe-Resources/master/Sketch2AE/step3.gif" width="50%" height="50%">  

## 本插件局限性&下一阶段目标:
 * 不支持路径、字体、图层样式等的导出。  
 * 目前只能自动导出1x图，如需导出多倍图请单独处理。  
 * 如果对图层组进行旋转、缩放后，导出的切片是变换后的矩形。  
 * 如果字体丢失，则导出的字体层切片可能会不全（硬广：请使用[`Font Packer`](https://github.com/bigxixi/Font-Packer)插件打包字体）  

## 快捷键列表:
```
**要注意和其他插件的快捷键冲突
```
 * `Control` + `Alt` + `S` : 生成‘导出切片’
 * `Control` + `Alt` + `E` : 导出画板
 * `Control` + `Alt` + `C` : 清除‘导出切片’
 * `Control` + `Alt` + `H` : 帮助

## License  
[CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)  
部分代码来自 [Ashung](https://github.com/Ashung/Automate-Sketch).

## 求打赏:
如果您觉得本插件好用，欢迎打赏，感谢您的支持！  

[<img src="http://bigxixi.com/donate/index.hyperesources/wechat.png" width="30%" height="30%">](http://bigxixi.com/donate)
[<img src="http://bigxixi.com/donate/index.hyperesources/alipay.jpg" width="30%" height="30%">](http://bigxixi.com/donate)  

也欢迎使用PayPal：  

[<img src="http://bigxixi.com/donate/index.hyperesources/paypal.png" width="30%" height="30%">](https://www.paypal.me/bigxixi/)  
