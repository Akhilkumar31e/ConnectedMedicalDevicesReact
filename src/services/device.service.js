import http from './http-common';

class DeviceService{
    getAll(){
        return http.get('/device');
    }

    getLastUpdated(){
        return http.get('/device/recentlyUpdated')
    }

    getRepair(){
        return http.get('/device/repair');
    }

    getService(){
        return http.get('/device/service');
    }
    getReplace(){
        return http.get('/device/replace');
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

    updateStatus(id,data){
        return http.put(`/device/status/${id}`,data);
    }


    delete(id) {
        return http.delete(`/device/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/device`);
      }


}

export default new DeviceService();