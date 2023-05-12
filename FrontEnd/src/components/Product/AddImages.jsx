import { useState } from "react";
import Delete from "../../resources/atomo close.svg"
import { uploadFile } from 'react-s3';
import Plus from "../../resources/atomo plus.svg"
import Loading from "../Loading";

window.Buffer = window.Buffer || require("buffer").Buffer;
const S3_BUCKET = '0521ptc8n2-g07-images-v2';
const REGION = 'us-east-2';
const ACCESS_KEY = 'AKIASDYGBXDR7W6DXTFF';
const SECRET_ACCESS_KEY = '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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}


export const AddImages = ({ images, setImages, handleImage }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [isloading, setIsloading] = useState(false);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    console.log(selectedFile)
    const handleImages = (e, file) => {
        e.preventDefault()
        setIsloading(true)
        uploadFile(file, config)
            .then(data => {
                let imagen ={
                    url : data.location
                }
                setImages([...images, imagen])
                handleImage([...images, imagen])
                setIsloading(false)
                document.getElementById("imageInput").value = "";
            })
            .catch(err => console.error(err))
    };

    const deleteImages = (e, url) => {
        e.preventDefault()
        const newImages = images.filter((image) => image !== url)
        console.log(newImages)
        setImages(newImages)
        handleImage(newImages)
    }

    return (
        <>
            {
                images.map((image, index) => (
                    <div className="features">
                        <div className="form-control-create">
                            <input
                                className="input-images"
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Insertar https://"
                                disabled
                                value={image.url}
                            />
                        </div>
                        <div>
                            <button className="plus-btn" onClick={(event) => deleteImages(event, image)}>
                                <img className="" src={Delete} alt="plus" />
                            </button>
                        </div>
                    </div>
                ))
            }
            {isloading && <Loading></Loading>}
            <div className="features">
                <div className="form-control-create">
                    
                        <input
                            id="imageInput"
                            name="imageInput"
                            type="file"
                            className="imageInput"
                            placeholder="Insertar https://"
                            onChange={handleFileInput} />
                    
                </div>
                <button className="plus-btn" onClick={(e) => handleImages(e, selectedFile)}>
                    <img className="" src={Plus} alt="plus" />
                </button>
            </div>

        </>
    )

}

export default AddImages;