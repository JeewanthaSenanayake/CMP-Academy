import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cmp-api-f1sr.onrender.com',  // Your FastAPI server's base URL
  // You can also configure headers, authentication, and other options here
});

export default {

  async get(path, key = null, data = null) {
    
    if (data==null && key==null) {
      try {
        const response = await apiClient.get(path);
        return response.data.message;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    } else {
      try {
        let newPath = path + "?" + key + "=" + data
        const response = await apiClient.get(newPath);
        return response.data.message;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  },
  // Add other API methods as needed
};
