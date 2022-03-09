<template>
  <div style="margin-top: 10px" v-if="chat">
    <transition name="chat">
      <a-row v-if="chat.queryText">
        <a-col :span="14" :offset="9">
          <div class="content-container user-content">
            <a-typography-text strong>{{ chat.queryText }}</a-typography-text>
          </div>
        </a-col>
        <a-col :span="1" style="padding: 10px">
          <a-avatar
            size="large"
            style="
              background-color: #b3e19d;
              box-shadow: var(--el-box-shadow-light);
              margin-left: 10px;
            "
          >
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </a-col>
      </a-row>
    </transition>
    <transition name="ruibot">
      <a-row v-if="chat.queryText">
        <a-col :span="1" style="padding: 10px">
          <a-avatar
            style="
              background-color: #8cc5ff;
              box-shadow: var(--el-box-shadow-light);
              margin-right: 10px;
            "
            size="large"
          >
            <template #icon>
              <RobotOutlined />
            </template>
          </a-avatar>
        </a-col>

        <a-col :span="14">
          <div class="content-container ruibot-content">
            <a-typography-text strong v-if="chat.responseText">{{
              chat.responseText
            }}</a-typography-text>
            <div v-else>
              <a-spin />
            </div>
          </div>
        </a-col>
        <a-col :span="9"></a-col>
      </a-row>
    </transition>
  </div>
</template>

<script>
import { UserOutlined, RobotOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";

export default {
  name: "Chat",
  components: {
    UserOutlined,
    RobotOutlined,
  },
  props: ["chat"],
  setup() {
    return {
      dayjs,
    };
  },
};
</script>

<style scoped>
.content-container {
  box-shadow: var(--el-box-shadow-light);
  width: 100%;
  height: auto;
  border: 1px solid var(--el-border-color-base);
  border-radius: 20px;
  padding: 10px;
  min-height: 2.5rem;
  margin: 10px;
}

.user-content {
  background-color: #b3e19d;
}

.ruibot-content {
  background-color: #8cc5ff;
}

.chat-enter-active,
.ruibot-enter-active {
  transition: all 0.3s ease-out;
}

.chat-leave-active,
.ruibot-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.chat-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.ruibot-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
</style>