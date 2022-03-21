<template>
  <div>
    <transition-group name="chat-list">
      <div
        v-for="chat in chats"
        :key="chat.id"
        style="margin-top: 10px"
        class="chat-list-item"
      >
        <a-row>
          <a-col :span="24" style="text-align: center">
            <strong>
              {{ dayjs(chat.queryTime).format("YYYY-MM-DD HH:mm:ss") }}
            </strong>
          </a-col>
        </a-row>
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
        <a-row>
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
              <a-typography-text strong>{{
                chat.responseText
              }}</a-typography-text>
            </div>
          </a-col>
          <a-col :span="9"></a-col>
        </a-row>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { UserOutlined, RobotOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";

export default {
  name: "ChatHistory",
  components: {
    UserOutlined,
    RobotOutlined,
  },
  props: ["chats"],
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
  white-space: pre-wrap;
}

.ruibot-content {
  background-color: #8cc5ff;
  white-space: pre-wrap;
}

.chat-list-item {
  transition: all 0.8s ease;
}

.chat-list-enter-from,
.chat-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.chat-list-leave-active {
  position: absolute;
}
</style>