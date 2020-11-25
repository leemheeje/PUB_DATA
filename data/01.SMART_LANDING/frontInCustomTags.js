!(function () {
	$.fn.extend({
		"frontInCustomTags": function (params, frontDefaultInfo, db_conversion) {
			var $this = $(this);
			var params = $.extend(true, JSON.parse(params) || {}, {
				phoneAuthYn: 'N'
			});
			var exp = /(02|0\d{2}|010|011|018|019|016)(\d{3,4})(\d{4})/g;
			var frontDefaultInfoReplace = frontDefaultInfo.replace(/\t/g, '\\t').replace(/\n/g, '\\n');
			var frontDefaultInfo = JSON.parse(frontDefaultInfoReplace);
			var frontPhoneNumberAuthInzngGubun = true;
			var frontPhoneNumberAuthCodeGubun = true;
			var frontPhoneNumberAuthParamMap = null;
			var fnParamsClear = function (errorMsg) {
				if (errorMsg) alert(errorMsg);
				$this.find('form[id^="C5"] [data-total-key^="D8"]').hide();
				$('input[name="USER_PHONE_AUTH"]').val('');
				frontPhoneNumberAuthCodeGubun = false;
				frontPhoneNumberAuthInzngGubun = false;
				params.phoneAuthYn = 'N';
			};
			var fixedImageYNPadding = 0; 
			var getApplyHTML = function (MASKINGNAME,MASKINGPHONE,reg_dt) {
				var st = [
					[
						'<li class="tp">',
						'	<div class="tit">',
						'		<span class="nm">' + MASKINGNAME + '</span>',
						'		<span class="ph">(' + MASKINGPHONE + ')</span>',
						'	</div>',
						'	<div class="msg">이벤트 신청 했습니다~</div>',
						'	<div class="dat">' + (function () {
							var date = new Date(reg_dt);
							var dates = {
								year: date.getFullYear(),
								month: date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
								date: date.getDate() >= 10 ? date.getDate() : '0' + date.getDate(),
								hours: date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),
								minu: date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes(),
							}
							return dates.year + '-' + dates.month + '-' + dates.date + ' ' + dates.hours + ':' + dates.minu;
						})() + '</div>',
						'</li>',
					],
					[
						'<li class="tp">',
						'	<div class="noresult">',
						'		상담신청자가 없습니다.<br/>상담신청 해주세요.',
						'	</div>',
						'</li>'
					]
				];
				return MASKINGNAME === 'noresult' ? st[1].join('') : st[0].join('');
			}
			//console.log('＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆＆');
			//console.log(params);
			//console.log(frontDefaultInfo);


			//gtm 확인용
			window.dataLayer = window.dataLayer || [];
			dataLayer.push(params);
			dataLayer.push({ 'event': 'LandingLoadComplete' });

			; (function () {//fixed버튼을 위한 하단부 패딩값 선언
				var fnMaxFixedImageHeight = function () {
					var fixedImageYNArray = [];
					$this.find('[name="fixedImageYN"]').each(function () {
						var $_this = $(this);
						if ($_this.is(':checked')) {
							fixedImageYNArray.push($_this.closest('.item').find('.fnCreateDocumentFixedImage').outerHeight());
						}
					});
					fixedImageYNPadding = fixedImageYNArray.length ? Math.max.apply(null, fixedImageYNArray) : 0;
					return fixedImageYNPadding;
				};
				if ($this.find('[name="fixedImageYN"]').length) {
					$this.find('.landingWrap .viewport .innerWrap').css('padding-bottom', fnMaxFixedImageHeight());
					$(window).on('load resize', function () {
						$this.find('.landingWrap .viewport .innerWrap').css('padding-bottom', fnMaxFixedImageHeight());
					});
				}
			})();
			; (function () { //슬라이드부분
				var $slideTarget = null;
				$this.find('.cmmImageSlide').each(function (index) {
					var $this = $(this);
					var html = '';
					var $slideItems = $this.find('.slideItems');
					$slideTarget = $('<div class="owl-carousel cmmImageSlide"></div>').appendTo($this.parent());
					$slideItems.each(function () {
						var $this = $(this);
						var $clone = $this.clone();
						$clone.appendTo($slideTarget);
					});
					$this.hide();
					$slideTarget.owlCarousel({
						items: 1,
						nav: true,
						mouseDrag: false
					});
				});
				//console.log($slideTarget);
			})();
			; (function () {//접속자현황 html형성+기능구현
				var $visitorDOM = $this.find('.item[data-total-key^="C8"]');
				var random = Math.floor((Math.random() * (50 - 20)) + 20);
				if ($visitorDOM.length) {
					//$visitorDOM.html();
					$visitorDOM.html([
						'<div class="frontVisitorWrap">',
						'	<div class="inTxts">',
						'		현재  <span class="bld">' + random + '</span>명이 이벤트를 보고 있습니다.',
						'	</div>',
						'</div>',
					].join(''));
					setTimeout(function () {
						$visitorDOM.addClass('hide');
					}, 5000);
				}
			})();
			; (function () {//신청자현황 html+기능
				var $applyDOM = $this.find('.item[data-total-key^="C7"]');
				var $appendTargetDOM = $('<ul class="frontApplyListWrap"></ul>').appendTo($applyDOM);
				console.log($appendTargetDOM)
				if ($applyDOM.length) {
					var getSession = JSON.parse(window.sessionStorage.getItem('isReservationUserInfor'));
					if(!getSession){
						$.ajax({
							url: params.apiHostName + "/v1/landing/costomer/" + params.landingCode,
							data: {
								cntPerPage: 10,
								landingCode: params.landingCode,
								page: 1
							},
							complete: function (result) {
								console.log(result)
								try {
									if (result.responseJSON.code == 200) {
										var list = result.responseJSON.data.result.landingApplyTopTenList.list;
										var _html = '';
										console.log(list)
										console.log(_html)
										if (list) {
											for (var i = 0; i < list.length; i++) {
												_html += getApplyHTML(list[i].MASKINGNAME,list[i].MASKINGPHONE,list[i].reg_dt);
											}
											window.sessionStorage.setItem('isReservationUserInfor', JSON.stringify(list));
										} else {
											_html += getApplyHTML('noresult');
											window.sessionStorage.setItem('isReservationUserInfor', JSON.stringify([]));
										}
										console.log(_html)
										console.log($appendTargetDOM)
										$appendTargetDOM.append(_html);
									}
								} catch (err) { }
							}
						});
					}else if(!getSession.length){
						$appendTargetDOM.append(getApplyHTML('noresult'));
					}else{
						for(var i = 0; i<getSession.length; i++){
							$appendTargetDOM.append(getApplyHTML(getSession[i].MASKINGNAME,getSession[i].MASKINGPHONE,getSession[i].reg_dt));
						}
					}
				}
			})();
			; (function () {//양방향데이터구현
				$this.find('[name="USER_NAME"]').keyup(function (e) {
					$this.find('[name="USER_NAME"]').val(e.target.value);
				});
				$this.find('[name="USER_PHONE_NUMBER"]').keyup(function (e) {
					$this.find('[name="USER_PHONE_NUMBER"]').val(e.target.value);
				});
				$this.find('[name="USER_AGE"]').keyup(function (e) {
					$this.find('[name="USER_AGE"]').val(e.target.value);
				});
				$this.find('[name="USER_GENDER"]').change(function (e) {
					$this.find('[name="USER_GENDER"]').val(e.target.value);
				});
				$this.find('[name="USER_TIME"]').change(function (e) {
					$this.find('[name="USER_TIME"]').val(e.target.value);
				});
				$this.find('[name="USER_AREA"]').change(function (e) {
					$this.find('[name="USER_AREA"]').val(e.target.value);
				});
				$this.find('[name="USER_AGREE"]').change(function (e) {
					$this.find('[name="USER_AGREE"]').prop('checked', e.target.checked);
				});
				$this.find('[name^="D6"]').keyup(function (e) {//주관식
					var name = e.target.name;
					$this.find('[name="' + name + '"]').val(e.target.value);
				});
				$this.find('[name="USER_PHONE_AUTH"]').keyup(function (e) {//휴대폰 인증번호
					$this.find('[name="USER_PHONE_AUTH"]').val(e.target.value);
				});
				$this.find('[name^="D7"]').change(function (e) {//객관식
					var name = e.target.name;
					$this.find('[name="' + name + '"]').val(e.target.value);
				});
			})();
			; (function () {//개인정보팝업
				var $button = $this.find('form[id^="C5"] .fnCopyDefailtViewButton');
				var agree_txt1 = "agree_txt1";//개인정보동의팝업 정보
				var agree_txt2 = "agree_txt2";//개인정보처리위탁 정보
				if (frontDefaultInfo[agree_txt1]) {
					$button.filter('[data-params="' + agree_txt1 + '"]').show();
					$button.closest('.rgsFromWrap').addClass('isAgreeText1');
				};
				if (frontDefaultInfo[agree_txt2]) {
					$button.filter('[data-params="' + agree_txt2 + '"]').show();
					$button.closest('.rgsFromWrap').addClass('isAgreeText2');
				};
				$button.click(function () {
					var $this = $(this);
					var params = $this.data('params');
					var pop = window.open('', '개인정보관련팝업', 'width=300,height=300,left=0,top=0');
					pop.document.write('<title>개인정보관련팝업</title><pre>' + frontDefaultInfo[params] + '</pre>');
					return false
				});
			})();
			; (function () {//휴대폰 인증부분
				if ($this.find('form[id^="C5"] [data-total-key^="D8"]').length) {
					frontPhoneNumberAuthCodeGubun = false;
					frontPhoneNumberAuthInzngGubun = false;
					$this.find('.fnPhoneNumberAuthButton').off('click').click(function () {
						var $_this = $(this);
						var $parent = $_this.closest('.rgsFromWrap');

						if (!$parent.find('[name="USER_NAME"]').cmmAjax()) {
							alert('이름을 입력해주세요.');
							return false;
						}
						if (!$parent.find('[name="USER_PHONE_NUMBER"]').cmmAjax()) {
							alert('휴대폰번호를 입력해주세요.');
							return false;
						}
						if (!$parent.find('[name="USER_PHONE_NUMBER"]').cmmAjax('tel')) {
							alert('휴대폰번호 양식이 아닙니다.');
							return false;
						}
						if (!$parent.find('[name="USER_PHONE_NUMBER"]').cmmAjax(10, 11)) {
							alert('휴대폰번호의 자리수는 10자리 이상 11자리 이하여야합니다.');
							return false;
						}
						$.ajax({
							url: params.apiHostName + "/v1/landing/html/sendsms",
							data: {
								landingCode: params.landingCode,
								name: $parent.find('[name="USER_NAME"]').val(),
								phonenum: $parent.find('[name="USER_PHONE_NUMBER"]').val().replace(exp, '$1-$2-$3'),
								title: frontDefaultInfo.ld_title,
								ptnName: params.ptnName,
								usetype: "auth"
							},
							cache: false,
							complete: function (result, a, b) {
								//console.log(result,a,b);
								var data = result.responseJSON.data.result;
								var status_code = data.status_code;
								var paramMap = data.paramMap;
								if (status_code == 202) {
									alert('인증번호가 전송되었습니다.');
									frontPhoneNumberAuthParamMap = paramMap;
									frontPhoneNumberAuthInzngGubun = true;
									$this.find('form[id^="C5"] [data-total-key^="D8"]').show();
								} else if (status_code == 103) {
									alert('이미 신청한 휴대폰번호입니다.');
								} else if (status_code == 104) {
									alert('반복된 요청입니다.\n잠시 후 이용해주세요.');
								} else {
									alert('알수없는 오류가 발생하였습니다.\n' + status_code);
								}
							},
							error: function (e) {
								alert(JSON.stringify(e))
							}
						});
						return false;
					});
					$this.find('.fnPhoneNumberAuthCodeButton').click(function () {
						var $_this = $(this);
						var $parent = $_this.closest('.rgsFromWrap');
						//frontPhoneNumberAuthParamMap
						if (!frontPhoneNumberAuthInzngGubun) {
							alert('인증번호발송이 누락되었습니다.');
							return false;
						}
						if (!$parent.find('[name="USER_PHONE_AUTH"]').cmmAjax()) {
							alert('인증번호를 입력해주세요.');
							return false;
						}
						if ($parent.find('[name="USER_PHONE_NUMBER"]').val() != frontPhoneNumberAuthParamMap.phonenum.replace(/-/g, '')) {
							fnParamsClear('인증번호발송시 작성된 전화번호와 다릅니다.\n인증번호 재발송하셔야 합니다.');
							return false;
						}
						$.ajax({
							url: params.apiHostName + "/v1/landing/html/auth",
							data: {
								landingCode: frontPhoneNumberAuthParamMap.landing_code,
								authcode: $parent.find('[name="USER_PHONE_AUTH"]').val(),
								phonenum: $parent.find('[name="USER_PHONE_NUMBER"]').val().replace(exp, '$1-$2-$3'),
								usetype: "auth"
							},
							complete: function (result, a, b) {
								//console.log(result,a,b);
								var data = result.responseJSON.data.result;
								var status_code = data.status_code;
								var paramMap = data.paramMap;
								if (status_code == 202 && data.authchk === 'true') {
									alert('휴대폰인증이 완료되었습니다.');
									params.phoneAuthYn = 'Y';
									frontPhoneNumberAuthCodeGubun = true;
								} else if (status_code == 202 && data.authchk === 'false') {
									alert('인증번호가 잘못 입력되었습니다.');
								} else if (status_code == 104) {
									fnParamsClear('인증시간이 초과되었습니다.\n인증번호 재발송하여야 합니다.');
								} else {
									alert('알수없는 오류가 발생하였습니다.\n' + status_code);
								}
							},
							error: function (e) {
								console.log(e);
							}
						});
						return false;
					});
				}
			})();
			var fnScrollMove = function () {
				var $form = $this.find('.item[data-total-key^="C5"]:last');
				var $formOffset = $form[0].offsetTop;
				var windowInnerHeight = window.innerHeight;
				$('html,body').scrollTop($formOffset - (windowInnerHeight / 2) + fixedImageYNPadding);
			};
			; (function () {//신청서 유효성체크 & ajax
				$this.find('form[id^="C5"]').cmmValidator();
				$this.find('.fnCreateDocumentSubmitButton').click(function () {
					var $_this = $(this);
					var $parent = $_this.closest('.rgsFromWrap');
					var USER_SUBJECTIVE = []; //주관식답변
					var USER_MULTIPLE_CHOICE = []; //객관식답변

					var ansD6Value = true; //주관식들에서 필수값의 입력이 하나라도 없을때 체크
					var ansD7Value = true; //객관식들에서 필수값의 입력이 하나라도 없을때 체크

					if (!frontPhoneNumberAuthCodeGubun) {//휴대폰인증이 있고, 휴대폰인증을 안햇을때
						alert('휴대폰인증을 진행해주세요.');
						return false;
					}
					if ($this.find('form[id^="C5"] [data-total-key^="D8"]').length) {
						if ($parent.find('[name="USER_PHONE_NUMBER"]').val() != frontPhoneNumberAuthParamMap.phonenum.replace(/-/g, '')) {
							fnParamsClear('인증번호발송시 작성된 전화번호와 다릅니다.\n인증번호 재발송하셔야 합니다.');
							return false;
						}
					}
					if (!$parent.find('[name="USER_NAME"]').cmmAjax()) {
						alert('이름을 입력해주세요.');
						return false;
					}
					if (!$parent.find('[name="USER_PHONE_NUMBER"]').cmmAjax()) {
						alert('휴대폰번호를 입력해주세요.');
						return false;
					}
					if (!$parent.find('[name="USER_PHONE_NUMBER"]').cmmAjax(10, 11)) {
						alert('휴대폰번호의 자리수는 10자리 이상 11자리 이하여야합니다.');
						return false;
					}
					if (!$parent.find('[name="USER_PHONE_NUMBER"]').cmmAjax('tel')) {
						alert('휴대폰번호 양식이 아닙니다.');
						return false;
					}
					if (!$parent.find('[name="USER_AGE"]').cmmAjax()) {
						alert('나이를 입력해주세요.');
						return false;
					}
					if (!$parent.find('[name="USER_GENDER"]').cmmAjax()) {
						alert('성별을 선택해주세요.');
						return false;
					}
					if (!$parent.find('[name="USER_TIME"]').cmmAjax()) {
						alert('상담가능시간을 선택해주세요.');
						return false;
					}
					if (!$parent.find('[name="USER_AREA"]').cmmAjax()) {
						alert('거주지역을 선택해주세요.');
						return false;
					}
					$parent.find('[name^="D6"]').each(function () {
						var $this = $(this);
						var question = $this.closest('.backToFrontShowHide').find('.checkQuestion').text();
						if (!$this.cmmAjax()) {
							alert('필수 주관식 문항을 입력해주세요.');
							ansD6Value = false;
							return false;
						}
						USER_SUBJECTIVE.push({
							question: question,
							answer: $this.val() || null,
						});
					});
					if (isTemplateMode == 'A') {
						try {
							if (templateModeObject['S1_L1']) {
								if (!landingTemplateAUserMultipleChoice.answer) {
									alert('답변을 선택해주세요.');
									return false;
								}
								USER_MULTIPLE_CHOICE.push(landingTemplateAUserMultipleChoice);
							}
						} catch (error) { }
					}
					$parent.find('[name^="D7"]').each(function () {
						var $this = $(this);
						var question = $this.closest('.backToFrontShowHide').find('.checkQuestion').text();
						if (!$this.cmmAjax()) {
							alert('필수 객관식 문항을 선택해주세요.');
							ansD7Value = false;
							return false;
						}
						USER_MULTIPLE_CHOICE.push({
							question: question,
							answer: $this.val() || null,
						});
					});
					if (!$parent.find('[name="USER_AGREE"]').cmmAjax()) {
						alert('개인정보동의 체크해주세요.');
						return false;
					}
					if (!ansD6Value) return false;
					if (!ansD7Value) return false;
					; (function () { //신청하기 누를때 DB에 하이픈으로 들어가기
						var $target = $this.find('[name="USER_PHONE_NUMBER"]');
						$target.each(function () {
							var $__this = $(this);
							var $value = $__this.val();
							if (exp) {
								$__this.val($value.replace(exp, '$1-$2-$3'));
							}
						});
					})();
					params.jsonData = {
						USER_NAME: $parent.find('[name="USER_NAME"]').val() || null,
						USER_PHONE_NUMBER: $parent.find('[name="USER_PHONE_NUMBER"]').val() || null,
						USER_AGE: $parent.find('[name="USER_AGE"]').val() || null,
						USER_GENDER: $parent.find('[name="USER_GENDER"]').val() || null,
						USER_TIME: $parent.find('[name="USER_TIME"]').val() || null,
						USER_AREA: $parent.find('[name="USER_AREA"]').val() || null,
						USER_SUBJECTIVE: USER_SUBJECTIVE.length ? USER_SUBJECTIVE : null, //주관식
						USER_MULTIPLE_CHOICE: USER_MULTIPLE_CHOICE.length ? USER_MULTIPLE_CHOICE : null,//객관식
					};
					if (
						params.apiData &&
						params.jsonData &&
						params.landingCode &&
						params.ptnIdx &&
						params.ptnName &&
						params.mediaFormData
					) {
						$.ajax({
							url: params.apiHostName + "/v1/landing/customer",
							type: 'POST',
							data: {
								apiData: params.apiData,
								jsonData: JSON.stringify(params.jsonData),
								landingCode: params.landingCode,
								ptnIdx: params.ptnIdx,
								ptnName: params.ptnName,
								mediaFormData: params.mediaFormData,
								phoneAuthYn: params.phoneAuthYn
							},
							complete: function (result) {
								//console.log(result);
								if (result.responseJSON.code == 200) {
									/**트래킹추가*/
									window.dataLayer = window.dataLayer || [];
									dataLayer.push({ 'event': 'LandingRegComplete' });
									/**트래킹추가*/
									window.dataLayer.push({
										'event': 'acquisition',
										'category': 'landingpage',
										'action': 'click_button',
										'label': 'acquisition',
									});
									window.dataLayer.push({
										'event': 'DB_Checkout',
										'category': 'landingpage',
										'action': 'click_button',
										'label': 'acquisition',
									});

									if (typeof db_conversion === 'function') {
										db_conversion(result.responseJSON.data.result.idx);
									}
									if (frontDefaultInfo.agreeCompPop) {
										alert(frontDefaultInfo.ld_popComment || '신청완료하였습니다.');
										if (frontDefaultInfo.ld_moveLink) {
											location.href = frontDefaultInfo.ld_moveLink;
										}
									} else {
										alert('신청완료하였습니다.');
									}
									$this.find('.sortableWrap,.rgsFromAgree').find('input, select, textarea').each(function () {
										var $this = $(this);
										if ($this.is('[type="checkbox"]') || $this.is('[type="radio"]')) {
											$this.prop('checked', false);
										} else {
											$this.val('');
										}
									});
									;(function () {//신청자현황이 잇을때, 세션스토리지 추가
										var split = params.jsonData.USER_NAME.split('');
										var USER_NAME = split[0]+'**';
										var USER_PHONE_NUMBER = params.jsonData.USER_PHONE_NUMBER.replace(/-([0-9]*)-/g,'-****-');
										var sessionArray = JSON.parse(window.sessionStorage.getItem('isReservationUserInfor'));
										if ($this.find('.item[data-total-key^="C8"]').length) {
											sessionArray.unshift({
												MASKINGPHONE: USER_PHONE_NUMBER,
												reg_dt: new Date(),
												MASKINGNAME: USER_NAME,
											});
											window.sessionStorage.setItem('isReservationUserInfor', JSON.stringify(sessionArray));
											console.log(sessionArray)
										}
										if($this.find('.frontApplyListWrap .noresult').length){
											$this.find('.frontApplyListWrap li').remove();
										}
										$this.find('.frontApplyListWrap').prepend(getApplyHTML(USER_NAME,USER_PHONE_NUMBER,new Date()));
									})();
									if (isTemplateMode == 'A') {
										try {
											frontInTemplateAMotion.jump(0);
										} catch (error) { }
									}

									//휴대폰인증 초기화
									if ($this.find('form[id^="C5"] [data-total-key^="D8"]').length) {//폼요소안에 휴대폰인증이 잇을때만 010|011 체크
										fnParamsClear();
									}

								} else {
									alert('알수없는 오류가 발생하였습니다.\n' + result.status);
								}
							},
							error: function (e) {
								alert(e);
							}
						});
					} else {
						alert('누락된 데이타가 있습니다.');
					}
					return false;
				});
				$this.find('.fnCreateDocumentSubmitImage').click(function () {//서밋트버튼으로 활용할 이미지
					$this.find('.fnCreateDocumentSubmitButton:last').click();
				});
				$this.find('.fnCreateDocumentScrollImage').click(function () {//서밋트버튼으로 활용할 이미지
					fnScrollMove();
				});
				/*$this.find('.fnCreateDocumentFixedImage').click(function(){//
					if(!$(this).is('.fnCreateDocumentSubmitImage')){
						isImageButtonClick = true;
						$this.find('.fnCreateDocumentSubmitButton:last').click();
					}
				});*/
			})();
			//			if($this.find('.cmmImageSlide').is('.owl-carousel')){
			//				console.log(123)
			//				$this.find('.cmmImageSlide').owlCarousel('destory');
			//			}
			//			$this.find('.cmmImageSlide').owlCarousel({
			//				items: 1,
			//				nav: true,
			//				mouseDrag: false,
			//			});
			return $this
		}
	});
})(jQuery || $);
