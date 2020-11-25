fn.Create['Form'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initFormGroupObject = this.utills.initFormGroupObject;
		this.options = this.utills.options;
		this.create_key = this.options.keys[4];
		this.obj = $.extend(true, {
			classNames: {
				copyHtml: '.totalForm',
				cmmSortableWrap: '.cmmSortableWrap.step3',
				dataTotalKey: 'data-total-key',
			},
			beforeCallback: function () {
			},
			afterCallback: function () {
			},
		}, obj);
		if (typeof this.obj.beforeCallback === 'function') {
			this.obj.beforeCallback(this, this.obj);
		}
		return this;
	},
	fnGetItems: function (total_key, actions) {
		var _this = this;
		var classNames = this.obj.classNames;
		var $parent = $(classNames.modal);
		var html = '';

		html += '		<div class="item" ' + classNames.dataTotalKey + '="' + total_key + '">';
		html += '			<div class="itemInner">';
		html += '			<form id="'+total_key+'" class="rgsFromWrap">';
		html += $(classNames.copyHtml).html();
		html += '			</form>';
		html += '			</div>';
		html += '			<div class="btnWrap">';
		html += '				<a href="#;" title="삭제" onclick="FN_LANDING_FORM.fnDeleteItems(\'' + total_key + '\', event);">삭제</a>';
		html += '			</div>';
		html += '		</div>';
		if (actions === 'M') {//수정
			var t = $(classNames.cmmSortableWrap + ' [' + classNames.dataTotalKey + '="' + total_key + '"]');
			t.after(html);
			t.remove();
		} else {
			$(classNames.cmmSortableWrap).append(html);
			$(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"] .rgsFromAgree input[type="checkbox"]').attr("id", ""+total_key+"_AGREE");
			$(classNames.cmmSortableWrap).find('.item['+classNames.dataTotalKey+'="'+total_key+'"] .rgsFromAgree label').attr("for", ""+total_key+"_AGREE");
		}
		if (actions === 'N' || actions === 'M') {//신규추가 || 수정
			this.utills.initFormGroupObject[total_key] = {
				//html: html,
				html: "not_return_html",
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
		this.fnGetItems(this.total_key, 'N');
		this.utills.totalDataMergeAfterGotoBottom();
	},
}