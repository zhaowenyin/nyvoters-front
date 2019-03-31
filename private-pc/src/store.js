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
import voterGroup from './pages/district-management/voters-group/module'
import cutPower from './pages/district-management/cutpower-manage/module'
import qualReview from './pages/qual-review/home/module'
import qualReviewHistory from './pages/qual-review/history/module'
import initialCandidate from './pages/initial-candidate/module'
import officialCandidate from './pages/official-candidate/module'
import officialBehalf from './pages/official-behalf/module'
// 选民管理
import votersQualification from './pages/voters-management/voters-qualification/module'
import votersInput from './pages/voters-management/voters-input/module'
import votersOut from './pages/voters-management/voters-drawOut/module'
import votersTransferHistory from './pages/voters-management/voters-transfer/history/module'
import votersTransfer from './pages/voters-management/voters-transfer/home/module'
import votersAppealHome from './pages/voters-management/voters-appeal/home/module'
import votersAppealHistory from './pages/voters-management/voters-appeal/history/module'

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
    qualReviewHistory,
    initialCandidate,
    officialCandidate,
    officialBehalf,
    votersQualification,
    votersInput,
    votersOut,
    votersTransferHistory,
    votersTransfer,
    votersAppealHome,
    votersAppealHistory
  }
})
