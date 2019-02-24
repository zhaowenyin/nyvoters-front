<template>
  <div>
    <el-dialog
      :visible="visible"
      width="600px"
      :title="types[currentItem.type]"
      :before-close="confirmClose">
      <el-form
        ref="form"
        :model="currentItem"
        class="from">
        <el-form-item
          prop="name"
          :rules="{
            required: true, validator: nameVali, trigger: 'blur'
          }"
          label="">
          <el-input
            maxlength="24"
            placeholder="请输入题目标题"
            @input="nameInput"
            v-model="currentItem.name" />
        </el-form-item>
        <!-- type为5和7，即为文本或时间时无选择标签 -->
        <el-form-item v-if="type !== 5 && type !== 7 && type !== 8">
          <el-select
            v-model="currentItem.label_id"
            style="width: 100%;"
            filterable
            clearable
            placeholder="请选择标签">
            <el-option
              v-for="(item, index) in tagList"
              :label="item.label"
              :value="item.value"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- type为1/2/5/8，即为单选/多选/文本/药品时，无默认值 -->
        <el-form-item
          prop="default_answer_type"
          v-if="type !== 1 && type !== 2 && type !== 5 && type !== 8">
          <el-cascader
            v-model="defaultAnswer"
            clearable
            :options="defaultValue[type] || []"
            :props="{label: 'label', value: 'value', children: 'config'}"
            style="width: 100%;"
            placeholder="请选择默认值">
          </el-cascader>
        </el-form-item>
        <!-- type为8，即为药品时，存在选择药品目录 -->
        <el-form-item v-if="type === 8">
          <el-select
            v-model="currentItem.medicineMenu"
            style="width: 100%;"
            filterable
            placeholder="请选择药品目录">
            <el-option
              v-for="(item, index) in medicineList.data"
              :lable="item.label"
              :value="item.value"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!--仅type为3/4时，即为填空题或数字填空题时存在提示内容-->
        <el-form-item v-if="type === 3 || type === 4">
          <el-input
            v-model="currentItem.question.placeholder"
            placeholder="请输入提示内容"
            maxlength="18"
          ></el-input>
        </el-form-item>
        <!-- 仅type为3/4时，即为填空题或数字填空题时存在后缀 -->
        <el-form-item v-if="type === 3 || type === 4">
          <el-input
            v-model="currentItem.question.postfix"
            placeholder="请输入后缀"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- type为5时，为文本，无必填和可编辑 -->
          <el-checkbox v-if="type !== 5" v-model="currentItem.question.isRequired">必填</el-checkbox>
          <el-checkbox v-if="type !== 5" :disabled="currentItem.question.isRequired" v-model="currentItem.question.isEdit">可编辑</el-checkbox>
          <!-- 仅type为1/2时，为单选或多选，存在不清楚, 单选无以上都不是 -->
          <el-checkbox v-if="type === 2" v-model="currentItem.question.hasNoAll">添加以上都不是</el-checkbox>
          <el-checkbox v-if="type === 1 || type === 2" v-model="currentItem.question.hasNoknow">添加不清楚</el-checkbox>
          <!-- 仅type为5时，为富文本，存在是否展开 -->
          <el-checkbox v-if="type === 5" v-model="currentItem.question.isExpand">展开</el-checkbox>
          <!-- 所有类型均可存在是否显示 -->
          <el-checkbox v-model="currentItem.question.isVisible">显示</el-checkbox>
        </el-form-item>

        <!-- 仅type为5且展开时，即为富文本时存在链接文字 -->
        <el-form-item v-if="type === 5">
          <el-input
            v-model="currentItem.question.urlLabel"
            :disabled="currentItem.question.isExpand"
            placeholder="请输入链接文字"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <!-- 仅type为5时，存在文本输入 -->
        <el-form-item v-if="type === 5">
          <quill-editor
            ref="myQuillEditor"
            :options="editorOption"
            placeholder="请输入文本"
            v-model="currentItem.question.html"></quill-editor>
          <el-upload
            ref="upload"
            v-show="showUpload"
            :headers="{'Content-Type': 'application/json'}"
            :action="VUE_APP_BACKEND_SERVER + uploadAddress"
            :http-request="uploadImage">
            <el-button id="imgInput"></el-button>
          </el-upload>
        </el-form-item>
        <!-- 仅type为1/2时，为单选或多选，存在配置选项 -->
        <el-form-item
          label="配置选项"
          prop="question.options"
          :rules="{
            required: true, message: '配置选项不能为空'
          }"
          v-if="type === 1 || type === 2">
          <el-input
            type="textarea"
            :rows="5"
            placeholder='严重
普通
轻微'
            v-model="optionsStr"/>
        </el-form-item>

      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="submitForm">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { questionTemp, types } from '../config.js'
import { quillEditor } from "vue-quill-editor" //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {VUE_APP_BACKEND_SERVER} from '../../../../config/index'
import Quill from 'quill'
import {uploadImage} from '../service'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image'],
  ['clean']                                         // remove formatting button
]

export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    type: {
      default: 1,
      type: Number
    },
    handleType: {
      default: 'create',
      type: String
    },
    id: {
      default: '',
      type: String
    }
  },
  data () {
    let self = this
    return {
      types,
      showUpload: false,
      optionsStr: '',
      uploadData: {},
      addRange: [],
      file: '',
      VUE_APP_BACKEND_SERVER,
      uploadAddress: '/api/v3/doctorapp/sys/images',
      uploadType: '',
      editorOption: {
        placeholder: '请输入富文本内容',
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': self.imgHandler
            }
          }
        }
      },
      defaultAnswer: [],
      currentItem: {
        ...questionTemp(),
        type: this.type
      }
    }
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree,
      tagList: state => state.tagList,
      defaultValue: state => state.defaultValue,
      medicineList: state => state.medicineList
    })
  },
  watch: {
    'currentItem.question.isRequired' (val) {
      if (val) {
        this.currentItem.question.isEdit = true
      }
    },
    defaultAnswer (val) {
      if (val.length > 1) {
        this.currentItem.default_answer_config = val[1]
        this.currentItem.default_answer_type = val[0]
      } else {
        this.currentItem.default_answer_config = null
        this.currentItem.default_answer_type = null
      }
    },
    optionsStr (val) {
      const {currentItem} = this
      if (currentItem.type === 1 || currentItem.type === 2) {
        const anwser = val.split('\n')
        let options = []
        anwser.filter((item) => {
          let obj = {
            label: item,
            value: item,
            visibles: []
          }
          return item && options.indexOf(item) === -1 && options.push(obj)
        })
        this.currentItem.question.options = options
      }
    }
  },
  components: {
    quillEditor
  },
  created () {
    if (this.handleType === 'edit') {
      for (let page of this.renderTree.pages) {
        for (let i = 0, len = page.length; i < len; i++) {
          const item = JSON.parse(JSON.stringify(page[i]))
          if (item.frontend_id === this.id) {
            const {type} = item
            if (type === 1 || type === 2) {
              let options = []
              let ques = item.question.options
              ques.forEach((q) => {
                options.push(q.label)
              })
              this.optionsStr = options.join('\n')
            }

            if (type !== 1 && type !== 2 && type !== 5 && type !== 8) {
              const {default_answer_config, default_answer_type} = item
              this.defaultAnswer = [default_answer_type, default_answer_config]
            }

            this.currentItem = item
          }
        }
      }
    }
  },
  methods: {
    async uploadImage (file) {
      console.log(file)
      this.fileToBase64(file)
    },
    fileToBase64 (file) {
      let reader = new FileReader()
      let AllowImgFileSize = 2100000 //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
      // let imgUrlBase64 = ''
      if (file) {
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file.file)
        let self = this
        reader.onload = async function () {
          if (AllowImgFileSize !== 0 && AllowImgFileSize < reader.result.length) {
            self.$notify.error({
              title: '提示',
              message: '上传失败，请上传不大于2M的图片！'
            })
            return false
          }else{
            //执行上传操作
            const {data} = await uploadImage({file: reader.result})
            self.handleSuccess(data.url)
          }
        }
      }
    },
    imgHandler (state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        let fileInput = document.getElementById('imgInput')
        fileInput.click() // 加一个触发事件
      }
      this.uploadType = 'image'
    },
    beforeUpload (file) {
      console.log(file)
      return this.qnUpload(file)
    },
    // 图片上传前获得数据token数据
    qnUpload (file) {
      if (this.uploadType === 'image') { // 如果是点击插入图片
        this.uploadData = file
        return file
      } else if (this.uploadType === 'video') { // 如果是点击插入视频
      }
    },
    getImgURL (url) {
      if (!/^http/g.test(url) && !/^data:image/g.test(url)) {
        url = `${VUE_APP_BACKEND_SERVER}/api/v3/doctorapp/sys/images?file=${url}`
      }
      return url
    },
    handleSuccess (uri) {
      let vm = this
      let url = ''
      if (this.uploadType === 'image') { // 获得文件上传后的URL地址
        url = this.getImgURL(uri)
      }
      if (url !== null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
        let value = url
        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
        value = value.indexOf('http') !== -1 ? value : 'http:' + value
        vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
      } else {
        this.$message.error(`${vm.uploadType}插入失败`)
      }
      this.$refs['upload'].clearFiles() // 插入成功后清除input的内容
    },
    nameInput (value) {
      setTimeout(() => {
        this.currentItem.name = value.replace(/\s/g, '')
      })
    },
    nameVali (rule, value, callback) {
      if (!value.length) {
        callback(new Error('题目标题不能为空'))
      } else if (/select|update|delete|exec|count|'|"|=|;|>|<|%/gi.test(value)) {
        callback(new Error('请勿输入非法字符和SQL关键字！'))
      } else {
        callback()
      }
    },
    confirmClose () {
      this.$confirm('关闭当前页面将不保存已编辑的信息，确认关闭', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.close()
      }).catch(() => {})
    },
    close () {
      this.$emit('update:visible', false)
    },
    // 搜索
    submitForm () {
      // const {type} = this.currentItem
      // 单独处理选项
      // if (type === 1 || type === 2) {
      //   const anwser = this.optionsStr.split('\n')
      //   let options = []
      //   anwser.filter((item) => {
      //     let obj = {
      //       label: item,
      //       value: item,
      //       visibles: []
      //     }
      //     return item && options.indexOf(item) === -1 && options.push(obj)
      //   })
      //   this.currentItem.question.options = options
      // }

      this.$refs.form.validate((valid) => {
        if (valid) {
          // 为富文本时，没有可编辑和必填字段
          if (this.currentItem.type === 5) {
            this.currentItem.question.isRequired = false
            this.currentItem.question.isEdit = false
          }

          // this.currentItem.question.options = this.optionsStr.split('\n')
          if (this.handleType === 'create') {
            this.currentItem.frontend_id = `${this.renderTree.maxIndex++}`
            this.renderTree.pages[this.renderTree.currentIndex].push(this.currentItem)
            this.close()
          } else {
            for (let page of this.renderTree.pages) {
              for (let i = 0, len = page.length; i < len; i++) {
                if (page[i].frontend_id === this.id) {
                  page.splice(i, 1, this.currentItem)
                  this.close()
                  return
                }
              }
            }
          }
        }
      })
    }
  }
}
</script>
<style>
  .ql-editor {
    height: 150px;
    overflow: auto;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item{
    width: 100%;
  }
  .footer{
    text-align: center;
  }
</style>
