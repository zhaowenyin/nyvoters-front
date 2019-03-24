import Vue from 'vue'
import Vuex from 'vuex'
import commonData from './common-data/module'

import home from './pages/home/module'
import voterRegister from './pages/voter-register/module'
import behalfCommended from './pages/behalf-recommended/home/module'
import behalfCommendedHistory from './pages/behalf-recommended/history/module'
import regionManage from './pages/system-manage/region-manage/module'
import fileManage from './pages/system-manage/file-manage/module'
import committeeHome from './pages/district-management/committee/home/module'
import committeeAcccount from './pages/district-management/committee/account/module'
import distictHome from './pages/district-management/distric-manage/home/module'
import districtAccount from './pages/district-management/distric-manage/account/module'
import  voterGroup from './pages/district-management/voters-group/module'
import cutPower from './pages/district-management/cutpower-manage/module'
import qualReview from './pages/qual-review/home/module'
import qualReviewHistory from './pages/qual-review/history/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonData,
    home,
    voterRegister,
    behalfCommended,
    behalfCommendedHistory,
    regionManage,
    fileManage,
    committeeHome,
    committeeAcccount,
    distictHome,
    districtAccount,
    voterGroup,
    cutPower,
    qualReview,
    qualReviewHistory
  }
})
