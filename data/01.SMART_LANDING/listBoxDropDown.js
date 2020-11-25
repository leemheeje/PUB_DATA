var ListBoxDropDown = null;
!(function () {
	ListBoxDropDown = function (obj) {
		var _this = this;
		this.obj = $.extend(true, {
			table: '.table',
			tbody: 'tbody',
			tr: 'tbody  tr',
			td: 'td',
			checkbox: 'input[type="checkbox"]',
			afterCallback: null,
			beforeCallback: null,
		}, obj);
		this.ara_array = [];
		this.arry = [];
		return {
			up: function () {
				_this.handler('up');
			},
			down: function () {
				_this.handler('down');
			},
			dbup: function () { 
				_this.handler('dbup');
			},
			dbdown: function () {
				_this.handler('dbdown');
			 },
		};
	}
	ListBoxDropDown.prototype = {
		handler: function (type) {
			var obj = this.obj;
			var _this = this;
			var $this = null;
			_this.arry = [];
			$(obj.table).find(obj.tr).each(function () {
				if ($(this).find(obj.checkbox).is(':checked')) {
					switch (type) {
						case 'up':
							$(this).prev().before($(this));
							break;
						case 'down':
							_this.arry.unshift([$(this), $(this).index()]);
							break;
						case 'dbup':
							$(this).parent().prepend($(this));
							break;
						case 'dbdown':
							$(this).parent().append($(this));
							break;
					}
				}
			});
			if (type == 'down') {
				for (var i = 0; i < this.arry.length; i++) {
					$(obj.table).find(obj.tr + ':eq(' + (this.arry[i][1] + 1) + ')').after(this.arry[i][0]);
				}
			}
			if(typeof obj.afterCallback === 'function'){
				
				_this.ara_array = [];
				
				$(obj.table).find(obj.tr).each(function(){
					_this.ara_array.push($(this).data('index'));
				});
				obj.afterCallback({
					dom_table : $(obj.table),
					array : _this.ara_array
				});
			}
		},
		clsFormat: function (s) {
			return s.replace(/[^a-zA-Z_-]/g, '');
		},
	};
})(jQuery || $);