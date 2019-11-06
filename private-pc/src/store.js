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
import publicsecuritydata from './pages/voters-management/public-security-data/module'
import comparefaildata from './pages/compare-fail-data/module'
// 选民信息查询
import voterInfo from './pages/voter-info/module'
import voterRegisters from './pages/voter-registers/home/module'
import voterRegistersData from './pages/voter-registers/data/module'

import log from './pages/system-manage/operate-log/module'
//选委会公共
import commonCommittee from './pages/district-management/committee/module'
// 通讯录和人员权限配置
import  authority from './pages/system-manage/authorization-config/module'
import addressBook from './pages/system-manage/address-book/module'
// 报表中心
import reportCenter from './pages/report-center/report-file/file/module'


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
    commonCommittee,
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
    votersAppealHistory,
    voterInfo,
    voterRegisters,
    voterRegistersData,
    log,
    authority,
    addressBook,
    reportCenter,
    publicsecuritydata,
    comparefaildata
  }
})
