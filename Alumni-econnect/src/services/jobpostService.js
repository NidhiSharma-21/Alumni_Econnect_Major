import { instance } from "./axiosInstance";

class JobpostService {
    async getjobs() {
        try {
            const { data } = await instance.get(`Job`);
            return data.data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }
    async postjobs(JobData) {
        try {
            const { data } = await instance.post(`Job`,JobData);
            return data.data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }

   
}

const jobpostService = new JobpostService();
export { jobpostService };
