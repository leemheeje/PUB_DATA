!(function() {
	$.fn.extend({
		"cmmCountAddMin" : function(obj) {
			var $this = $(this);
			var _this = this;
			var options = {
				className : {
					cmmCountAddMinInput : '.cmmCountAddMinInput',
					cmmCountAddButton : '.cmmCountAddButton',
					cmmCountMinButton : '.cmmCountMinButton',
				}
			};
			var CmmCountAddMin = function(obj) {
				this.$el = $this;
				this.obj = $.extend(true, {
					defaultValue : 1,
					maxCount : 4,
					minCount : 1,
					step:1,
					afterCallback : function() {},
					addButtonCallback:function(){},
					minButtonCallback:function(){},
				}, obj);
				this.currentValue = this.obj.defaultValue;
				this.init();
				return this;
			};
			CmmCountAddMin.prototype = {
				init : function() {
					this.getter({
						currentValue : this.obj.defaultValue, 
						previousValue : this.obj.defaultValue,
					});
					this.setButtonDisalbed(this.obj.defaultValue);
					this.bind();
				},
				setter:function(params){
					var currentValue = this.currentValue;
					var obj = this.obj;
					var className = options.className;
					if(params === '+'){
						if(currentValue + obj.step < obj.maxCount){
							this.currentValue = currentValue + obj.step;
						}else{
							this.currentValue = obj.maxCount;
						}
						if(typeof obj.addButtonCallback === 'function'){
							obj.addButtonCallback(this.currentValue, currentValue, this.$el.find(className.cmmCountAddMinInput));
						}
					}else{
						if(currentValue - obj.step > obj.minCount){
							this.currentValue = currentValue - obj.step;
						}else{
							this.currentValue = obj.minCount;
						}
						if(typeof obj.minButtonCallback === 'function'){
							obj.minButtonCallback(this.currentValue, currentValue, this.$el.find(className.cmmCountAddMinInput));
						}
					}
					this.getter({
						currentValue : this.currentValue, 
						previousValue : currentValue,
						addMin : params
					});
					this.setButtonDisalbed(this.currentValue);
				},
				getter:function(params){
					var className = options.className;
					var obj = this.obj;
					this.$el.find(className.cmmCountAddMinInput).val(params.currentValue);
					if(typeof obj.afterCallback === 'function'){
						obj.afterCallback(params.currentValue, params.previousValue, this.$el.find(className.cmmCountAddMinInput));
					}
				},
				setButtonDisalbed:function(params){
					var obj = this.obj;
					var className = options.className;
					var $cmmCountAddButton = this.$el.find(className.cmmCountAddButton);
					var $cmmCountMinButton = this.$el.find(className.cmmCountMinButton);
					if(params == obj.maxCount){
						$cmmCountAddButton.prop('disabled' , true);
						$cmmCountMinButton.prop('disabled' , false);
					}else if(params == obj.minCount){
						$cmmCountAddButton.prop('disabled' , false);
						$cmmCountMinButton.prop('disabled' , true);
					}else{
						$cmmCountAddButton.prop('disabled' , false);
						$cmmCountMinButton.prop('disabled' , false);
					}
				},
				bind:function(){
					var _this = this;
					var className = options.className;
					_this.$el.find(className.cmmCountAddButton).off().on({
						'click' : function(){
							_this.setter('+');
						}
					});
					_this.$el.find(className.cmmCountMinButton).off().on({
						'click' : function(){
							_this.setter('-');
						}
					});
				},
			}
			var arrays = [];
			this.each(function() {
				arrays.push($.data($this, new CmmCountAddMin(obj)));
			});
			return arrays;
		}
	});
})(jQuery || $);
