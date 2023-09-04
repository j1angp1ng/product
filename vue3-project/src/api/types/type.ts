import type { RouteRecordRaw } from "vue-router";
import type { dataInt } from "../product/attr/type";
// 定义user state中的类型
export interface stateInt{
    token:string|null;
    routeList:RouteRecordRaw[],
    username:string,
    avatar:string,
    buttons:string[]
}

// category state中的类型
export interface categoryState{
    c1Arr:dataInt[],
    c1Id:number | string,
    c2Arr:dataInt[],
    c2Id: string | number ,
    c3Arr:dataInt[],
    c3Id: string | number,
}