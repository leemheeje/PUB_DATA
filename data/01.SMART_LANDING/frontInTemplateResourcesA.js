var landingTemplateAUserMultipleChoice = {};
$(document).ready(function () {
	var temp_obj = templateModeObject || {};
	var keyString = ['S0_L0', 'S1_L1', 'S2_L2', 'S3_L3'];
	var landingSessionLength = 0;
	console.log(temp_obj);
	; (function () {//마크업 랩핑 및 재가공
		for (var key in temp_obj) {
			$('body').append('<div class="slnb"></div>');
			if (key == keyString[0]) {//gate섹션
				landingSessionLength++;
				$('.slnb').append('<div class="tp"></div>');
			} else if (key == keyString[1]) {//셀렉트섹션
				landingSessionLength++;
				$('.slnb').append('<div class="tp"></div>');
				landingTemplateAUserMultipleChoice['question'] = temp_obj[key].topImageInput;//객관식 질문 추가;
				var $selectSession = $('.landingTemplateItemsWrap[data-total-key="S1_L1"]');
				var sessionInitAptions = temp_obj[key].sessionInitAptions;
				var resultSessionObject = temp_obj[key].resultSessionObject;
				var topImageUri = '';
				var buttonImageUri = '';
				var createDOM = function (topImageUri, buttonImageUri, lcKey) {
					var html = '';
					html += '<div class="landingTemplateItemsWrap" data-total-key="' + lcKey + '" style="background-color: ' + $selectSession.css('background-color') + '">';
					html += '<div class="landingTemplateItems">';
					html += '<div class="landingTemplateItemsInner">';
					html += '<div class="landingTemplateContents">';
					html += '<div class="inner">';
					html += '	<div class="cmmFakFile"><img src="' + topImageUri + '" data-template-image-gubun="SELECT_RESULT_TOP_IMAGE_' + lcKey + '" alt=""/></div>';
					html += '	<div class="cmmFakFile"><img src="' + buttonImageUri + '" data-template-image-gubun="SELECT_RESULT_BUTTON_IMAGE_' + lcKey + '" onclick="frontInTemplateAMotion.jump(\'last\');" alt=""/></div>';
					html += '</div>';//inner
					html += '</div>';//landingTemplateContents
					html += '</div>';//landingTemplateItemsInner
					html += '</div>';//landingTemplateItems
					if ($selectSession.find('.glFooterImage').length) {
						html += $('.glFooterImage:eq(0)')[0].outerHTML;
					}
					html += '</div>';//landingTemplateItemsWrap
					return html;
				};
				if (Object.keys(resultSessionObject).length) {
					for (var lcKey in resultSessionObject) {//답변세션 재가공
						topImageUri = resultSessionObject[lcKey].topImage.imagePreveiw.fileDownloadUri;
						buttonImageUri = resultSessionObject[lcKey].buttonImage.imagePreveiw.fileDownloadUri;
						$selectSession.after(createDOM(topImageUri, buttonImageUri, lcKey));
						$('.slnb').append('<div class="tp"></div>');
						landingSessionLength++;
					}
				}
				if (sessionInitAptions.buttonLength) {
					$selectSession.attr('data-button-length', sessionInitAptions.buttonLength);
				}
			} else if (key == keyString[2]) {//신청서섹션
				landingSessionLength++;
				$('.slnb').append('<div class="tp"></div>');
			} else if (key == keyString[3]) {//풋터
				$('.landingWrap').attr('data-animation-type', temp_obj[key].animationType);
				$('.landingWrap').attr('data-footer-all', temp_obj[key].isAllSession);
			}
		}
	})();
	console.log(landingSessionLength);
	var sessionCurrentIndex = 0;
	var sessionHistoryIndex = 0;
	var sessionMotionDuration = 1200;
	var currentSessionTotalKey = '';
	window.frontInTemplateAMotion = new EventSlide({
		btns: '.slnb>.tp',
		container: '.landingDesignFormInner',
		hash: ['#gallery1', '#gallery2', '#gallery3'],
		speed: sessionMotionDuration,
		mode: temp_obj[keyString[3]].animationType,
		ease: 'easeInOutExpo',
		beforeCallback: function (currentIndex, nextIndex, $currentElement) { },
		afterCallback: function (currentIndex, historyIndex, $currentElement) {
			sessionCurrentIndex = currentIndex;
			sessionHistoryIndex = historyIndex;
			currentSessionTotalKey = $('.landingTemplateItemsWrap:eq('+currentIndex+')').data('totalKey');
			if(currentSessionTotalKey == keyString[1]){
				$('.selectRadioButton input[type=radio]').prop('checked' , false);
			}
		},
		sessionAnimationAfterCallback: function (currentIndex, historyIndex, $currentElement) {
			$('.landingTemplateItemsWrap').removeClass('templateSlideEnd');
			$currentElement.addClass('templateSlideEnd');
		}
	});
	;(function(){
		var fnSetInnerHeight = function(){
			var windowInnerHeight = window.innerHeight;
			$('.landingWrap .landingDesignFormInner').height(windowInnerHeight);
		};
		//fnSetInnerHeight();
		//$(window).resize(fnSetInnerHeight);
	})();
	var getSelectButtonKeys = function ($this) {
		var selectButtonKeys = typeof $this === 'string' ? $this : $this.closest('[data-select-button]').data('selectButton');
		var frontInTemplateAMotionCurrentIndex = $('.landingTemplateItemsWrap[data-total-key="' + selectButtonKeys + '"]').index();
		return frontInTemplateAMotionCurrentIndex;
	}
	var wheelSwipeObject = {
		wheel: { boolean: true },//초기값을위한 블리언값은 이벤트별로 필요
		swipe: { boolean: true },//초기값을위한 블리언값은 이벤트별로 필요
	};
	var wheelSwipeCallback = function (key, delta) {
		var objectKey = wheelSwipeObject[key];
		var directWheelSwipeBoolean = false;//시간을 걸어 페이지이동못하게 막는데, 아무 움직임이없을땐 timeout안걸게끔
		if (objectKey.timeout) clearTimeout(objectKey.timeout);
		if (objectKey.boolean) {
			if (delta > 0) {//down
				console.log(sessionCurrentIndex +' sdf '+ landingSessionLength)
				if (sessionCurrentIndex <= landingSessionLength - 1) {
					console.log(currentSessionTotalKey)
					if(currentSessionTotalKey.indexOf('B0') != -1){
						console.log(123123123)
						frontInTemplateAMotion.jump('last');
					}else if(currentSessionTotalKey.indexOf('S1') != -1){ //select섹션에서는 분기처리 라디오선택 후 페이지이동
						alert('답변을 선택해주세요.');
						directWheelSwipeBoolean = true;
					}else{
						frontInTemplateAMotion.jump(++sessionCurrentIndex);
					}
				}else{
					directWheelSwipeBoolean = true;
				}
			} else if (delta < 0) {//up
				if (sessionCurrentIndex > 0) {
					if(currentSessionTotalKey.indexOf('B0') != -1){ //select섹션의 결과페이지일때 위로올리면 무조건 select섹션으로
						frontInTemplateAMotion.jump(getSelectButtonKeys(keyString[1]));
					}else if(currentSessionTotalKey.indexOf('S2') != -1 && landingTemplateAUserMultipleChoice.answerValue){
						console.log(landingTemplateAUserMultipleChoice.answerValue)
						frontInTemplateAMotion.jump(landingTemplateAUserMultipleChoice.answerValue);
					}else{
						frontInTemplateAMotion.jump(--sessionCurrentIndex);
					}
				}else{
					directWheelSwipeBoolean = true;
				}
			}
			if(!directWheelSwipeBoolean) objectKey.boolean = false;
		}
		/*objectKey.timeout = setTimeout(function () {
			objectKey.boolean = true;
		}, temp_obj[keyString[3]].animationType == 'static' ? 300 : sessionMotionDuration);*/
		objectKey.timeout = setTimeout(function () {
			objectKey.boolean = true;
		}, temp_obj[keyString[3]].animationType == 'static' ? 300 : 300);
	}
	/**
	 * 휠/스와이프 이벤트;
	 * 휠/스와이프중복방지를 위한 모션애니메이션타임을 타임아웃을 걸어서 휠/스와이프중복방지;
	 * 페이지모션 애니메이션이 static ? 300 : 사용자지정 애니메이션 타임(1200)
	 */
	$('.landingDesignFormInner').off('mousewheel DOMMouseScroll').on({
		'mousewheel DOMMouseScroll': function (e) {
			var delta = null;
			var eVent = e.originalEvent;
			if (eVent) {
				if (eVent.wheelDelta) delta = eVent.wheelDelta / -40;
				if (eVent.deltaY) delta = eVent.deltaY;
				if (eVent.detail) delta = eVent.detail;
			}
			wheelSwipeCallback('wheel', delta);
		}
	}).swipe({
		swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
			if(temp_obj[keyString[3]].animationType == 'horizontal'){
				var delta = direction == 'left' ? 1 : direction == 'right' ? -1 : '';
			}else{
				var delta = direction == 'up' ? 1 : direction == 'down' ? -1 : '';
			}
			console.log(direction);
			wheelSwipeCallback('swipe', delta);
		},
		threshold: 50, //0 제한 거리를 둬야함 0이면 클릭이 안됨
		excludedElements: "label, button, input, select, textarea",
	});

	$('[data-template-image-gubun="BUTTON_IMAGE_S0_L0"]').click(function () {
		frontInTemplateAMotion.jump(1);
		//wheelSwipeObject['wheel'].boolean = false;
		//wheelSwipeObject['swipe'].boolean = false;
	});
	$('.selectRadioButton input[type=radio]').change(function () {//객관식선택
		var $this = $(this);
		var getSelectKey = getSelectButtonKeys($this);
		landingTemplateAUserMultipleChoice['answer'] = $this.val();//객관식 답변 등록;
		landingTemplateAUserMultipleChoice['answerValue'] = getSelectKey;
		frontInTemplateAMotion.jump(getSelectKey);
		//wheelSwipeObject['wheel'].boolean = false;
		//wheelSwipeObject['swipe'].boolean = false;
	});

})
