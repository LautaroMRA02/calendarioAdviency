export const api = {
    pedirRegalos:() => new Promise((resolve,reject)=>{
        try{
            const list = localStorage.getItem('LSlistaRegalos');
            setTimeout(()=> resolve({
                status:'ok',
                data: list? JSON.parse(list):[]
            }),2000)
        } catch(erro){
            reject({
                status:'erro',
                data: []
            })
        }
    }),
    guardarRegalos:(data)=> new Promise((resolve, reject)=> {
        try {
            localStorage.setItem("LSlistaRegalos", JSON.stringify(data))
            resolve('guardado')
        } catch (error) {
            reject('error al guardar')
        }
    })
} 