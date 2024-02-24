import { v4 as uuidv4 } from "uuid";
import { storage } from "../../config/admin/firebase";

import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

const uploadFile = (imagen, nombreCarpeta) => {
    return new Promise ((resolve, reject) => {

        if(!imagen){
            resolve("https://loremflickr.com/640/480/fashion")

        }
        const nombreSeparado = imagen.name.split(".");
        const extension = nombreSeparado[nombreSeparado.length -1];
        const rutaCompleta = `${nombreCarpeta}/${uuidv4()}.${extension}`
        const storageRef = ref(storage, `${rutaCompleta}`);

        uploadBytes(storageRef, imagen)
        .then(() => {
            return getDownloadURL(storageRef)
        })
        .then((url)=> {
            resolve(url)
        })
        .catch((error) => {
            reject(error)
        })
    })
}


export {
    uploadFile
}