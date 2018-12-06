# lazy-load
lazy-load 翻译过来就是"懒加载",它是针对图片加载时机的优化。在一些有大量图片的网站，当用户打开网站，如果一次性加载所有的图片时，那么可能会出现页面白屏，页面卡顿等，甚至出现卡死现象。因为图片太多，会给浏览器很大的压力。

但是，用户浏览一个网站，它并不知道一共有多少张图片，他只能看到可视区域的所有图片。所以我们在打开网站的时候只需要将首屏的图片加载出来，给用户的感知就是页面没有任何问题。至于下面的图片我们可以当用户下拉或者点击加载更多的时候即时加载图片，即时呈现。这样一来，用户的体验没有变差，浏览器的压力也变小了。这个延迟加载的过程就叫做 lazy-load。

## 实现一个lazy-load
上代码 
```
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>lazy-load</title>
	</head>
	<style>
		.img {
			width: 200px;
			height: 200px;
			background-color: #000;
		}
		.pic {
		}
	</style>
	<body>
		<div class="container">
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont1.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont1.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont2.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont3.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont4.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont5.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont6.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont7.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont8.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont9.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont10.png" /></div>
			<div class="img"><img src="" alt="加载中" class="pic" data-src="./images/cont11.png" /></div>
		</div>
		<script>
			//获取所有的图片标签
            const imgs = document.getElementsByTagName("img");
			//获取可视区域的高度
			const viewHeight = window.innerHeight || document.documentElement.clientHeight;
			//num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
			let num = 0;
			function lazyLoad() {
				for (let i = num; i < imgs.length; i++) {
					// 用可视区域高度减去元素顶部距离可视区域顶部的高度
					let distance = viewHeight - imgs[i].getBoundingClientRect().top;
					// 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
					if (distance >= 0) {
						imgs[i].src = imgs[i].getAttribute("data-src");
						// 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
						num = i + 1;
					}
				}
			}
			// 监听Scroll事件
			window.addEventListener("scroll", lazyLoad, false);
		</script>
	</body>
</html>

```
1. 获取可视区域的高度
2. 判断IMG是否露出（用可视区域高度减去元素顶部距离可视区域顶部的高度 > 0）
3. 如果露出加载其img的真实地址


在懒加载的过程中有两个需要关注的数值 **可视区域高度** 另一个是 **元素距离可视区域顶部的高度**
