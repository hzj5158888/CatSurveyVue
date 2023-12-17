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

