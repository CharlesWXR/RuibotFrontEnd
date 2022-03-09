import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus, { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'

import AntDesign, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from 'axios'

const app = createApp(App).use(store);

app.use(ElementPlus);
app.use(router);
app.use(AntDesign);

axios.defaults.baseURL = 'http://localhost:8088';

axios.interceptors.request.use(config => {
    try {
        if (localStorage.Token) {
            config.headers.Token = localStorage.Token;
        }
        return config;
    } catch (e) {
        console.error(e);
        return config;
    }
});

app.config.globalProperties.$http = axios;

app.use(store);

app.mount('#app');