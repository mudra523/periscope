import axios from 'axios';

// we can directly use .post(), .get() methods with axios like this: axios.post().
// with .create([config]) we are creating new instance of axios with our config and storing it in api.

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


//list of all the endpoints

//all of this functions returns a promise 
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);
export const logout = () => api.post('/api/logout');
export const getRoom = (roomId) => api.get(`/api/room/${roomId}`)
export const getUser = (userId) => api.get(`/api/user/${userId}`)
export const updateUser = (data) => api.put(`/api/user/update`, data)
export const followUser = (data) => api.put('/api/follow', data);
export const unFollowUser = (data) => api.put('/api/unfollow', data);
export const createRoom = (data) => api.post('/api/rooms', data);
export const getAllRooms = () => api.get('/api/rooms');
export const addSpeaker = (data) => api.put('/api/room/addSpeaker', data);
export const removeSpeaker = (data) => api.put('/api/room/removeSpeaker', data);

// Interceptors will intercepts all the above request which from fontend end to backend.
api.interceptors.response.use(
  (config) => {
    return config;  
  },
  async (error) => {
    // Here thi function will only act if there is an error on any requests that are being made above.
    console.log(error);
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export default api;