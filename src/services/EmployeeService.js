import axios from 'axios';
const BASE_URL = "http://localhost:8080/api/employees";

class EmployeeService {
    getAllEmployees(){
        return axios.get(BASE_URL);
    }
    createEmployee(employee){
        return axios.post(BASE_URL, employee);
    }
    deleteEmployee(id){
        return axios.delete(BASE_URL + '/' + id);
    }
}
export default new EmployeeService();