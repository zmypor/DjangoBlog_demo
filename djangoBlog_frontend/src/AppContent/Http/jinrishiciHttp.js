import {load} from'jinrishici';


export default async function loadPoetry() {
	return new Promise((resolve,reject)=>{
        load(result=>{
            resolve(result);
        },error=>{
            reject(error);
        });
    });
}
