// category仓库
import {defineStore} from 'pinia';
import {getC1 , getC2 , getC3 } from '@/api/product/attr/index.ts';
import type { categoryResponseData  } from '@/api/product/attr/type';
import type { categoryState } from '@/api/types/type';
const useCategoryStore=defineStore('category',{
    state:() : categoryState=>{
        return{
            c1Arr:[],
            c1Id:'',
            c2Arr:[],
            c2Id:'',
            c3Arr:[],
            c3Id:'',
        }
    },
    actions:{
        // 获取一级分类数据
        async getc1(){
            const result : categoryResponseData=await getC1();
            if(result.code===200){
                this.c1Arr=result.data;
                return 'ok';
            }else{
                return Promise.reject(new Error('获取一级分类失败'))
            }

        },
        // 获取二级分类数据
        async getc2(){
            const result : categoryResponseData=await getC2(this.c1Id);
            if(result.code===200){
                this.c2Arr=result.data;
            }
        },
        // 获取三级分类数据
        async getc3(){
            const result : categoryResponseData= await getC3(this.c2Id);
            if(result.code===200){
                this.c3Arr=result.data;
            }
        },
    }
})
export default useCategoryStore;