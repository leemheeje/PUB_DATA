<template>
<div class="workWrap" v-if="currentAtc && render">
	<div class="workBanner" :style="`background-image: url(${$dev_path}${currentAtc.CrData.visual_img});`">
		<div class="innerWrap">
			<div class="workBannerInner">
				<div class="txts">
					<div class="tt">{{currentAtc.CrData.atc_title}}</div>
					<div class="sj">
						{{currentAtc.CrData.atc_category}}<br> {{currentAtc.CrData.atc_contents}}
						<br> {{currentAtc.CrData.atc_year}}
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="workLnb">
		<div class="innerWrap">
			<ul class="lst">
				<li v-if="currentAtc.CrData.website_img_arr" class="tp tp0" :class="lnbJump('WEBSITE')">
					<a href="javascript:;" @click="fnLnbJump('WEBSITE')" class="txt"><img src="@/assets/images/detailTab_WEBSITE.png" alt="website"></a>
				</li>
				<li v-if="currentAtc.CrData.mobile_img_arr" class="tp tp1" :class="lnbJump('MOBILE')">
					<a href="javascript:;" @click="fnLnbJump('MOBILE')" class="txt"><img src="@/assets/images/detailTab_MOBILE.png" alt="mobile"></a>
				</li>
				<li v-if="currentAtc.BannerList.length > 0" class="tp tp2" :class="lnbJump('BANNER')">
					<a href="javascript:;" @click="fnLnbJump('BANNER')" class="txt"><img src="@/assets/images/detailTab_BANNER.png" alt="banner"></a>
				</li>
				<li v-if="mediaArray" class="tp tp3" :class="lnbJump('MEDIA')">
					<a href="javascript:;" @click="fnLnbJump('MEDIA')" class="txt"><img src="@/assets/images/detailTab_MEDIA.png" alt="media"></a>
				</li>
				<!-- <li v-for="(k,i) in atcType" :key="i" class="tp tp0" :class="lnbJump(k)">
					<a href="javascript:;" @click="fnLnbJump(k)" class="txt"><img :src="require(`@/assets/images/detailTab_${k}.png`)" alt="website"></a>
				</li> -->
			</ul>
		</div>
	</div>
	<div class="workCont">

		<!-- 웹사이트 부분 WEB과 MOBILE함께 :S -->
		<div class="secions" name="WEBSITE MOBILE" v-if="currentAtc.CrData.website_img_arr && currentAtc.CrData.mobile_img_arr">
			<div class="innerWrap">
				<div class="secionsInner">
					<div class="seTit"><img src="@/assets/images/titDetail05.png" alt="WEBSITE"></div>
					<div class="seCont website double">
						<div class="mtSlide onlyWeb">

							<Slick id="pcSlide" ref="pcSlide" class="pcSlide slider-for" :options="slickOptions(
									currentAtc.CrData.mobile_img_arr ? {asNavFor: '#mobSlide'} : {})">
								<div class="slidetp" v-for="(k,i) in currentAtc.CrData.website_img_arr" :key="i">
									<vue-custom-scrollbar>
										<img :src="`${$dev_path}${k.W_IMG}`" alt="">
									</vue-custom-scrollbar>

								</div>
							</Slick>

						</div>
						<div class="mtSlide onlyMob">
							<Slick id="mobSlide" ref="mobSlide" class="mobSlide slider-nav" :options="slickOptions(
									currentAtc.CrData.website_img_arr ? {asNavFor: '#pcSlide'} : {})">
								<div class="slidetp" v-for="(k,i) in currentAtc.CrData.mobile_img_arr" :key="i">
									<vue-custom-scrollbar>
										<img :src="`${$dev_path}${k.M_IMG}`" alt="">
									</vue-custom-scrollbar>

								</div>
							</Slick>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 웹사이트 부분 :E -->

		<!-- 웹사이트 부분 WEB만 :S -->
		<div class="secions" name="WEBSITE" v-else-if="currentAtc.CrData.website_img_arr">
			<div class="innerWrap">
				<div class="secionsInner">
					<div class="seTit"><img src="@/assets/images/titDetail01.png" alt="WEBSITE"></div>
					<div class="seCont website">
						<div class="mtSlide onlyWeb">

							<Slick id="pcSlide" ref="pcSlide" class="pcSlide slider-for" :options="slickOptions()">
								<div class="slidetp" v-for="(k,i) in currentAtc.CrData.website_img_arr" :key="i">
									<vue-custom-scrollbar>
										<img :src="`${$dev_path}${k.W_IMG}`" alt="">
									</vue-custom-scrollbar>
								</div>

							</Slick>

						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 웹사이트 부분 :E -->

		<!-- 웹사이트 부분 MOB만 :S -->
		<div class="secions" name="MOBILE" v-else-if="currentAtc.CrData.mobile_img_arr">
			<div class="innerWrap">
				<div class="secionsInner">
					<div class="seTit"><img src="@/assets/images/titDetail04.png" alt="WEBSITE"></div>
					<div class="seCont website">
						<div class="mtSlide onlyMob">
							<Slick id="mobSlide" ref="mobSlide" class="mobSlide slider-nav" :options="slickOptions()">
								<div class="slidetp" v-for="(k,i) in currentAtc.CrData.mobile_img_arr" :key="i">
									<vue-custom-scrollbar class="mobSlideWrap">
										<img :src="`${$dev_path}${k.M_IMG}`" alt="">
									</vue-custom-scrollbar>
								</div>
							</Slick>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 웹사이트 부분 :E -->



		<!-- 배너 부분 :S -->
		<div class="secions" name="BANNER" v-if="currentAtc.BannerList.length > 0">
			<div class="innerWrap">
				<div class="secionsInner">
					<div class="seTit"><img src="@/assets/images/titDetail02.png" alt="BANNER"></div>
					<div class="seCont" v-for="(k,i) in currentAtc.BannerList" :key="i">
						<div class="sesTit">{{k.bnr_type}}</div>
						<div class="mtSlide" v-if="bannerAntType(k.banner_img_arr).length > 1">
							<swiper :options="swiperOption({
								pagination: {
									el: `.swiper-pagination${i}`,
									clickable: true
								},
								navigation: {
									nextEl: `.slick-next${i}`,
									prevEl: `.slick-prev${i}`
								}
							})" style="height: auto">
								<swiper-slide v-for="(item,index) in bannerAntType(k.banner_img_arr)" :key="index">
									<div class="slidetp">
										<ul class="lst_grid" :class="k.bnr_viewtype == 1 ? 'low' : 'col'">
											<!-- <li class="lgtp" v-for="(v,eb) in item" :key="eb"><img src="@/assets/images/titWork08.png" alt=""></li> -->
											<li :class="`lgtp tp${eb}`" v-for="(v,eb) in item" :key="eb"><img :src="`${$dev_path}${v.B_IMG}`" alt=""></li>
										</ul>
									</div>
								</swiper-slide>
							</swiper>
							<div :class="`swiper-pagination${i}`" data-params="slick-dots" slot="pagination"></div>
							<div :class="`slick-prev${i}`" data-params="slick-prev" slot="button-prev"></div>
							<div :class="`slick-next${i}`" data-params="slick-next" slot="button-next"></div>
						</div>
						<div class="mtSlide" v-else>
							<div class="slidetp" v-for="(item,index) in bannerAntType(k.banner_img_arr)" :key="index">
								<ul class="lst_grid" :class="k.bnr_viewtype == 1 ? 'low' : 'col'">
									<!-- <li class="lgtp" v-for="(v,eb) in item" :key="eb"><img src="@/assets/images/titWork08.png" alt=""></li> -->
									<li :class="`lgtp tp${eb}`" v-for="(v,eb) in item" :key="eb"><img :src="`${$dev_path}${v.B_IMG}`" alt=""></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 배너 부분 :E -->

		<!-- 미디어 부분 :S -->
		<div class="secions" name="MEDIA" v-if="mediaArray">
			<div class="innerWrap">
				<div class="secionsInner">
					<div class="seTit"><img src="@/assets/images/titDetail03.png" alt="MEDIA"></div>
					<div class="seCont">
						<div class="mtSlide">
							<div class="cstControls" v-if="mediaArray.length > 1">
								<a href="javascript:;" class="cstBtns slick-prev" @click="fnContrMediaArray('prev')"></a>
								<a href="javascript:;" class="cstBtns slick-next" @click="fnContrMediaArray('next')"></a>
							</div>
							<div class="slidetp iframe">
								<iframe :src="`https://www.youtube.com/embed/${media_arry[media_arry_index]}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							</div>
							<div class="cstDots" v-if="mediaArray.length > 1">
								<ul class="slick-dots">
									<li class="tp" :class="media_arry_index == i ? `tp${i} slick-active`:`tp${i}`" v-for="(k,i) in mediaArray" :key="i" @click="fnContrMediaArray(i)"></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 미디어 부분 :E -->



	</div>
	<div class="workDetailStn">
		<div class="innerWrap">
			<div class="workDetailStnInner">
				<router-link :to="{name:'detail',params:{id:currentAtc.PrevIdx.atc_idx}}" class="wdsBtns tp0" v-if="currentAtc.PrevIdx">
					<div class="in">
						<span class="icos arrowPrev"></span>
						<div class="txt">
							<div class="st">PREV PROJECT</div>
							<div class="tt">{{currentAtc.PrevIdx.atc_title}}</div>
						</div>
					</div>
				</router-link>
				<router-link :to="{name:'list'}" class="btnsal">ALL PROJECT</router-link>
				<router-link :to="{name:'detail',params:{id:currentAtc.NextIdx.atc_idx}}" class="wdsBtns tp1" v-if="currentAtc.NextIdx">
					<div class="in">
						<span class="icos arrowNext"></span>
						<div class="txt">
							<div class="st">NEXT PROJECT</div>
							<div class="tt">{{currentAtc.NextIdx.atc_title}}</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
	<a href="javascript:;" class="cmmTopBtn" @click="fnCmmTop"></a>



</div>
</template>
<script>
import Slick from 'vue-slick';
import vueCustomScrollbar from 'vue-custom-scrollbar'
import { mapActions, mapState } from 'vuex'
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/css/work_detail.css';
export default {
	components: {
		Slick,
		vueCustomScrollbar,
	},
	data() {
		return {
			defaultSlickOptions: {
				slidesToShow: 1,
				dots: true,
				arrows: true,
				adaptiveHeight: true,
				draggable: false,
			},
			lnb_jump: '',
			render: false,
			media_arry: [],
			media_arry_index: 0,
			bannerSlideAsync: false,
			atc_type: []
		}
	},
	computed: {
		...mapState(['currentAtc']),
		lnbJump() {
			return (s) => {
				if(this.currentAtc.CrData.website_img_arr && this.currentAtc.CrData.mobile_img_arr){
					if(s == 'MOBILE' && this.lnb_jump == 'WEBSITE'){
						return 'active'
					}
				}
				return this.lnb_jump == s ? 'active' : ''
			}
		},
		atcType() {
			let ar = ''
			if (this.currentAtc.CrData.atc_type) {
				ar = this.currentAtc.CrData.atc_type.split(',')
			}

			this.atc_type = ar
			return ar
		},
		slickOptions() {
			return (ex = {}) => {
				let otp = this.defaultSlickOptions
				let ex_otp = { ...otp, ...ex }
				return ex_otp
			}
		},
		bannerAntType() {
			return (ar) => {
				let vw_ar = []
				let count = 0
				vw_ar[count] = []
				ar.forEach((a, i) => {
					if (i != 0 && i % 4 == 0) {
						count++
						vw_ar[count] = []
					}
					vw_ar[count].push(a)
				})
				return vw_ar
			}

		},
		mediaArray() {
			let ar = ''
			if (this.currentAtc.CrData.atc_link) {
				ar = this.currentAtc.CrData.atc_link.split(',')
			}

			this.media_arry = ar
			return ar
		},
		swiperOption() {
			return (ex = {}) => {
				let d = {
					autoHeight: true, //enable auto height
					spaceBetween: 20,
					// shortSwipes: false,
					// longSwipes: false,
					// noSwiping: true,
					simulateTouch: false,
					loop: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.slick-next',
						prevEl: '.slick-prev'
					}
				}
				let ex_obj = { ...d, ...ex }
				return ex_obj
			}
		}
	},
	created() {
		this.fetchData().then(() => {
			this.reInit()
			this.render = true
			this.lnb_jump = this.atcType[0]
		});
	},
	watch: {
		$route() {
			this.render = false
			this.fetchData().then(() => {
				this.reInit()
				this.render = true
				this.lnb_jump = this.atcType[0]
			})
			this.lnb_jump = ''
			this.media_arry_index = 0

		},
	},
	update() {

	},
	methods: {
		...mapActions(['getAtc']),
		fnSlickImageload() {
			this.bannerSlideAsync = true
			return new Promise(resolve => {
				resolve()
			})
		},
		fnContrMediaArray(s) {
			if (typeof s === 'string') {
				if (s == 'prev') {
					this.media_arry_index--
				} else {
					this.media_arry_index++
				}
			} else if (typeof s === 'number') {
				this.media_arry_index = s
			}

			if (this.media_arry_index >= this.media_arry.length) {
				this.media_arry_index = 0
			} else
			if (this.media_arry_index < 0) {
				this.media_arry_index = this.media_arry.length - 1
			}
		},
		reInit() {
			this.$nextTick(() => {
				this.fnSlideCreate()
			});
		},
		fetchData() {
			return new Promise(resolve => {
				if (this.$route.params.id) {
					this.fnSlideDestory()
					this.getAtc(`/crbook/view?idx=${this.$route.params.id}`).then(() => {
						resolve()
					})
					this.firstActive();
				} else {
					this.getAtc(false)
				}
			})
		},
		fnLnbJump(s) {
			$('html,body').stop().animate({
				'scrollTop': $('[name*="' + s + '"').offset().top - 105
			});
			//$('.lst .tp').removeClass('active');
			//this.lnb_jump = s
		},
		fnSlideCreate() {
			// if (this.$refs.pcSlide) {
			// 	this.$refs.pcSlide.create();
			// }
			// if (this.$refs.mobSlide) {
			// 	this.$refs.mobSlide.create();
			// }
			// if (this.$refs.BannerList) {
			// 	this.$refs.BannerList.create();
			// }
			// if (this.$refs.MediaList) {
			// 	this.$refs.MediaList.create();
			// }
		},
		fnSlideDestory() {
			if (this.$refs.pcSlide) {
				this.$refs.pcSlide.destroy()
			}
			if (this.$refs.mobSlide) {
				this.$refs.mobSlide.destroy()
			}
			if (this.$refs.MediaList) {
				this.$refs.MediaList.destroy()
			}
		},
		firstActive() {
			//초기 첫번재 활성화
			$(document).ready(() => {
				setTimeout(() => {
					//$('.lst .tp').eq(0).addClass('active');
					// if (this.atcType[0] == 'WEBSITE' && this.atcType[1] == 'MOBILE') {
					// 	if ($(window).scrollTop() == 0) {
					// 		$('.workWrap .workLnb .lst .tp:eq(0)').addClass('active')
					// 		$('.workWrap .workLnb .lst .tp:eq(1)').addClass('active')
					// 	}
					// }
				}, 800)
			})
		},
		fnCmmTop() {
			$('html,body').stop().animate({
				'scrollTop': 0
			})
		}
	},
	mounted() {
		this.firstActive()
		$(window).scroll(event => {
			let scrollTop = $(event.target).scrollTop()
			let webMobOffset = $('[name="WEBSITE MOBILE"]').length ? $('[name="WEBSITE MOBILE"]')[0].offsetTop : null
			let webOffset = $('[name="WEBSITE"]').length ? $('[name="WEBSITE"]')[0].offsetTop : null
			let mobOffset = $('[name="MOBILE"]').length ? $('[name="MOBILE"]')[0].offsetTop : null
			let banOffset = $('[name="BANNER"]').length ? $('[name="BANNER"]')[0].offsetTop : null
			let medOffset = $('[name="MEDIA"]').length ? $('[name="MEDIA"]')[0].offsetTop : null
			if ($('.workLnb').length) {
				if (scrollTop >= $('.workBanner').outerHeight()) {
					$('.cmmTopBtn').addClass('active')
					$('.workWrap').addClass('lnbFixed')
				} else {
					$('.cmmTopBtn').removeClass('active')
					$('.workWrap').removeClass('lnbFixed')
				}
				if (webMobOffset || webOffset || mobOffset || banOffset || medOffset) {
					if (webMobOffset) {
						if (scrollTop >= 0) {
							this.lnb_jump = 'WEBSITE'
						}
					}
					if (webOffset) {
						if (scrollTop >= 0) {
							this.lnb_jump = 'WEBSITE'
						}
					}
					if (mobOffset) {
						if (scrollTop >= 0) {
							this.lnb_jump = 'MOBILE'
						}
					}

					if (banOffset) {
						if (scrollTop + 250 >= banOffset) {
							this.lnb_jump = 'BANNER'
						}
					}
					if (medOffset) {
						if (scrollTop + 250 >= medOffset) {
							this.lnb_jump = 'MEDIA'
						}
					}
				}
			}
		})
	}
}
</script>
<style scope>
.workWrap {
	background-color: #f5f5f5;
}
</style>