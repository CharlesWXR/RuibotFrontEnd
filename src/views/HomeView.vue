<template>
  <a-layout>
    <a-layout-header>
      <img :src="require('../assets/main-logo.png')" class="logo" />
    </a-layout-header>
    <a-layout-content style="background: #fff; padding: 0 50px">
      <div style="padding: 24px; min-height: 81vh; width: 90%; margin-left: 5%">
        <a-row style="align-items: center">
          <a-col :span="8" class="robot-img-container">
            <img :src="robotImg" class="robot-img" />
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
                  v-model:value="caseDecription"
                  placeholder="在这里输入案件描述"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                />
              </a-col>
              <a-col :span="3" :offset="1">
                <a-button
                  shape="circle"
                  type="primary"
                  style="height: 50px; width: 50px"
                  :loading="searchLoading"
                >
                  <template #icon>
                    <a-spin :indicator="indicator" />
                  </template>
                </a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
  <private-policy-modal
    :visible="policyVisibility"
    @close="closePrivacyModal"
  />
</template>

<script>
import { ref, h } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";

import PrivatePolicyModal from "@/components/PrivatePolicyModal.vue";

export default {
  name: "HomeView",
  components: {
    PrivatePolicyModal,
    SettingOutlined,
  },
  methods: {
    openPrivacyModal() {
      this.policyVisibility = true;
    },
    closePrivacyModal() {
      this.policyVisibility = false;
    },
  },
  setup() {
    const robotImg = ref(require("@/assets/logo-3d.png"));

    const policyVisibility = ref(false);

    const caseDecription = ref("");

    const indicator = h(SettingOutlined, {
      style: {
        fontSize: "1.5rem",
        color: "white",
      },
      spin: false,
    });
    const searchLoading = ref(false);

    return {
      robotImg,

      policyVisibility,

      caseDecription,

      indicator,
      searchLoading,
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

.robot-img {
  width: 100%;
  height: auto;
  padding: 10px;
}

.right-contents {
  margin-top: 15px;
}
</style>