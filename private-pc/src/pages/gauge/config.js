// 题目类型
export const types = {
  1: '单选题',
  2: '多选题',
  3: '填空题',
  4: '数字填空题',
  5: '富文本',
  6: '签字板',
  7: '时间',
  8: '药品'
}

// 题目模板
export const questionTemp = () => {
  return {
    frontend_id: 0,
    name: '',
    question: {
      options: null,
      isEdit: true,
      isRequired: true,
      placeholder: '',
      postfix: '',
      isExpand: false,
      isVisible: true,
      html: '',
      urlLabel: '',
      validate: [],
      hasNoAll: false,
      hasNoknow: false,
      medicineMenu: '',
      hasNoAll_visibles: [],
      hasNoknow_visibles: []
    },
    label_id: '',
    type: '',
    default_answer_config: '',
    default_answer_type: ''
  }
}

// 渲染树
export const renderTree = () => {
  return {
    name: '',
    maxIndex: 1,
    currentIndex: 0,
    script_name: '',
    script: `\n函数 量表完成(){\n\t返回 "{量表结果: '量表完成'}";\n}\n\n\n函数 测试(){\n\t返回 量表完成();\n}\n\n\n如果(校验){\n    返回 量表完成()\n}否则{\n    返回 测试() \n}\n`,
    validate: [],
    print_templates: [],
    pages: [
      []
    ]
  }
}

// 渲染树
export const script = `\n函数 量表完成(){\n\t返回 "{量表结果: '量表完成'}";\n}\n\n\n函数 测试(){\n\t返回 量表完成();\n}\n\n函数 血压高(){\n\t返回 "{量表结果: '高血压'}";\n}\n\n\n如果(校验){\n    返回 量表完成()\n}否则{\n    返回 测试() \n}\n`
