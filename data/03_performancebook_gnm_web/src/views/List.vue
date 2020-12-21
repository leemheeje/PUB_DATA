<template>
	<div class="worksMain"  v-bind:class="{ active: isActive}">
		 
		<div class="topVisual">
			<div class="in">
				<div class="tit01">GnM 퍼포먼스의 성과 중심 사용자 경험 디자인</div>
				<div class="tit02"><img src="@/assets/images/titPbed.png" alt="Performance-based Experience Design"></div>
				<div class="tit03">
					GnM Performance는 성공적인 퍼포먼스 마케팅을 통한 목표 달성을 위해<br />크리에이티브에 녹여낼 수 있는 핵심 요소를 바탕으로<br />성과 중심의 사용자 경험 디자인을 제안합니다.
					<router-link class="btnDetail" to="/ped">자세히보기</router-link>
				</div>
			</div>
		</div>

		<div class="workList">
			<div class="title">GnM Performance는 다양한 업종의 클라이언트사와 함께 퍼포먼스 마케팅을 진행하고 있습니다.</div>
			<ul>
				<li>
					<div class="name"><img src="@/assets/images/titWork01.png" alt="FINANCE"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:2}}"><img src="@/assets/images/logoWorks01.png" alt=""><span class="on"><img src="@/assets/images/logoWorks01_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:7}}"><img src="@/assets/images/logoWorks02.png" alt=""><span class="on"><img src="@/assets/images/logoWorks02_on.png"alt=""></span></router-link>
						<!-- <router-link :to="{name:'detail', params:{id:27}}"><img src="@/assets/images/logoWorks25.png" alt=""><span class="on"><img src="@/assets/images/logoWorks25_on.png"alt=""></span></router-link> -->
					</div>
				</li>
				<li>
					<div class="name"><img src="@/assets/images/titWork02.png" alt="SHOPPING"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:14}}"><img src="@/assets/images/logoWorks03.png" alt=""><span class="on"><img src="@/assets/images/logoWorks03_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:18}}"><img src="@/assets/images/logoWorks04.png" alt=""><span class="on"><img src="@/assets/images/logoWorks04_on.png"alt=""></span></router-link>
					</div>
				</li>
				<li>
					<div class="name"><img src="@/assets/images/titWork03.png" alt="O2O"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:13}}"><img src="@/assets/images/logoWorks05.png" alt=""><span class="on"><img src="@/assets/images/logoWorks05_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:15}}"><img src="@/assets/images/logoWorks06.png" alt=""><span class="on"><img src="@/assets/images/logoWorks06_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:8}}"><img src="@/assets/images/logoWorks07.png" alt=""><span class="on"><img src="@/assets/images/logoWorks07_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:17}}"><img src="@/assets/images/logoWorks08.png" alt=""><span class="on"><img src="@/assets/images/logoWorks08_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:9}}" class="widthAuto"><img src="@/assets/images/logoWorks09.png" alt=""><span class="on"><img src="@/assets/images/logoWorks09_on.png"alt=""></span></router-link>
					</div>
				</li>
				<li>
					<div class="name"><img src="@/assets/images/titWork04.png" alt="EDUCATION/MEDICAL"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:3}}"><img src="@/assets/images/logoWorks10.png" alt=""><span class="on"><img src="@/assets/images/logoWorks10_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:1}}"><img src="@/assets/images/logoWorks11.png" alt=""><span class="on"><img src="@/assets/images/logoWorks11_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:4}}"><img src="@/assets/images/logoWorks12.png" alt=""><span class="on"><img src="@/assets/images/logoWorks12_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:12}}"><img src="@/assets/images/logoWorks13.png" alt=""><span class="on"><img src="@/assets/images/logoWorks13_on.png"alt=""></span></router-link>
					</div>
				</li>
				<li>
					<div class="name"><img src="@/assets/images/titWork05.png" alt="BEAUTY/HEALTH"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:11}}"><img src="@/assets/images/logoWorks14.png" alt=""><span class="on"><img src="@/assets/images/logoWorks14_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:5}}"><img src="@/assets/images/logoWorks15.png" alt=""><span class="on"><img src="@/assets/images/logoWorks15_on.png"alt=""></span></router-link>
					</div>
				</li>
				<li>
					<div class="name"><img src="@/assets/images/titWork06.png" alt="FOOD/BEVERAGE"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:16}}"><img src="@/assets/images/logoWorks16.png" alt=""><span class="on"><img src="@/assets/images/logoWorks16_on.png"alt=""></span></router-link>
						<!-- <router-link :to="{name:'detail', params:{id:28}}"><img src="@/assets/images/logoWorks26.png" alt=""><span class="on"><img src="@/assets/images/logoWorks26_on.png"alt=""></span></router-link> -->
					</div>
				</li>
				<li>
					<div class="name"><img src="@/assets/images/titWork07.png" alt="eletronic"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:19}}"><img src="@/assets/images/logoWorks17.png" alt=""><span class="on"><img src="@/assets/images/logoWorks17_on.png"alt=""></span></router-link>
					</div>
				</li>
				<li>
					<div class="name"><img src="@/assets/images/titWork08.png" alt="AGENCY BUILDING"></div>
					<div class="lst">
						<router-link :to="{name:'detail', params:{id:20}}"><img src="@/assets/images/logoWorks18.png" alt=""><span class="on"><img src="@/assets/images/logoWorks18_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:21}}"><img src="@/assets/images/logoWorks19.png" alt=""><span class="on"><img src="@/assets/images/logoWorks19_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:22}}"><img src="@/assets/images/logoWorks20.png" alt=""><span class="on"><img src="@/assets/images/logoWorks20_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:23}}"><img src="@/assets/images/logoWorks21.png" alt=""><span class="on"><img src="@/assets/images/logoWorks21_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:24}}"  class="widthAuto"><img src="@/assets/images/logoWorks22.png" alt=""><span class="on"><img src="@/assets/images/logoWorks22_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:25}}"><img src="@/assets/images/logoWorks23.png" alt=""><span class="on"><img src="@/assets/images/logoWorks23_on.png"alt=""></span></router-link>
						<router-link :to="{name:'detail', params:{id:26}}"><img src="@/assets/images/logoWorks24.png" alt=""><span class="on"><img src="@/assets/images/logoWorks24_on.png"alt=""></span></router-link>
					</div>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import '@/assets/css/works.css'	
	export default {
	  name: 'List',
	  data() {
          return {
              isActive : false
          }
      },
	  props: {
	    //msg: String
	},mounted(){
		var $this = this;
		setTimeout(function(){
			if($this.$route.name == 'list'){
				$this.isActive = true;
			}
		},100)
	}
	}
	
</script>
