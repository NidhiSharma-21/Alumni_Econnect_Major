import { instance } from "./axiosInstance";

class BlogService {
    // services/blogService.js

async addblog(blogData) {
    try {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();

        formData.append('Title', blogData.Title);
        formData.append('Description', blogData.Description);
        blogData.Tags.forEach(tagId => formData.append('Tags[]', tagId));

        // Append each file in MediaFiles
        blogData.MediaFiles.forEach(file => {
            formData.append('MediaFiles', file);
        });

        const { data } = await instance.post('Blog', formData, {
            headers: {
                // Let the browser set the Content-Type, including boundaries
                'Authorization': `Bearer ${token}`,
            },
        });

        return data; // Return the response data
    } catch (error) {
        console.error('Error uploading blog:', error);
        throw error; // Optionally, throw the error for further handling
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
    async EditComments(Id){
        try {
            const {data}=await instance.put(`BlogComment/${Id}`)
            return data.data;
        } catch (error) {
            
        }
    }
    async RemoveComments(Id){
        try {
            const {data}=await instance.delete(`BlogComment/comment/${Id}`)
            return data.data;
        } catch (error) {
            
        }
    }
    async addComment(BlogId,comment){
        try {
            const token=localStorage.getItem('authToken')
            const payload = {
                Comment: comment
              };
            const {data}=await instance.post(`BlogComment/blogId/${BlogId}`,payload,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                  },
            });
            return data;
        } catch (error) {
            
        }
    }


    
}

const blogService = new BlogService();
export { blogService };
