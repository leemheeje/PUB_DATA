/**
 * 랜딩페이지형성을 위한 함수
 * 모든 요소들(기본정보, 신청서편집, 랜딩디자인, 매체관리)은 현 파일(fn.Create.Utills 를 거쳐서 최종데이타가 형성됨)
 * fn.Create."..." 형식은 각 요소들의 데이타만! 저장한다.
 * FN_LANDING_"..." 형식은 각요소들의 모든 노드정보(요소내부의 함수나 옵션들 등등) 저장한다.
 * FN_LANDING_"..." 안에서의 json데이타와 fn.Create."..." 데이타는 함수내부의 병합하는 시점에 따라 다를수 있지만 최종적으로는 같아진다.
 */
var fn = fn || {};
fn.Create = {};
fn.Create.frontDefaultInfo = {};		//기본정보 데이타
fn.Create.frontFormData = {};			//신청서폼 데이타
fn.Create.frontFormOption = {};			//신청서의 옵션들(질문,답변,스타일) 데이타
fn.Create.frontLandingDesign = {};		//랜딩디자인 데이타
fn.Create.frontMediaFormData = {};		//매체관리 데이타
fn.Create.frontLandingTemplateTypeA = {};		//랜딩템플릿A

fn.Create.Utills = {
	init: function (obj) {
		var utills = $.extend(true, {
			options: {
				keyNames: {
					"createKey": "createKey",
					"componentKey": "componentKey", //data-component-key
				},
				keys: [ //랜딩디자인에 필요한 key값들 "total_key" 등등 생성시 필요
					/**
					 * ex : C1_P0 (이미지_1번째)
					 * ex : C3_P2 (텍스트_3번째)
					 * ex : C5_P5 (신청서폼_6번째)
					 */
					"C1",//이미지추가
					"C2",//슬라이드추가
					"C3",//텍스트추가
					"C4",//동영상추가
					"C5",//신청서추가
					"C6",//풋터추가
					"C7",//신청자현황 추가
					"C8",//접속자현황 추가
				],
				documentKeys: [ //신청서에 필요한 key값들 "total_key" 등등 생성시 필요 
					/**
					 * ex : D0_P0 (이름_1번째)
					 * ex : D6_P2 (주관식_3번째)
					 * ex : D7_P5 (객관식_6번째)
					 */
					"D0",//이름
					"D1",//연락처
					"D2",//나이
					"D3",//성별
					"D4",//상담가능시간
					"D5",//거주지역
					"D6",//주관식
					"D7",//객관식
					"D8",//휴대폰인증
				],
				templateASessionKeys:[
					"S0_L0",	//gate섹션
					"S1_L1",	//select섹션
					"S2_L2",	//end섹션
					"S3_L3",	//풋터이미지
				],
				reg: /([a-zA-Z0-9]{2,})_[a-zA-Z]([\d])/g, //format return "C1_P0"
				editeComponentKeys: function (ar) { //return Number MAX+1
					console.log(ar)
					var array = [];
					if (Object.keys(ar).length) {
						for (var key in ar) {
							array.push(Number(key.replace(this.reg, '$2')));
						}
						var max = Math.max.apply(null, array);
						return max + 1;
					} else {
						return 0;
					}
				}
			},
			initDocumentGroupOptions: $.extend(true, { 
				/** 
				 * @params {
				 * 		question : 객관식,주관식의 질문 묶음 (Array)
				 * 		dataAnswer : 객관식,주관식의 답변 묶음 (Array)
				 * 		styles : 신청서편집에 스타일 정의(신청서폼 옆에 스타일옵션) 
				 * } 
				 * 초기값이 {} 이면 안에 요소에서 map을 돌리기때문에 오류가난다. 그래서 기본값으로 병합. 
				 * */
				question: [],
				dataAnswer:[],
				styles : {
					input: {
						color: '#000',
						backgroundColor: '#f4f4f4',
						fontFamily: "'굴림',Gulim,Sans-serif",
						fontSize: '12pt',
						lineHeight : 5
					},
					button: {
						text: '신청하기',
						color: '#fff',
						backgroundColor: '#164cd5',
						borderRadius : 5,
						width: 88,
						fontFamily: "'굴림',Gulim,Sans-serif",
						fontSize: '15pt',
						hidden: false, 
					},
				}
			}, JSON_DATA.frontFormOption),
			initDocumentGroupObject: JSON_DATA.frontFormData || {
				/**신청서편집에 필요한 기본데이타. 문자열로 오기때문에 기본값없어도됨 */
			},
			initFormGroupObject: JSON_DATA.frontLandingDesign || {
				/**랜디디자인에 필요한 기본데이타. 문자열로 오기때문에 기본값없어도됨 */
			},
			initDefaultInfoOject: JSON_DATA.frontDefaultInfo || {
				ld_title:'',
				ld_subject:'',
				agree_txt1:'',
				agree_txt2:'',
				agreeCompPop:'',
				ld_popComment:'',
				ld_moveLink:'',
			},
			initMediaFormOject: JSON_DATA.frontMediaFormData || {
				media_code_head:'',
				media_code_body:'',
				media_code_db_head:'',
				media_code_db_body:'',
			},
			initLandingTemplateTypeAOject: JSON_DATA.frontLandingTemplateTypeA||{},
			//initLandingTemplateTypeAOject: JSON.parse(window.localStorage.getItem('fn.Create.frontLandingTemplateTypeA')) || {},
			clsFormat: function (s) {
				return s.replace(/[^a-zA-Z-_0-9]/g, '');
			},
			createTotalKey: function (s, p) {
				if (
					(typeof s === 'string' || typeof p === 'sring') ||
					(typeof s === 'Number' || typeof p === 'Number')
				) {
					return s + '_P' + p;
				}
				return console.error('s,p없음');
			},
			htmlAppendAfterCallback: function (params) {
				/**
				 * 신청서편집&랜딩디자인 탭에서
				 * 신청폼요소 추가(append) 될때, 랜딩디자인의 요소가 추가될때마다 실행.
				 */
				if(!window.LANDING_TEMPLATE_TYPE.mode){
					$('.tabBox.step3').customTags();
					if (typeof params.afterCallback === 'function') {
						params.afterCallback(params);
					}
				}
			},
			localCreateTotalKey: function (create_key, objects) {
				/**
				 * 내부(fn.Create....) 에서 호출하여 total_key를 생성(추가개념일때 생성됨)
				 * 현재 데이타들을 체크해서 다음키를 리턴(유니크한 키를 갖기위함 랜딩요소&신청폼요소)
				 */
				var _this = this;
				var comf_key = (function () {
					return _this.options.editeComponentKeys(!objects ? _this.initFormGroupObject : objects);
				})();
				return this.createTotalKey(create_key, comf_key);
			},
			/**
			 * 각요소별 (랜딩디자인, 신청서폼&옵션, , 기본정보, 매체관리)  데이타병합
			 */
			totalDocumentOptionsMerge: function (data) {
				fn.Create.frontFormOption = data;
			},
			totalDocumentDATAMerge: function (data) {
				fn.Create.frontFormData = data;
			},
			totalDATAMerge: function (data) {
				fn.Create.frontLandingDesign = data;
			},
			totalDefaultInfoDATAMerge: function (data) {
				fn.Create.frontDefaultInfo = data;
			},
			totalMediaFormDATAMerge: function (data) {
				fn.Create.frontMediaFormData = data;
			},
			totalLandingTemplateTypeADATAMerge: function (data) {
				fn.Create.frontLandingTemplateTypeA = data;
			},
			totalDataMergeAfterGotoBottom:function(bool){
				/**
				 * 추가적인 요소 신규랜딩요소추가 일때
				 * 페이지의 하다분에 추가되기때문에 추가버튼누를때
				 * 페이지 하단부로 스크롤 이동시킴 (!추가할때만 수정X)
				 * @params bool === false ? up : down 
				 */
				var _this = this;
				var windowHeight = window.innerHeight;
				var documentHeight = $('body').height();
				$('html,body').stop().animate({
					'scrollTop' : bool === false ? 0 : documentHeight - windowHeight 
				},300);
			}
		}, obj);
		console.log(typeof utills.initDocumentGroupObject)
		console.log(typeof utills.initFormGroupObject)
		if(typeof utills.initDocumentGroupObject === 'string') utills.initDocumentGroupObject = JSON.parse(utills.initDocumentGroupObject);
		if(typeof utills.initLandingTemplateTypeAOject === 'string') utills.initLandingTemplateTypeAOject = JSON.parse(utills.initLandingTemplateTypeAOject);
		try{
			if(typeof utills.initFormGroupObject === 'string') utills.initFormGroupObject = JSON.parse(utills.initFormGroupObject);
		}catch(e){}
		
		
		//초기 init 시 기본값설정 : S
		fn.Create.frontDefaultInfo = utills.initDefaultInfoOject;
		fn.Create.frontMediaFormData = utills.initMediaFormOject;
		fn.Create.frontLandingDesign = utills.initFormGroupObject;
		fn.Create.frontFormOption = utills.initDocumentGroupOptions;
		//초기 init 시 기본값설정 : E
		
		
		var initDATA = utills.initFormGroupObject;
		var initDocumentDATA = utills.initDocumentGroupObject;
		var initLandingTemplateTypeAOject = utills.initLandingTemplateTypeAOject;
		var templateASessionKeys = utills.options.templateASessionKeys;
		console.log(initDATA)
		console.log(initDocumentDATA)
		console.log(initLandingTemplateTypeAOject)
		if(!LANDING_TEMPLATE_TYPE.mode){//템플릿을 사용안할때 
			FN_LANDING_IMAGE = fn.Create['Image'].init(utills);
			FN_LANDING_SLIDE = fn.Create['Slide'].init(utills);
			FN_LANDING_TEXT = fn.Create['Text'].init(utills);
			FN_LANDING_MEDIA = fn.Create['Media'].init(utills);
			FN_LANDING_FORM = fn.Create['Form'].init(utills);
			FN_LANDING_FOOTER = fn.Create['Footer'].init(utills);
			FN_LANDING_APPLICANTSTATUS = fn.Create['ApplicantStatus'].init(utills);
			FN_LANDING_VISITORSTATUS = fn.Create['VisitorStatus'].init(utills);
			FN_LANDING_DOCUMENT = fn.Create['Document'].init(utills);
			FN_LANDING_MEDIAFORM = fn.Create['MediaForm'].init(utills);
			FN_LANDING_DEFAULTINFO = fn.Create['DefaultInfo'].init(utills, {
				beforeCallback:function(){
					if (fn.Create.frontDefaultInfo.agreeCompPop) {
						$('.completeCheck').show();
					} else {
						$('.completeCheck').hide();
					}
				}
			});
		}else{
			FN_LANDING_FORM = fn.Create['Form'].init(utills);
			FN_LANDING_DOCUMENT = fn.Create['Document'].init(utills);
			FN_LANDING_MEDIAFORM = fn.Create['MediaForm'].init(utills);
			FN_LANDING_DEFAULTINFO = fn.Create['DefaultInfo'].init(utills, {
				beforeCallback:function(){
					if (fn.Create.frontDefaultInfo.agreeCompPop) {
						$('.completeCheck').show();
					} else {
						$('.completeCheck').hide();
					}
				}
			});
			window['FN_LANDING_TEMPLATE_TYPE_'+LANDING_TEMPLATE_TYPE.mode] = fn.Create['LandingTemplateType'+LANDING_TEMPLATE_TYPE.mode].init(utills);
			if(LANDING_TEMPLATE_TYPE.mode === 'A'){
				if(!Object.keys(initLandingTemplateTypeAOject).length){
					console.log('데이타 없을때 여기타는거아니야?')
					FN_LANDING_TEMPLATE_TYPE_A.initLandingTemplateTypeAOject[templateASessionKeys[3]]= {//풋터이미지는 따로등록 fn.Create.document 쪽에서 추가
							footerImage:'',
							isAllSession:true,
							animationType : 'vertical',
					}
					FN_LANDING_TEMPLATE_TYPE_A.fnGetItems(templateASessionKeys[2]); //템플릿A는 '랜딩디자인'탭에서 'End섹션' 추가
				}else{
					for(var key in initLandingTemplateTypeAOject){
						/*
						 * @arguments[0] key => "S0_L0, S1_L1..."
						 * @arguments[1] key => boolean 초기데이타가 있는지 판단 있으면 true : false or undefined;
						 * */
						if(key !== utills.options.templateASessionKeys[3]){
							FN_LANDING_TEMPLATE_TYPE_A.fnGetItems(key, true);
						}
					}
				}
				FN_LANDING_FORM.fnGetItems('C5'); //템플릿A는 기획상 '신청서' 양식이 항상 추가가 되어있음
			}
		}
		if (!Object.keys(initDocumentDATA).length) {
			FN_LANDING_DOCUMENT.fnAddItems('D0'); //신청서 이름
			FN_LANDING_DOCUMENT.fnAddItems('D1'); //신청서 연락처
		} else {
			for (var key in initDocumentDATA) {
				if (Object.keys(initDocumentDATA[key]).length) {
					if (key.indexOf(utills.options.documentKeys[0]) != -1) {//이름
						FN_LANDING_DOCUMENT.fnGetItems('D0', key);
					}
					if (key.indexOf(utills.options.documentKeys[1]) != -1) {//전화번호
						FN_LANDING_DOCUMENT.fnGetItems('D1', key);
					}
					if (key.indexOf(utills.options.documentKeys[2]) != -1) {//나이
						FN_LANDING_DOCUMENT.fnGetItems('D2', key);
					}
					if (key.indexOf(utills.options.documentKeys[3]) != -1) {//성별
						FN_LANDING_DOCUMENT.fnGetItems('D3', key);
					}
					if (key.indexOf(utills.options.documentKeys[4]) != -1) {//상담가능시간
						FN_LANDING_DOCUMENT.fnGetItems('D4', key);
					}
					if (key.indexOf(utills.options.documentKeys[5]) != -1) {//거주지역
						FN_LANDING_DOCUMENT.fnGetItems('D5', key);
					}
					if (key.indexOf(utills.options.documentKeys[6]) != -1) {//주관식
						FN_LANDING_DOCUMENT.fnGetItems('D6', key, initDocumentDATA[key]);
					}
					if (key.indexOf(utills.options.documentKeys[7]) != -1) {//객관식
						FN_LANDING_DOCUMENT.fnGetItems('D7', key, initDocumentDATA[key]);
					}
					if (key.indexOf(utills.options.documentKeys[8]) != -1) {//휴대폰인증
						FN_LANDING_DOCUMENT.fnGetItems('D8', key);
					}
				}
			}
		}
		for (var key in initDATA) {
			if (Object.keys(initDATA[key]).length) {
				if (key.indexOf(utills.options.keys[0]) != -1) {//이미지
					FN_LANDING_IMAGE.fnGetItems(initDATA, key);
				}
				if (key.indexOf(utills.options.keys[1]) != -1) {//슬라이드
					FN_LANDING_SLIDE.fnGetItems(initDATA, key);
				}
				if (key.indexOf(utills.options.keys[2]) != -1) {//텍스트
					FN_LANDING_TEXT.fnGetItems(initDATA[key], key);
				}
				if (key.indexOf(utills.options.keys[3]) != -1) {//동영상
					FN_LANDING_MEDIA.fnGetItems(initDATA[key].value, key);
				}
				if (key.indexOf(utills.options.keys[4]) != -1) {//신청서
					FN_LANDING_FORM.fnGetItems(key);
				}
				if (key.indexOf(utills.options.keys[5]) != -1) {//풋터
					FN_LANDING_FOOTER.fnGetItems(initDATA[key], key);
				}
				if (key.indexOf(utills.options.keys[6]) != -1) {//신청자현황
					FN_LANDING_APPLICANTSTATUS.fnGetItems(key);
				}
				if (key.indexOf(utills.options.keys[7]) != -1) {//접속자현황
					FN_LANDING_VISITORSTATUS.fnGetItems(key);
				}
			}
		}
		return utills;
	},
	reassem: function (data, $listsEach) {
		/**
		 * 최종적으로 리스트를 한번 sort 할 개념으로
		 * 현재 디비전(.cmmSortableWrap.step3)의 마크업순서 === 데이타의 순서 를 맞추기위한 함수
		 */
		var sort_items = {};
		var $listsEach = $listsEach ? $listsEach : $('.cmmSortableWrap.step3 .item[data-total-key]');
		$listsEach.each(function () {
			var $this = $(this);
			var total_key = $this.data('totalKey');
			sort_items[total_key] = data[total_key];
		});
		return sort_items;
	}

};