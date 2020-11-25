fn.Create['Image'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initFormGroupObject = this.utills.initFormGroupObject;
		this.options = this.utills.options;
		this.create_key = this.options.keys[0];
		this.uploadInput = {};
		this.uploadImage = {};
		this.obj = $.extend(true, {
			classNames: {
				target: '.cmmFileUpload.modalUploadImage',
				modalInFormAppend: '.modalInCreateImage',
				submitButton: '.modalUploadImageButton',
				cmmSortableWrap: '.cmmSortableWrap.step3',
				dataTotalKey: 'data-total-key',
			},
			componentKeys: 0,
			beforeCallback: function () {
				$('#modalBoxCreateImage').on('hidden.bs.modal', function (e) {
					$('.cmmFileUpload').remove();
				});
			},
			afterCallback: function () {
				$('#modalBoxCreateImage').modal('hide'); //밖에서 컨트롤옮겨야함
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
			for (var key in data) {
				preivewDefaultValue.push(data[key].imagePreview);
			}
		}

		this.uploadImage[total_key] = '';
		this.uploadInput[total_key] = '<form class="cmmFileUpload modalUploadImage ' + total_key + ' ' + (actions === 'M' ? 'modify' : '') + '" data-params=\'' + JSON.stringify({ "defaultValue": preivewDefaultValue }) + '\'>';
		this.uploadInput[total_key] += '	<label class="lb"><input type="file" /></label>';
		this.uploadInput[total_key] += '	<ul class="cmmFilesGroup"></ul>';
		this.uploadInput[total_key] += '</form>';
		$(classNames.modalInFormAppend).find(classNames.target).hide();
		$(classNames.modalInFormAppend).append(this.uploadInput[total_key]).show();

		var $target = actions === 'M' ? $(classNames.target + '.' + total_key + '.modify') : $(classNames.target + '.' + total_key);
		var $params = $.extend(true, $target.data('params'), {
			bindUploadImageChange: function (files) {
				console.log(files)
				_this.uploadImage[total_key] =files;
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
	fnGetItems: function (uploadImage, total_key, actions) {
		var _this = this;

		var html = '';
		var classNames = this.obj.classNames;

		for (var key in uploadImage[total_key]) {
			console.log(uploadImage[total_key]);
			console.log(key);
			html += '		<div class="item" ' + classNames.dataTotalKey + '="' + total_key + '">';
			html += '			<div class="itemInner">';
			if(uploadImage[total_key][key]['isDocumentSubmitImage'] || uploadImage[total_key][key]['isDocumentFixedImage'] || uploadImage[total_key][key]['isDocumentScrollImage']){
				//html += '			<img class="d-block w-100 fnButtonYN fnCreateDocumentSubmitImage" src="' + uploadImage[total_key][key].imagePreview + '" alt="First slide">';
				html += '			<img class="d-block w-100 fnButtonYN '+((function(){
					var classes = '';
					if(uploadImage[total_key][key]['isDocumentSubmitImage']) classes+= 'fnCreateDocumentSubmitImage';
					if(uploadImage[total_key][key]['isDocumentScrollImage']) classes+= ' fnCreateDocumentScrollImage';
					if(uploadImage[total_key][key]['isDocumentFixedImage']) classes+= ' fnCreateDocumentFixedImage';
					if(classes) console.log(classes)
					return classes;
				})())+'" src="' + uploadImage[total_key][key].imagePreview + '" alt="First slide">';
			}else{
				//html += '			<img class="d-block w-100 fnButtonYN fnCreateDocumentFixedImage" src="' + uploadImage[total_key][key].imagePreview + '" alt="First slide">';
				html += '			<img class="d-block w-100 fnButtonYN" src="' + uploadImage[total_key][key].imagePreview + '" alt="First slide">';
			}
			html += '			</div>';
			html += '			<div class="btnWrap">';
			html += '				<label class="labelButton tp1">';
			if(uploadImage[total_key][key]['isDocumentSubmitImage']){
				html += '				<input type="checkbox" checked name="submitImageYN" onchange="FN_LANDING_IMAGE.fnChangeSubmitImage(\'' + total_key + '\',\''+key+'\', event);"/>';
			}else{
				html += '				<input type="checkbox" name="submitImageYN" onchange="FN_LANDING_IMAGE.fnChangeSubmitImage(\'' + total_key + '\',\''+key+'\', event);"/>';
			}
			html += '				<span class="labelButtonSpan">이 이미지를 \'신청하기\'버튼으로 사용합니다.</span>';
			html += '				</label>';
			html += '				<label class="labelButton tp3">';
			if(uploadImage[total_key][key]['isDocumentScrollImage']){
				html += '				<input type="checkbox" checked name="scrollImageYN" onchange="FN_LANDING_IMAGE.fnChangeScrollImage(\'' + total_key + '\',\''+key+'\', event);"/>';
			}else{
				html += '				<input type="checkbox" name="scrollImageYN" onchange="FN_LANDING_IMAGE.fnChangeScrollImage(\'' + total_key + '\',\''+key+'\', event);"/>';
			}
			html += '				<span class="labelButtonSpan">이 이미지를 신청폼바로가기 버튼으로 사용합니다.</span>';
			html += '			</label>';
			html += '				<label class="labelButton tp2">';
			if(uploadImage[total_key][key]['isDocumentFixedImage']){
				html += '				<input type="checkbox" checked name="fixedImageYN" onchange="FN_LANDING_IMAGE.fnChangeFixedImage(\'' + total_key + '\',\''+key+'\', event);"/>';
			}else{
				html += '				<input type="checkbox" name="fixedImageYN" onchange="FN_LANDING_IMAGE.fnChangeFixedImage(\'' + total_key + '\',\''+key+'\', event);"/>';
			}
			html += '				<span class="labelButtonSpan">이 이미지를 하단고정버튼으로 사용합니다.</span>';
			html += '			</label>';
			html += '				<a href="#;" title="수정" onclick="$(\'' + '#modalBoxCreateImage' + '\').modal(\'show\');FN_LANDING_IMAGE.fnModifyItems(\'' + total_key + '\');">수정</a>';
			html += '				<a href="#;" title="삭제" onclick="FN_LANDING_IMAGE.fnDeleteItems(\'' + total_key + '\', event);">삭제</a>';
			html += '			</div>';
			html += '		</div>';
		}
		if (html) {
			if (actions === 'M') {//수정
				var t = $(classNames.cmmSortableWrap + ' [' + classNames.dataTotalKey + '="' + total_key + '"]');
				t.after(html);
				t.remove();
			} else {
				$(classNames.cmmSortableWrap).append(html);
			}
			if (actions === 'N' || actions === 'M') {//신규추가 || 수정
				this.utills.initFormGroupObject[total_key] = uploadImage[total_key];
				$(classNames.target).remove();
				this.utills.totalDATAMerge(_this.utills.initFormGroupObject);
			}
			this.utills.htmlAppendAfterCallback({
				afterCallback: this.obj.afterCallback
			});

		} else {
			alert('등록할 이미지가 없습니다.\n이미지를 등록해주세요.');
		}
	},
	fnChangeScrollImage:function(total_key, image_key, e){
		var bool = typeof e === 'boolean' ? e : e.target.checked;
		var data = this.utills.initFormGroupObject[total_key][image_key];
		var classNames = this.obj.classNames;
		var $parent = $(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"]');
		var $scrollImageYN = $parent.find('[name="scrollImageYN"]');
		data['isDocumentScrollImage'] = bool;
		this.utills.totalDATAMerge(this.utills.initFormGroupObject);
		this.fnChangeScrollImageCallback(bool,total_key);
		if(bool){
			$scrollImageYN.attr('checked', true);
		}else{
			$scrollImageYN.removeAttr('checked');
		}
	},
	fnChangeScrollImageCallback:function(bool,total_key){
		var classNames = this.obj.classNames;
		var $target = $(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"] .fnButtonYN');
		if(bool){
			$target.addClass('fnCreateDocumentScrollImage');
		}else{
			$target.removeClass('fnCreateDocumentScrollImage');
		}
	},
	fnChangeFixedImage:function(total_key, image_key, e){
		var bool = typeof e === 'boolean' ? e : e.target.checked;
		var data = this.utills.initFormGroupObject[total_key][image_key];
		var classNames = this.obj.classNames;
		var $parent = $(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"]');
		var $submitImageYN = $parent.find('[name="submitImageYN"]');
		var $fixedImageYN = $parent.find('[name="fixedImageYN"]');
		data['isDocumentFixedImage'] = bool;
		this.utills.totalDATAMerge(this.utills.initFormGroupObject);
		this.fnChangeFixedImageCallback(bool,total_key);
		if(bool){
			/*this.fnChangeSubmitImage(total_key, image_key, false);
			$submitImageYN.prop('checked' , false);
			$submitImageYN.removeAttr('checked');*/
			$fixedImageYN.attr('checked', true);
		}else{
			$fixedImageYN.removeAttr('checked');
		}
	},
	fnChangeFixedImageCallback:function(bool,total_key){
		var classNames = this.obj.classNames;
		var $target = $(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"] .fnButtonYN');
		if(bool){
			$target.addClass('fnCreateDocumentFixedImage');
		}else{
			$target.removeClass('fnCreateDocumentFixedImage');
		}
	},
	fnChangeSubmitImage:function(total_key, image_key, e){
		var bool = typeof e === 'boolean' ? e : e.target.checked;
		var data = this.utills.initFormGroupObject[total_key][image_key];
		var classNames = this.obj.classNames;
		var $parent = $(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"]');
		var $submitImageYN = $parent.find('[name="submitImageYN"]');
		var $fixedImageYN = $parent.find('[name="fixedImageYN"]');
		data['isDocumentSubmitImage'] = bool;
		this.utills.totalDATAMerge(this.utills.initFormGroupObject);
		this.fnChangeSubmitImageCallback(bool,total_key);
		if(bool){
			/*this.fnChangeFixedImage(total_key, image_key, false);
			$fixedImageYN.prop('checked' , false);
			$fixedImageYN.removeAttr('checked');*/
			$submitImageYN.attr('checked', true);
		}else{
			$submitImageYN.removeAttr('checked');
		}
	},
	fnChangeSubmitImageCallback:function(bool,total_key){
		var classNames = this.obj.classNames;
		var $target = $(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"] .fnButtonYN');
		if(bool){
			$target.addClass('fnCreateDocumentSubmitImage');
		}else{
			$target.removeClass('fnCreateDocumentSubmitImage');
		}
	},
	fnDeleteItems: function (total_key, e) {
		if (this.utills.initFormGroupObject[total_key]) {
			delete this.utills.initFormGroupObject[total_key];
			this.utills.totalDATAMerge(this.utills.initFormGroupObject);
		}
		e.target.closest('[' + this.obj.classNames.dataTotalKey + ']').remove();
	},
	fnModifyItems: function (total_key) {
		console.log(total_key);
		this.setting(total_key, 'M');
		this.bindSubmitButton(total_key, 'M');//수정
	},
	fnAddItems: function () {
		this.total_key = this.utills.localCreateTotalKey(this.create_key);
		this.utills.initFormGroupObject[this.total_key] = {};
		this.setting(this.total_key);
		this.bindSubmitButton(this.total_key, 'N');
		this.utills.totalDataMergeAfterGotoBottom();
	},
}
/**
 * init호출(fn.Create.Utills.js에서 페이지load시 한번만 호출) > 
 * 
 * 1. 신규등록 프로세스 
 * fnAddItems() > this.setting() > this.bindSubmitButton() > this.fnGetItems()
 * fnAddItems 외부에서 호출 html파일 또는 외에 js파일에서
 * setting 을 거쳐 input[type="file"]을 형성하고 
 */