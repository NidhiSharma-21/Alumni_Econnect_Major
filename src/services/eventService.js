import { instance } from "./axiosInstance";

class EventService {

    async getallevents() {
        try {
            const { data } = await instance.get(`Event`);
            return data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }
    async addevents(eventdata) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("Authentication token is missing.");
        }
    
        const formData = new FormData();
        formData.append('Name', eventdata.Name);
        formData.append('Description', eventdata.Description);
        formData.append('StartTime', eventdata.StartTime);
        formData.append('EndTime', eventdata.EndTime);
        formData.append('Location', eventdata.Location);
        formData.append('Registration_Deadline', eventdata.Registration_Deadline);
        formData.append('Status', eventdata.Status);
        if (eventdata.bannerUrl) {
          formData.append('bannerUrl', eventdata.bannerUrl); // Append File object
        }
    
        // Log FormData entries for debugging
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }
    
        const { data } = await instance.post(`Event/Add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        return data.data;
      } catch (error) {
        console.error('Error adding event:', error);
        throw error;
      }
    }

}

const eventService = new EventService();
export { eventService };
