import {app} from './api/App';
import "dotenv/config";
const PORT = process.env.PORT; 
app.listen(PORT,()=> {
    try{
        console.log(`Servidor rodando na porta: ${PORT}`);
    }catch(err){
        if(err instanceof Error){
            console.error(`Servidor não rodou: ${err.message}`);
        }else{
            console.error(`Não se sabe a procedencia do erro`);
        }
    };
})
