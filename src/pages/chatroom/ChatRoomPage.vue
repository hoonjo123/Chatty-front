<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>
              <span class="headline">채팅방 - {{ chatRoomName }}</span>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="leaveChatRoom">나가기</v-btn>
            </v-card-title>
            <v-card-text>
              <div class="chat-messages">
                <!-- 여기에 채팅 메시지 표시 -->
              </div>
              <v-form @submit.prevent="sendMessage">
                <v-text-field
                  v-model="newMessage"
                  label="메시지 입력"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary">보내기</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axiosInstance from '@/plugins/axios';
  
  export default {
    name: 'ChatRoomPage',
    data() {
      return {
        chatRoomName: '',
        newMessage: '',
        messages: []
      };
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    created() {
      this.fetchChatRoomDetails();
    },
    methods: {
      fetchChatRoomDetails() {
        axiosInstance.get(`/chatrooms/${this.id}`)
          .then(response => {
            this.chatRoomName = response.data.name;
            // 채팅 메시지 가져오기 코드 추가 가능
          })
          .catch(error => {
            console.error(error);
          });
      },
      leaveChatRoom() {
        this.$router.push({ name: 'Home' });
      },
      sendMessage() {
        // 메시지 보내기 구현
      }
    }
  };
  </script>
  
  <style scoped>
  .headline {
    font-weight: bold;
  }
  .chat-messages {
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px;
  }
  </style>
  