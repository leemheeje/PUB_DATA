fn.Create['LandingTemplateTypeA'] = {
	init: function (utills, obj) {
		var _this = this;
		this.utills = utills;
		this.initLandingTemplateTypeAOject = this.utills.initLandingTemplateTypeAOject;
		this.options = {
			className: {
				landingTemplateItemsWrap: '.landingTemplateItemsWrap',
				landingDesignFormInner: '.landingDesignFormInner',
				setSectionBackground: '.setSectionBackground',
				sessionSelectAddButtonTarget: '.sessionSelectAddButtonTarget',
				sessionSelectAddResultTarget: '.sessionSelectAddResultTarget',
				setSectionFooterImageInput: '.setSectionFooterImageInput',
				setSectionAnimationType: '#setSectionAnimationType',
				isAllSession: '[name="isAllSession"]',
			},
			sessionInitAptions: {
				buttonLength: 2,
				backgroundColor: '#fff',
			},
			fileInitObject: {
				file: null,
				imagePreveiw: '',
				change_input: false,
			}
		};
		this.sessionKeys = this.utills.options.templateASessionKeys;
		this.selectButtonKeys = 'B0';
		this.clsFormat = this.utills.clsFormat;
		this.bind($(document));
		console.log(utills)
		return this;
	},
	bind: function ($self) {
		var $self = $self ? $self : $(document);
		var _this = this;
		var className = this.options.className;
		var sessionKeys = this.sessionKeys;
		var fileInitObject = this.options.fileInitObject;
		var getTotalKey = function ($this) {
			return $this.closest('[data-total-key]').data('totalKey');
		}
		var restoreData = function (e, sessionKey, imageKey) {
			var files = e.target.files;
			console.log(files)
			if (files.length) {
				if (typeof files === 'object') {
					_this.initLandingTemplateTypeAOject[sessionKey][imageKey] = {
							file: files[0],
							imagePreveiw: '',
							change_input: true,
						};
					console.log(files[0].name)
					console.log(sessionKey+'  '+imageKey)
					console.log(_this.initLandingTemplateTypeAOject[sessionKey][imageKey])
					console.log(_this.initLandingTemplateTypeAOject[sessionKey])
				}
			}
		};
		var sessionGetTotalKey = function ($this, isButton) {
			if (isButton) {
				return $this.closest('[data-select-button]').data('selectButton');
			} else {
				return $this.closest('[data-select-result]').data('selectResult');
			}
		}
		var sessionRestoreData = function (e, sessionKey, imageKey, isButton) {
			var files = e.target.files;
			var data = {};
			if (files.length) {
				if (typeof files === 'object') {
					if (isButton) {
						data = _this.initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'];
					} else {
						data = _this.initLandingTemplateTypeAOject[sessionKeys[1]]['resultSessionObject'];
					}
					data[sessionKey][imageKey] = {
							file: files[0],
						imagePreveiw: '',
						change_input: true,
					};
				}
			}
		};
		var initFooterData = _this.initLandingTemplateTypeAOject[sessionKeys[3]];
		if(initFooterData) {
			if(initFooterData.footerImage.imagePreveiw){
				console.log(initFooterData.footerImage.imagePreveiw)
				if($self.find(className.setSectionFooterImageInput).length){
					$self.find(className.setSectionFooterImageInput)[0].defaultValue=initFooterData.footerImage.imagePreveiw.fileName;
				}
			}
			$self.find(className.isAllSession).each(function(){
				if($(this).val() == initFooterData.isAllSession){
					$(this).prop('checked' , true);
				}
			});
			$self.find(className.setSectionAnimationType).val(initFooterData.animationType);
			$self.find('.tabBox.step1').customTags(); 
		}
		$self.find(className.setSectionFooterImageInput).on('change', function (e) {//document쪽 풋터이미지파일
			restoreData(e, sessionKeys[3], 'footerImage');
		});
		$self.find('[name^="TOP_IMAGE_S"]').on('change', function (e) {
			restoreData(e, getTotalKey($(this)), 'topImage');
		});
		$self.find('[name^="BUTTON_IMAGE"]').on('change', function (e) {
			restoreData(e, getTotalKey($(this)), 'buttonImage');
		});
		$self.find('[name^="BOTTOM_IMAGE"]').on('change', function (e) {
			restoreData(e, getTotalKey($(this)), 'bottomImage');
		});
		$self.find('[name^="SELECT_BUTTON_IMAGE"]').on('change', function (e) {
			sessionRestoreData(e, sessionGetTotalKey($(this), true), 'buttonImage', true);
		});
		$self.find('[name^="SELECT_RESULT_TOP_IMAGE"]').on('change', function (e) {
			sessionRestoreData(e, sessionGetTotalKey($(this), false), 'topImage', false);
		});
		$self.find('[name^="SELECT_RESULT_BUTTON_IMAGE"]').on('change', function (e) {
			sessionRestoreData(e, sessionGetTotalKey($(this), false), 'buttonImage', false);
		});
		$self.find('[name^="TOP_IMAGE_INPUT"]').on('change', function (e) {
			_this.initLandingTemplateTypeAOject[getTotalKey($(this))]['topImageInput'] = e.target.value;

		});
		$self.find('[name^="SELECT_BUTTON_INPUT"]').on('change', function (e) {
			var $this = $(this);
			var selectButtonKey = $this.closest('[data-select-button]').data('selectButton');
			_this.initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'][sessionGetTotalKey($(this), true)]['buttonText'] = e.target.value;
			$('#SELECT_RADIO_BUTTON_'+selectButtonKey).val(e.target.value);
		});
		$self.find(className.isAllSession).on({
			'change': function (e) {//document쪽 풋터이미지파일
				var $this = $(this);
				if ($this.is(':checked')) {
					_this.initLandingTemplateTypeAOject[sessionKeys[3]].isAllSession = $this.val();
				}
			},
		});
		$self.find(className.setSectionAnimationType).on('change', function (e) {
			var $this = $(this);
			_this.initLandingTemplateTypeAOject[sessionKeys[3]].animationType = $this.val();
		});
	},
	fnDataMerge: function (gubun, isAddData, isInitData) {
		var _this = this;
		var sessionKeys = this.sessionKeys;
		var sessionInitAptions = this.options.sessionInitAptions;
		if (isAddData) {
			_this.utills.totalLandingTemplateTypeADATAMerge(_this.utills.initLandingTemplateTypeAOject);
			this.bind();
			; (function () {//섹션 가져오고 콜백상황 밖으로 빼든 예외처리하든 해야함
				if (gubun == 'S0_L0') {
					$('.tabBox.step3 .editAdd li:eq(0)').addClass('active');
				}
				if (gubun == 'S1_L1') {
					$('.tabBox.step3 .editAdd li:eq(1)').addClass('active');
				}
			})();
		} else {
			delete this.utills.initLandingTemplateTypeAOject[gubun];
			this.utills.totalLandingTemplateTypeADATAMerge(this.utills.initLandingTemplateTypeAOject);
			; (function () {//섹션 가져오고 콜백상황 밖으로 빼든 예외처리하든 해야함
				if (gubun == 'S0_L0') {
					$('.tabBox.step3 .editAdd li:eq(0)').removeClass('active');
				}
				if (gubun == 'S1_L1') {
					$('.tabBox.step3 .editAdd li:eq(1)').removeClass('active');
				}
			})();
		}
	},
	fnGetItemsCallback: function (gubun, isInitData) {
		var _this = this;
		var sessionKeys = this.sessionKeys;
		var className = this.options.className;
		var sessionInitAptions = isInitData ? this.initLandingTemplateTypeAOject[gubun].sessionInitAptions :this.options.sessionInitAptions;
		if (gubun === sessionKeys[0]) {//gate섹션 html추가 후 DOM콜백

		} else if (gubun === sessionKeys[1]) {//select섹션 html추가 후 DOM콜백
			$(className.landingDesignFormInner).find('.cmmCountAddMin').each(function () {
				var $this = $(this);
				var $params = $this.data('params');
				$this.cmmCountAddMin($.extend(true, {
					defaultValue: sessionInitAptions.buttonLength,
					minCount: 2,
					maxCount: 4,
					afterCallback: function (currentValue, previousValue, $targetInput) {
						console.log(currentValue, previousValue)
						$targetInput.val('버튼 ' + currentValue + '개');
						$this.find('[name="selectSectionButtonCount"]').val(currentValue);
						/*for (var i = 0; i < Math.abs(currentValue) - Math.abs(previousValue); i++) {
							_this.fnCreateSelectAddMinButton(true);
						}*/
						_this.utills.initLandingTemplateTypeAOject[gubun].sessionInitAptions.buttonLength = currentValue;
						_this.utills.totalLandingTemplateTypeADATAMerge(_this.utills.initLandingTemplateTypeAOject);
					},
					addButtonCallback: function (currentValue, previousValue, $targetInput) {
						_this.options.sessionInitAptions.buttonLength = currentValue;
						for (var i = 0; i < Math.abs(currentValue) - Math.abs(previousValue); i++) {
							_this.fnCreateSelectAddMinButton(true);
						}
					},
					minButtonCallback: function (currentValue, previousValue, $targetInput) {
						_this.options.sessionInitAptions.buttonLength = currentValue;
						for (var i = 0; i < Math.abs(previousValue) - Math.abs(currentValue); i++) {
							_this.fnCreateSelectAddMinButton(false);
						}
					},
				}, $params));
			});
			if(isInitData){
				for(var key in _this.utills.initLandingTemplateTypeAOject[gubun].selectButtonKeysObject){
					this.fnCreateSelectAddMinButton(true, isInitData, key);
				}
			}else{
				for (var i = 0; i < sessionInitAptions.buttonLength; i++) {
					this.fnCreateSelectAddMinButton(true);
				}
			}
		} else if (gubun === sessionKeys[2]) {//end섹션 html추가 후 DOM콜백

		}
	},
	fnDeleteItems: function (gubun) {
		var className = this.options.className;
		var initLandingTemplateTypeAOject = this.utills.initLandingTemplateTypeAOject;
		if (confirm('기존에 등록된 데이타는 모두 삭제됩니다.\n삭제하시겠습니까?\n\n*기존데이타(저장된 데이타)가 있다면  새로고침(F5)으로 불러올수있습니다.')) {
			$(className.landingTemplateItemsWrap + '[data-total-key="' + gubun + '"]').remove();
			this.fnDataMerge(gubun, false);
		}
	},
	fnCreateSelectAddMinButton: function (bool, isInitData, initSelectButtonKeys) {
		var className = this.options.className;
		var fileInitObject = this.options.fileInitObject;
		var sessionKeys = this.sessionKeys;
		var initLandingTemplateTypeAOject = this.utills.initLandingTemplateTypeAOject;
		if (bool) {//추가일때
			if(initSelectButtonKeys && isInitData){
				var selectButtonKeys = initSelectButtonKeys;
				var $sessionSelectAddButton = this.fnCreateJqueryDOM('sessionSelectAddButton', selectButtonKeys, isInitData);
				var $sessionSelectAddResult = this.fnCreateJqueryDOM('sessionSelectAddResult', selectButtonKeys, isInitData);
			}else{
				var selectButtonKeys = this.utills.localCreateTotalKey(this.selectButtonKeys, initLandingTemplateTypeAOject[sessionKeys[1]].selectButtonKeysObject);
				var $sessionSelectAddButton = this.fnCreateJqueryDOM('sessionSelectAddButton', selectButtonKeys);
				var $sessionSelectAddResult = this.fnCreateJqueryDOM('sessionSelectAddResult', selectButtonKeys);
				initLandingTemplateTypeAOject[sessionKeys[1]].selectButtonKeysObject[selectButtonKeys] = {
					buttonImage: '',
					buttonText: ''
				};
				initLandingTemplateTypeAOject[sessionKeys[1]].resultSessionObject[selectButtonKeys] = {
					topImage: '', 		//추가된 결과섹션의 상단이미지
					buttonImage: '', 	//추가된 결과섹션의 버튼이미지
				}; //{image, alt} 넣어야함
			}
			var $sessionSelectAddButtonDOM = $sessionSelectAddButton.appendTo($(className.sessionSelectAddButtonTarget));
			var $sessionSelectAddResultDOM = $sessionSelectAddResult.appendTo($(className.sessionSelectAddResultTarget));
			$($sessionSelectAddButtonDOM).customTags();
			$($sessionSelectAddResultDOM).customTags();
			this.bind($sessionSelectAddButtonDOM);
			this.bind($sessionSelectAddResultDOM);
		} else {//삭제일때
			var selectButtonKeysObject = initLandingTemplateTypeAOject[sessionKeys[1]].selectButtonKeysObject;
			var resultSessionObject = initLandingTemplateTypeAOject[sessionKeys[1]].resultSessionObject;
			$(className.sessionSelectAddButtonTarget + ' [data-select-button]:last').remove();
			$(className.sessionSelectAddResultTarget + ' [data-select-result]:last').remove();
			delete selectButtonKeysObject[Object.keys(selectButtonKeysObject)[Object.keys(selectButtonKeysObject).length - 1]];
			delete resultSessionObject[Object.keys(resultSessionObject)[Object.keys(resultSessionObject).length - 1]];
		}
		this.utills.totalLandingTemplateTypeADATAMerge(initLandingTemplateTypeAOject);

	},
	fnGetItems: function (gubun, isInitData) {
		var _this = this;
		var className = this.options.className;
		var fileInitObject = this.options.fileInitObject;
		var sessionKeys = this.sessionKeys;
		var sessionInitAptions = this.options.sessionInitAptions;
		console.log('☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆')
		console.log(isInitData)
		console.log(gubun)
		if (!isInitData) {
			if (gubun == sessionKeys[0]) {
				_this.utills.initLandingTemplateTypeAOject[gubun] = {
					sessionType: gubun,
					sessionInitAptions: {
						backgroundColor: sessionInitAptions.backgroundColor
					},
					topImage: '',
					bottomImage: '',
					buttonImage: '',
				};
			} else if (gubun == sessionKeys[1]) {
				_this.utills.initLandingTemplateTypeAOject[gubun] = {
					sessionType: gubun,
					sessionInitAptions: {
						buttonLength: sessionInitAptions.buttonLength,
						backgroundColor: sessionInitAptions.backgroundColor
					},
					topImage: '',
					topImageInput: '',
					selectButtonKeysObject: {},
					resultSessionObject: {},
				};
			} else {
				_this.utills.initLandingTemplateTypeAOject[gubun] = {
					sessionType: gubun,
					sessionInitAptions: {
						backgroundColor: sessionInitAptions.backgroundColor
					},
					topImage: '',
					buttonImage: '',
				};
			}
		}
		var $createTarget = _this.fnCreateJqueryDOM(gubun, '', isInitData);
		var $createTargetDOM = (function () {
			var $dom = null;
			if (gubun === sessionKeys[0]) { //gate세션추가할땐 가장상단에 추가
				$dom = $createTarget.prependTo($(className.landingDesignFormInner));
			} else if (gubun === sessionKeys[1]) {//select세션추가할땐 중간에 추가
				var $sessionTypeS0 = $(className.landingDesignFormInner).find('[data-total-key="' + sessionKeys[0] + '"]');
				if ($sessionTypeS0.length) {
					$sessionTypeS0.after($createTarget);
					$dom = $(className.landingDesignFormInner).find('[data-total-key="' + sessionKeys[1] + '"]')
				} else {
					$dom = $createTarget.prependTo($(className.landingDesignFormInner));
				}
			} else {//end세션추가할땐 맨 하단부
				$dom = $createTarget.appendTo($(className.landingDesignFormInner));
			}
			return $dom;
		})();
		console.log($createTargetDOM)
		$createTargetDOM.customTags();
		_this.fnGetItemsCallback(gubun, isInitData);
		_this.fnDataMerge(gubun, true, isInitData);
	},
	fnCreateJqueryDOM: function (gubun, selectButtonKeys, isInitData) {
		var _this = this;
		var html = '';
		var sessionKeys = this.sessionKeys;
		var className = this.options.className;
		var initLandingTemplateTypeAOject = this.initLandingTemplateTypeAOject;
		var sessionInitAptions = {};
		if (gubun == sessionKeys[0] || gubun == sessionKeys[1] || gubun == sessionKeys[2]) {
			sessionInitAptions = initLandingTemplateTypeAOject[gubun].sessionInitAptions;
		}
		switch (gubun) {
			case 'sessionSelectAddResult':
				html += '						<div class="secItems" data-select-result="' + selectButtonKeys + '">';
				html += '							<div class="scTit">' + _this.stringReplace(selectButtonKeys) + '-결과<br/>섹션</div>';
				html += '							<div class="inpForms">';
				html += '								<div class="row">';
				html += '									<div class="col-lg-3"><label class="itmLabel">상단이미지' + _this.stringReplace(selectButtonKeys) + '</label></div>';
				html += '									<div class="col-lg-9">';
				html += '										<div class="cmmFakFile">';
				html += '											<img src="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['resultSessionObject'][selectButtonKeys].topImage.imagePreveiw.fileDownloadUri
						: ''
				)+'" class="backToFrontShowHide '+selectButtonKeys+'" data-template-image-gubun="SELECT_RESULT_TOP_IMAGE_' + selectButtonKeys + '" alt=""/>';
				html += '											<div class="fkf_input"></div>';
				html += '											<label for="SELECT_RESULT_TOP_IMAGE_' + selectButtonKeys + '" class="fkf_label">파일선택</label>';
				html += '											<input type="file" value="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['resultSessionObject'][selectButtonKeys].topImage.imagePreveiw.fileName
						: ''
				)+'" id="SELECT_RESULT_TOP_IMAGE_' + selectButtonKeys + '" name="SELECT_RESULT_TOP_IMAGE_' + selectButtonKeys + '" class="form-control" />';
				html += '										</div>';
				html += '										';
				//html += '										<input type="text" class="form-control itmText" placeholder="이미지설명을 입력해주세요."/>';
				html += '									</div>';
				html += '								</div>';
				html += '								<div class="row">';
				html += '									<div class="col-lg-3"><label class="itmLabel">버튼이미지' + _this.stringReplace(selectButtonKeys) + '</label></div>';
				html += '									<div class="col-lg-9">';
				html += '										<div class="cmmFakFile">';
				html += '											<img src="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['resultSessionObject'][selectButtonKeys].buttonImage.imagePreveiw.fileDownloadUri
						: ''
				)+'" class="backToFrontShowHide '+selectButtonKeys+'" data-template-image-gubun="SELECT_RESULT_BUTTON_IMAGE_'+selectButtonKeys+'" alt=""/>';
				html += '											<div class="fkf_input"></div>';
				html += '											<label for="SELECT_RESULT_BUTTON_IMAGE_' + selectButtonKeys + '" class="fkf_label">파일선택</label>';
				html += '											<input type="file" value="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['resultSessionObject'][selectButtonKeys].buttonImage.imagePreveiw.fileName
						: ''
				)+'"  id="SELECT_RESULT_BUTTON_IMAGE_' + selectButtonKeys + '" name="SELECT_RESULT_BUTTON_IMAGE_' + selectButtonKeys + '" class="form-control" />';
				html += '										</div>';
				//html += '										<input type="text" class="form-control itmText" placeholder="이미지설명을 입력해주세요."/>';
				html += '									</div>';
				html += '								</div>';
				html += '							</div>';
				html += '						</div>';
				break;
			case 'sessionSelectAddButton':
				html += '								<div class="row" data-select-button="' + selectButtonKeys + '">';
				html += '									<div class="col-lg-3"><label class="itmLabel">버튼이미지' + _this.stringReplace(selectButtonKeys) + '</label></div>';
				html += '									<div class="col-lg-9">';
				html += '										<div class="cmmFakFile">';
				html += '											<div class="backToFrontShowHide selectRadioButton">';
				html += '											<input type="radio" name="SELECT_RADIO_BUTTON_'+sessionKeys[1]+'" id="SELECT_RADIO_BUTTON_'+selectButtonKeys+'" value="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'][selectButtonKeys].buttonText
						: ''		
				)+'"/>';
				html += '											<label for="SELECT_RADIO_BUTTON_'+selectButtonKeys+'">';
				html += '											<img src="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'][selectButtonKeys].buttonImage.imagePreveiw.fileDownloadUri
						: ''
				)+'" class="'+selectButtonKeys+'" data-template-image-gubun="SELECT_BUTTON_IMAGE_'+selectButtonKeys+'" alt=""/>';
				html += '											</label>';
				html += '											</div>';
				html += '											<div class="fkf_input"></div>';
				html += '											<label for="SELECT_BUTTON_IMAGE_' + selectButtonKeys + '" class="fkf_label">파일선택</label>';
				console.log(initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'])
				console.log(initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'][selectButtonKeys])
				console.log(selectButtonKeys)
				html += '											<input type="file" value="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'][selectButtonKeys].buttonImage.imagePreveiw.fileName
						: ''
				)+'"  id="SELECT_BUTTON_IMAGE_' + selectButtonKeys + '" name="SELECT_BUTTON_IMAGE_' + selectButtonKeys + '" class="form-control" data-params=\'' + JSON.stringify({
					ime: 'image',
					required: true
				}) + '\'/>';
				html += '										</div>';
				html += '										<input type="text"  value="'+(
						selectButtonKeys && isInitData
						? initLandingTemplateTypeAOject[sessionKeys[1]]['selectButtonKeysObject'][selectButtonKeys].buttonText
						: ''
				)+'" class="form-control itmText" name="SELECT_BUTTON_INPUT_' + selectButtonKeys + '" placeholder="이미지설명을 입력해주세요."/>';
				html += '									<span class="backToFrontHideShow" style="display: block;text-align: left;font-size: 12px;color: #d43f3a;">* 객관식답변에 할당 될 문구입니다.</span>';
				html += '									</div>';
				html += '								</div>';
				break;
			case sessionKeys[0]: //gate섹션
				html += '<div class="landingTemplateItemsWrap templateAgate" data-total-key="' + gubun + '" style="background-color: '+sessionInitAptions.backgroundColor+'">';
				html += '	<div class="landingTemplateItems">';
				html += '		<div class="setSectionRightTopArea backToFrontHideShow">';
				html += '			<label>배경색</label>';
				html += '				<input type="text" class="form-control cmmColorPicker setSectionBackground" data-params=\'' + JSON.stringify({
					"defaultValue": sessionInitAptions.backgroundColor
				}) + '\'/>';
				html += '		</div>';
				html += '		<div class="landingTemplateItemsInner">';
				html += '			<div class="landingTemplateContents">';
				html += '				<div class="inner">';
				html += '					<div class="secItems">';
				html += '						<div class="scTit">Gate<br/>섹션</div>';
				html += '						<div class="inpForms">';
				html += '							<div class="row">';
				html += '								<div class="col-lg-3"><label class="itmLabel">상단이미지</label></div>';
				html += '								<div class="col-lg-9">';
				html += '									<div class="cmmFakFile">';
				html += '										<img src="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].topImage.imagePreveiw.fileDownloadUri
						: ''		
				)+ '" class="backToFrontShowHide '+gubun+'" data-template-image-gubun="TOP_IMAGE_' + gubun + '" alt=""/>';
				html += '										<div class="fkf_input"></div>';
				html += '										<label for="TOP_IMAGE_' + gubun + '" class="fkf_label">파일선택</label>';
				html += '										<input type="file"  value="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].topImage.imagePreveiw.fileName
						: ''		
				)+ '" id="TOP_IMAGE_' + gubun + '" name="TOP_IMAGE_' + gubun + '" class="form-control" data-params=\'' + JSON.stringify({
					ime: "image",
					required: true
				}) + '\'/>';
				html += '									</div>';
				html += '								</div>';
				html += '							</div>';
				html += '							<div class="row">';
				html += '								<div class="col-lg-3"><label class="itmLabel">하단이미지</label></div>';
				html += '								<div class="col-lg-9">';
				html += '									<div class="cmmFakFile">';
				html += '										<img src="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].bottomImage.imagePreveiw.fileDownloadUri
						: ''		
				)+ '" class="backToFrontShowHide '+gubun+'" data-template-image-gubun="BOTTOM_IMAGE_' + gubun + '" alt=""/>';
				html += '										<div class="fkf_input"></div>';
				html += '										<label for="BOTTOM_IMAGE_' + gubun + '" class="fkf_label">파일선택</label>';
				html += '										<input type="file" value="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].bottomImage.imagePreveiw.fileName
						: ''		
				)+ '"  id="BOTTOM_IMAGE_' + gubun + '" name="BOTTOM_IMAGE_' + gubun + '" class="form-control" data-params=\'' + JSON.stringify({
					ime: "image",
					required: true
				}) + '\'/>';
				html += '									</div>';
				html += '								</div>';
				html += '							</div>';
				html += '							<div class="row">';
				html += '								<div class="col-lg-3"><label class="itmLabel">버튼이미지</label></div>';
				html += '								<div class="col-lg-9">';
				html += '									<div class="cmmFakFile">';
				html += '										<img src="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].buttonImage.imagePreveiw.fileDownloadUri
						: ''		
				)+ '" class="backToFrontShowHide '+gubun+'" data-template-image-gubun="BUTTON_IMAGE_'+gubun+'" alt=""/>';
				html += '										<div class="fkf_input"></div>';
				html += '										<label for="BUTTON_IMAGE_' + gubun + '" class="fkf_label">파일선택</label>';
				html += '										<input type="file" value="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].buttonImage.imagePreveiw.fileName
						: ''		
				)+ '"  id="BUTTON_IMAGE_' + gubun + '" name="BUTTON_IMAGE_' + gubun + '" class="form-control" data-params=\'' + JSON.stringify({
					ime: "image",
					required: true
				}) + '\'/>';
				html += '									</div>';
				html += '								</div>';
				html += '							</div>';
				html += '						</div>';
				html += '					</div>';
				html += '				</div>';
				html += '			</div>';
				html += '		</div>';
				html += '	</div>';
				html += '	<div class="landingTemplateAside backToFrontHideShow">';
				html += '		<img src="/resourcesadmin/assets/img/landingBoxGuidGate.png" alt=""/>';
				html += '		<button class="guidInfoButton" onclick="$(\'#modalBox\').find(\'.modal-body\').html(\'<img src=/resourcesadmin/assets/img/landingBoxGuidGate.png>\');$(\'#modalBox\').modal(\'show\');"><i class="fas fa-info"></i></button>';
				html += '	</div>';
				html += '</div>';
				break;
			case sessionKeys[1]:
				html += '<div class="landingTemplateItemsWrap templateAselect" data-total-key="' + gubun + '" style="background-color: '+sessionInitAptions.backgroundColor+'">';
				html += '		<div class="landingTemplateItems">';
				html += '			<div class="setSectionLeftTopArea">';
				html += '				<div class="cmmCountAddMin backToFrontHideShow">';
				html += '					<input type="hidden" name="selectSectionButtonCount"/>';
				html += '					<input type="text" class="form-control cmmCountAddMinInput" readonly/>';
				html += '					<div class="cmmCountContr">';
				html += '						<button class="cmmCountAddButton">+</button>';
				html += '						<button class="cmmCountMinButton">-</button>';
				html += '					</div>';
				html += '				</div>';
				html += '			</div>';
				html += '			<div class="setSectionRightTopArea backToFrontHideShow">';
				html += '				<label>배경색</label>';
				html += '				<input type="text" class="form-control cmmColorPicker setSectionBackground" data-params=\'' + JSON.stringify({
				"defaultValue": sessionInitAptions.backgroundColor 
				}) + '\'/>';
				html += '			</div>';
				html += '			<div class="landingTemplateItemsInner">';
				html += '				<div class="landingTemplateContents">';
				html += '					<div class="inner sessionSelectAddResultTarget">';
				html += '						<div class="secItems">';
				html += '							<div class="scTit">Select<br/>섹션</div>';
				html += '							<div class="inpForms sessionSelectAddButtonTarget">';
				html += '								<div class="row">';
				html += '									<div class="col-lg-3"><label class="itmLabel">상단이미지</label></div>';
				html += '									<div class="col-lg-9">';
				html += '									<div class="cmmFakFile">';
				html += '										<img src="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].topImage.imagePreveiw.fileDownloadUri
						: ''		
				)+ '" class="backToFrontShowHide '+gubun+'" data-template-image-gubun="TOP_IMAGE_'+gubun+'" alt=""/>';
				html += '										<div class="fkf_input"></div>';
				html += '										<label for="TOP_IMAGE_' + gubun + '" class="fkf_label">파일선택</label>';
				html += '										<input type="file" value="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].topImage.imagePreveiw.fileName
						: ''		
				)+ '" id="TOP_IMAGE_' + gubun + '" name="TOP_IMAGE_' + gubun + '" class="form-control" data-params=\'' + JSON.stringify({
					ime: "image",
					required: true
				}) + '\'/>';
				html += '									</div>';
				html += '										';
				html += '										<input type="text" value="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].topImageInput
						: ''		
				)+ '" id="TOP_IMAGE_INPUT_' + gubun + '" name="TOP_IMAGE_INPUT_' + gubun + '" class="form-control itmText" placeholder="이미지설명을 입력해주세요."/>';
				html += '									<span class="backToFrontHideShow" style="display: block;text-align: left;font-size: 12px;color: #d43f3a;">* 객관식질문에 할당 될 문구입니다.</span>';
				html += '									</div>';
				html += '								</div>';

				html += '							</div>';
				html += '						</div>';
				html += '						';
				html += '						';

				html += '					</div>';
				html += '				</div>';
				html += '			</div>';
				html += '		</div>';
				html += '		<div class="landingTemplateAside backToFrontHideShow">';
				html += '			<img src="/resourcesadmin/assets/img/landingBoxGuidSelect.png" alt=""/>';
				html += '			<button class="guidInfoButton" onclick="$(\'#modalBox\').find(\'.modal-body\').html(\'<img src=/resourcesadmin/assets/img/landingBoxGuidSelect.png>\');$(\'#modalBox\').modal(\'show\');"><i class="fas fa-info"></i></button>';
				html += '		</div>';
				html += '</div>';
				break;
			default: //end섹션
				html += '<div class="landingTemplateItemsWrap templateAend" data-total-key="' + gubun + '" style="background-color: '+sessionInitAptions.backgroundColor+'">';
				html += '	<div class="landingTemplateItems">';
				html += '		<div class="setSectionRightTopArea backToFrontHideShow">';
				html += '			<label>배경색</label>';
				html += '				<input type="text" class="form-control cmmColorPicker setSectionBackground" data-params=\'' + JSON.stringify({
					"defaultValue": sessionInitAptions.backgroundColor
				}) + '\'/>';
				html += '		</div>';
				html += '		<div class="landingTemplateItemsInner">';
				html += '			<div class="landingTemplateContents">';
				html += '				<div class="inner">';
				html += '					<div class="secItems">';
				html += '						<div class="scTit">End<br/>섹션</div>';
				html += '						<div class="inpForms">';
				html += '							<div class="row">';
				html += '								<div class="col-lg-3"><label class="itmLabel">상단이미지</label></div>';
				html += '								<div class="col-lg-9">';
				html += '									<div class="cmmFakFile">';
				html += '										<img src="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].topImage.imagePreveiw.fileDownloadUri
						: ''		
				)+ '" class="backToFrontShowHide '+gubun+'" data-template-image-gubun="TOP_IMAGE_'+gubun+'" alt=""/>';
				html += '										<div class="fkf_input"></div>';
				html += '										<label for="TOP_IMAGE_' + gubun + '" class="fkf_label">파일선택</label>';
				html += '										<input type="file" value="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].topImage.imagePreveiw.fileName
						: ''		
				)+ '" id="TOP_IMAGE_' + gubun + '" name="TOP_IMAGE_' + gubun + '" class="form-control" data-params=\'' + JSON.stringify({
						ime: "image",
						required: true
					}) + '\'/>';
				html += '									</div>';
				html += '								</div>';
				html += '							</div>';
				html += '							<div class="row">';
				html += '								<div class="cmmSortableWrap step3">';
				html += '								</div>';
				html += '							</div>';
				html += '							<div class="row">';
				html += '								<div class="col-lg-3"><label class="itmLabel">버튼이미지</label></div>';
				html += '								<div class="col-lg-9">';
				html += '									<div class="cmmFakFile">';
				html += '										<img src="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].buttonImage.imagePreveiw.fileDownloadUri
						: ''		
				)+ '" class="backToFrontShowHide fnCreateDocumentSubmitImage '+gubun+'" data-template-image-gubun="BUTTON_IMAGE_'+gubun+'" alt=""/>';
				html += '										<div class="fkf_input"></div>';
				html += '										<label for="BUTTON_IMAGE_' + gubun + '" class="fkf_label">파일선택</label>';
				html += '										<input type="file" value="' +(
						isInitData
						? initLandingTemplateTypeAOject[gubun].buttonImage.imagePreveiw.fileName
						: ''		
				)+ '" id="BUTTON_IMAGE_' + gubun + '" name="BUTTON_IMAGE_' + gubun + '" class="form-control" data-params=\'' + JSON.stringify({
					ime: "image",
					required: true
				}) + '\'/>';
				html += '									</div>';
				html += '								</div>';
				html += '							</div>';
				html += '						</div>';
				html += '					</div>';
				html += '				</div>';
				html += '			</div>';
				html += '		</div>';
				html += '	</div>';
				html += '	<div class="landingTemplateAside backToFrontHideShow">';
				html += '		<img src="/resourcesadmin/assets/img/landingBoxGuidEnd.png" alt=""/>';
				html += '		<button class="guidInfoButton" onclick="$(\'#modalBox\').find(\'.modal-body\').html(\'<img src=/resourcesadmin/assets/img/landingBoxGuidEnd.png>\');$(\'#modalBox\').modal(\'show\');"><i class="fas fa-info"></i></button>';
				html += '	</div>';
				html += '</div>';
				break;
		}
		return html ? $(html) : false;
	},
	stringReplace: function (params) {
		var initArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		var checkValue = Number(params.replace(/[\D]{1,}[\d]{1,}_[\D]{1,}/g, ''));
		return initArray[checkValue] ? initArray[checkValue] : '';
	},
}