// layout仓库
import {defineStore} from 'pinia';
const useLayoutStore=defineStore('layoutStore',{
    state:()=>{
        return{
            fold:false, //是否折叠
            refresh:false,  // 是否刷新
        }
    },
    actions:{
        // 切换图标
        changeIcon(){
            this.fold=!this.fold;
            
        }
    }
})

export default useLayoutStore;