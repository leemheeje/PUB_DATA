fn.Create['Document'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initDocumentGroupObject = this.utills.initDocumentGroupObject;
		this.initDocumentGroupOptions = this.utills.initDocumentGroupOptions;
		this.options = this.utills.options;
		this.create_key = "D1";
		this.obj = $.extend(true, {
			classNames: {
				copyHtml: '.totalForm',
				cmmSortableWrap: '.cmmSortableWrap.step3',
				dataTotalKey: 'data-total-key',
			},
			beforeCallback:function(){
				var fnOptionsParseInput = function(name,ispx){return _this.fnOptionsParse('input',name,ispx)};
				var fnOptionsParseButton = function(name,ispx){return _this.fnOptionsParse('button',name,ispx)};
				$("#setOrder_color").val(fnOptionsParseInput('color'));
				$("#setOrder_color").minicolors('value',fnOptionsParseInput('color'));
				$("#setOrder_bg").val(fnOptionsParseInput('backgroundColor'));
				$("#setOrder_bg").minicolors('value',fnOptionsParseInput('backgroundColor'));
				$("#setOrder_pd").val(fnOptionsParseInput('lineHeight'));
				$("#setOrder_fontSize").val(fnOptionsParseInput('fontSize'));
				$("#setOrder_fontFamily").val(fnOptionsParseInput('fontFamily'));
				$("[name='setBtn_title']").val(fnOptionsParseButton('text'));
				$("#setBtn_color").val(fnOptionsParseButton('color'));
				$("#setBtn_color").minicolors('value', fnOptionsParseButton('color'));
				$("#setBtn_bg").val(fnOptionsParseButton('backgroundColor'));
				$("#setBtn_bg").minicolors('value', fnOptionsParseButton('backgroundColor'));
				$("#setBtn_border").val(fnOptionsParseButton('borderRadius'));
				$("#setBtn_width").val(fnOptionsParseButton('width'));
				$("#setBtn_fontSize").val(fnOptionsParseButton('fontSize'));
				$("#setBtn_fontFamily").val(fnOptionsParseButton('fontFamily'));
				$("#edit_btnHide").prop('checked', fnOptionsParseButton('hidden'));
			}
		}, obj);
		this.tnpMultiple = [];
		this.totalMulti = Object.keys(this.initDocumentGroupOptions).length ? this.initDocumentGroupOptions : {
			question: [],
			dataAnswer: [],
		};
		if(typeof this.obj.beforeCallback === 'function'){
			this.obj.beforeCallback();
		}
		$('.sortable.editBox').sortable({
			placeholder: 'drop-placeholder',
			update: function (e,t) {
				fn.Create.frontFormData = fn.Create.Utills.reassem(_this.initDocumentGroupObject, $('.sortable.editBox [data-total-key]'));
				_this.sortableUpdate(t);//신청서편집에서 솔테이블업데이트했을때 기존 랜딩디자인쪽에 신청서가 있다면 업데이트
				console.log('update')
			}
		});
		return this;
	},
	validatorAttrDataParams: function (params, total_key) {
		var initDocumentGroupObject = this.utills.initDocumentGroupObject[total_key];
		return JSON.stringify($.extend(true, {
			required: initDocumentGroupObject.required,
		}, params));
	},
	fnOptionsParse:function(gubun, name, ispx){
		var styles = '';
		var objects = this.initDocumentGroupOptions['styles'][gubun];
		if(objects[name]){
			styles = objects[name];
			if(ispx) styles = styles+ispx;
		}
		return styles;
	},
	fnCreateJqueryDOM: function (gubun, total_key, params) {
		var _this = this;
		var html = '';
		var options = this.options;
		var initDocumentGroupObject = this.utills.initDocumentGroupObject;
		var bool_checked = initDocumentGroupObject[total_key].required;
		var isInzng = function(){
			var bool = false;
			var data = Object.keys(initDocumentGroupObject);
			for(var i =0; i<data.length; i++){
				if(data[i].indexOf(options.documentKeys[8]) != -1){
					bool = true;
					break;
				}
			}
			return bool;
		};
		switch (gubun) {
			case options.documentKeys[1]:
				//연락처
				html += '<div class="grid form_tel initChecked">';
				html += '<div class="left"> <div class="tit">연락처</div>';
				html += '		<div class="ckBox">';
				html += '			<input type="checkbox" checked disabled onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="edit_multiple_' + total_key + '">';
				html += '			<label class="form-check-label" for="edit_multiple_' + total_key + '">*답변필수</label>';
				html += '		</div>';
				html += '</div>';
				html += '<div class="right">';
				if(isInzng()){ //불러올때 휴대폰인증이 있다면
					html += '<div class="isInputButton tp2 ">';
				}else{
					html += '<div class="isInputButton tp2 none">';
				}
				html += '	<input type="text" id="' + total_key + '" name="USER_PHONE_NUMBER" data-params=\'' + this.validatorAttrDataParams({
								required: true,
								ime: 'tel',
								autoHyphen: true
							}, total_key) + '\' class="form-control fnChangeTargetParams" maxLength="11" />';
				html += '	<button class="btn btn-secondary fnPhoneNumberAuthButton">인증번호발송</button>';
				html += '</div>';
				html += '</div>';
				break;
			case options.documentKeys[2]:
				//나이
				html += '<div class="grid form_year">';
				html += '<div class="left"> <div class="tit">나이</div> <div class="ckBox"> <input type="checkbox" onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="' + total_key + '_age"> <label class="form-check-label" for="' + total_key + '_age">*답변필수</label> </div> </div>';
				html += '<div class="right"> <input type="text" id="' + total_key + '" name="USER_AGE" data-params=\'' + this.validatorAttrDataParams({
					ime: 'number'
				}, total_key) + '\' class="form-control fnChangeTargetParams" maxLength="3" /> </div>';
				html += '<div class="btnDel" onclick="FN_LANDING_DOCUMENT.fnDeleteItems(\'' + total_key + '\', event);"> <i class="fas fa-times-circle"></i> </div>';
				html += '</div>';
				break;
			case options.documentKeys[3]:
				//성별
				html += '<div class="grid form_gender">';
				html += '<div class="left"> <div class="tit">성별</div> <div class="ckBox"> <input type="checkbox" onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="' + total_key + '_gender"> <label class="form-check-label" for="' + total_key + '_gender">*답변필수</label> </div> </div>';
				html += '<div class="right"> <select data-params=\'' + this.validatorAttrDataParams({}, total_key) + '\' name="USER_GENDER" class="form-control fnChangeTargetParams"><option value="">선택해주세요</option> <option value="남성">남성</option> <option value="여성">여성</option></select> </div>';
				html += '<div class="btnDel" onclick="FN_LANDING_DOCUMENT.fnDeleteItems(\'' + total_key + '\', event);"> <i class="fas fa-times-circle"></i> </div>';
				html += '</div>';
				break;
			case options.documentKeys[4]:
				//상담가능시간
				html += '<div class="grid form_time">';
				html += '<div class="left"> <div class="tit">상담가능시간</div> <div class="ckBox"> <input type="checkbox" onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="' + total_key + '_time"> <label class="form-check-label" for="' + total_key + '_time">*답변필수</label> </div> </div>';
				html += '<div class="right">';
				html += '<select data-params=\'' + this.validatorAttrDataParams({}, total_key) + '\' class="form-control fnChangeTargetParams" id="' + total_key + '" name="USER_TIME">';
				html += '	<option value="all">상시가능</option>';
				html += '	<option value="9:00 ~ 10:00">9:00 ~ 10:00</option>';
				html += '	<option value="10:00 ~ 11:00">10:00 ~ 11:00</option>';
				html += '	<option value="11:00 ~ 12:00">11:00 ~ 12:00</option>';
				html += '	<option value="12:00 ~ 13:00">12:00 ~ 13:00</option>';
				html += '	<option value="13:00 ~ 14:00">13:00 ~ 14:00</option>';
				html += '	<option value="14:00 ~ 15:00">14:00 ~ 15:00</option>';
				html += '	<option value="15:00 ~ 16:00">15:00 ~ 16:00</option>';
				html += '	<option value="16:00 ~ 17:00">16:00 ~ 17:00</option>';
				html += '	<option value="17:00 ~ 18:00">17:00 ~ 18:00</option>';
				html += '</select>';
				html += '<div class="btnDel" onclick="FN_LANDING_DOCUMENT.fnDeleteItems(\'' + total_key + '\', event);"> <i class="fas fa-times-circle"></i></div>';
				html += '</div>';
				html += '</div>';
				break;
			case options.documentKeys[5]:
				//거주지역
				html += '<div class="grid form_area">';
				html += '<div class="left"> <div class="tit">거주지역</div> <div class="ckBox"> <input type="checkbox" onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="' + total_key + '_area"> <label class="form-check-label" for="' + total_key + '_area">*답변필수</label> </div> </div>';
				html += '<div class="right"> <select data-params=\'' + this.validatorAttrDataParams({}, total_key) + '\' class="form-control fnChangeTargetParams" id="' + total_key + '" name="USER_AREA"> <option value=""></option> <option value="서울시">서울시</option> <option value="인천">인천</option> <option value="대전">대전</option> <option value="대구">대구</option> <option value="부산">부산</option> <option value="경기도">경기도</option> <option value="강원도">강원도</option> <option value="충청도">충청도</option> <option value="전라도">전라도</option> <option value="경상도">경상도</option> <option value="제주도">제주도</option> </select> </div>';
				html += '<div class="btnDel" onclick="FN_LANDING_DOCUMENT.fnDeleteItems(\'' + total_key + '\', event);"> <i class="fas fa-times-circle"></i> </div>';
				html += '</div>';
				break;
			case options.documentKeys[6]:
				//주관식
				html += '<div class="grid form_short">';
				html += '<div class="backToFrontHideShow">';
				html += '	<div class="left">';
				html += '		<div class="tit">주관식</div>';
				html += '		<div class="ckBox">';
				html += '			<input type="checkbox" onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="edit_short_' + total_key + '">';
				html += '			<label class="form-check-label" for="edit_short_' + total_key + '">*답변필수</label>';
				html += '		</div>';
				html += '	</div>';
				html += '	<div class="right"> <input type="text" value="'+(params.question ? params.question : '')+'" placeholder="질문을 입력하세요" class="form-control" /> </div>';
				html += '</div>';
				html += '<div class="backToFrontShowHide">';
				html += '	<div class="left">';
				html += '		<div class="tit"><div class="frontMultipleTitle"><span class="checkQuestion">';
				html += 			params.question ? params.question : '';
				html += '		</span></div></div>';
				html += '	</div>';
				html += '	<div class="right">';
				html += '		<input type="text" id="' + total_key + '" name="' + total_key + '" placeholder="답을 입력하세요" data-params=\'' + this.validatorAttrDataParams({}, total_key) + '\' class="form-control fnChangeTargetParams" />';
				html += '	</div>';
				html += '</div>';
				html += '<div class="btnDel" onclick="FN_LANDING_DOCUMENT.fnDeleteItems(\'' + total_key + '\', event);"> <i class="fas fa-times-circle"></i> </div>';
				html += '</div>';
				break;
			case options.documentKeys[7]:
				//객관식
				html += '<div class="grid form_multiple">';
				html += '<div class="backToFrontHideShow">';
				html += '	<div class="left">';
				html += '		<div class="tit">객관식</div>';
				html += '		<div class="ckBox">';
				html += '			<input type="checkbox" onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="edit_multiple_' + total_key + '">';
				html += '			<label class="form-check-label" for="edit_multiple_' + total_key + '">*답변필수</label>';
				html += '		</div>';
				html += '	</div>';
				html += '	<div class="right" >';
				html += '		<div class="line">';
				html += '			<button type="button" class="btn btn-primary openSurvey">질문선택</button>';
				html += '			<div class="qa">선택된 질문 : <span class="checkQuestion">'+(params.question ? params.question : '선택')+'</span></div>';
				html += '			<div class="qa">질문 답안 리스트 : <span class="checkAnswer">'+(params.answer?JSON.stringify(params.answer):'미설정')+'</span></div>';
				html += '			<button class="btn btn-secondary addMulti">질문추가</button>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				html += '<div class="backToFrontShowHide">';
				html += '	<div class="left">';
				html += '		<div class="tit"><div class="frontMultipleTitle"><span class="checkQuestion">';
				html += 			params.question ? params.question : '선택';
				html += '		</span></div></div>';
				html += '	</div>';
				html += '	<div class="right">';
				
				html += '		<select data-params=\'' + this.validatorAttrDataParams({}, total_key) + '\' class="form-control fnChangeTargetParams frontAnswerSelect" id="' + total_key + '" name="' + total_key + '">';
				if(params.answer){
					html += '		<option value="">선택해주세요</option>';
					if(Array.isArray(params.answer)){
						for(var i = 0; i<params.answer.length; i++){
							html += '		<option value="'+params.answer[i]+'">'+params.answer[i]+'</option>';
						}
					}
				}else{
							html += '		<option value="">미설정</option>';
				}
				html += '		</select>';
				
				html += '	</div>';
				html += '</div>';
				html += '<div class="btnDel" onclick="FN_LANDING_DOCUMENT.fnDeleteItems(\'' + total_key + '\', event);"> <i class="fas fa-times-circle"></i>';
				html += '</div>';
				break;
			case options.documentKeys[8]:
				//휴대폰인증
				html += '<div class="grid form_phone_auth initChecked">';
				html += '<div class="left"> <div class="tit">휴대폰 인증번호</div>';
				html += '		<div class="ckBox">';
				html += '			<input type="checkbox" checked disabled onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="' + total_key + '">';
				html += '			<label class="form-check-label" for="' + total_key + '">*인증필수</label>';
				html += '		</div>';
				html += '</div>';
				html += '<div class="right">';
				html += '<div class="isInputButton">';
				html += '	<input type="text" id="' + total_key + '" name="USER_PHONE_AUTH" data-params=\'' + this.validatorAttrDataParams({
					required: true,
				}, total_key) + '\' class="form-control fnChangeTargetParams" />';
				html += '	<button class="btn btn-secondary fnPhoneNumberAuthCodeButton">확인</button>';
				html += '</div>';
				html += '</div>';
				html += '<div class="btnDel" onclick="FN_LANDING_DOCUMENT.fnDeleteItems(\'' + total_key + '\', event);"> <i class="fas fa-times-circle"></i>';
				html += '</div>';
				break;
			default:
				//이름
				html += '<div class="grid form_name initChecked">';
				html += '<div class="left"> <div class="tit">이름</div>';
				html += '		<div class="ckBox">';
				html += '			<input type="checkbox" checked disabled onchange="FN_LANDING_DOCUMENT.fnChangeRequired(event, \'' + total_key + '\');" class="form-check-input fnCheckboxRequired" id="edit_multiple_' + total_key + '">';
				html += '			<label class="form-check-label" for="edit_multiple_' + total_key + '">*답변필수</label>';
				html += '		</div>';
				html += '</div>';
				html += '<div class="right"> <input type="text" id="' + total_key + '" name="USER_NAME" data-params=\'' + this.validatorAttrDataParams({
					required: true,
					//ime: 'koen'
				}, total_key) + '\' class="form-control" /> </div>';
				html += '</div>';
		}
		return html ? $(html) : false;
	},
	fnChangeRequired: function (event, total_key) {
		var $target = $(event.target);
		var $fnChangeParent = $('.grid[data-total-key="'+total_key+'"]');
		var $fnChangeTargetParams = $fnChangeParent.find('.fnChangeTargetParams');
		var params = $fnChangeTargetParams.data('params') || {};
		if (this.utills.initDocumentGroupObject[total_key]) {
			this.utills.initDocumentGroupObject[total_key].required = $target[0].checked;
			if($target[0].checked){
				$fnChangeParent.addClass('required');
			}else{
				$fnChangeParent.removeClass('required');
			}
		}
		$fnChangeTargetParams.attr('data-params', JSON.stringify($.extend(true, params, {
			required: $target[0].checked
		})));
	},
	fnAddQuestion: function () {
		if ($('.question').find('input').val() <= 0) {
			alert('객관식 질문을 입력해주세요');
			return false;
		} else {
			var valid = false;
			$('.answer').each(function () {
				if ($(this).find('input').val() <= 0) {
					alert('답안을 입력해주세요.');
					valid = true;
				}
			})
			if (valid) return false;
		}

		var dataQuestion = $('.question').find('input').val();
		var dataAnswer = [];
		$('.answer').each(function () {
			dataAnswer.push($(this).find('input').val());
			$(this).find('input').val('');
		})


		//질문,답 푸쉬
		this.totalMulti.question.push(dataQuestion);
		this.totalMulti.dataAnswer.push(dataAnswer);
		this.initDocumentGroupOptions = this.totalMulti;
		this.utills.totalDocumentOptionsMerge(this.initDocumentGroupOptions);
		$('.question').find('input').val('');
		$('#surveyBox').modal('hide');
	},
	fnGetItems: function (gubun, total_key, params) {
		var _this = this;
		var params = params ? params : {};
		var initDocumentGroupObject = this.utills.initDocumentGroupObject;
		initDocumentGroupObject[total_key] = $.extend(true, initDocumentGroupObject[total_key], {
			total_key: total_key,
		});
		//추가된 아이템의 돔조작:S
		var $createTarget = this.fnCreateJqueryDOM(gubun, total_key, params);
		var $createTargetDOM = $createTarget.appendTo($('.sortable.editBox'));
		var $checkboxParent = $createTargetDOM.closest('.grid');
		var $checkbox = $checkboxParent.find('.fnCheckboxRequired');
		$createTargetDOM.attr(_this.obj.classNames.dataTotalKey, total_key);
		$checkbox.prop('checked', initDocumentGroupObject[total_key]['required']);
		if(initDocumentGroupObject[total_key]['required']){
			$checkboxParent.addClass('required');
		}else{
			$checkboxParent.removeClass('required');
		}
		//추가된 아이템의 돔조작:E
		//initDocumentGroupObject[total_key]['html'] = $createTargetDOM[0].outerHTML; //html넣으면 JSON.parse에서 오류""''
		if(gubun === 'D0' || gubun === 'D1' || gubun === 'D8'){//이름,연락처,인증은 필수값
			initDocumentGroupObject[total_key]['required'] = true;
			if(gubun === 'D8'){
				//인증번호필드가 추가되면 D1(연락처)의 "인증번호발송" 버튼 visible
				$('.sortable.editBox .grid['+_this.obj.classNames.dataTotalKey+'^="D1"] .isInputButton').removeClass('none');
			}
		}
		initDocumentGroupObject[total_key]['required'] = initDocumentGroupObject[total_key]['required'] || false;
		this.utills.totalDocumentDATAMerge(initDocumentGroupObject);
		this.optionsUpdate();
		$('.sortable.editBox').customTags();
	},
	fnDeleteItems: function (total_key, e) {
		if (this.utills.initDocumentGroupObject[total_key]) {
			delete this.utills.initDocumentGroupObject[total_key];
			this.utills.totalDocumentDATAMerge(this.utills.initDocumentGroupObject);
		}
		$('.grid[' + this.obj.classNames.dataTotalKey + '="'+total_key+'"]').remove();
		if(total_key.indexOf('D8') != -1){
			//인증번호필드가 삭제되면 D1(연락처)의 "인증번호발송" 버튼 hidden
			$('.sortable.editBox .grid['+this.obj.classNames.dataTotalKey+'^="D1"] .isInputButton').addClass('none');
		}
	},
	fnAddItems: function (gubun) {
		this.create_key = gubun;
		var options = this.options;
		var groupKeysArray = Object.keys(this.utills.initDocumentGroupObject);
		if(LANDING_TEMPLATE_TYPE.mode && groupKeysArray.length >= LANDING_TEMPLATE_TYPE.documentAddItemLength){
			$('#modalBox').find('.modal-body').text('템플릿'+LANDING_TEMPLATE_TYPE.mode+'의 신청서항목은 '+LANDING_TEMPLATE_TYPE.documentAddItemLength+'개까지만 추가 가능합니다.');
			$('#modalBox').modal('show');
			return;
		}
		if (gubun !== options.documentKeys[6] && gubun !== options.documentKeys[7]) { //주관식,객관식 빼고는 하나만 등록가능
			if (groupKeysArray.length) {
				var bool_return = false;
				groupKeysArray.forEach(function (key) {
					if (key.indexOf(gubun) != -1) {
						bool_return = true;
						$('#modalBox').find('.modal-body').text('이미 추가된 구성요소입니다.');
						$('#modalBox').modal('show');
						return;
					}
				});
				if (bool_return) return; //중복의 입력폼이 있을때는 추가X
			}
		}
		this.total_key = this.utills.localCreateTotalKey(this.create_key, this.initDocumentGroupObject);
		this.utills.initDocumentGroupObject[this.total_key] = {};
		this.fnGetItems(gubun, this.total_key);
		this.utills.totalDataMergeAfterGotoBottom();
	},
	sortableUpdate:function($target){
		var _this = this;
		var classNames = this.obj.classNames;
		var $target = $target.item;
		var total_key = $target.data('totalKey');
		var dataSortArray = Object.keys(fn.Create.frontFormData);
		$(classNames.cmmSortableWrap).find('['+classNames.dataTotalKey+'^="C5"]').each(function(){
			var $this = $(this);
			var $appendDOM = $this.find('.sortable.editBox');
			var $grid = $this.find('.grid['+classNames.dataTotalKey+'="'+total_key+'"]');
			var dataSortIndex = dataSortArray.indexOf(total_key);
			if(dataSortIndex == dataSortArray.length-1){//맨끝으로 보냈을때, 현재인덱스값 == 전체데이타갯수-1
				$appendDOM.append($grid);
			}else if(dataSortIndex-1 >= 0){//after에 선언을 위한 -1
				$appendDOM.find('.grid:eq('+(dataSortIndex-1)+')').after($grid);//after에 선언을 위한 -1
			}else{
				$appendDOM.find('.grid:eq(0)').before($grid);
			}
		});
	},
	optionsUpdate:function(){
		var _this = this;
		var fnOptionsParseInput = function(name,ispx){return _this.fnOptionsParse('input',name,ispx)};
		var fnOptionsParseButton = function(name,ispx){return _this.fnOptionsParse('button',name,ispx)};
		this.utills.totalDocumentOptionsMerge(this.initDocumentGroupOptions);//폼옵션도 같이 업데이트
		$('.grid .tit').css({
			'color': fnOptionsParseInput('color'),
			'fontFamily': fnOptionsParseInput('fontFamily'),
			'fontSize': fnOptionsParseInput('fontSize'),
		});
		$('.editBox').css('backgroundColor', fnOptionsParseInput('backgroundColor'));
		$('.grid').css({ 'paddingTop': fnOptionsParseInput('lineHeight','px'), 'paddingBottom': fnOptionsParseInput('lineHeight','px') })
		$('.btnStyle button').text(fnOptionsParseButton('text'));
		$('.btnStyle button').css('color', fnOptionsParseButton('color'));
		$('.btnStyle button').css('backgroundColor', fnOptionsParseButton('backgroundColor'));
		$('.btnStyle button').css('borderRadius', fnOptionsParseButton('borderRadius', 'px'));
		$('.btnStyle button').css('width', fnOptionsParseButton('width', '%'));
		$('.btnStyle button').css('fontFamily', fnOptionsParseButton('fontFamily'));
		$('.btnStyle button').css('fontSize', fnOptionsParseButton('fontSize'));
		if(fnOptionsParseButton('hidden')){
			$('.btnStyle .fnCreateDocumentSubmitButton').addClass('backToFrontHideShow inline');
		}else{
			$('.btnStyle .fnCreateDocumentSubmitButton').removeClass('backToFrontHideShow inline');
		}
		//console.log(fn.Create.frontFormOption);
	},
}