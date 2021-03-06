import Vue from 'vue'
import Router from 'vue-router'
import Me from "../Acccount/me"
import Func from "../Acccount/func"
import Book from "../Acccount/book"
import ReqLogin from '../Acccount/Reqlogin'
import Login from '../components/ReqLogin/login'
import Req from '../components/ReqLogin/req.vue'
import Setr from '../Acccount/Set'
import Chan from '../Acccount/chanPass'
import Pass from '../Acccount/Pass'
import Acco from '../Acccount/Acco'
import Acc from '../Acccount/Acco/Acc'
import Fin from '../Acccount/Acco/Finance'
import Assets from '../Acccount/Acco/Assets'
import Cate from '../Acccount/cate/cate'
import Member from '../Acccount/member/member'
import Feed from '../Acccount/Feed/Feed'
import Income from '../Acccount/Func/income'
import Expen from '../Acccount/Func/expen'
import Detar from "../Acccount/Bookr/Detar.vue"
import Month from '../Acccount/Bookr/Month.vue'
import DeTa from '../Acccount/Bookr/DeTa.vue'
import SetMer from '../Acccount/SetMer/setMe.vue'
import Dai from '../Acccount/Dai/Dai.vue'
import Daix from '../Acccount/Dai/Daix.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    //路由导向
    redirect: {
      name: '/book'
    }
  }, {
    path: '/func',
    name: '/func',
    component: Func,
    redirect: '/income',
    children: [{
      path: '/income',
      name: '/income',
      component: Income
    }, {
      path: '/expen',
      name: '/expen',
      component: Expen
    }]
  }, {
    path: '/book',
    name: '/book',
    component: Book
  }, {
    path: '/reqlogin',
    name: '/reqlogin',
    component: ReqLogin,
    redirect: '/login',
    children: [{
      path: '/login',
      name: '/login',
      component: Login
    }, {
      path: '/req',
      name: '/req',
      component: Req
    }]
  }, {
    path: '/set',
    name: '/vue/set',
    component: Setr
  }, {
    path: '/chan',
    name: '/vue/chan',
    component: Chan
  }, {
    path: '/pass',
    name: '/vue/pass',
    component: Pass
  }, {
    path: '/acco',
    name: '/vue/acco',
    component: Acco
  }, {
    path: '/Acc',
    name: '/vue/Acc',
    component: Acc
  }, {
    path: '/Fin',
    name: '/vue/Fin',
    component: Fin
  }, {
    path: '/me',
    name: '/me',
    component: Me
  }, {
    path: '/Assets',
    name: '/Assets',
    component: Assets
  }, {
    path: "/Cate",
    name: '/vue/Cate',
    component: Cate
  }, {
    path: '/Member',
    name: '/vue/Member',
    component: Member
  }, {
    path: '/Feed',
    name: '/vue/Feed',
    component: Feed
  }, {
    path: '/Detar',
    name: '/vue/Detar',
    component: Detar,
    redirect: '/Time/Month',
    children: [{
      path: '/Time/:date',
      name: '/vue/Month',
      component: Month
    }]
  }, {
    path: '/DeTa',
    name: '/vue/DeTa',
    component: DeTa
  }, {
    path: '/SetMer',
    name: '/vue/SetMer',
    component: SetMer
  }, {
    path: '/Dai',
    name: '/vue/Dai',
    component: Dai,
    redirect: '/Daix/1',
    children: [{
      path: '/Daix/:id',
      name: '/vue/Daix',
      component: Daix
    }]
  }, {
    path: '*',
    redirect: {
      name: '/book'
    }
  }]
})
