import { instance } from "./axiosInstance";

class EventService {

    async getallevents() {
        try {
            const { data } = await instance.get(`Events`);
            return data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }

}

const eventService = new EventService();
export { eventService };
