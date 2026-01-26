import api from "./axios";

export const msgApi= (messages)=>{
    return api.post("/chat", {messages})
}