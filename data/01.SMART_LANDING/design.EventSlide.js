/*window.frontInTemplateAMotion = new EventSlide({
	btns: '.slnb>.tp',
	container: '.landingDesignFormInner',
	hash: ['#gallery1', '#gallery2', '#gallery3'],
	speed: sessionMotionDuration,
	mode: temp_obj[keyString[3]].animationType,
	ease: 'easeInOutExpo',
	beforeCallback: function (currentIndex, nextIndex, $currentElement) { },
	afterCallback: function (currentIndex, historyIndex, $currentElement) {
		sessionCurrentIndex = currentIndex;
		sessionHistoryIndex = historyIndex;
		currentSessionTotalKey = $('.landingTemplateItemsWrap:eq('+currentIndex+')').data('totalKey');
		if(currentSessionTotalKey == keyString[1]){
			$('.selectRadioButton input[type=radio]').prop('checked' , false);
		}
	},
	sessionAnimationAfterCallback: function (currentIndex, historyIndex, $currentElement) {
		$('.landingTemplateItemsWrap').removeClass('templateSlideEnd');
		$currentElement.addClass('templateSlideEnd');
	}
});*/
var EventSlide = function (obj) {
	var _this = this;
	this.o = {
		btns: '',
		container: '',
		hash: [],
		beforeCallback: function () { },
		afterCallback: function () { },
		autoHeight: true,
		mode: 'vertical',
		speed: 300,
		ease: 'swing',
		responsive: false,
	}
	this.initialAnimation = true; //첫진입시 animate.duration = 0;
	this.init(obj);
	return {
		jump: function (nm) {
			if(nm === 'last'){
				_this.fnActive(_this._.sections.length - 1);
			}else if(nm === 'first'){
				_this.fnActive(0);
			}else{
				_this.fnActive(nm);
			}
			
		}
	}
};
EventSlide.prototype = {
	init: function (obj) {
		var _this = this;
		this.obj = $.extend(true, this.o, obj);
		this.obj.speed = this.obj.mode == 'static' ? 0 : this.obj.speed;
		this.initBool = true;
		this._ = {
			historyActive: -1,
			currentActive: 0,
			sections: [],
			addClassNames: ['sectionContainer', 'slideOn']
		};
		if ($(this.obj.container).length && $(this.obj.btns).length) {
			this.set();
			if (_this.obj.responsive) {
				$(window).smartresize(function () {
					_this._.historyActive = -1;
					_this.set();
				});
			}
			_this.initBool = false;
			if (this.obj.hash.length) {
				this.fnHashCheck();
			}
			this.bind();
		}
	},
	set: function () {
		var _this = this;
		$(this.obj.container).addClass(this._.addClassNames[0]);
		_this._.sections = [];
		$(this.obj.container + '>*').each(function (i) {
			$(this).css({
				'position': 'absolute',
				'left': 0,
				'top': 0,
				'width': '100%'
			});
			_this._.sections.push({
				$el: $(this),
				width: $(this).outerWidth(),
				height: window.innerHeight
			});
			if (_this.initBool) {
				if (i) {
					$(this).hide();
				}
			}
		});
		if (!_this.initBool) {
			_this.fnActive(_this._.currentActive, true);
		}
		if (_this.obj.autoHeight) {
			$(_this.obj.container).stop().animate({
				'height': _this._.sections[_this._.currentActive].height
			}, _this.aniCallback({
				'duration': 0
			}));
		}
	},
	fnHashCheck: function () {
		var ch = 0;
		for (var i = 0; i < this.obj.hash.length; i++) {
			if (this.obj.hash[i] == this.getHash()) {
				ch = i;
			}
		}
		this._.currentActive = ch;
		this.fnActive(ch);
	},
	bind: function () {
		var _this = this;
		$(_this.obj.btns).on({
			'click': function (e) {
				e.preventDefault();
				var $this = $(this);
				var $index = $this.index();
				if (typeof _this.obj.beforeCallback === 'function') {
					_this.obj.beforeCallback(_this._.currentActive, $index, _this._.sections[_this._.currentActive].$el);
				}
				_this._.currentActive = $index;
				_this.fnActive(_this._.currentActive);
			}
		});
	},
	fnActive: function (current, historyIgnore) {
		var _this = this;
		var c = function () {
			var o = null;
			var j = null;
			if (_this.obj.mode == 'fade') {
				o = {
					'opacity': 0,
				};
				ao = {
					'opacity': 1,
				};
				j = {
					'opacity': 1,
				};
				aj = {
					'opacity': 0,
				};
			} else if (_this.obj.mode == 'vertical') {
				if (current > _this._.historyActive) {
					o = {
						'top': '100%',
					};
					ao = {
						'top': 0,
					};
					j = {
						'top': 0,
					};
					aj = {
						'top': '-100%',
					};
				} else {
					o = {
						'top': '-100%',
					};
					ao = {
						'top': 0,
					};
					j = {
						'top': 0,
					};
					aj = {
						'top': '100%',
					};
				}
			} else {
				if (current > _this._.historyActive) {
					o = {
						'left': '100%',
					};
					ao = {
						'left': 0,
					};
					j = {
						'left': 0,
					};
					aj = {
						'left': '-100%',
					};
				} else {
					o = {
						'left': '-100%',
					};
					ao = {
						'left': 0,
					};
					j = {
						'left': 0,
					};
					aj = {
						'left': '100%',
					};
				}
			}
			return {
				o: o,
				ao: ao,
				j: j,
				aj: aj,
			};
		};
		if(!this._.sections[current]) return false;
		if ($('body').is('.event_slide_on')) {
			$('body').removeClass('event_slide_on');
		} else {
			$('body').addClass('event_slide_on');
		}
		if (current == _this._.historyActive) return;
		$(_this.obj.btns).removeClass('slide-active');
		$(_this.obj.btns + ':eq(' + current + ')').addClass('slide-active');
		for (var i = 0; i < this._.sections.length; i++) {
			this._.sections[i].$el.hide();
		}
		this._.sections[current].$el.addClass(this._.addClassNames[1]).css(c().o).show().stop().animate(c().ao, this.aniCallback({
			duration: _this.initialAnimation ? 0 : _this.obj.speed,
			easing: _this.obj.ease,
			complete: function () {
				_this.initialAnimation = false;
				if (_this.obj.autoHeight) {
					$(_this.obj.container).stop().animate({
						'height': _this._.sections[_this._.currentActive].height
					}, _this.aniCallback({
						'duration': 0
					}));
				}
				$('body').removeClass('event_slide_on');
				if(typeof _this.obj.sessionAnimationAfterCallback === 'function'){
					_this.obj.sessionAnimationAfterCallback(current, _this._.historyActive, _this._.sections[current].$el);
				}
			}
		}));
		if (this.obj.mode != 'fade') {
			if (_this._.historyActive >= 0) {
				this._.sections[_this._.historyActive].$el.removeClass(this._.addClassNames[1]).css(c().j).show().stop().animate(c().aj, this.aniCallback({
					duration: _this.obj.speed,
					easing: _this.obj.ease,
				}));
			}
		}
		_this.fnCallback(current);
	},
	fnCallback: function (current) {
		if (typeof this.obj.afterCallback === 'function') {
			this.obj.afterCallback(current, this._.historyActive, this._.sections[current].$el);
		}
		this._.historyActive = current;
	},
	aniCallback: function (o) {
		return $.extend(true, {
			duration: 300,
			easing: 'swing',
			complete: function () { },
		}, o);
	},
	getHash: function () {
		return location.hash !== '#' ? location.hash : false;
	},
};
(function ($, sr) {
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced() {
			var obj = this,
				args = arguments;

			function delayed() {
				if (!execAsap) func.apply(obj, args);
				timeout = null;
			};
			if (timeout) clearTimeout(timeout);
			else if (execAsap) func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 150);
		};
	}
	jQuery.fn[sr] = function (fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};
})(jQuery, 'smartresize');