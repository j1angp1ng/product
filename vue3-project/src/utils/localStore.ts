// 本地存储的数据集合

// 读取数据
export const GET_ITEM=(data:string)=>{
    return localStorage.getItem(data);
}

// 存储数据
export const SET_ITEM=(name:string,data:string)=>{
    return localStorage.setItem(name,data);
}

// 删除数据
export const REMOVE_ITEM=()=>{
    return localStorage.removeItem('token');
}