import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

//register
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

//login
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

//addproject

export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//homeproject
export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/projects/home-project`)
}

//allproject
export const allProjectAPI = async(searchKey,reqHeader)=>{
    //path parameter,query parameter,body parameter
    //for query parameter put a question mark then a variable/value of variable
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchKey}`,"",reqHeader)
}

//userProject
export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/all-project`,"",reqHeader)
}


//Edit USER PROJECT
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

//delete USER PROJECT
export const deleteProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}


//Edit USER profile
export const editProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}
