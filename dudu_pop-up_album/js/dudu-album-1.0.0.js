(function($){
	$.fn.duduAlbum = function(param){
		param = $.extend({},$.fn.duduAlbum.defalutParam, param);
		//定时器定义
		duduAlbumTimer = null;
		var
		//body对象
		$body = $('body'),
		//绑定对象
		$this = $(this),
		//图片坐标索引
		imgIndex = 0,
		//图片个数
		imgNum = $this.length,
		//预览图总页数
		smallTotalPage = Math.ceil(imgNum/param.showImgNum),
		//预览图当前页
		smallCurrentPage = 1,
		//大图框中箭头尺寸
		bigImgArrowHeight = 71,
		bigImgArrowWidth = 31,
		//小图框中箭头尺寸
		smallImgArrowHeight = 71,
		smallImgArrowWidth = 22,
		//大图框高度
		bigImgFrameHeight = param.height-param.smallImgFrameHeight,
		//大图框中箭头Top值
		bigImgArrowTop = (bigImgFrameHeight-bigImgArrowHeight)/2,
		//小图框中箭头Top值
		smallImgArrowTop = (param.smallImgFrameHeight-smallImgArrowHeight)/2,
		//大图框中箭头距相框边的距离
		bigImgArrowLeft = 10,
		//大图框中箭头外Div宽度
		bigImgArrowDivWidth = 0.4*param.width;
		//遮罩层对象
		$overlay = $('<div id="ddd" class="dudu_album_shade"></div>'),
		//关闭按钮
		$albumCloseButton = $('<a class="dudu_album_close_button" href="javascript:void(0);"></a>'),
		//相框对象
		$albumFrame = $('<div class="dudu_album_frame"></div>'),
		//大图框对象
		$bigImgFrame = $('<div class="dudu_album_big_img_frame"></div>'),
		//大图框中左箭头
		$bigImgLeftArrow = $('<div id="dudu_album_big_img_left_arrow" class="dudu_album_big_img_arrow">\
								<img src="image/dudu_album_big_img_l_a.png"/>\
							</div>');
		//大图框中右箭头
		$bigImgRightArrow = $('<div id="dudu_album_big_img_right_arrow" class="dudu_album_big_img_arrow">\
								<img src="image/dudu_album_big_img_r_a.png"/>\
							</div>');
		//小图框对象
		$smallImgFrame = $('<div class="dudu_album_small_img_frame"></div>');

		//小图框中左箭头
		$smallImgLeftArrow = $('<div id="dudu_album_small_img_left_arrow" class="dudu_album_small_img_arrow">\
								<img src="image/dudu_album_small_img_l_a.png"/>\
							</div>');
		//小图框中右箭头
		$smallImgRightArrow = $('<div id="dudu_album_small_img_right_arrow" class="dudu_album_small_img_arrow">\
								<img src="image/dudu_album_small_img_r_a.png"/>\
							</div>');
		//小图预览框
		$smallShowFrame = $('<div class="dudu_album_small_show_frame"></div>');
		//小图列表ul
		$smallListUl = $('<ul class="dudu_album_small_list_ul"></ul>');
		/****************************************************************************************************
		 *
		 *	相框大框渲染操作内容
		 * 
		 ****************************************************************************************************/

		$bigImgLeftArrow.width(bigImgArrowDivWidth);
		$bigImgLeftArrow.appendTo($bigImgFrame);
		$bigImgRightArrow.width(bigImgArrowDivWidth);
		$bigImgRightArrow.appendTo($bigImgFrame);
		$bigImgFrame.css({'height':bigImgFrameHeight}).appendTo($albumFrame);

		/****************************************************************************************************
		 *
		 *	相框预览框渲染操作内容
		 * 
		 ****************************************************************************************************/
		if(param.smallImgFrameHeight != 0){
			$smallImgLeftArrow.appendTo($smallImgFrame);
			//预览框padding值
			var showFrameMargin = 4;
			var showFrameWidth = param.width-40*2-showFrameMargin*2;
			var showFrameHeight = param.smallImgFrameHeight-showFrameMargin*2;
			$smallShowFrame
			.css({
				'width':showFrameWidth,
				'height':showFrameHeight,
				'margin':showFrameMargin
			})
			.appendTo($smallImgFrame);
			
			var 
			//获取小框左箭头图片对象
			$smallImgLeftArrowImg = $smallImgLeftArrow.children('img'),
			//获取小框右箭头图片对象
			$smallImgRightArrowImg = $smallImgRightArrow.children('img');
			//大图框左箭头计算样式
			$smallImgLeftArrowImg.css({
				top:smallImgArrowTop
			});
			//大图框右箭头计算样式
			$smallImgRightArrowImg.css({
				top:smallImgArrowTop
			});



			//创建li并放入ul
			$this.each(function(index){
				$('<li><a href="javascript:void(0);"><img width="100%" height="100%" src="'+$(this).attr('href')+'"/></a></li>').appendTo($smallListUl);
			});

			var 
			liBorder = 6,
			liWidth = parseInt(showFrameWidth/param.showImgNum),
			liNoBorderWidth = liWidth-liBorder*2,
			liHeight = showFrameHeight-liBorder*2,
			$smalllListLi = $smallListUl.children('li');

			$smalllListLi.css({'width':liNoBorderWidth,height:liHeight});
			$smallListUl.css({'height':showFrameHeight,'width':liWidth*imgNum}).appendTo($smallShowFrame);
			$smallImgRightArrow.appendTo($smallImgFrame);
			$smallImgFrame
			.css({'height':param.smallImgFrameHeight})
			.appendTo($albumFrame);
			//li添加鼠标经过事件
			$smalllListLi.hover(function(){
				$(this).addClass('dudu_album_small_list_li_hover');
			},function(){
				$(this).removeClass('dudu_album_small_list_li_hover');
			});
			//获取预览图对象
			var $smallListA = $smalllListLi.children('a');
			//预览图绑定点击事件
			$smallListA.click(function(event){
				arrowClick(3,$smallListA.index(this));
				event.stopPropagation();
			});

			//预览框左箭头绑定点击事件
			$smallImgLeftArrow.click(function(event){
				if(smallCurrentPage != 1){
					smallCurrentPage--;
					$smallListUl.animate({'marginLeft':-(smallCurrentPage-1)*liWidth*param.showImgNum}, 'fast');
				}
				event.stopPropagation();
			});
			//预览框右箭头绑定点击事件
			$smallImgRightArrow.click(function(event){
				if(smallCurrentPage != smallTotalPage){
					smallCurrentPage++;
					$smallListUl.animate({'marginLeft':-(smallCurrentPage-1)*liWidth*param.showImgNum}, 'fast');
				}
				event.stopPropagation();
			});

			$smallImgFrame.click(function(event){
				event.stopPropagation();
			});
		}


		$albumFrame.css({'width':param.width,'height':param.height}).appendTo($overlay);
		$albumCloseButton.appendTo($overlay);
		$overlay.css({'width':'100%'}).appendTo($body);

		/****************************************************************************************************
		 *
		 *	大图框内操作内容
		 * 
		 ****************************************************************************************************/

		var $bigImgLeftArrowImg = $bigImgLeftArrow.children('img');
		var $bigImgRightArrowImg = $bigImgRightArrow.children('img');
		//大图框左箭头计算样式
		$bigImgLeftArrowImg.css({
			top:bigImgArrowTop,
			left:bigImgArrowLeft
		});
		//大图框右箭头计算样式
		$bigImgRightArrowImg.css({
			top:bigImgArrowTop,
			left:bigImgArrowDivWidth-bigImgArrowLeft-bigImgArrowWidth
		});

		//将大图加到大图浏览框中
		$this.each(function(index){
			$('<a href="javascript:void(0);" index="'+index+'" class="dudu_big_img_a '+( index == imgIndex ? 'dudu_current_show' : '')+'" ><img src="'+$(this).attr('href')+'"/></a>')
			.appendTo($bigImgFrame);
		});

		/**
		 * 是否隐藏箭头
		 */
		if(param.hideBigImgArrow){
			//左箭头
			$body.delegate('#dudu_album_big_img_left_arrow', {
				'mouseenter':function(event) {
				$bigImgLeftArrowImg.show();
				},
				'mouseleave':function(){
					$bigImgLeftArrowImg.hide();
				}
			});
			//右箭头
			$body.delegate('#dudu_album_big_img_right_arrow', {
				'mouseenter':function(event) {
				$bigImgRightArrowImg.show();
				},
				'mouseleave':function(){
					$bigImgRightArrowImg.hide();
				}
			});
		}else{
			$('.dudu_album_big_img_arrow').children('img').show();
		}


		//左右按钮点击事件
		$body.delegate('#dudu_album_big_img_left_arrow img', 'click', function(event) {
			arrowClick(1);
			event.stopPropagation();
		});
		$body.delegate('#dudu_album_big_img_right_arrow img', 'click', function(event) {
			arrowClick(2);
			event.stopPropagation();
		});

		$body.delegate('.dudu_album_big_img_frame','click',function(event){
			event.stopPropagation();
		});

		//动画正在执行标识
		var animatingFlag = true;
		/**
		 * [arrowClick 箭头或预览图点击方法]
		 * @param  {[type]} lor [左右箭头判断，1：左箭头；2：右箭头；3：预览图]
		 */
		var arrowClick = null;
		arrowClick = function(lor,clickIndex){
			if(animatingFlag){
				animatingFlag = false;
				//左箭头点击
				if(lor === 1){
					imgIndex--;
					animate(1);
				}else if(lor === 2){
					imgIndex++;
					animate(1);
				}else if(lor === 3){
					if(param.smallImgFrameHeight != 0){
						imgIndex = clickIndex;
						animate(1);
					}
				}
			}
		}

		/**
		 * [animate 图片切换动画]
		 * @param  {[type]} operation [操作：为1是表示点击事件]
		 */
		var animate = null;
		animate = function(operation){
			//判断为点击操作并自动播放
			var flag = !!operation && param.autoPlay;
			if(flag){
				clearInterval(duduAlbumTimer);
			}
			if(imgIndex == imgNum){
				imgIndex = 0;
			}else if(imgIndex < 0){
				imgIndex = imgNum-1;
			}
			//小图跟随大图变换
			if(param.smallImgFrameHeight != 0){
				smallAnimate();
			}
			var $nextImg = $('.dudu_big_img_a').eq(imgIndex);
			var $current = $('.dudu_current_show');
			$nextImg.addClass('dudu_next_show');
			$current.fadeOut('slow', function() {
				//解决IE7,8播放一遍后没有渐变效果问题
				$current.removeClass('dudu_current_show').removeAttr("style");
				$nextImg.removeClass('dudu_next_show').addClass('dudu_current_show');
				if(flag){
					duduAlbumTimer = setInterval(function(){
						imgIndex++;
						animate();
					},param.playSpeed);
				}
				animatingFlag = true;
			});
		};

		/****************************************************************************************************
		 *
		 *	图片列表操作内容
		 * 
		 ****************************************************************************************************/
		/**
		 * [图片列表绑定点击事件]
		 * @return {[type]} [description]
		 */
		$this.bind('click',function(){
			var clickIndex = $(this).index();
			imgIndex = clickIndex;
			//显示点击对应大图图片
			$('.dudu_album_big_img_frame a').removeClass('dudu_current_show').eq(imgIndex).addClass('dudu_current_show');
			//小图预览加效果
			if(param.smallImgFrameHeight != 0){
				smallAnimate();
			}
			
			$('html').css({'overflow':'visible'});
			$body.css({'overflow':'hidden'});
			$albumFrame.css({'marginTop':albumPosition()});
			$overlay.css({'top':getScrollTop(),'height':$(window).height()}).show();
			//加定时器
			if(param.autoPlay){
				clearInterval(duduAlbumTimer);
				duduAlbumTimer = setInterval(function(){
					imgIndex++;
					animate();
				},param.playSpeed);
			}
			return false;
		});
		/**
		 * [albumPosition 计算相框位置]
		 * @return {[int]} [相框位置值]
		 */
		var albumPosition = null;
		albumPosition = function(){
			return ($(window).height()-param.height)/2;
		};

		//获取浏览器滚动高度
		var getScrollTop = null;
		getScrollTop = function(){
			//滚动高度变量定义
			var scrollPos;
			//获取滚动高度（兼容浏览器）
			if(typeof window.pageYOffset != 'undefined'){ 
				scrollPos = window.pageYOffset; //Netscape
			}else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat'){ 
			    scrollPos = document.documentElement.scrollTop; //Firefox、Chrome
			}else if(typeof document.body != 'undefined'){ 
			    scrollPos = document.body.scrollTop; //IE
			}
			return scrollPos;
		};
		/****************************************************************************************************
		 *
		 *	遮罩层操作内容
		 * 
		 ****************************************************************************************************/

		/**
		 * 遮盖物是否可点击关闭相册
		 */
		if(param.hideOnOverlayClick){
			$body.delegate('.dudu_album_shade', 'click', function(event) {
				close();
			});
		}

		/**
		 * 关闭按钮点击事件
		 */
		$('.dudu_album_close_button').click(function(event){
			close();
			event.stopPropagation();
		});

		/**
		 * [close 关闭相册方法]
		 */
		var close = null;
		close = function(){
			if(param.smallImgFrameHeight != 0){
				smallCurrentPage = 1;
				$smallListUl.css({'marginLeft':0});
			}
			$body.css({'overflow':'auto'});
			$('html').css({'overflow':'auto'});
			$overlay.hide();
			if(param.autoPlay){
				clearInterval(duduAlbumTimer);
			}
		}

		/**
		 * [smallAnimate 预览图动画效果方法]
		 * @return {[type]} [description]
		 */
		var smallAnimate = null;
		smallAnimate = function(){
			$smalllListLi.removeClass('dudu_album_small_list_li_current').eq(imgIndex).addClass('dudu_album_small_list_li_current');
			if(imgIndex == 0){
				smallCurrentPage = 1;
				$smallListUl.animate({'marginLeft':0},'fast');
			}else{
				//如果显示图对应预览图所在页码大于当前显示页码，则滑动到预览页
				smallCurrentPage = (getSmallImgPage(imgIndex) > smallCurrentPage ? getSmallImgPage(imgIndex) : smallCurrentPage);
				$smallListUl.animate({'marginLeft':-(smallCurrentPage-1)*liWidth*param.showImgNum},'fast');
			}
		};

		/**
		 * [getSmallCurrentPage 获取当前显示图对应的预览图所在页码]
		 * @param  {[type]} imgIndex [图片索引]
		 * @return {[int]}          [当前页码值]
		 */
		var getSmallImgPage = null;
		getSmallImgPage = function(imgIndex){
			return Math.ceil((imgIndex+1)/param.showImgNum);
		};
	};

	$.fn.duduAlbumReset = function(){
		clearInterval(duduAlbumTimer);
		$overlay.remove();
	};

	/**
	 * [defalutParam 默认参数值]
	 * @type {Object}
	 */
	$.fn.duduAlbum.defalutParam = {
		width : 600,							//相框宽度，默认：600
		height : 400,							//相框高度，默认：400
		smallImgFrameHeight : 100,				//底部小图区域高度，默认：100
		hideOnOverlayClick : !!0,				//遮罩层点击隐藏开关，默认：关闭
		autoPlay : !!0,							//自动播放开关，默认：不播放
		playSpeed : 2000,						//播放速度（单位毫秒），默认：2000
		hideBigImgArrow : !!1,					//是否隐藏大图上的箭头，默认：隐藏
		showImgNum : 5							//预览框中默认显示个数
	};
})($);