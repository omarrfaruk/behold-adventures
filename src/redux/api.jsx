import axios from 'axios'

const API = axios.create({ baseURL: "https://behold-adventures.onrender.com/" })


API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
            }`;
    }
    return req;
});


export const signIn = (FormData) => API.post("/users/signin", FormData)
export const signUp = (FormData) => API.post("/users/signup", FormData)
// export const googleSignIn = (result) => API.post("/users/googleSingIn", result)
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post('/tour', tourData)
export const getTours = (page) => API.get(`/tour?page=${page}`)
export const getTour = (id) => API.get(`/tour/${id}`)
export const getTourByUser = (userId) => API.get(`/tour/userTours/${userId}`)
export const getTourByTag = (tag) => API.get(`/tour/tag/${tag}`)
export const deleteTour = (id) => API.delete(`/tour/${id}`)
export const updateTour = (id, updatedTourData) => API.patch(`/tour/${id}`, updatedTourData)
export const getToursBySearch = (searchQuery) =>
    API.get(`/tour/search?searchQuery=${searchQuery}`);
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);
export const likeTour = (id) => API.patch(`/tour/like/${id}`);