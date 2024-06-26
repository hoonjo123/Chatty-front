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
            </v-card-title>
            <v-card-text>
              <h2>Welcome, {{ username }}!</h2>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="user in users" :key="user.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ user.username }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axiosInstance from '@/plugins/axios';
  
  export default {
    name: 'HomePage',
    data() {
      return {
        username: '',
        users: []
      };
    },
    created() {
      this.username = localStorage.getItem('username') || 'User';
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axiosInstance.get('/users/list')
          .then(response => {
            this.users = response.data.result;
          })
          .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 403) {
              alert('권한이 없습니다. 다시 로그인 해주세요.');
            }
          });
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
  