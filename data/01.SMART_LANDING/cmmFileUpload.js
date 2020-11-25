!(function () {
	$.fn.extend({
		"cmmFileUpload": function (obj,$target) {
			var $this = $target;
			var $input = $this.find('input[type="file"]');
			var classNames = {
				"cmmFileUpload": ".cmmFileUpload",
				"cmmFilesGroup": ".cmmFilesGroup",
				"previewListItems": ".previewListItems",
				"cmmFilesDelectBtn": ".cmmFilesDelectBtn",
				"cmmFilesAddBtn": ".cmmFilesAddBtn",
			}
			$input.attr('accept', 'image/*');
			var FileUpload = function (obj) {
				var _this = this;
				this.obj = $.extend(true, {
					preview: true,
					multiple: false,
					itemInAddImages: false,
					sortable: {},
					defaultValue: [],
					afterCallback: null,
					bindUploadImageChange: null,
					size : 5000000,//byte
				}, obj);

				this.options = {
					sortable: {
						placeholder: "ui-state-highlight",
						update: function (event, ui) {
							var reUploadImageArray = {};
							$this.find(classNames.cmmFilesDelectBtn).each(function () {
								var $count = $(this).data('delectButtonCount');
								reUploadImageArray['IMAGE_COUNT_' + $count] = _this.uploadImageArray['IMAGE_COUNT_' + $count];
							});
							_this.uploadImageArray = reUploadImageArray;
							_this.obj.bindUploadImageChange(_this.uploadImageArray);
						},
					},
				}
				console.log(this.obj.defaultValue);

				this.defaultValue = this.obj.defaultValue || $input.val() || [];
				this.uploadImageInDelectButtonCount = 0;
				this.uploadImageCount = 0;
				this.uploadImageArray = {};
				this.init();
			}
			FileUpload.prototype = {
				init: function () {
					if (this.defaultValue.length && this.obj.preview) {
						$this.find(classNames.cmmFilesGroup).html('');
						this.fnSetNativeImagesPreview($input, this.defaultValue);
					}
					this.isValueCheck($this.find(classNames.cmmFilesGroup));
					this.bind();
				},
				uploadValidator:function(files){
					var isNotImage = false;
					var isOverSize = false;
					for(var i = 0; i<files.length; i++){ //확장자검사
						console.log(files[i])
						if(!/image/g.test(files[i].type)){
							alert('이미지파일만 업로드 가능합니다.');
							isNotImage = true;
							break;
						}
						if(files[i].size >= this.obj.size){//용량검사 2MB
							alert('5MB이하만 업로드 가능합니다.');
							isOverSize = true;
							break;
						}
					}
					return {
						isNotImage : isNotImage,
						isOverSize : isOverSize,
					};
				},
				bind: function () {
					var _this = this;

					$input.off().on("change", function (event) {
						
						var files = event.target.files;
						//확장자체크
						console.log(files);
						_this.defaultValue = files;
						_this.uploadImageInDelectButtonCount = 0;//버튼데이타값들 초기화
						_this.uploadImageCount = 0;//이미지값들 초기화
						_this.uploadImageArray = {};//이미지값들 초기화
						if(files.length){
							var uploadValidator = _this.uploadValidator(files); 
							if(uploadValidator.isNotImage) return false;
							if(uploadValidator.isOverSize) return false;
							if (_this.obj.preview) {
								$this.find(classNames.cmmFilesGroup).html('');
								_this.fnSetPreview(event.target, files);
							}
						}
						if (typeof _this.obj.afterCallback === 'function') {
							_this.obj.afterCallback(event.target.files);
						}
					});
					$this.find(classNames.cmmFilesAddBtn).find('input[type="file"]').off().on("change", function (event) {
						var files = event.target.files;
						var isNotImage = false; 
						//확장자체크
						_this.defaultValue = files;
						if (files.length) {
							var uploadValidator = _this.uploadValidator(files); 
							if(uploadValidator.isNotImage) return false;
							if(uploadValidator.isOverSize) return false;
							if(_this.obj.preview){
								_this.fnSetPreview(event.target, files);
							}
						}
						if (typeof _this.obj.afterCallback === 'function') {
							_this.obj.afterCallback(event.target.files);
						}
					});
				},
				bindPreviewItems: function () {
					var _this = this;
					$this.find(classNames.cmmFilesDelectBtn).off().on({
						'click': function () {
							var $parent = $(this).closest(classNames.previewListItems);
							var $count = $(this).data('delectButtonCount');
							$parent.remove();
							_this.isValueCheck($this.find(classNames.cmmFilesGroup));
							delete _this.uploadImageArray['IMAGE_COUNT_' + $count];
							if (typeof _this.obj.bindUploadImageChange === 'function') {
								_this.obj.bindUploadImageChange(_this.uploadImageArray);
							}
							console.log(_this.uploadImageArray);

						}
					});
					$this.find(classNames.cmmFilesAddBtn).off().on({
						'click': function () {
							var $parent = $(this).closest(classNames.previewListItems);
							_this.bind();
						}
					});
				},
				fnSetNativeImagesPreview: function (target, files) { //순수이미지파일로 올때
					var _this = this;
					files.forEach(function (item) {
						_this.fnGetPreview(item);
					});
					this.fnSetPreviewAfterCall(files, files);
				},
				fnSetPreview: function (target, files) { //인풋파일의 file형태로 오는 노드
					var _this = this;
					this.fnFileReader(files, function (fileArray) {
						fileArray.forEach(function (item) {
							_this.fnGetPreview(item.result);
						});
						_this.fnSetPreviewAfterCall(files, fileArray);
					});
				},
				fnSetPreviewAfterCall: function (files, fileReader) {
					var _this = this;
					_this.bindPreviewItems();
					_this.isValueCheck($this.find(classNames.cmmFilesGroup));
					if (Object.keys(_this.obj.sortable).length || _this.obj.sortable === true) {
						$this.find(classNames.cmmFilesGroup).sortable($.extend(true, _this.options.sortable, _this.obj.sortable));
						$this.find(classNames.cmmFilesGroup).disableSelection();
					}
					for (var key in files) {
						if (typeof files[key] === 'string' || typeof files[key] === 'object') {
							_this.uploadImageArray['IMAGE_COUNT_' + _this.uploadImageCount] = {
								file: files[key],
								imagePreview: typeof fileReader[key] === 'object' && !Array.isArray(fileReader[key]) ? fileReader[key].result : fileReader[key],
							};
							_this.uploadImageCount++;
						}
					}
					if (typeof this.obj.bindUploadImageChange === 'function') {
						this.obj.bindUploadImageChange(_this.uploadImageArray);
					}
				},
				fnGetPreview: function (url) {
					var html = '<li class="' + this.clsFormat(classNames.previewListItems) + ' ui-state-default">';
					html += '<img src="' + url + '" alt=""/>';
					html += '<a href="javascript:;" data-delect-button-count="' + this.uploadImageInDelectButtonCount + '" class="itemDeleteBtn ' + this.clsFormat(classNames.cmmFilesDelectBtn) + '"><i class="fas fa-times-circle"></i></a>';
					if (this.obj.itemInAddImages) {
						html += '<label class="itemAddBtn ' + this.clsFormat(classNames.cmmFilesAddBtn) + '">이미지추가<input type="file" ' + (this.obj.multiple ? 'multiple' : '') + ' accept="image/*"/></label>';
					}
					html += '</li>';
					$this.find(classNames.cmmFilesGroup).append(html);
					this.uploadImageInDelectButtonCount++;
				},
				fnFileReader: function (files, onloadCallback) {
					var ary = [];
					for (var i = 0; i < files.length; i++) {
						ary.push(new FileReader());
					}
					ary.forEach(function (item, index) {
						item.onloadend = function () {
							if (ary.length - 1 === index) {
								onloadCallback(ary);
							}
						}
						item.readAsDataURL(files[index]);
					});
				},
				isValueCheck: function ($target) {
					return (function () {
						var gubun = 0;
						if ($target[0].nodeName.toLowerCase() === 'input') {
							gubun = $target[0].files.legnth;
						} else {
							gubun = $target.find('>*').length;
						}
						$this.attr('data-images-length', gubun);
						return gubun;
					})();
				},
				clsFormat: function (s) {
					return s.replace(/\./g, '');
				}
			};
			var arg = [];
			this.each(function () {
				arg.push($.data($(this), new FileUpload(obj)));
			});
			return arg;
		}
	});
})(jQuery || $);
