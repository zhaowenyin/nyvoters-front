export const serviceBagEntity = () => {
  return {
    description: '',
    name: '',
    need_sign: true,
    serves: [],
    validity_begin: '',
    validity_end: ''
  }
}

export const serviceEntity = () => {
  return {
    citizen_features: null,
    description: '',
    doctor_qualification: '',
    name: '',
    serve_order_operations: [],
    operations: [],
    sequence_flows: [],
    time_limit: {
      time: '',
      unit: ''
    },
    type_in_serve_package: '',
    verify_type: [1]
  }
}
