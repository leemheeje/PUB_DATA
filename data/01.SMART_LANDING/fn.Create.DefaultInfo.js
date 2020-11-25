fn.Create['DefaultInfo'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initDefaultInfoOject = this.utills.initDefaultInfoOject;
		this.options = this.utills.options;
		this.clsFormat = this.utills.clsFormat;
		this.obj = $.extend(true, {
			classNames: {
				ld_title: $('[name="ld_title"]'),
				ld_subject: $('[name="ld_subject"]'),
				agree_txt1: $('[name="agree_txt1"]'),
				agree_txt2: $('[name="agree_txt2"]'),
				agreeCompPop: $('[name="agreeCompPop"]'),
				ld_popComment: $('[name="ld_popComment"]'),
				ld_moveLink: $('[name="ld_moveLink"]'),
			},
			beforeCallback: null
		}, obj);
		if (typeof this.obj.beforeCallback === 'function') {
			this.obj.beforeCallback();
		}
		this.bind();
		return this;
	},
	bind: function () {
		var _this = this;
		var classNames = _this.obj.classNames;
		var initData = this.initDefaultInfoOject;
		classNames.ld_title.val(title ? title : initData.ld_title).on({
			'keyup change': function (event) {
				_this.update(decodeURI(event.target.value), 'ld_title');
			},
			'blur':function(){
				_this.update(_this.replace(decodeURI(event.target.value)), 'ld_title');
			}
		});
		classNames.ld_subject.val(initData.ld_subject).on({
			'keyup change': function (event) {
				_this.update(decodeURI(event.target.value), 'ld_subject');
			},
			'blur':function(){
				_this.update(_this.replace(decodeURI(event.target.value)), 'ld_subject');
			}
		});
		classNames.agree_txt1.val(initData.agree_txt1).on({
			'keyup change': function (event) {
				_this.update(decodeURI(event.target.value), 'agree_txt1');
			},
			'blur':function(){
				_this.update(_this.replace(decodeURI(event.target.value)), 'agree_txt1');
			}
		});
		classNames.agree_txt2.val(initData.agree_txt2).on({
			'keyup change': function (event) {
				_this.update(decodeURI(event.target.value), 'agree_txt2');
			},
			'blur':function(){
				_this.update(_this.replace(decodeURI(event.target.value)), 'agree_txt2');
			}
		});
		classNames.agreeCompPop.prop('checked', initData.agreeCompPop).on('change', function (event) {
			if (event.target.checked) {
				$('.completeCheck').show();
			} else {
				$('.completeCheck').hide();
			}
			_this.update(event.target.checked, 'agreeCompPop');
		});
		classNames.ld_popComment.val(initData.ld_popComment).on({
			'keyup change': function (event) {
				_this.update(decodeURI(event.target.value), 'ld_popComment');
			},
			'blur':function(){
				_this.update(_this.replace(decodeURI(event.target.value)), 'ld_popComment');
			}
		});
		classNames.ld_moveLink.val(initData.ld_moveLink).on({
			'keyup change': function (event) {
				_this.update(decodeURI(event.target.value), 'ld_moveLink');
			},
			'blur':function(){
				_this.update(_this.replace(decodeURI(event.target.value)), 'ld_moveLink');
			}
		});
	},
	update: function (value, keyname) {
		var obj = {};
		obj[keyname] = value;
		this.utills.totalDefaultInfoDATAMerge($.extend(true, this.initDefaultInfoOject, obj));
	},
	replace:function(string, replaceString, regxp){
		var regxp = regxp? regxp : /['"]/g;
		var replaceString = replaceString? replaceString :'＂';
		return string.replace(regxp, replaceString);
	}
}