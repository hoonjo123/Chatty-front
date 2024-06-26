<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>
              <v-avatar left>
                <v-img src="@/assets/7542670.png" alt="User Avatar"></v-img>
              </v-avatar>
              <span class="headline">{{ username }}</span>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="showCreateRoomModal = true">채팅방 만들기</v-btn>
            </v-card-title>
            <v-card-text>
              <h2>Welcome, {{ username }}!</h2>
              <v-list>
                <v-list-item v-for="chatRoom in chatRooms" :key="chatRoom.id" @click="goToChatRoom(chatRoom.id)">
                  <v-list-item-content>
                    <v-list-item-title>{{ chatRoom.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-dialog v-model="showCreateRoomModal" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">채팅방 만들기</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="채팅방 이름"
                v-model="newChatRoomName"
                :rules="[v => !!v || '채팅방 이름을 입력해주세요']"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showCreateRoomModal = false">취소</v-btn>
            <v-btn color="blue darken-1" text @click="createChatRoom">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axiosInstance from '@/plugins/axios';
  
  export default {
    name: 'HomePage',
    data() {
      return {
        username: '',
        chatRooms: [],
        showCreateRoomModal: false,
        newChatRoomName: ''
      };
    },
    created() {
      this.username = localStorage.getItem('username') || 'User';
      this.fetchChatRooms();
    },
    methods: {
      fetchChatRooms() {
        axiosInstance.get('/chatrooms/list')
          .then(response => {
            console.log('API Response:', response);
            this.chatRooms = response.data;
          })
          .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 403) {
              alert('권한이 없습니다. 다시 로그인 해주세요.');
            }
          });
      },
      createChatRoom() {
        const payload = {
          name: this.newChatRoomName
        };
        axiosInstance.post('/chatrooms/create', payload)
          .then(response => {
            this.chatRooms.push(response.data);
            this.showCreateRoomModal = false;
            this.newChatRoomName = '';
          })
          .catch(error => {
            console.error(error);
            alert('채팅방 생성에 실패했습니다.');
          });
      },
      goToChatRoom(id) {
        this.$router.push({ name: 'ChatRoom', params: { id } });
      }
    }
  };
  </script>
  
  <style scoped>
  .headline {
    font-weight: bold;
    margin-left: 10px;
  }
  </style>
  