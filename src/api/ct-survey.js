import request from '@/utils/request'
import API from '@/api/index.js'

/**
 * 问卷列表
 * @param pageSize
 * @param current
 * @returns {*}
 */
export function ctSurveyList () {
  return request({
    url: API.survey,
    method: 'get'
  })
}
/**
 * 创建问卷
 * @param data
 * @returns {*}
 */
export function ctSurveyCreate (data) {
  return request({
    url: API.survey,
    method: 'post',
    data
  })
}

/**
 * 更新问卷状态
 * @param surveyId
 * @param surveyState
 * @returns {*}
 */
export function ctSurveyUpState (surveyId, surveyState) {
  const data = {
    status: surveyState
  }
  return request({
    url: API.survey + '/' + surveyId,
    method: 'put',
    data
  })
}
/**
 * 获取问卷信息
 * @param surveyId
 * @returns {*}
 */
export function ctSurveyInfo (surveyId) {
  return request({
    url: API.survey + '/' + surveyId,
    method: 'get',
  })
}

export function addResponse (data) {
  return request({
    url: API.response,
    method: 'post',
    data
  })
}

/**
 * 更新问卷信息
 * @param data
 * @returns {*}
 */
export function ctSurveyUpdate (surveyId, data) {
  return request({
    url: API.survey + '/' + surveyId,
    method: 'put',
    data
  })
}
/**
 * 更新问卷信息
 * @param data
 * @returns {*}
 */
export function ctSurveyDelete (surveyId) {
  return request({
    url: API.survey + '/' + surveyId,
    method: 'delete'
  })
}
/**
 * 获取问卷的统计信息
 * @param surveyId
 * @returns {*}
 */
export function ctSurveyReport (surveyId) {
  const params = {
    surveyId
  }
  return request({
    url: API.surveyReport,
    method: 'get',
    params
  })
}
/**
 * 获取问卷的答卷列表
 * @param pageSize
 * @param current
 * @param surveyId
 * @returns {*}
 */
export function ctSurveyAnswerList (pageSize, current, surveyId) {
  const params = {
    pageSize,
    current,
    surveyId
  }
  return request({
    url: API.surveyAnswerList,
    method: 'get',
    params
  })
}
/**
 * 更新问卷信息
 * @param data
 * @returns {*}
 */
export function ctSurveyAnswerDelete (responseId) {
  return request({
    url: API.response + '/' + responseId,
    method: 'delete',
  })
}
/**
 * 获取问卷答卷详情
 * @param answerId
 * @returns {*}
 */
export function ctSurveyAnswerInfo (answerId) {
  const params = {
    answerId
  }
  return request({
    url: API.surveyAnswerInfo,
    method: 'get',
    params
  })
}

