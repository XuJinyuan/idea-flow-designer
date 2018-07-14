import UUID from "./UUID";
class Toast{
    constructor(){
        this.tar='';
        this.id=UUID.GenerateUUID();
        this.createToastElement();
        this.handler=-1;
    }
    createToastElement(){
        this.tar=document.createElement('div');
        this.tar.classList.add('toast');
        document.body.appendChild(this.tar);
    }
    createContentElement(data){
        this.tar.innerHTML=`<span>${data}</span>`
    }
    show(data,timeout=2000){
        this.createContentElement(data);
        this.tar.classList.add('active');
        if(this.handler>0){
            clearTimeout(this.handler);
        }
        this.handler=setTimeout(()=>{
            this.hide();
        },timeout)
    }
    hide(){
        this.tar.classList.remove('active');
        this.handler=-1;
    }

}
export default Toast;