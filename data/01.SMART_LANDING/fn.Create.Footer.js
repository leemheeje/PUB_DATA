var oEditors = oEditors || []; 
fn.Create['Footer'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initFormGroupObject = this.utills.initFormGroupObject;
		this.options = this.utills.options;
		this.clsFormat = this.utills.clsFormat;
		this.create_key = this.options.keys[5];
		this.obj = $.extend(true, {
			classNames: {
				modal: '#modalBoxCreateFooter',
				modalInFormSmartEdite: '#txtContents1',
				colorPicker: '.cmmColorPicker',
				submitButton: '.modalUploadFooterButton',
				cmmSortableWrap: '.cmmSortableWrap.step3',
				dataTotalKey: 'data-total-key',
			},
			beforeCallback: function () {
				$('#modalBoxCreateFooter').on('hidden.bs.modal', function (e) {
					if(oEditors&&oEditors.length){
						oEditors.getById["txtContents1"].exec("SET_IR", ['']);
					}else{
						$('#txtContents1').val(''); //초기화
					}
					$('#modalBoxCreateFooter .cmmColorPicker').minicolors('value', '#fff');//초기화
				});
			},
			afterCallback: function () {
				$('#modalBoxCreateFooter').modal('hide'); //밖에서 컨트롤옮겨야함
				if(oEditors&&oEditors.length){
					oEditors.getById["txtContents1"].exec("SET_IR", ['']);
				}else{
					$('#txtContents1').val('');//초기화
				}
				$('#modalBoxCreateFooter .cmmColorPicker').minicolors('value', '#fff');//초기화
			},
		}, obj);
		if (typeof this.obj.beforeCallback === 'function') {
			this.obj.beforeCallback(this, this.obj);
		}
		return this;
	},
	setting: function (total_key, actions) {
		var classNames = this.obj.classNames;
		if(oEditors){
			getNthCreateFrames({
				key : 1,
				edite:{
					elPlaceHolder : this.clsFormat(classNames.modalInFormSmartEdite),
				}
			});
		}
		var data = this.utills.initFormGroupObject[total_key];
		if (actions === 'M') {
			if(oEditors&&oEditors.length){
				oEditors.getById[this.clsFormat(classNames.modalInFormSmartEdite)].exec("PASTE_HTML", [data.value]);
			}else{
				$(classNames.modalInFormSmartEdite).val(data.value);
			}
			$(classNames.modal).find(classNames.colorPicker).minicolors('value', data.colorPicker);
		}
	},
	bindSubmitButton: function (total_key, actions) {
		var _this = this;
		var classNames = this.obj.classNames;
		$(_this.obj.classNames.submitButton).off().on({
			'click': function (e) {
				e.preventDefault();
				if(oEditors&&oEditors.length){
					oEditors.getById[_this.clsFormat(classNames.modalInFormSmartEdite)].exec("UPDATE_CONTENTS_FIELD", []);
				}
				var getData = {
						value : $(_this.obj.classNames.modalInFormSmartEdite).val(),
						colorPicker:$(_this.obj.classNames.modal).find(_this.obj.classNames.colorPicker).val()
					};
				if (getData) {
					_this.fnGetItems(getData, total_key, actions);
				}
			}
		});
	},
	fnGetItems: function (getData, total_key, actions) {
		var _this = this;
		var classNames = this.obj.classNames;
		var $parent = $(classNames.modal);
		var html = '';
		if(getData.value && getData.value !=='<br>'){
			html += '<div class="item" ' + classNames.dataTotalKey + '="' + total_key + '">';
			html += '	<div class="itemInner"><div  style="background-color: ' + (getData.colorPicker ? getData.colorPicker : '#fff') + '">' + getData.value + '</div></div>';
			html += '	<div class="btnWrap">';
			html += '		<a href="#" title="수정" onclick="$(\'' + '#modalBoxCreateText' + '\').modal(\'show\');FN_LANDING_TEXT.fnModifyItems(\'' + total_key + '\');">수정</a>';
			html += '		<a href="#" title="삭제" onclick="FN_LANDING_TEXT.fnDeleteItems(\'' + total_key + '\', event);">삭제</a>';
			html += '	</div>';
			html += '</div>';
		}
		if(html){
			if (actions === 'M') {//수정
				var t = $(classNames.cmmSortableWrap + ' [' + classNames.dataTotalKey + '="' + total_key + '"]');
				t.after(html);
				t.remove();
			} else {
				$(classNames.cmmSortableWrap).append(html);
			}
			if (actions === 'N' || actions === 'M') {//신규추가 || 수정
				this.utills.initFormGroupObject[total_key] = {
					//html: html,
					value: getData.value,
					colorPicker: getData.colorPicker
				};
				$(classNames.target).remove();
				this.utills.totalDATAMerge(_this.utills.initFormGroupObject);
			}
			this.utills.htmlAppendAfterCallback({
				afterCallback: this.obj.afterCallback
			});
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