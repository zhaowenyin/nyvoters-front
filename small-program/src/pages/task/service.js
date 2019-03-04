import api from '../../utils/api'
// import {BigQuesInitData,SmallQuesInitData} from './config'

// 获取筛选项
export async function getList (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         citizen_id: '000',
  //         content: {
  //           name: '量表名称',
  //           app_frontend_config: JSON.stringify(
  //             {
  //               order: [
  //                 ['2', '4', '6', '7', '5'],
  //                 ['9', '1'],
  //                 ['11']
  //               ],
  //               validate: [
  //                 {
  //                   type: 1,
  //                   items: ['4', 200, 20]
  //                 },
  //                 {
  //                   type: 2,
  //                   items: ['4', '6', '7']
  //                 },
  //                 {
  //                   type: 3,
  //                   items: ['4', '6', '身高不能大于体重']
  //                 }
  //               ]
  //             }
  //           ),
  //           questions: [
  //             {
  //               name: '药品',
  //               frontend_id: '2',
  //               id: 22222,
  //               type: 8,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [],
  //                   placeholder: '请输入',
  //                   postfix: 'mg',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isVisible: true,
  //                   medicineMenu: '9'
  //                 }
  //               )
  //             },
  //             {
  //               name: '身高',
  //               frontend_id: '4',
  //               id: 44444,
  //               type: 4,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [],
  //                   placeholder: '请输入',
  //                   postfix: 'cm',
  //                   html: '',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '体重',
  //               frontend_id: '6',
  //               id: 44444,
  //               type: 4,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [],
  //                   placeholder: '请输入',
  //                   postfix: 'kg',
  //                   html: '',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: 'BMI',
  //               frontend_id: '7',
  //               id: 44444,
  //               type: 4,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [],
  //                   placeholder: '请输入',
  //                   postfix: '',
  //                   html: '',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '文本',
  //               frontend_id: '5',
  //               id: 55555,
  //               type: 5,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: false,
  //                   options: [],
  //                   placeholder: '',
  //                   postfix: '',
  //                   html: 'dsafsafdsafreawferfvrdgvgsfseahegwajydgwdaheagdyeagdegag',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isExpand: false,
  //                   urlLabel: '点击查看',
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '多选',
  //               frontend_id: '9',
  //               id: 99999,
  //               type: 2,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [
  //                     {
  //                       label: '选项1',
  //                       value: '选项1',
  //                       visibles: ['1']
  //                     },
  //                     {
  //                       label: '选项2',
  //                       value: '选项2',
  //                       visibles: ['11']
  //                     },
  //                     {
  //                       label: '选项3',
  //                       value: '选项3'
  //                     },
  //                   ],
  //                   placeholder: '',
  //                   postfix: '',
  //                   hasNoAll: true,
  //                   hasNoAll_visibles: ['11'],
  //                   hasNoknow: true,
  //                   hasNoknow_visibles: ['1'],
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '单选',
  //               frontend_id: '1',
  //               id: 33333,
  //               type: 1,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [
  //                     {
  //                       label: '选项1',
  //                       value: '选项1'
  //                     },
  //                     {
  //                       label: '选项2',
  //                       value: '选项2'
  //                     },
  //                     {
  //                       label: '选项3',
  //                       value: '选项3'
  //                     },
  //                   ],
  //                   placeholder: '',
  //                   postfix: '',
  //                   hasNoAll: true,
  //                   hasNoknow: true,
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '多选',
  //               frontend_id: '11',
  //               id: 33333,
  //               type: 2,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [
  //                     {
  //                       label: '选项1',
  //                       value: '选项1'
  //                     },
  //                     {
  //                       label: '选项2',
  //                       value: '选项2'
  //                     },
  //                     {
  //                       label: '选项3',
  //                       value: '选项3'
  //                     },
  //                   ],
  //                   placeholder: '',
  //                   postfix: '',
  //                   hasNoAll: true,
  //                   hasNoknow: true,
  //                   isVisible: false
  //                 }
  //               )
  //             },
  //           ]
  //         }


  //       }
  //     })
  //   }, 500)
  // })
  let param = {task_index: payload.task_index}
  return api.get(`/api/v3/doctorapp/serves/orders/${payload.id}/tasks/gauges`,{params: param})
}

// PC端获取筛选项
export async function getListPc (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         citizen_id: '000',
  //         content: {
  //           name: '量表名称',
  //           app_frontend_config: JSON.stringify(
  //             {
  //               order: [
  //                 ['2'],
  //               ],
  //               validate: [
  //                 {
  //                   type: 1,
  //                   items: ['4', 200, 20]
  //                 }
  //               ]
  //             }
  //           ),
  //           questions: [
  //             {
  //               name: '药品',
  //               frontend_id: '2',
  //               id: 22222,
  //               type: 7,
  //               default_answer: ['1497456000000'],
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [],
  //                   placeholder: '请输入',
  //                   postfix: 'mg',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isVisible: true,
  //                   medicineMenu: '9'
  //                 }
  //               )
  //             }
  //           ]
  //         }
  //       }
  //     })
  //   })
  // })
  return api.get(`/api/v3/doctorapp/gauges/preview/${payload.id}`)
}

// 提交
export async function answerQuestion (payload) {
  // console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         gauge_answer_id: '9090'
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/api/v3/doctorapp/serves/orders/tasks/gauges/results', payload)
}

// PC提交
export async function answerQuestionPc (payload) {
  console.log(payload)
  return api.post('/api/v3/doctorapp/gauges/preview/answers', payload)
}

// 获取图片url
export async function getImgUrl (payload) {
  console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         response_code: 3,
  //         citizen_id: 12
  //       }
  //     })
  //   }, 500)
  // })
  return api.post('/api/v3/doctorapp/sys/images', payload)
}
// 获取结果页
export async function getResultList (payload) {
  console.log(payload)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         script_result:[
  //           {
  //             result: '血压高危建议立即转诊',
  //             // task_index: 6,
  //             serve_order_id: '9900',
  //             task_name: '下一个任务名称'
  //           },{
  //             result: '服药不规范建议进行宣教，占位符占位符占位符占位符占位符占位符占位',
  //           }
  //         ],
  //         content: {
  //           name: '量表名称',
  //           questions: [
  //             {
  //               name: '电子签名',
  //               frontend_id: '2',
  //               id: 22222,
  //               type: 6,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: false,
  //                   options: [
  //                     '选项1',
  //                     '选项2',
  //                     '选项3'
  //                   ],
  //                   placeholder: '请输入',
  //                   postfix: 'mg',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '身高',
  //               frontend_id: '4',
  //               id: 44444,
  //               type: 4,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [
  //                     '选项1',
  //                     '选项2',
  //                     '选项3'
  //                   ],
  //                   placeholder: '请输入',
  //                   postfix: 'cm',
  //                   html: '',
  //                   hasNoAll: false,
  //                   hasNoknow: false,
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '单选',
  //               frontend_id: '9',
  //               id: 99999,
  //               type: 1,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [
  //                     {
  //                       label: '选项1',
  //                       value: '选项1',
  //                       visibles: ['1']
  //                     },
  //                     {
  //                       label: '选项2',
  //                       value: '选项2'
  //                     },
  //                     {
  //                       label: '选项3',
  //                       value: '选项3'
  //                     },
  //                   ],
  //                   placeholder: '',
  //                   postfix: '',
  //                   hasNoAll: true,
  //                   hasNoknow: true,
  //                   isVisible: true
  //                 }
  //               )
  //             },
  //             {
  //               name: '多选',
  //               frontend_id: '1',
  //               id: 33333,
  //               type: 2,
  //               default_answer: '',
  //               tag: '',
  //               question: JSON.stringify(
  //                 {
  //                   isEdit: true,
  //                   isRequired: true,
  //                   options: [
  //                     {
  //                       label: '选项1',
  //                       value: '选项1'
  //                     },
  //                     {
  //                       label: '选项2',
  //                       value: '选项2'
  //                     },
  //                     {
  //                       label: '选项3',
  //                       value: '选项3'
  //                     },
  //                   ],
  //                   placeholder: '',
  //                   postfix: '',
  //                   hasNoAll: true,
  //                   hasNoknow: true,
  //                   isVisible: false
  //                 }
  //               )
  //             },
  //           ]
  //         },
  //         answers: [
  //           {
  //             question_id: 22222,
  //             frontend_id: '2',
  //             answer: ['2019-02-20_f06dbd61-9b37-4b3a-9f0f-1547ef7376a4.png']
  //           },
  //           {
  //             question_id: 44444,
  //             frontend_id: '4',
  //             answer: ['554']
  //           },
  //           {
  //             question_id: 44444,
  //             frontend_id: '9',
  //             answer: ['选项2']
  //           }
  //         ],
  //         citizen: {
  //           id: '9999999',
  //           id_name: '李玉华',
  //           gender_label: '男',
  //           id_no: '342425196510270987'
  //         },

  //         "recommend": {
  //           "self_serve_orders": [
  //             {
  //               "serve_id": 12416009,
  //               "citizen_id": 16267788,
  //               "validity_begin": 1546397262000,
  //               "validity_end": 1549075662000,
  //               "id": 10145768,
  //               "name": "yyy火火发解决发奖金jjjhbhh过分过分"
  //             },
  //             {
  //               "serve_id": -15391119,
  //               "citizen_id": -66372384,
  //               "validity_begin": 1546397262000,
  //               "validity_end": 1556765262000,
  //               "id": -15028096,
  //               "name": "ex situru好多好多黄帝内经好的yryyryyryyryyryryyryhhhhhhhhhhhh"
  //             },
  //             {
  //               "serve_id": 47515976,
  //               "citizen_id": -65982271,
  //               "validity_begin": 1546397262000,
  //               "validity_end": 1556765262000,
  //               "id": -89354761,
  //               "name": "ad cupidatat dolor"
  //             },
  //             {
  //               "serve_id": 47515976,
  //               "citizen_id": -65982271,
  //               "validity_begin": 1559443662000,
  //               "validity_end": 1556765262000,
  //               "id": -89354761,
  //               "name": "ad cupidatat dolor"
  //             },
  //             {
  //               "serve_id": 47515976,
  //               "citizen_id": -65982271,
  //               "validity_begin": 1559443662000,
  //               "validity_end": 1556765262000,
  //               "id": -89354761,
  //               "name": "ad cupidatat dolor"
  //             }
  //           ],
  //           "family_serve_orders": [
  //             {
  //               "id_name": "eu",
  //               "id_no": "ut ",
  //               "birthday": 18542530,
  //               "address": "in sunt amet",
  //               "work_unit": "aute voluptate enim i",
  //               "phone": "nulla dolore",
  //               "contact_name": "laborum adipisicing",
  //               "contact_phone": "in culpa ipsum",
  //               "id_type": 77194747,
  //               "id_type_label": "est culpa incididunt n",
  //               "gender": -72953449,
  //               "gender_label": "男",
  //               "nation": 23182443,
  //               "nation_label": "pariatur aute Ut occaecat amet",
  //               "sign_state": 35392863,
  //               "sign_state_label": "occaecat culpa",
  //               "crowds_short": [
  //                 {
  //                   "value": -94861779,
  //                   "label": "糖"
  //                 },
  //                 {
  //                   "value": 64090872,
  //                   "label": "糖"
  //                 }
  //               ],
  //               "follow_state": 2,
  //               "follow_state_label": "quis",
  //               "lost_follow_reason": "non eiusmod ad",
  //               "lost_follow_reason_label": "proident esse nulla",
  //               "resident_type": 16382137,
  //               "resident_type_label": "ea",
  //               "education_degree": -75600932,
  //               "education_degree_label": "cupidatat dolor esse labore",
  //               "occupation_type": -62823107,
  //               "occupation_type_label": "mollit Excepteur",
  //               "blood_type_abo": 21289734,
  //               "blood_type_abo_label": "in dese",
  //               "blood_type_rh": 6977353,
  //               "blood_type_rh_label": "nostrud ad id cillum",
  //               "marital_state": 24268627,
  //               "marital_state_label": "proident Duis",
  //               "medical_payment": -39488905,
  //               "medical_payment_label": "cupidatat aliquip",
  //               "disablility_state": [
  //                 -43279632,
  //                 -16647028,
  //                 66734379
  //               ],
  //               "poor_cause": [
  //                 -86927358,
  //                 -99279938,
  //                 -4122514,
  //                 -30356508,
  //                 22190655
  //               ],
  //               "disability_state_label": "dolore",
  //               "poor_cause_label": "do Ut voluptate et",
  //               "family_id": 7856861,
  //               "family_label": "proident adipisicing incididunt in",
  //               "family_owner": "Excepteur ad voluptate culpa aute",
  //               "gb2260_root": "velit laboris ipsum",
  //               "id_state": -65344592,
  //               "id_state_label": "ullamco amet",
  //               "serve_orders": [
  //                 {
  //                   "serve_id": 373721,
  //                   "citizen_id": 68368010,
  //                   "validity_begin": 1559443662000,
  //                   "validity_end": 1556765262000,
  //                   "id": 55355372,
  //                   "name": "esse in qui dolor"
  //                 },
  //                 {
  //                   "serve_id": 33776007,
  //                   "citizen_id": 22627389,
  //                   "validity_begin": 1559443662000,
  //                   "validity_end": 1556765262000,
  //                   "id": 34366538,
  //                   "name": "commodo nostrud proident cupidatat culpa"
  //                 },
  //                 {
  //                   "serve_id": -33596486,
  //                   "citizen_id": -73375832,
  //                   "validity_begin": 1559443662000,
  //                   "validity_end": 1556765262000,
  //                   "id": 82607206,
  //                   "name": "aliqua tempor ut nostrud"
  //                 }
  //               ],
  //               "location_id": -49337815.641957626,
  //               "location_name": "fugiat exercitation consectetur"
  //             },
  //             {
  //               "id_name": "non et",
  //               "id_no": "culpa Ut laboris",
  //               "birthday": -9167551,
  //               "address": "id dolor ipsum exercitation",
  //               "work_unit": "ipsum nisi ex",
  //               "phone": "dolor esse oc",
  //               "contact_name": "deserunt incididunt",
  //               "contact_phone": "qui nisi dolore",
  //               "id_type": -46303849,
  //               "id_type_label": "ut",
  //               "gender": -79732718,
  //               "gender_label": "男",
  //               "nation": 66612302,
  //               "nation_label": "cillum in esse",
  //               "sign_state": 2587304,
  //               "sign_state_label": "Lorem occaecat",
  //               "crowds_short": [
  //                 {
  //                   "value": 82396828,
  //                   "label": "糖"
  //                 },
  //                 {
  //                   "value": -29592938,
  //                   "label": "糖"
  //                 }
  //               ],
  //               "follow_state": -34685885,
  //               "follow_state_label": "eiusmod adipisi",
  //               "lost_follow_reason": "in esse est pariatur amet",
  //               "lost_follow_reason_label": "aute elit in proident",
  //               "resident_type": 54462264,
  //               "resident_type_label": "commodo velit do",
  //               "education_degree": 71605588,
  //               "education_degree_label": "aliqua Excepteur",
  //               "occupation_type": -43104588,
  //               "occupation_type_label": "voluptate ullamco occaecat",
  //               "blood_type_abo": 60992116,
  //               "blood_type_abo_label": "sint in anim exercitation",
  //               "blood_type_rh": 42165322,
  //               "blood_type_rh_label": "Duis reprehenderit",
  //               "marital_state": 8945466,
  //               "marital_state_label": "consectetur Excepteur Lorem",
  //               "medical_payment": -64162447,
  //               "medical_payment_label": "quis veniam",
  //               "disablility_state": [
  //                 -29556398,
  //                 43997417,
  //                 -51322243
  //               ],
  //               "poor_cause": [
  //                 88404223
  //               ],
  //               "disability_state_label": "reprehenderit ullamco veniam consectetur",
  //               "poor_cause_label": "e",
  //               "family_id": 58051969,
  //               "family_label": "Excepteur com",
  //               "family_owner": "labore ut",
  //               "gb2260_root": "est sit in qui",
  //               "id_state": -7330714,
  //               "id_state_label": "est et ex",
  //               "serve_orders": [
  //                 {
  //                   "serve_id": -8664939,
  //                   "citizen_id": -46068615,
  //                   "validity_begin": 1554173262000,
  //                   "validity_end": 1556765262000,
  //                   "id": -15896877,
  //                   "name": "non laborum dolore"
  //                 },
  //                 {
  //                   "serve_id": -34645279,
  //                   "citizen_id": -94389783,
  //                   "validity_begin":1546397262000,
  //                   "validity_end": 1556765262000,
  //                   "id": 76275395,
  //                   "name": "aute"
  //                 }
  //               ],
  //               "location_id": 94109630.7645151,
  //               "location_name": "minim esse"
  //             },
  //             {
  //               "id_name": "mollit cupidat",
  //               "id_no": "dolore consectetur non mollit",
  //               "birthday": 78578152,
  //               "address": "voluptate",
  //               "work_unit": "officia elit esse eu",
  //               "phone": "est",
  //               "contact_name": "esse",
  //               "contact_phone": "aliquip ex",
  //               "id_type": -49317613,
  //               "id_type_label": "in consectetur magna",
  //               "gender": 22291230,
  //               "gender_label": "男",
  //               "nation": 73944103,
  //               "nation_label": "est esse irure",
  //               "sign_state": -50020354,
  //               "sign_state_label": "Lorem cillum",
  //               "crowds_short": [
  //                 {
  //                   "value": -16044138,
  //                   "label": "糖"
  //                 },
  //                 {
  //                   "value": 33299595,
  //                   "label": "糖"
  //                 },
  //                 {
  //                   "value": 16817118,
  //                   "label": "糖"
  //                 },
  //                 {
  //                   "value": -12587345,
  //                   "label": "糖"
  //                 }
  //               ],
  //               "follow_state": 50791256,
  //               "follow_state_label": "Excepteur dolor nisi reprehenderit Ut",
  //               "lost_follow_reason": "ut laboris laborum",
  //               "lost_follow_reason_label": "Ut elit adipisicing do",
  //               "resident_type": 90582766,
  //               "resident_type_label": "in Excepteur",
  //               "education_degree": 9638531,
  //               "education_degree_label": "sit officia non elit",
  //               "occupation_type": 23294787,
  //               "occupation_type_label": "culpa ea dolor",
  //               "blood_type_abo": -53406106,
  //               "blood_type_abo_label": "magna deserunt sunt",
  //               "blood_type_rh": -10678651,
  //               "blood_type_rh_label": "ipsum dolore cillum fugiat",
  //               "marital_state": -504691,
  //               "marital_state_label": "quis do",
  //               "medical_payment": 29728837,
  //               "medical_payment_label": "ea veniam",
  //               "disablility_state": [
  //                 -26716919,
  //                 -32890361,
  //                 53434042
  //               ],
  //               "poor_cause": [
  //                 -29562965
  //               ],
  //               "disability_state_label": "eiusmod dolor exercitation tempor",
  //               "poor_cause_label": "Ut voluptate enim exercitation reprehenderit",
  //               "family_id": -70226538,
  //               "family_label": "adipisicing id",
  //               "family_owner": "tempor labore exercitation in",
  //               "gb2260_root": "veniam dolor in",
  //               "id_state": 68794694,
  //               "id_state_label": "cupidatat cillum",
  //               "serve_orders": [
  //                 {
  //                   "serve_id": 58089087,
  //                   "citizen_id": -47339704,
  //                   "validity_begin": 1549075662000,
  //                   "validity_end": 1556765262000,
  //                   "id": 1530239,
  //                   "name": "velit deserunt irure labore"
  //                 },
  //                 {
  //                   "serve_id": 50185004,
  //                   "citizen_id": -63458042,
  //                   "validity_begin": 1549075662000,
  //                   "validity_end": 1550198862000,
  //                   "id": 83842168,
  //                   "name": "deserunt fugiat"
  //                 }
  //               ],
  //               "location_id": 88947731.93641785,
  //               "location_name": "Lorem nostrud do"
  //             }
  //           ]
  //         }
  //       }
  //     })
  //   }, 500)
  // })
  return api.get(`/api/v3/doctorapp/serves/tasks/gauges/results`, {params: payload})
}

// 获取结果页-PC
export async function getResultListPc (payload) {
  console.log('pc')
  return api.get(`/api/v3/doctorapp/serves/tasks/plans/gauges/results`, {params: payload})
}

export async function getMedicineList (payload) {
  return api.get('/api/v3/doctorapp/gauges/questions/medicine', {params:payload})
}

// 保存GPS
export async function uploadGeoPostion (payload) {
  // console.log(payload)
  // return {}
  return api.post('/api/v3/doctorapp/sys/gps', payload)
}
export async function getOrderVerifyType(order_id) {
  let params = {order_id}
  return api.get('/api/v3/doctorapp/serves/order/verify_type',{params})
}
export async function verify (order_id,citizen_id,type,image) {
  const params = {order_id,citizen_id,image,verify:{type,value:image}}
  return api.post('/api/v3/doctorapp/serves/order/verify',params)
}




