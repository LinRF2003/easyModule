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
      />
    </el-form-item>
    <el-form-item label="随机数最小值" prop="minNum">
      <el-input v-model="ruleForm.minNum" autocomplete="off" placeholder="生成的随机数最小值" />
    </el-form-item>
    <el-form-item label="随机数最大值" prop="maxNum">
      <el-input v-model="ruleForm.maxNum" autocomplete="off" placeholder="生成的随机数最大值" />
    </el-form-item>
    <el-form-item class="button-container">
      <el-button type="primary" @click="submitForm()"> 生成 </el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
  <div class="demo-ruleForm">
    生成结果：
    <div>111</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import message from '@/utils/Message'

const ruleFormRef = ref()

const ruleForm = reactive({})

const rules = reactive({})

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
      const randomNums = Array.from(
        { length: ruleForm.count },
        () =>
          Math.floor(Math.random() * (ruleForm.maxNum - ruleForm.minNum + 1)) +
          parseInt(ruleForm.minNum)
      )

      // 显示在 DOM 元素中
      document.querySelector('.demo-ruleForm > div').innerText = randomNums.join('，')
      // message.success('成功生成')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = () => {
  if (!ruleFormRef.value) return
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
</style>
