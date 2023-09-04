import useUserStore from "@/store/modules/user";
import pinia from "@/store";
const userStore=useUserStore(pinia);

export default function(app:any){
    // 定义一个自定义指令
    app.directive('has',{
        mounted(el:any,options:any){
            // console.log(el);
            // console.log(options);
            if(!userStore.buttons.includes(options.value)){
                el.parentNode.removeChild(el);
            }
        }  
    })
}