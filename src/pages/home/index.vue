<template>
    <div class="header">
        <div class="header-left">
            中部地区
            <van-icon name="arrow" />
        </div>
        <van-search
            v-model="searchValue"
            placeholder="请输入搜索关键词"
            shape="round"
        />
    </div>
    <van-swipe class="my-swiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item
            v-for="item in homeData.slides"
            :key="item.id"
        >
            <van-image 
                radius="5"
                :src="item.pic_image_url" 
            />
        </van-swipe-item>
    </van-swipe>
    <van-row justify="space-around">
        <van-col 
            v-for="(item, index) in homeData.nav2s"
            :key="item.id"
            class="center-img"
            span="11"
            @click="goOrderTwo(index)"
        >
            <van-image 
                :src="item.pic_image_url" 
            />
        </van-col>
    </van-row>
    <van-row @click="goOrder(item)" class="yy-list" v-for="item in homeData.hospitals" justify="space-around">
        <van-col span="6">
            <van-image 
                width="100"
                height="90"
                :src="item.avatar_url" 
            />
        </van-col>
        <van-col class="yy" span="15">
            <div class="yy-name">{{ item.name }}</div>
            <div class="yy-type">
                <span>{{ item.rank }}</span>
                &nbsp
                <span>{{ item.label }}</span>
            </div>
            <div class="yy-text">{{ item.intro }}</div>
        </van-col>
    </van-row>
</template>

<script setup>

import { onMounted, ref, getCurrentInstance, reactive } from 'vue';
import { useRouter } from 'vue-router'
// 获取当前Vue实例
const { proxy } = getCurrentInstance()

const searchValue = ref('')
// 需要先定义初始值再复制，不然会丢失响应式
// 首页数据
const homeData = reactive({
    hospitals: [],
    nav2s: [],
    navs: [],
    now: '',
    slides: []
})
// 快捷入口
const router = useRouter()
const goOrderTwo = (index) => {
  router.push(`/createOrder?id=${homeData.hospitals[index].id}`)
}
// 点击医院列表跳转
const goOrder = (data) => {
  router.push(`/createOrder?id=${data.id}`)
}


onMounted(async () => {
    const {data} = await proxy.$api.Index()
    Object.assign(homeData, data.data)
    // console.log(homeData, 'homeData');
    
})
</script>

<style lang="less" scoped>

.header {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    line-height: 54px;
    .header-left {
      padding-left: 22px;
      background: url(../../../public/bg.png)
        no-repeat left center;
      background-size: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #666666;
    }
  }
  .my-swiper {
    margin: 5px;
  }
  .yy-list {
    padding-bottom: 10px;
    margin: 20px 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
    .yy {
      .yy-name {
        font-size: 20px;
        line-height: 30px;
        font-weight: bold;
      }
      .yy-type {
        font-weight: bold;
        line-height: 25px;
        font-size: 15px;
        color: #0ca7ae;
      }
      .yy-text {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
  }

</style>