/*
 * @Author: Han
 * @Date: 2019-05-08 14:32:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-09 23:56:08
 * @Description 路由鉴权中间件，实现其他路由守卫功能请新建一个中间件
 *
 * **********************************************************
 * * @Strong 这是一个路由中间件，请不要在 serverMiddleware 中使用 *
 * **********************************************************
 */

import cookie from 'js-cookie';
import cookieKeys from '@/const/cookie-keys';

const LOGIN_PATH = '/login';
const INDEX_PATH = '/';
const ICONS_PATH = '/icons';

// 路由白名单，直接绕过路由守卫
const whiteList = [LOGIN_PATH, '/icons'];

export default async ({store, redirect, env, route}) => {
  if (process.server) return;

  const {NO_LOGIN} = env;
  const {path} = route;

  // 开发时可以用 NO_LOGIN 跳过路由鉴权
  if (NO_LOGIN > 0) return;

  // 鉴权白名单
  if (whiteList.indexOf(path) > -1) return;

  // 只允许开发中打开icons页面
  if (process.env.MODE === 'prod' && path === ICONS_PATH) {
    redirect(INDEX_PATH);
    return;
  }

  const cookieInfo = {};

  cookieKeys.forEach(key => {
    cookieInfo[key] = cookie.get(key);
  });

  const {userId, token, tenantId} = cookieInfo;

  // 未登录
  if (!userId || !token) {
    redirect(LOGIN_PATH);
    return;
  }

  // 已登录但是state因刷新丢失
  if (!store.state.userId) {
    store.commit('update', cookieInfo);
    try {
      await store.dispatch('fetchThirdId', {
        tenantId,
      });
    } catch (e) {
      console.error('auth error: ', e);
    }
  }
};
