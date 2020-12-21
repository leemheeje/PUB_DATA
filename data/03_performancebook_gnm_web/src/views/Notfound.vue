<template>
  <div class="NotFound">
    <p>페이지를 찾을 수 없습니다.</p>
  </div>
</template>


<script>
export default {
    name: 'NotFound',
    mounted () {
        console.log(this.$route.path)
    }
}
</script>