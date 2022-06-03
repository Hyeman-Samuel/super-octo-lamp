import axios, { AxiosRequestConfig} from 'axios';
import FormData from 'form-data';
import {createReadStream,writeFileSync} from "fs";
import {basename} from "path";
import { HttpError } from '../../../utility/error/http_error';
import { ResponseCode } from '../../../utility/response/response';

export class RemoveBgService {

    public convertToPng = async (imagePath: string):Promise<string> => {  

        const removebgData = new FormData()
        removebgData.append('size', 'auto');
        removebgData.append('image_file',createReadStream(imagePath), basename(imagePath));

        const removebgConfig ={
            responseType:'arraybuffer',
            headers:{
                ...removebgData.getHeaders(),
                'X-Api-Key': process.env.REMOVE_BG_API_KEY
            }
        } as AxiosRequestConfig
        try {
            const response =  await axios.post('https://api.remove.bg/v1.0/removebg',removebgData,removebgConfig);
            let imageBuffer = response.data as Buffer
            //writeFileSync("no-bg.png", imageBuffer);
            let imageInBase64 = imageBuffer.toString('base64');
            return imageInBase64;
        } catch (error:any) {
            throw new HttpError("Error from RemoveBg :"+ error.response.data.responseMessage,ResponseCode.INTERNAL_SERVER_ERROR);
        }


    } 


}