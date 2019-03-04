<template>
  <div class="all">
    <CommonHeader
    :back="onBack"
    title="选择药品"/>
    <div class="content">
      <div class="one">
        <div class="name">
          <span
            class="dot">*</span>
            药品
        </div>
        <div
          @click="selectMedicine()"
          class="itemContent">
          <SelectArea :data="currentItem.value.name"/>
          <!--报错提示 -->

      </div>
      <div
        v-if="error1"
        class="error">{{error1}}</div>
    </div>
      <div class="type">
        <Select
          class="bg"
          label="typeName"
          :options="methods"
          :isclick="true"
          :disabled="!currentItem.value.typeName"
          :currentItem="currentItem"
          v-model="value"
          placeholder="请选择输入方式"
        />
        <div
          v-if="error2"
          class="error">{{error2}}</div>
      </div>
        <div v-if="value === '1'" class="type">
          <div :class="['name',{'disabled': form.length===0}]">
            剂型
          </div>
          <Select
            class="bg"
            label="pow_label"
            :options="form"
            :disabled="form.length===0"
            :currentItem="currentItem"
            v-model="currentItem.value.pow"
            placeholder="请选择剂型"
          />
      </div>
      <div
        v-if="error3 && value==='1'"
        class="error">{{error3}}</div>
      <div v-if="value === '1'" class="type">
        <div :class="['name',{'disabled': spec.length===0}]">
            规格
        </div>
        <Select
          class="bg"
          :options="spec"
          :currentItem="currentItem"
          label="spec_label"
          v-model="currentItem.value.spec"
          :disabled="spec.length===0"
          placeholder="请选择规格"
        />
      </div>
      <div
        v-if="error4&&value==='1'"
        class="error">{{error4}}</div>
      <div class="type" v-if="value === '2'">
        <div :class="['name',{'disabled': !value}]">
          用药剂量
        </div>
          <NumberInput
          style="color: #333"
          class="selectContent"
          :disabled="!value"
          :ismedicine="true"
          placeholder="请输入用药剂量"
          v-model="currentItem.value.dosage_num"/>
      </div>
      <div
        v-if="error5 && value==='2'"
        class="error">{{error5}}</div>
      <div class="type" v-if=" value === '2'">
        <div :class="['name',{'disabled': spec_unit1.length === 0}]">
          用药单位
        </div>
        <Select
          class="bg"
          :currentItem="currentItem"
          label="dosage_label"
          :disabled="spec_unit1.length === 0"
          :options="spec_unit1"
          v-model="currentItem.value.dosage"
          placeholder="请选择用药单位"
        />
      </div>

      <div class="type" v-if="value === '1'">
        <div :class="['name',{'disabled': spec_unit.length === 0}]">
        用药剂量
        </div>
        <div class="frequency">
          <Count
            class="item"
            style="margin-right: 20px;"
            :disabled="spec_unit.length === 0"
            :data="currentItem.value.dosage_num1"
            :validate="{minNumber: 0}"/>
            <Select
            class="bg1"
            :currentItem="currentItem"
            label="dosage_label"
            v-if="spec_unit.length > 0"
            :options="spec_unit"
            :size="true"
            v-model="currentItem.value.dosage"
            placeholder="请选择单位"
          />
          <div v-else class='diabel'>请选择单位</div>
        </div>
      </div>
        <div
        v-if="error5 && value===1"
        class="error">{{error5}}</div>
      <div
        v-if="error6"
        class="error">{{error6}}</div>
       <div class="type">
        <div class="name">
        用药频次
        </div>
        <div class="frequency">
          <Count
            class="item"
            style="margin-right: 20px;"
            :data="currentItem.value.frequency_num1"
            :validate="{minNumber: 0}"/>
            <Select
            :currentItem="currentItem"
            label="frequency_label"
            class="bg1"
            :options="frequency"
            :size="true"
            v-model="currentItem.value.frequency"
            placeholder="请选择频度"
          />
        </div>
         <!--报错提示 -->
         <div
        v-if="error7"
        class="error">{{error7}}</div>
        <div
        v-if="error8"
        class="error">{{error8}}</div>
      </div>
      <div
        @click="submit"
        class="finish">保存</div>
    </div>
  </div>
</template>
<script>
import CommonHeader from '../../../components/CommonHeader'
import SelectArea from './Select'
import { mapState, mapMutations, mapActions } from 'vuex'
import Select from './Audio'
import Count from './Count'
import NumberInput from '../../../components/NumberInput'
export default {
  data () {
    return {
      medicine_id: '',
      methods: [
        {
          label: '自定义',
          value: '2'
        },
        {
          label: '剂型、规格',
          value: '1'
        }
      ],
      frequency: [
        {value: '小时',label: '小时'},
        {value: '天',label: '天'},
        {value: '月',label: '月'},
        {value: '年',label: '年'}
      ],
      error1: '',
      error2: '',
      error3: '',
      error4: '',
      error5: '',
      error6: '',
      error7: '',
      error8: '',
      item: {}
    }
  },
  components: {
    CommonHeader,
    SelectArea,
    Select,
    Count,
    NumberInput
  },
  computed: {
    ...mapState('task', {
      taskList: state => state.taskList,
      medicineItem: state => state.medicineItem,
      medicineList: state => state.medicineList,
      currentItem: state => state.currentItem
    }),
    value: {
      get: function () {
        return this.currentItem.value&&this.currentItem.value.type
      },
      set: function (v) {
        this.currentItem.value.type = v
      }
    },
    form () {
      return this.medicineItem&&this.medicineItem.form || []
    },
    spec_unit () {
      let arr = []
      for(let i of this.form) {
        if(i.value === this.currentItem.value.pow) {
          arr = i.spec_unit
          break
        }
      }
      const res = new Map()
      let handerArr = arr.filter(function(a){
        return !res.has(a.value) && res.set(a.value, 1)
      })
      return handerArr
    },
    spec () {
      let arr = []
      for(let i of this.form) {
        if(i.value === this.currentItem.value.pow) {
          arr = i.spec
          break
        }
      }
      const res = new Map()
      let handerArr = arr.filter(function(a){
        return !res.has(a.value) && res.set(a.value, 1)
      })
      return handerArr
    },
    spec_unit1() {
      let arr = []
      if(this.currentItem.value.id) {
        arr = this.medicineItem.dose_unit
      } else {
        for(let i of this.medicineList) {
          arr = arr.concat(i.dose_unit)
        }
      }
      const res = new Map()
      let handerArr = arr.filter(function(a){
        return !res.has(a.value) && res.set(a.value, 1)
      })

      return handerArr || []
    }
  },
  watch: {
    // medicineItem(val) {
    //   this.currentItem.value.name = val.medicine_name
    //   this.currentItem.value.id = val.medicine_id
    // },
    value () {
      this.currentItem.value.pow = ''
      this.currentItem.value.pow_label = ''
      this.currentItem.value.spec = ''
      this.currentItem.value.spec_label = ''
      this.currentItem.value.dosage_num = ''
      this.currentItem.value.dosage = ''
      this.currentItem.value.dosage_label = ''
      this.currentItem.value.frequency_num = ''
      this.currentItem.value.frequency_label = ''
      this.currentItem.value.frequency = ''
      this.currentItem.value.dosage_num1.value = 0
      this.currentItem.value.frequency_num1.value = 0
    }
  },
  created () {
    if(this.$route.query.from === 'select') {
      this.currentItem.value.name = this.medicineItem.medicine_name
      this.currentItem.value.id = this.medicineItem.medicine_id
      if(!this.currentItem.value.id) {
        this.currentItem.value.type = '2'
        this.currentItem.value.typeName = '自定义'
      } else {
        this.currentItem.value.type = '1'
        this.currentItem.value.typeName = '剂型、规格'
      }
      return
    }
    this.saveCurrentItem(this.$route.query.frontend_id)
    this.item=JSON.parse(JSON.stringify(this.currentItem))
    this.searchMedicineList({
      menu: this.currentItem.question.medicineMenu,
      item: this.currentItem.value
    })

  },
  methods: {
    ...mapMutations('task', [
      'saveCurrentItem',
      'savequetions',
      'savecurrent'
    ]),
    ...mapActions('task', [
      'searchMedicineList'
    ]),
    onBack() {
      this.savecurrent()
      delete this.$route.query.frontend_id
      delete this.$route.query.from
      this.$router.push({
        path:'/task',
        query:{
          ...this.$route.query
        }
      })
    },
    selectMedicine () {
      this.$router.push({
        path: '/selector',
        query: {
          ...this.$route.query,
          id: this.medicineItem.medicine_id
        }
      })
    },
    submit () {
      if(this.currentItem.value.type === '1') {
        this.currentItem.value.dosage_num = this.currentItem.value.dosage_num1.value
      }
      this.currentItem.value.frequency_num = this.currentItem.value.frequency_num1.value
      this.savequetions(this.$route.query.frontend_id)

      if(!this.verify()) {
        return
      }
      delete this.$route.query.frontend_id
      delete this.$route.query.from
      this.$router.push({
        path:'/task',
        query:{
          ...this.$route.query
        }
      })
    },
    verify () {
      if(!this.currentItem.value.name) {
        this.error1 = '请选择药品'
        return false
      }
      this.error1=''
      if(!this.currentItem.value.type) {
        this.error2 = '请选择输入方式'
        return false
      }
      this.error2=''
      if(!this.currentItem.value.pow_label && this.currentItem.value.type==="1") {
        this.error3 = '请选择剂型'
        return false
      }
      this.error3 = ''
      if((!this.currentItem.value.spec_label) && this.currentItem.value.type==="1") {
        this.error4 = '请选择规格'
        return false
      }
      this.error4 = ''
      if((this.currentItem.value.dosage_num === '')) {
        this.error5 = '请输入用药剂量'
        return false
      }
      this.error5=""
      if(!this.currentItem.value.dosage_label) {
        this.error6 = "请选择单位"
        return false
      }
      this.error6 = ''
      if(this.currentItem.value.frequency_num === '') {
        this.error7 = "请选择频次"
        return false
      }
      this.error7 = ''
      if(!this.currentItem.value.frequency) {
        this.error8 = "请选择频度"
        return false
      }
      this.error8 = ''
      return true
    }
  }
}
</script>
<style scoped>
  .all {
    display: flex;
    flex-direction: column;
    height: 100%;
    & .content {
      flex: 1;
      overflow: auto;
      background:rgba(234,234,234,1);
    }
  }
  .name{
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
    color:#333;
    position: relative;
    padding: 12px 18px 0px;
    & .dot {
      color: red;
      position: absolute;
      left: 8px;
    }
  }

  .itemContent{
    padding: 0px 18px;
    margin-bottom: 8px;
  }
.one {
  background:rgba(255,255,255,1);
}
.type {
  background:rgba(255,255,255,1);
  border-bottom: 1px solid #d8d8d8;
}
.bg {
   padding: 0px 18px;
}
.bg1 {
  padding: 0px 6px;
  border-radius:2px;border:1px solid rgba(6,211,211,1); width: 45%;
}
.frequency {
  display: flex;
  padding:12px 18px;
  & .item {
    flex: 1;
    }
}
.finish{
  height: 48px;
  line-height: 48px;
  text-align: center;
  background:rgba(6,211,211,1);
  border-radius:4px;
  color:rgba(255,255,255,1);
  margin: 20px;
}
.error {
  font-size: 13px;
  background: #FF5F6F;
  color: #fff;
  line-height: 28px;
  padding: 0px 18px;
}
.disabled {
  color:rgba(153,153,153,1);
}
.diabel {
  height: 48px;
  line-height: 48px;
  padding-left: 10px;
  background:rgba(216,216,216,1);
  border-radius:2px;
  color:rgba(153,153,153,1);
  width: 45%;
  font-size: 16px;
}
.selectContent {
  color:#666;
  font-size: 16px;
  background: #fff;
  min-height: 44px;
  padding: 0px 18px;
}

</style>
