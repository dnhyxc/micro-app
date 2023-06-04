/*
 * @Description: 路由配置
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\router\config.tsx
 */
import { lazy, Suspense, ReactNode } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { Spin } from 'antd';
import AppLayout from '@/layout';
import styles from './index.less';

const Article = lazy(() => import('@/view/article'));

const lazyLoad = (children: ReactNode, needSpin = true): ReactNode => {
  return (
    <Suspense
      fallback={
        needSpin ? (
          <Spin className={styles.loading} tip="正在卖力加载中..." />
        ) : null
      }
    >
      {children}
    </Suspense>
  );
};

const children = [
  {
    path: 'article',
    element: lazyLoad(<Article />),
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />, // 指定路由渲染容器
    children,
  },
  {
    path: '*',
    element: <Navigate to="/" />, // 路由重定向
  },
];

export default routes;
