fn.Create['ApplicantStatus'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initFormGroupObject = this.utills.initFormGroupObject;
		this.options = this.utills.options;
		this.create_key = this.options.keys[6];
		this.obj = $.extend(true, {
			classNames: {
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
	fnGetItems: function (total_key) {
		var _this = this;
		var classNames = this.obj.classNames;
		var $parent = $(classNames.modal);
		var html = '';

		html += '		<div class="item" ' + classNames.dataTotalKey + '="' + total_key + '">';
		html += '			<div class="itemInner">';
		html += '				<div class="onTexts">';
		html += '					<div class="onTit">신청자 현황 리스트</div>';
		html += '					<div class="onStit">※ 리스트는 실제 랜딩페이지에 표시 됩니다.</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="btnWrap">';
		html += '				<a href="#;" title="삭제" onclick="FN_LANDING_APPLICANTSTATUS.fnDeleteItems(\'' + total_key + '\', event);">삭제</a>';
		html += '			</div>';
		html += '		</div>';
		$(classNames.cmmSortableWrap).append(html);
		this.utills.initFormGroupObject[total_key] = {
				html: "not_return_html",
		};
		$(classNames.target).remove();
		this.utills.totalDATAMerge(_this.utills.initFormGroupObject);
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
	fnAddItems: function () {
		console.log(Object.keys(this.utills.initFormGroupObject))
		var object_keys = Object.keys(this.utills.initFormGroupObject);
		if(object_keys.length){
			for(var i = 0; i < object_keys.length; i++){
				if(object_keys[i].indexOf(this.create_key) != -1){
					$('#modalBox').find('.modal-body').text('이미 추가된 구성요소입니다.');
					$('#modalBox').modal('show');
					return false;
				}
			}
		}
		this.total_key = this.utills.localCreateTotalKey(this.create_key);
		this.utills.initFormGroupObject[this.total_key] = {};
		this.fnGetItems(this.total_key);
		this.utills.totalDataMergeAfterGotoBottom();
	},
}