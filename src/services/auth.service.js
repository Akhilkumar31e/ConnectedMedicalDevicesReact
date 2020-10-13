import axios from 'axios';

const API_URL = "http://localhost:9090/api/auth/";

class AuthService {
    login(username,password){
        return axios
        .post(API_URL+"signin",{
            username,
            password
        })
        .then(response => {
            if(response.data.accessToken) {
                localStorage.setItem("user",JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password,role) {
        return axios.post(API_URL + "signup", {
          username,
          email,
          password,
          role
        });
      }
    
      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
      getUsersList() {
        return axios.get(API_URL + 'userList');
      }
}

export default new AuthService();