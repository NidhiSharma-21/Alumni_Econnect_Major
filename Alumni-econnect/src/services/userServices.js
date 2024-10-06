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
    async loginUser(email,password,role){
        try {
            const {data}=await instance.post(`Authorization?gmail=${email}&password=${password}&role=${role}`)
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async addCollege(formData){
        try {
            const {data}=await instance.post(`College`,formData);
            return data;
        } catch (error) {
            
        }
    }
    //get all blogs from backend
    async getBlog(){
        try {
            const {data}=await instance.get(`Blog`);
            console.log("Data : ", data);
            return data.data;
        } catch (error) {
            
        }
    }
    async deleteBlog(id){
        try {
            const {data}=await instance.delete(`Blog/${id}`)
            return;
        } catch (error) {
            
        }
    }
    async getComments(BlogId){
        try {
            const {data}=await instance.get(`BlogComment/${BlogId}`)
            return data.data;
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

}

const userService = new UserService();
export { userService };
