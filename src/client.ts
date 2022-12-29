import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
export default class Client{
    // axios 实例
    axiosInstance:AxiosInstance;
    /*使用static修饰的属性称为静态属性或类变量，没有使用static修饰的属性称为实例变量。使用static修饰的属性属于类，不属于具体的某个对象。使用static修饰的属性不依赖于任何对象，用类名直接加“.”即可调
      用static修饰的方法称为静态方法或者类方法，不适用static修饰的被称为实例方法。使用static修饰的方法属于类，不属于具体的某个对象。类方法在类名首次出现时初始化，即使没有创建对象，类方法也是存在的。
      静态方法中不能直接访问实例变量和实例方法。在实例方法中可以直接调用类中定义的静态变量和静态方法。
      */
     static clientInstance:Client;
     static getInstance(){
         // 判断是否已经new过1个实例
    if (!Client.clientInstance) {
        // 若这个唯一的实例不存在，那么先创建它
        Client.clientInstance = new Client();
      }
      // 如果这个唯一的实例已经存在，则直接返回
      return Client.clientInstance;
    }
    /** 
    * 基础配置
    /withCredentials属性:
     默认值为false。在获取同域资源时设置 withCredentials 没有影响。
     true：在跨域请求时，会携带用户凭证
     false：在跨域请求时，不会携带用户凭证；返回的 response 里也会忽略 cookie
    / 
    */
   // 创建一个类的构造器，这个构造器里面传入类的最基本的配置
   constructor(config?: AxiosRequestConfig){
    // 使用axios.create创建axios实例
    this.axiosInstance = axios.create({ ...config, withCredentials: true });
    this.axiosInstance.interceptors.request.use(
        (config:AxiosRequestConfig)=>{
        //添加请求配置
        console.log(config);
        /** 
         * const newConfig = { ...config, headers: { env: 'dev' } };可配置头部信息
        */
        
        return config;
      },  
        (err: any) => Promise.reject(err));
    this.axiosInstance.interceptors.response.use(
        (res:AxiosResponse)=>{
            // 当code不为0时，意味着接口请求错误，返回后端提供的错误信息
            if (res.data.code) {
                message.error(res.data.msg || (`发生错误:${res.data.code}`));
              }
              // 直接返回res，当然你也可以只返回res.data
              return res;
            },
       (err:any)=>{
    let netmsg = '';
     // 这里用来处理http常见错误，进行全局提示
     switch (err.response.status) {
        case 400:
          netmsg = '请求错误(400)';
          break;
        case 401:
          netmsg = '未授权，请重新登录(401)';
          // 这里可以做清空storage并跳转到登录页的操作
          break;
        case 403:
          netmsg = '拒绝访问(403)';
          break;
        case 404:
          netmsg = '请求出错(404)';
          break;
        case 408:
          netmsg = '请求超时(408)';
          break;
        case 500:
          netmsg = '服务器错误(500)';
          break;
        case 501:
          netmsg = '服务未实现(501)';
          break;
        case 502:
          netmsg = '网络错误(502)';
          break;
        case 503:
          netmsg = '服务不可用(503)';
          break;
        case 504:
          netmsg = '网络超时(504)';
          break;
        case 505:
          netmsg = 'HTTP版本不受支持(505)';
          break;
        default:
          netmsg = `连接出错(${err.response.status})!`;
      }
      message.error(netmsg);
      return Promise.reject(err.response);
}

   );
}


// 定义请求方法
public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.request(config);
  }
/**
 * 通用的get请求
 */
/** 
 * 这种写法，返回的数据是按照标准axiosresponse返回，因此获取到后端返回的数据时是需要再.data出来的
public get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.axiosInstance.get(url, config);
  }
* 这种写法遇到过在本地配置代理时，由于数据格式可能少了一层data原因等，可能是servicemanage多点了一层data，导致发送接口请求时死循环一直走项目的main.js文件
public  async get(url:string,config?:AxiosRequestConfig):Promise<AxiosResponse>{
    const result =await this.axiosInstance.get(url,config); 
    return result.data;
}
*/
public get(url:string,config?:AxiosRequestConfig):Promise<AxiosResponse>{
    
    return this.axiosInstance.get(url,config);
}
/**
 * 通用的post方法
 */
public async post(url:string,config?:AxiosRequestConfig):Promise<AxiosResponse>{
    const result=await this.axiosInstance.post(url,config);
    return result;
}
}

/**
 *  (config:AxiosRequestConfig)标红：
 * Argument of type '(config: AxiosRequestConfig) => void' is not assignable to parameter of type '(value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>'.
  Type 'void' is not assignable to type 'AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>
 原因在于没有写return config
  */