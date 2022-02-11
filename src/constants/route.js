import React from 'react';

const Login = React.lazy(() => import('./../features/Login'));
const Home = React.lazy(() => import('./../features/Home'));

export const ROUTES = [
  {
    path: '/login',
    name: 'Đăng nhập',
    component: Login,
  },
];

export const ADMIN_ROUTES = [
  {
    path: '/',
    name: 'Trang quản trị',
    exact: true,
    component: Home,
  },
  {
    path: '/task-board',
    name: 'Quản lý công việc',
    // component: Taskboard,
  },
  {
    name: 'Bán hàng',
    path: '/sell-pages',
    items: [
      {
        name: 'Duyệt giá',
        path: '/management/price-request',
        // component: PriceRequest,
      },
      {
        name: 'Level 3',
        path: '/level-3',
        items: [
          {
            name: 'Level 3-1',
            path: '/level-3-1',
            items: [
              {
                name: 'Level 3-1-1',
                path: '/level-3-1-1',
              },
            ],
          },
          {
            name: 'Level 3-2',
            path: '/level-3-2',
          },
        ],
      },
    ],
  },
  {
    name: 'Quản trị',
    path: '/administration-pages',
    items: [
      {
        name: 'Cài đặt',
        path: '/settings',
        items: [
          {
            name: 'Chi nhánh',
            path: '/management/business-unit',
            // component: BusinessUnit,
          },
        ],
      },
    ],
  },
];
