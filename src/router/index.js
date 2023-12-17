import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layouts/Layout.vue'
import LoginLayout from '@/components/layouts/LoginLayout.vue'
import SignUpLayout from '@/components/layouts/SignUpLayout.vue'
import NoTopLayout from '@/components/layouts/NoTopLayout.vue'
import CtSurveyList from '@/views/ct-survey/CtSurveyList'
import CtSurveyAttr from '@/views/ct-survey/ct-collect/CtSurveyAttr'
import CtAnswerUrl from '@/views/ct-survey/ct-collect/CtAnswerUrl'
import CtSiteShare from '@/views/ct-survey/ct-collect/CtSiteShare'
import CtSurveyCharts from '@/views/ct-survey/ct-data/CtSurveyCharts'
import CtSurveyAnswer from '@/views/ct-survey/ct-data/CtSurveyAnswer'
import CtSurveyAnswerInfo from '@/views/ct-survey/ct-data/CtSurveyAnswerInfo'
import CtUser from '@/views/ct-user/CtUser'
import CtUserPwd from '@/views/ct-user/CtUserPwd'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import CtSurveyResponse from '@/views/ct-survey/ct-response/CtSurveyResponse'
import CtSurveyEdit from '@/views/ct-survey/ct-edit/CtSurveyEdit'
import CtUserEdit from '@/views/ct-user/CtUserEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: '首页',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: '/ct/survey'
        },
        {
          path: '/ct/survey',
          name: 'CtSurveyList',
          component: CtSurveyList
        },
        {
          path: '/ct/survey/c/attr/:id',
          name: 'CtSurveyAttr',
          component: CtSurveyAttr
        },
        {
          path: '/ct/survey/c/url/:id',
          name: 'CtAnswerUrl',
          component: CtAnswerUrl
        },
        {
          path: '/ct/survey/c/share/:id',
          name: 'CtSiteShare',
          component: CtSiteShare
        },
        {
          path: '/ct/survey/d/edit/:id',
          name: 'CtSurveyEdit',
          component: CtSurveyEdit
        },
        {
          path: '/ct/survey/d/chart/:id',
          name: 'CtSurveyCharts',
          component: CtSurveyCharts
        },
        {
          path: '/ct/survey/d/data/:id',
          name: 'CtSurveyAnswer',
          component: CtSurveyAnswer
        },
        {
          path: '/ct/user/pwd',
          name: 'CtUserPwd',
          component: CtUserPwd
        },
        {
          path: '/ct/user',
          name: 'CtUser',
          component: CtUser
        },
        {
          path: '/ct/user/edit',
          name: 'CtUserEdit',
          component: CtUserEdit
        }
      ]
    },
    {
      path: '/no-top',
      name: 'NoTopLayout',
      component: NoTopLayout,
      children: [
        {
          path: '/no-top/ct-survey/d/data/:id/:answerId',
          name: 'CtSurveyAnswerInfo',
          component: CtSurveyAnswerInfo
        },
        {
          path: '/no-top/ct-survey/ct-response/:surveyId',
          name: 'CtSurveyResponse',
          component: CtSurveyResponse
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginLayout',
      component: LoginLayout,
      children: [
        {
          path: '/',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/signup',
      name: 'SignUpLayout',
      component: SignUpLayout,
      children: [
        {
          path: '/',
          name: 'signup',
          component: SignUp
        }
      ]
    }
  ]
})
