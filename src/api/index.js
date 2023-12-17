export default {
  /**  账号密码登录登出  **/
  loginIn: `/login`,
  logOut: `/logout`,
  /** 问卷数据  **/
  survey: `/survey`,
  user: `/user`,
  response: `/response`,
  surveyUpdate: `/api/ctsurvey/app/survey/survey-base-attr.do`,
  surveyUpState: `/api/ctsurvey/app/survey/up-survey-status.do`,
  surveyDelete: `/api/ctsurvey/app/survey/delete.do`,
  surveyReport: `/api/ctsurvey/app/stats/report.do`,
  surveyAnswerList: `/api/ctsurvey/app/answer/list.do`,
  surveyAnswerInfo: `/api/ctsurvey/app/answer/info.do`,
  surveyAnswerExport: `/api/ctsurvey/app/answer/export-xls.do`,
  surveyAnswerDelete: `/api/ctsurvey/app/answer/delete.do`,
  adminUserList: `/api/ctsurvey/admin/user/list.do`,
  adminUserCreate: `/api/ctsurvey/admin/user/add.do`,
  adminUserUpdate: `/api/ctsurvey/admin/user/edit.do`,
  adminUserDelete: `/api/ctsurvey/admin/user/delete.do`,
  curUserInfo: `/api/ctsurvey/app/user/currentUser.do`,
  curUserPwdUpdate: `/api/ctsurvey/app/user/up-pwd.do`
}
