import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:9090/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
      }
    
      getTechnician() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
      }
    
      getManager() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
      }
    
      getAmin() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
      }

      getUsersList() {
        return axios.get(API_URL + 'userList', {headers: authHeader()});
      }
    }
    
    export default new UserService();