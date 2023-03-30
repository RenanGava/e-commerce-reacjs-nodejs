import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import { v4 as uuid } from 'uuid'



cloudinary.config({
    cloud_name: "renangava",
    api_key: "332647557533172",
    api_secret: "8qn9vLtT7Db8H0DXq-5ZowHxwf4"
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        public_id: () => uuid()
    }
})


export const upload = multer({
    // nossa config da cloudnary passada no storage
    storage: storage, 
    fileFilter(req, file, callback) {
        const mimeTypesImage = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/gif",
        ]

        // o include vai verificar se alguma das extensões de imagem a seguir
        // são iguais a do arquivo
        if(mimeTypesImage.includes(file.mimetype)){
            callback(null, true)
        }
    },
    limits:{
        //  limite de arquivos que podem ser enviados simultaneament
        files: 10,
        // tamanho dos arquivos que podem se enviados nesse caso são 5 megas
        fileSize: 5 * 1024 * 1024
    },
})
