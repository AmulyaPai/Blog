import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewBlog from '@/components/NewBlog'
import ViewBlog from '@/components/ViewBlog'
import EditBlog from '@/components/EditBlog'
import Login from '@/components/Login'
import UserView from '@/components/UserView'
import firebase from 'firebase';


Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    
    {
      path: '/new',
      name: 'new-blog',
      component: NewBlog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:blog_id',
      name: 'edit-blog',
      component: EditBlog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:blog_id',
      name: 'view-blog',
      component: ViewBlog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userview',
      name: 'userview',
      component: UserView,
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;