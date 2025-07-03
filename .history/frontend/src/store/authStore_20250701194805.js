import axios from 'axios'
import {create} from 'zustand'

const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)
axios.defaults.withCredentials = true;


export const useAuthStore= create((set)=>({
    user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

    signup: async(email, password, name)=>{
        set({isLoading: true, error: null})
        try {
            const response= await axios.post(`${API_URL}/signup`, {email, password, name})
            set({user: response.data, isLoading: false, isAuthenticated: true})

        } catch (error) {
        const message = error?.response?.data?.message || error.message || "Signup failed";
		set({ error: message, isLoading: false });
		throw error;
        }
    },

    login: async (email, password)=>{
        set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
    },

    logout: async()=>{
        set({isLoading: true, error: null})
        try{
            await axios.post(`${API_URL}/logout`)
            set({user:null, isAuthenticated: false, error: null, isLoading: false})
        }catch(error){
            set({ error: "Error logging out", isLoading: false });
			throw error;
        }
    },

    verifyEmail: async(code)=>{
        set({isLoading:true ,error: null})
        try {
            const res= await axios.post(`${API_URL}/verify-email`, {code})
            set({user:res.data.user,isAuthenticated: true, isLoading: false, error: null})
            return res.data
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
        }
    },

    forgotPassword: async(email)=>{
        set({isLoading: true, error: null})
        try {
            const res= await axios.post(`${API_URL}/forgot-password`, {email})
            set({message: res.data.message, isLoading: false })
        } catch (error) {
            set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
        }
    },

    checkAuth: async ()=>{
        set({isCheckingAuth: true, error: null})
        try {
            const res= await axios.get(`${API_URL}/check-auth`)
            set({user: res.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({error: null, isLoading: false, isAuthenticated: false, isCheckingAuth: false})
        }
    },

    resetPassword: async ( token,password )=>{
        set({isLoading: true, error: null})

        try {
            const res= await axios.post(`${API_URL}/reset-password/${token}`, {password})
            set({message: res.data.message, isLoading: false, error: null})
        } catch (error) {
            set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
        }
    }
}))