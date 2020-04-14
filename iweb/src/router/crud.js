import Main from '@/components/main';
import parentView from '@/components/parent-view';

export default [
  {
    path: '/mysql_crud',
    name: 'mysql_crud',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: 'MySQL CRUD'
    },
    children: [
      /*AutoCreate Start*/{
    path: '/crud/departments',
    name: 'crud_departments',
    component: parentView,
    meta: {
        icon: 'logo-buffer',
        title: 'departments'
    },
    children: [
        {
            path: '/crud/departments_list',
            name: 'crud_departments_list',
            component: Component.lazyView('crud/departments/index.vue'),
            meta: {
                icon: 'ios-navigate',
                title: 'departments'
            },
        }
    ]
},{
    path: '/crud/dept_emp',
    name: 'crud_dept_emp',
    component: parentView,
    meta: {
        icon: 'logo-buffer',
        title: 'dept_emp'
    },
    children: [
        {
            path: '/crud/dept_emp_list',
            name: 'crud_dept_emp_list',
            component: Component.lazyView('crud/dept_emp/index.vue'),
            meta: {
                icon: 'ios-navigate',
                title: 'dept_emp'
            },
        }
    ]
},{
    path: '/crud/dept_manager',
    name: 'crud_dept_manager',
    component: parentView,
    meta: {
        icon: 'logo-buffer',
        title: 'dept_manager'
    },
    children: [
        {
            path: '/crud/dept_manager_list',
            name: 'crud_dept_manager_list',
            component: Component.lazyView('crud/dept_manager/index.vue'),
            meta: {
                icon: 'ios-navigate',
                title: 'dept_manager'
            },
        }
    ]
},{
    path: '/crud/employees',
    name: 'crud_employees',
    component: parentView,
    meta: {
        icon: 'logo-buffer',
        title: 'employees'
    },
    children: [
        {
            path: '/crud/employees_list',
            name: 'crud_employees_list',
            component: Component.lazyView('crud/employees/index.vue'),
            meta: {
                icon: 'ios-navigate',
                title: 'employees'
            },
        }
    ]
},{
    path: '/crud/salaries',
    name: 'crud_salaries',
    component: parentView,
    meta: {
        icon: 'logo-buffer',
        title: 'salaries'
    },
    children: [
        {
            path: '/crud/salaries_list',
            name: 'crud_salaries_list',
            component: Component.lazyView('crud/salaries/index.vue'),
            meta: {
                icon: 'ios-navigate',
                title: 'salaries'
            },
        }
    ]
},{
    path: '/crud/titles',
    name: 'crud_titles',
    component: parentView,
    meta: {
        icon: 'logo-buffer',
        title: 'titles'
    },
    children: [
        {
            path: '/crud/titles_list',
            name: 'crud_titles_list',
            component: Component.lazyView('crud/titles/index.vue'),
            meta: {
                icon: 'ios-navigate',
                title: 'titles'
            },
        }
    ]
},/*AutoCreate End*/
    ]
  }
];