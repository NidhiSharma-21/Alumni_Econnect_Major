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
    async addevents(d) {
        try {
            const { data } = await instance.post(`Event/Add`,d);
            return data.data; // Return the fetched tags
        } catch (error) {
            console.error(error);
        }
    }

}

const eventService = new EventService();
export { eventService };
