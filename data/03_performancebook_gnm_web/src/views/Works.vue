<template>
<div class="worksWrap">
    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
</div>
</template>


<script>

</script>

<style>
.workDetail {
    padding: 100px;
}

.workDetail>div {
    margin-bottom: 30px;
}
</style>
