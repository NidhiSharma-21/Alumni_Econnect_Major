import { instance } from "./axiosInstance";

class UserService {
    async registerUser(data){
        try {
            const {data} = await instance.post("User/AddStudent", data);

        } catch (error) {
            console.error(error);
        }
    }

    async sendOTP(gmail, name){
        try {
            const {data} = await instance.post(`User/SendOtp/${gmail}/${name}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async verifyOTP(gmail, otp){
        try {
            const {data} = await instance.post(`User/Verify/${gmail}/${otp}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeId(domain){
        try {
            const {data} = await instance.get(`College/GetCollegeByDomain/${domain}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeCourse(collegeId){
        try {
            const {data} = await instance.get(`College/GetCollegeCourse/${collegeId}`);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeBranchUnderCourse(courseId){
        try {
            const {data} = await instance.get(`College/GetBranchesUnderCollegeCourse/${courseId}`);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addStudent(registerData){
        try {
            const {data} = await instance.post(`User/AddStudent`, registerData);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async addAdmin(registerData){
        try {
            const {data} = await instance.post(`User/AddAdmin`, registerData);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async loginUser(email,password,role){
        try {
            const {data}=await instance.post(`Authorization`,{
                email: email,
                password: password,
                role: role,
              },{
                headers: {
                  'Content-Type': 'application/json', // Ensure this matches server expectations
                },
              })
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
    async updateUser(formData){
        const token=localStorage.getItem('authToken')
        try {
            const {data}=await instance.put(`User/UpdateUserDetails`,formData,{
                headers:{
                    'Authorization':`Bearer ${token}`
                },
            })
            return data.data;
        } catch (error) {
            
        }
    }
    async addCollege(formData){
        try {
            const {data}=await instance.post(`College`,formData);
            return data;
        } catch (error) {
            
        }
    }
    
    async getState(){
        try {
            const {data}=await instance.post(`Region`);
            console.log("Data : ", data);
            return data.data;
        } catch (error) {
            
        }
    }
    async getcity(data){
        try {
            const {data}=await instance.post(`Region`,data);
            console.log("Data : ", data);
            return data.data;
        } catch (error) {
            
        }
    }

    async getUserByToken(){
        const token=localStorage.getItem('authToken');
        if(token){
            try{
            const {data}=await instance.get(`User/GetLoginUserInfo`,{
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }
            })
            return data.data;
        }catch(error){
            console.error(error);
        }
        }
    }
    async getDetailsUserById(id){
        try {
            const {data}=await instance.get(`User/GetStudentDetails/${id}`)
            return data.data;
        } catch (error) {
            
        }
    }

}

const userService = new UserService();
export { userService };
