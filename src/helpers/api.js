
export  const api = {
    regaloPedir:()=> new Promise((resolve,reject)=> {
        try {
            const list = localStorage.getItem('LSlistaRegalos')
            setTimeout(
                () => resolve({
                    status:'ok',
                    data: list ? JSON.parse(list) : []
                }),1500
            )
        } catch (error) {
            reject({
                status: 'error',
                data: []
            })
        }
    }),
    regaloGuardar:(data)=> new Promise((resolve, reject)=> {
        try {
            localStorage.setItem("LSlistaRegalos", JSON.stringify(data))
            resolve('guardado')
        } catch (error) {
            reject('error al guardar')
        }
    })
}