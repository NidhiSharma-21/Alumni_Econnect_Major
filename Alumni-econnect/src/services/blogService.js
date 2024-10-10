import { instance } from "./axiosInstance";

class BlogService {
    async addblog(blogData) {
        try {
            const { data } = await instance.post("Blog", blogData);
            return data; // Return the response data
        } catch (error) {
            console.error(error);
        }
    }

    async getalltags() {
        try {
            const { data } = await instance.get(`Tag/GetAllTags`);
            return data.data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }

    async getalltagsStartsWith(startsWith) {
        try {
            const { data } = await instance.get(`Tag/GetAllTags/${startsWith}`);
            return data.data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }

    async addtag(name) {
        try {
            const { data } = await instance.post(`Tag/Add/${name}`);
            return data; // Return the response data
        } catch (error) {
            console.error(error);
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
    async addComment(BlogId,comment){
        try {
            const {data}=await instance.post(`BlogComment/blogId/${BlogId}`,comment);
            return data;
        } catch (error) {
            
        }
    }
}

const blogService = new BlogService();
export { blogService };
