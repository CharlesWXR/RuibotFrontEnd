<template>
  <a-layout>
    <a-layout-header>
      <img :src="require('../assets/main-logo.png')" class="logo" />
    </a-layout-header>
    <a-layout-content style="background: #fff; padding: 0 50px">
      <div style="padding: 24px; min-height: 81vh; width: 90%; margin-left: 5%">
        <a-row style="align-items: center">
          <a-col :span="8" class="robot-img-container">
            <ruibot-logo :state="logoState"></ruibot-logo>
          </a-col>
          <a-col :span="15" :offset="1" style="padding: 10px">
            <a-row>
              <a-col :span="12">
                <img :src="require('../assets/brand-title.png')" />
              </a-col>
            </a-row>
            <a-row class="right-contents">
              <a-col :span="16">
                <a-typography-title :level="2">
                  睿宝——您的私人法律机器人
                </a-typography-title>
              </a-col>
            </a-row>
            <a-row>
              <a-typography-paragraph>
                睿宝将为您提供
                <a-typography-text strong> 免费 </a-typography-text>
                而
                <a-typography-text strong> 高可信度 </a-typography-text>
                的法律咨询服务，
                <a-typography-text strong> 无需专业表达 </a-typography-text>
                即可为您提供法律建议。睿宝充分尊重和保护用户的个人隐私，您的案件数据仅用于程序自动分析及训练，详细条款请参阅
                <a-typography-link @click="openPrivacyModal"
                  >《隐私策略》</a-typography-link
                >
                。
              </a-typography-paragraph>
            </a-row>
            <a-row>
              <a-col :span="16">
                <a-typography-title :level="4">
                  下面让我们来试一试吧！
                </a-typography-title>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="20">
                <a-textarea
                  v-model:value="caseDescription"
                  placeholder="在这里输入案件描述"
                  :autoSize="{ minRows: 3, maxRows: 3 }"
                />
              </a-col>
              <a-col :span="3" :offset="1">
                <a-button
                  shape="circle"
                  type="primary"
                  style="height: 50px; width: 50px"
                  :loading="searchLoading"
                  @click="getPrediction"
                >
                  <template #icon>
                    <a-spin :indicator="indicator" />
                  </template>
                </a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <chat :chat="chat" />
          </a-col>
          <a-col :span="24">
            <chat-history :chats="chatHistory.data" style="width: 100%" />
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ruibot ©2018 Created by ChengRui
    </a-layout-footer>
  </a-layout>
  <private-policy-modal
    :visible="policyVisibility"
    @close="closePrivacyModal"
  />
</template>

<script>
import { ref, h, reactive, getCurrentInstance } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import jwtDecode from "jwt-decode";
import { reverse, trim } from "lodash";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

import PrivatePolicyModal from "@/components/PrivatePolicyModal.vue";
import ChatHistory from "@/components/ChatHistory.vue";
import Chat from "@/components/Chat.vue";
import RuibotLogo from "@/components/RuibotLogo.vue";

export default {
  name: "HomeView",
  components: {
    PrivatePolicyModal,
    ChatHistory,
    Chat,
    RuibotLogo,
    SettingOutlined,
  },
  methods: {
    openPrivacyModal() {
      this.policyVisibility = true;
    },
    closePrivacyModal() {
      this.policyVisibility = false;
    },
    getPrediction() {
      this.searchLoading = true;
      this.logoState = "waiting";

      this.caseDescription = trim(this.caseDescription);
      if (this.caseDescription && this.caseDescription !== "")
        this.chat["queryText"] = this.caseDescription;
      else return;

      let token = localStorage.getItem("Token");

      this.$http
        .get("/api/exclude/user")
        .then((response) => {
          let res = response.data;
          if (res.code === 200) {
            token = res.result;
            localStorage.setItem("Token", token);
          } else {
            message.error("Unexpected error happened");
          }

          const decode = jwtDecode(token);
          this.$http
            .post("/api/prediction", {
              description: this.caseDescription,
              user_id: decode.ID,
            })
            .then((response) => {
              let res = response.data;
              this.logoState = "finished";
              if (res.code === 200) {
                this.chat["responseText"] = res.result;
                let c = {
                  queryTime: dayjs().format(),
                  responseText: res.result,
                  queryText: this.caseDescription,
                };
                setTimeout(() => {
                  this.chatHistory.data.unshift(c);
                  this.chat["responseText"] = null;
                  this.chat["queryText"] = null;
                }, 1500);
              } else {
                this.logoState = "normal";
              }
              this.searchLoading = false;
              this.caseDescription = "";
            });
        })
        .catch((error) => {
          message.error("Unexpected error happened");
          this.searchLoading = false;
          this.logoState = "normal";
        });
    },
  },
  setup() {
    const { appContext } = getCurrentInstance();
    const $http = appContext.config.globalProperties.$http;

    const robotImg = ref(require("@/assets/logo-3d.png"));

    const policyVisibility = ref(false);

    const caseDescription = ref("");

    const searchLoading = ref(false);
    const indicator = h(SettingOutlined, {
      style: {
        fontSize: "1.5rem",
        color: "white",
      },
      spin: searchLoading.value,
    });

    const chatHistory = reactive({
      data: [],
    });

    const chat = reactive({
      queryText: "",
      responseText: "",
    });

    let token = localStorage.getItem("Token");
    if (token) {
      const decode = jwtDecode(token);
      $http.get("/api/prediction/" + decode.ID).then((response) => {
        let res = response.data;
        if (res.code === 200) chatHistory.data = res.result;
        reverse(chatHistory.data);
      });
    }

    const logoState = ref("normal");

    return {
      robotImg,

      policyVisibility,

      caseDescription,

      indicator,
      searchLoading,

      chatHistory,
      chat,

      logoState,
    };
  },
};
</script>

<style scoped>
.logo {
  float: left;
  width: auto;
  height: 55px;
  margin: 5px 24px 16px 0;
}

.brand-name {
  color: #409eff;
}

.right-contents {
  margin-top: 15px;
}
</style>