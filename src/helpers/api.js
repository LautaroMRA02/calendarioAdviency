export const api = {
    PedirRegalos: ()=> new Promise((resolve,reject)=>{
        try{
            const list = localStorage.getItem('LSListaRegalos');
            setTimeout(()=>resolve({
                status:'ok',
                data: list? JSON.parse(list):[]
            }),1500)
        } catch(err){
            reject({
                status:'error',
                data: []
            })
        }
    }),
    GuardarRegalos: (data)=> new Promise((resolve,reject)=>{
        try{
            localStorage.setItem('LSListaRegalos', JSON.stringify(data));
            resolve('guardado')
        } catch(err){
            reject('error al guardar')
        }
    }),
  }