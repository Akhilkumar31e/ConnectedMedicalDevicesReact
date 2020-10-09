import http from './http-common';

class DeviceService{
    getAll(){
        return http.get('/device');
    }

    get(id){
        return http.get(`/device/${id}`);
    }

    create(data){
        return http.post('/device',data);
    }

    update(id,data){
        return http.put(`/device/${id}`,data);
    }


    delete(id) {
        return http.delete(`/device/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/device`);
      }
}

export default new DeviceService();