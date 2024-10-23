import { ElMessage } from 'element-plus'

/**
 * 展示的方法
 * @param {*} msg  信息
 * @param {*} callback  回调函数
 * @param {*} type  类型
 */
const showMessage = (msg, callback, type) => {
  ElMessage({
    message: msg,
    type: type,
    duration: 2000,
    onClose: () => {
      if (callback) {
        callback()
      }
    }
  })
}

/**
 * import message from '@/utils/Message'
 * 引入消息组件的方法，使用 message.success()
 */
const message = {
  error: (msg, callback) => {
    showMessage(msg, callback, 'error')
  },
  success: (msg, callback) => {
    showMessage(msg, callback, 'success')
  },
  warning: (msg, callback) => {
    showMessage(msg, callback, 'warning')
  }
}

export default message
