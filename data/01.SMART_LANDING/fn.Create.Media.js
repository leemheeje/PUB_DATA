fn.Create['Media'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initFormGroupObject = this.utills.initFormGroupObject;
		this.options = this.utills.options;
		this.create_key = this.options.keys[3];
		this.obj = $.extend(true, {
			classNames: {
				modal: '#modalBoxCreateMedia',
				modalInInput: '.modalUploadMediaInput',
				submitButton: '.modalUploadMediaButton',
				cmmSortableWrap: '.cmmSortableWrap.step3',
				dataTotalKey: 'data-total-key',
			},
			beforeCallback: function () {
				$('#modalBoxCreateMedia').on('hidden.bs.modal', function (e) {
					$('#modalBoxCreateMedia .modalUploadMediaInput').val(''); //초기화
				});
			},
			afterCallback: function () {
				$('#modalBoxCreateMedia').modal('hide'); //밖에서 컨트롤옮겨야함
				$('#modalBoxCreateMedia .modalUploadMediaInput').val(''); //초기화
			},
		}, obj);
		if (typeof this.obj.beforeCallback === 'function') {
			this.obj.beforeCallback(this, this.obj);
		}
		return this;
	},
	setting: function (total_key, actions) {
		var classNames = this.obj.classNames;
		var data = this.utills.initFormGroupObject[total_key];
		if (actions === 'M') {
			$(classNames.modal).find(classNames.modalInInput).val(data.value);
		}
	},
	bindSubmitButton: function (total_key, actions) {
		var _this = this;
		var classNames = this.obj.classNames;
		console.log(actions);
		
		$(_this.obj.classNames.submitButton).off().on({
			'click': function (e) {
				e.preventDefault();
				var getData = $(classNames.modal).find(classNames.modalInInput).val();
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

		html += '<div class="item" ' + classNames.dataTotalKey + '="' + total_key + '">';
		html+='		<div class="itemInner">';
		html+='			<iframe width="560" height="315" src="https://www.youtube.com/embed/'+getData+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		html+='		</div>';
		html += '	<div class="btnWrap">';
		html += '		<a href="#;" title="수정" onclick="$(\'' + '#modalBoxCreateMedia' + '\').modal(\'show\');FN_LANDING_MEDIA.fnModifyItems(\'' + total_key + '\');">수정</a>';
		html += '		<a href="#;" title="삭제" onclick="FN_LANDING_MEDIA.fnDeleteItems(\'' + total_key + '\', event);">삭제</a>';
		html += '	</div>';
		html += '</div>';
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
				value: getData
			};
			$(classNames.target).remove();
			this.utills.totalDATAMerge(_this.utills.initFormGroupObject);
		}
		this.utills.htmlAppendAfterCallback({
			afterCallback: this.obj.afterCallback
		});
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