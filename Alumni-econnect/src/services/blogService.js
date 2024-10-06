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
            return data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }

    async getalltagsStartsWith(startsWith) {
        try {
            const { data } = await instance.get(`Tag/GetAllTags/${startsWith}`);
            return data; // Return the fetched tags
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
}

const blogService = new BlogService();
export { blogService };