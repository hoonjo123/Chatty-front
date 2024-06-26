<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">로그인</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="이메일"
                v-model="email"
                :rules="[v => !!v || '이메일을 입력해주세요']"
                required
              ></v-text-field>
              <v-text-field
                label="비밀번호"
                v-model="password"
                :rules="[v => !!v || '비밀번호를 입력해주세요']"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axiosInstance from '@/plugins/axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password
      };

      axiosInstance.post('/login', payload)
        .then(response => {
          const { accessToken, refreshToken, username } = response.data.result;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('username', username);
          alert("환영합니다")
          this.$router.push('/'); 
        })
        .catch(error => {
          console.error(error);
          alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        });
    }
  }
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
