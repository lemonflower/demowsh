import Client from '../client';
class ServiceManager{
    public async getUserInformation(){
        const url='https://www.fastmock.site/mock/b2f1a82bf35bafe0293f7a6bdf2f9798/wsh';
        const result=await Client.getInstance().get(url);
        console.log(result,'接口数据');
        return result;
    }

}
export const serviceManager=new ServiceManager();
