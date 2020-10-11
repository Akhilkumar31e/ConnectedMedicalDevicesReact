import http from './http-common';

class HospitalService{
    getAll(){
        return http.get('/hospital');
    }

    get(id){
        return http.get(`/hospital/${id}`);
    }

    create(data){
        return http.post('/hospital',data);
    }
}

export default new HospitalService();