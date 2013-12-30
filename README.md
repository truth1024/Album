## 弹出式相册插件

### 一、介绍
```html
这个插件的出现是因为找不到合适我项目中使用的插件，这个插件是基于Jquery的弹出式的相册JS插件（点击缩略图后弹出相册）。
目前兼容主流浏览器：Chrome、FireFox、Safari和IE7+。
因为本人不是专业JS开发，所以代码质量不是很高，也会有一些Bug。发现有任何问题请联系我。
邮箱：truth9988@163.com
```
### 二、用法
#### 第一步：html页面中引入资源文件

```html
<link rel="stylesheet" type="text/css" href="css/g.css"/>
<script type="text/javascript" src="js/jquery-1.8.0.js"></script>
<script type="text/javascript" src="js/g.js"></script>
```
#### 第二步：html中缩略图的写法规定
```html
<a class="example_group" href="./image/example/1_b.jpg" ><img src="./image/example/1_s.jpg" /></a>
<a class="example_group" href="./image/example/2_b.jpg" ><img src="./image/example/2_s.jpg" /></a>
<a class="example_group" href="./image/example/3_b.jpg" ><img src="./image/example/3_s.jpg" /></a>
<a class="example_group" href="./image/example/4_b.jpg" ><img src="./image/example/4_s.jpg" /></a>
<a class="example_group" href="./image/example/5_b.jpg" ><img src="./image/example/5_s.jpg" /></a>

说明：img标签中引入缩略图url，a标签href中引入大图url
```
#### 第三步：调用函数
```html
<script type="text/javascript">
  $(function(){
		$('.example_group').duduAlbum();
	});
</script>
```

### 三、参数说明
```html
        width :                 相框宽度，默认：600
		height :                相框高度，默认：400
		smallImgFrameHeight :   底部小图区域高度，默认：100
		hideOnOverlayClick :    遮罩层点击隐藏开关，默认：关闭
		autoPlay :              自动播放开关，默认：不播放
		playSpeed :             播放速度（单位毫秒），默认：2000
		hideBigImgArrow :       是否隐藏大图上的箭头，默认：隐藏
		showImgNum :            预览框中默认显示个数，默认：5
```
