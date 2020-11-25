fn.Create['MediaForm'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initMediaFormOject = this.utills.initMediaFormOject;
		this.options = this.utills.options;
		this.clsFormat = this.utills.clsFormat;
		this.obj = $.extend(true, {
			classNames: {
				target: '.cmmFileUpload.modalUploadSlide',
				media_code_head : $('[name="media_code_head"]'),
				media_code_body : $('[name="media_code_body"]'),
				media_code_db_head : $('[name="media_code_db_head"]'),
				media_code_db_body: $('[name="media_code_db_body"]'),
			},
		}, obj);
		this.bind();
		return this;
	},
	bind:function(){
		var _this = this;
		var classNames = _this.obj.classNames;
		var initData = this.initMediaFormOject;
		classNames.media_code_head.val(initData.media_code_head).on('keyup change',function(event){
			_this.update(event.target.value, 'media_code_head');
		});
		classNames.media_code_body.val(initData.media_code_body).on('keyup change',function(event){
			_this.update(event.target.value, 'media_code_body');
		});
		classNames.media_code_db_head.val(initData.media_code_db_head).on('keyup change',function(event){
			_this.update(event.target.value, 'media_code_db_head');
		});
		classNames.media_code_db_body.val(initData.media_code_db_body).on('keyup change',function(event){
			_this.update(event.target.value, 'media_code_db_body');
		});
	},
	update:function(value, keyname){
		var obj = {};
		obj[keyname] = value.replace(/\//g, '\\');
		this.utills.totalMediaFormDATAMerge($.extend(true, this.initMediaFormOject, obj));
	},
}