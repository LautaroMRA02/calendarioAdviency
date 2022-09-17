const HANDLER_REGALOS = {
    get: () => new Promise((resolve,reject)=>{
        try {
            const data = localStorage.getItem('ListaDeRegalos')
            setTimeout(()=>resolve({
                statusbar: 'ok',
                response: data ? JSON.parse(data) : []
            }),100)
        } catch (error) {
            reject({
                statusbar: 'error',
                reason: error,
                response: []
            })
        }
    }),
    set: (data) => new Promise((resolve,reject)=>{
        try {
            localStorage.setItem('ListaDeRegalos', JSON.stringify(data))
            resolve('Guardado hecho')
        } catch (error) {
            reject('Guardado fallo')
        }
    })
}

export default HANDLER_REGALOS;