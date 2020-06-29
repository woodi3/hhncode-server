import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import environment from './environment';

cloudinary.config({
    cloud_name: environment.CLOUDINARY_API_NAME || '',
    api_key: environment.CLOUDINARY_API_KEY || '',
    api_secret: environment.CLOUDINARY_API_SECRET || '',
});

export class FileUploadHelper {
    /**
     * Uploads a file to cloudinary
     * @param file
     */
    static upload(file: any): Promise<UploadApiResponse> {
        return cloudinary.uploader.upload(file.path);
    }
}
