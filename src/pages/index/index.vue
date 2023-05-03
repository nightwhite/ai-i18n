<template>
  <view class="content">
    <uni-forms :modelValue="formData">
      <view class="uni-form-item uni-column">
        <view class="title">请输入 Github 地址（如：https://github.com/labring/laf）</view>
        <uni-easyinput v-model="formData.input" placeholder="在这里输入 Github 地址"></uni-easyinput>
      </view>
      <view class="uni-form-item uni-column">
        <uni-data-select :localdata="items" 
        popup-title="请选择语言"
         @change="onchange" 
         :value="formData.selectedValue"></uni-data-select>
         
      </view>
      <view class="uni-btn-v">
        <button @click="formSubmit">点击开始翻译（随机从仓库找到一个 markdown 文件翻译）</button>
      </view>
 
    </uni-forms>
    <view class="uni-textarea">
      <view>原文</view>
      <uni-easyinput class="old-word" autoHeight type="textarea" v-model="oldWord"></uni-easyinput>
      <view>译文</view>
      <uni-easyinput class="trans-word" autoHeight type="textarea" v-model="transWord"></uni-easyinput>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const formData = ref({
  input: '',
  selectedValue: ''
})
const oldWord = ref('') 
const transWord = ref('')
const items = ref([
{
  text: "英语",
  value: "英语"
},
{
  text: "日语",
  value: "日语"
},
{
  text: "德语",
  value: "德语"
},
{
  text: "俄语",
  value: "俄语"
},
{
  text: "韩语",
  value: "韩语"
},
{
  text: "法语",
  value: "法语"
}
])
const onchange = (e: any)=>{
  formData.value.selectedValue = e
}

const formSubmit = (e: any) => {
  uni.showLoading({
    title: '加载中',
    mask: true
  });
  uni.request({
    url: `https://omc15w.yq666.cn/download-git?url=${formData.value.input}&lang=${formData.value.selectedValue}`,
    method: 'GET',
    success: (res) => {
      uni.hideLoading();
      // console.log(res.data)
      // @ts-ignore
      oldWord.value = res.data.oldWord
      // @ts-ignore
      transWord.value = res.data.transWord
    }
  });
}

</script>

<style>
.uni-form-item .title {
  padding: 20rpx 0;
}

.uni-textarea {
  display: flex;
}

.old-word {
  width: 45%;
  height: 800px;
}

.trans-word {
  width: 45%;
  height: 800px;
}

textarea {
  margin: 0 20rpx;
}
</style>
