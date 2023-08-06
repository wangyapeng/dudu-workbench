
import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('./pages/home/Home.vue');
const Work = () => import('./pages/workbench/WorkBench.vue');
import Page404 from './pages/404/Page404.vue';
const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/404', component: Page404 },
    { path: '/work-bench', component: Work },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

window['$router'] = router;

export {
    router
}