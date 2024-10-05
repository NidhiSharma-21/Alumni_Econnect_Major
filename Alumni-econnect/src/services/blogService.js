import { instance } from "./axiosInstance";

class BlogService {
    async addblog(blogData){
        try {
            const {data} = await instance.post("Blog", blogData);

        } catch (error) {
            console.error(error);
        }
    }
}

const blogService = new BlogService();
export { blogService };
