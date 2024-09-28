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
            const {data} = await instance.get(`College/GetCourse${collegeId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeBranchUnderCourse(courseId){
        try {
            const {data} = await instance.get(`College/GetBranchesUnderCollegeCourse/${courseId}`);
            return data;
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
}

const userService = new UserService();
export { userService };
