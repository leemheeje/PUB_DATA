fn.Create['Slide'] = {
	init: function (utills,obj) {
		this.utills = utills;
		this.initFormGroupObject = this.utills.initFormGroupObject;
		this.options = this.utills.options;
		this.create_key = this.options.keys[1];
		this.uploadInput = {};
		this.uploadImage = {};
		this.obj = $.extend(true, {
			classNames: {
				target: '.cmmFileUpload.modalUploadSlide',
				modalInFormAppend: '.modalInCreateSlide',
				submitButton: '.modalUploadSlideButton',
				cmmSortableWrap: '.cmmSortableWrap.step3',
				dataTotalKey: 'data-total-key',
			},
			componentKeys: 0,
			beforeCallback: function () {
				$('#modalBoxCreateSlide').on('hidden.bs.modal', function (e) {
					$('.cmmFileUpload').remove();
				});
			},
			afterCallback: function () {
				$('#modalBoxCreateSlide').modal('hide'); //밖에서 컨트롤옮겨야함
			},
		}, obj);
		this.bindImageUploadSubmitButton = null;
		if (typeof this.obj.beforeCallback === 'function') {
			this.obj.beforeCallback(this, this.obj);
		}
		return this;
	},
	setting: function (total_key, actions) {
		var _this = this;
		var preivewDefaultValue = [];
		var classNames = this.obj.classNames;
		if (actions === 'M') {
			var data = this.utills.initFormGroupObject[total_key];
			preivewDefaultValue = [];
			for (var key in data) {
				preivewDefaultValue.push(data[key].imagePreview);
			}
		}

		this.uploadImage[total_key] = '';
		this.uploadInput[total_key] = '<form class="cmmFileUpload modalUploadSlide ' + total_key + ' ' + (actions === 'M' ? 'modify' : '') + '" data-params=\'' + JSON.stringify({
			"sortable": true,
			"multiple": true,
			"itemInAddImages": true,
			"defaultValue": preivewDefaultValue
		}) + '\'>';
		this.uploadInput[total_key]+='<label class="lb"><input type="file" multiple /></label>';
		this.uploadInput[total_key]+='<ul class="cmmFilesGroup"></ul>';
		this.uploadInput[total_key]+='</form>';
		$(classNames.modalInFormAppend).find(classNames.target).hide();
		$(classNames.modalInFormAppend).append(this.uploadInput[total_key]).show();

		var $target = actions === 'M' ? $(classNames.target + '.' + total_key + '.modify') : $(classNames.target + '.' + total_key);

		var $params = $.extend(true, $target.data('params'), {
			bindUploadImageChange: function (files) {
				_this.uploadImage[total_key] = files;
			}
		});
		$target.cmmFileUpload($params, $target);
	},
	bindSubmitButton: function (total_key, actions) {
		var _this = this;
		$(_this.obj.classNames.submitButton).off().on({
			'click': function (e) {
				e.preventDefault();
				_this.bindImageUploadSubmitButton({
					uploadImage : _this.uploadImage,
					total_key : total_key,
					actions : actions,
				});
				//_this.fnGetItems(_this.uploadImage, total_key, actions);
			}
		});
	},
	fnGetItems: function (uploadImage,total_key, actions) {

		var _this = this;
		var html = '';
		var classNames = this.obj.classNames;
		if(uploadImage[total_key]){
			if(Object.keys(uploadImage[total_key]).length){
				html += '<div class="item" ' + classNames.dataTotalKey + '="' + total_key + '">';
				html += '	<div class="itemInner">';
				html += '	<div class="owl-carousel owl-theme cmmImageSlide">';
				for (var key in uploadImage[total_key]) {
					html += '		<div class="slideItems">';
					html += '			<img class="d-block w-100" src="' + uploadImage[total_key][key].imagePreview + '" alt="First slide">';
					html += '		</div>';
				}
				html += '	</div>';
				html += '	</div>';
				html += '	<div class="btnWrap">';
				html += '		<a href="#;" title="수정" onclick="$(\'' + '#modalBoxCreateSlide' + '\').modal(\'show\');FN_LANDING_SLIDE.fnModifyItems(\'' + total_key + '\');">수정</a>';
				html += '		<a href="#;" title="삭제" onclick="FN_LANDING_SLIDE.fnDeleteItems(\'' + total_key + '\', event);">삭제</a>';
				html += '	</div>';
				html += '</div>';
			}
		}

		if (html) {
			if (actions === 'M') {//수정
				var t = $(classNames.cmmSortableWrap + ' [' + classNames.dataTotalKey + '="' + total_key + '"]');
				t.after(html);
				t.remove();
			} else {
				$(classNames.cmmSortableWrap).append(html);
			}

			this.utills.initFormGroupObject[total_key] = uploadImage[total_key];
			$(classNames.target).remove();
			this.utills.htmlAppendAfterCallback({
				afterCallback: this.obj.afterCallback
			});
			this.utills.totalDATAMerge(_this.utills.initFormGroupObject);

		} else {
			alert('등록할 이미지가 없습니다.\n이미지를 등록해주세요.');
		}
	},
	fnDeleteItems: function (total_key, e) {
		if (this.utills.initFormGroupObject[total_key]) {
			delete this.utills.initFormGroupObject[total_key];
			this.utills.totalDATAMerge(this.utills.initFormGroupObject);
		}
		e.target.closest('.item').remove();
		console.log(this.utills.initFormGroupObject);
	},
	fnModifyItems: function (total_key) {
		console.log(total_key);
		this.setting(total_key, 'M');
		this.bindSubmitButton(total_key, 'M');//수정
	},
	fnAddItems: function () {
		this.total_key=this.utills.localCreateTotalKey(this.create_key);
		this.utills.initFormGroupObject[this.total_key] = {};
		this.setting(this.total_key);
		this.bindSubmitButton(this.total_key);
		this.utills.totalDataMergeAfterGotoBottom();
	},
}