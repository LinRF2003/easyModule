<template>
  <Breadcrumb> 随机数生成</Breadcrumb>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px; margin-top: 20px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="生成数量" prop="count">
      <el-input
        v-model="ruleForm.count"
        autocomplete="off"
        placeholder="生成随机数的个数，1-10000"
        :disabled="isStart"
      />
    </el-form-item>
    <el-form-item label="随机数最小值" prop="minNum">
      <el-input
        v-model="ruleForm.minNum"
        autocomplete="off"
        placeholder="生成的随机数最小值"
        :disabled="isStart"
      />
    </el-form-item>
    <el-form-item label="随机数最大值" prop="maxNum">
      <el-input
        v-model="ruleForm.maxNum"
        autocomplete="off"
        placeholder="生成的随机数最大值"
        :disabled="isStart"
      />
    </el-form-item>
    <div>
      生成结果：
      <div class="random-box">
        <div v-for="(i, index) in randomNumList" :key="index" class="random-item">{{ i }}</div>
      </div>
    </div>
    <el-form-item class="button-container">
      <el-button type="primary" @click="submitForm()" v-if="!isStart"> 生成 </el-button>
      <el-button type="danger" @click="stopRandom()" v-else> 结束 </el-button>
      <el-button @click="resetForm()" :disabled="isStart">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import message from '@/utils/Message'

const ruleFormRef = ref()

const ruleForm = reactive({ count: 1, minNum: 1, maxNum: 999 })

const rules = reactive({})

const isStart = ref(false) // 是否开始
const timer = ref() // 定时器
const randomNumList = ref(['000'])
// 生成
const submitForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (!(ruleForm.count && ruleForm.maxNum && ruleForm.minNum)) {
        return message.warning('必填项不能为空')
      }
      // 判断是否为正整数
      if (ruleForm.count < 1 || ruleForm.count > 10000)
        return console.log('count should be between 1 and 10000')
      if (parseInt(ruleForm.minNum) > parseInt(ruleForm.maxNum))
        return message.warning('最小值不能大于最大值')

      // 随机生成 count 个在 minNum 与 maxNum 之间的整数并返回
      isStart.value = true
      // 设置定时器生成变化的数字
      timer.value = setInterval(() => {
        randomNumList.value = getRandomNumFn()
      }, 50)

      // message.success('成功生成')
    } else {
      console.log('error submit!')
    }
  })
}

// 结束
const stopRandom = () => {
  clearInterval(timer.value)
  timer.value = ''
  isStart.value = false
  randomNumList.value = getRandomNumFn()
}

// 生成随机的方法
const getRandomNumFn = () => {
  const randomNums = Array.from(
    { length: ruleForm.count },
    () =>
      Math.floor(Math.random() * (ruleForm.maxNum - ruleForm.minNum + 1)) +
      parseInt(ruleForm.minNum)
  )
  return randomNums
}

// 重置
const resetForm = () => {
  if (!ruleFormRef.value) return
  randomNumList.value = ['000']
  ruleFormRef.value.resetFields()
}
</script>

<style lang="less">
.button-container {
  .el-form-item__content {
    display: flex;
    justify-content: center;
  }
}
.random-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .random-item {
    font-size: 35px;
    margin: 10px;
  }
}
</style>
