var htmlLandingTemplate = function (html, params) {
	var html = $.extend(true, {
		nowDate: 0,
		frontDefaultInfo: {},
		mediaFormDataHead: "",
		mediaFormDataBody: "",
		mediaFormDataDBHead: "",
		mediaFormDataDBBody: "",
		isTemplateMode : false,
		templateModeObject : {},
		bodyLandingDesign: $('.cmmSortableWrap').html(),
	}, html);
	var params = $.extend(true, {
		apiHostName: "",
		hostName: "",
		htmlHostName: "",
		landingCode: "",
		apiData: "",
		ptnIdx: "",
		ptnName: "",
		mediaFormData: "",
		profileImg:"",
	}, params);
	
	var templateResources = function(type){
		var resources = {
				js:'',
				css:'',
		}
		if(type){
			if(type == 'A'){
				resources.js += '<script src="' + params.htmlHostName + '/resourcesadmin/assets/js/jquery.easing.min.js?' + html.nowDate + '"></script>';
				resources.js += '<script src="' + params.htmlHostName + '/resourcesadmin/assets/js/jquery.touchSwipe.min.js?' + html.nowDate + '"></script>';
				resources.js += '<script src="' + params.htmlHostName + '/resourcesadmin/assets/js/design.EventSlide.js?' + html.nowDate + '"></script>';
			}
			resources.css += '<link rel="stylesheet" href="' + params.htmlHostName + '/resourcesadmin/assets/css/frontInTemplateResources'+type+'.css?' + html.nowDate + '">';
			resources.js += '<script src="' + params.htmlHostName + '/resourcesadmin/assets/js/frontInTemplateResources'+type+'.js?' + html.nowDate + '"></script>';
		}
		return resources;
	};
	var profileImg = function(imgURL){
		var meta = '';
		if(imgURL && imgURL != params.hostName){
			meta += '<link rel="image_src" href="' + imgURL + '" />';
			meta += '<meta property="og:image" content="' + imgURL + '" />';
			meta += '<meta name="twitter:image" content="' + imgURL + '" />';
		}
		return meta;
	};

	return [
		'<!doctype html>',
		'<html lang="ko">',
		'',
		'<head>',
		'<meta charset="UTF-8">',
		'<meta http-equiv="X-UA-Compatible" content="IE=edge">',
		'<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width">',
		profileImg(params.profileImg),
		'<link rel="shortcut icon" href="' + params.htmlHostName + '/resourcesadmin/assets/img/favicon.ico" type="image/x-icon">',
		'<title>' + html.frontDefaultInfo.ld_subject + '</title>',
		'<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>',
		'<link rel="stylesheet" href="' + params.htmlHostName + '/resourcesadmin/css/vendors/owl.carousel.min.css">',
		'<script src="' + params.htmlHostName + '/resourcesadmin/js/ui/lib/owl.carousel-2.2.1/owl.carousel.min.js"></script>',
		'<link rel="stylesheet" href="' + params.htmlHostName + '/resourcesadmin/assets/css/frontInStyle.css?' + html.nowDate + '">',
		templateResources(html.isTemplateMode).css,
		'<script src="' + params.htmlHostName + '/resourcesadmin/assets/js/design.cmmValidator.js"></script>',
		'<script src="' + params.htmlHostName + '/resourcesadmin/assets/js/frontInCustomTags.js?' + html.nowDate + '"></script>',
		templateResources(html.isTemplateMode).js,
		'',
		'<script type="text/javascript">',
		'var db_conversion = null;',
		'var recentVisitors = window.sessionStorage.getItem("recentVisitors");',
		'var isTemplateMode = \''+html.isTemplateMode+'\';',
		'var templateModeObject = '+JSON.stringify(html.templateModeObject)+';',
		'console.log(isTemplateMode);',
		'console.log(templateModeObject);',
		'$(document).ready(function(){',
		'	$(this).frontInCustomTags(\'' + JSON.stringify(params) + '\', \'' + JSON.stringify(html.frontDefaultInfo) + '\', db_conversion);',
		'	if(recentVisitors != "true"){',
		'		window.sessionStorage.setItem("recentVisitors", true);',
		'		$.ajax({',
		'			url: "' + params.apiHostName + '/v1/landing/html/' + params.landingCode + '",',
		'			data: {',
		'				landingCode: "' + params.landingCode + '",',
		'			},',
		'			type:"PUT",',
		'			complete:function(result){',
		'			},',
		'			error:function(e){',
		'			}',
		'		});',
		'	}',
		'});',
		'</script>',
		"<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5MFJ7BN');</script>",
		'',
		html.mediaFormDataHead.replace(/\\/g, '/'),
		html.mediaFormDataDBHead.replace(/\\/g, '/'),
		'</head>',
		'<body>',
		html.mediaFormDataBody.replace(/\\/g, '/'),
		html.mediaFormDataDBBody.replace(/\\/g, '/'),
		'<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5MFJ7BN" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
		'<div class="landingWrap">',
		'<div class="viewport">',
		'<div class="innerWrap">',

		html.bodyLandingDesign,

		'</div>',
		'</div>',
		'</div>',



		'</body>',
		'</html>',
	].join('');
}