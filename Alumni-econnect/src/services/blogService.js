import { instance } from "./axiosInstance";

class BlogService {
    async addblog(data){
        try {
            const {data} = await instance.post("Blog", data);

        } catch (error) {
            console.error(error);
        }
    }
}

const blogService = new BlogService();
export { blogService };
