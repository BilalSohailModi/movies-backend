// s3.config.ts
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import Multer from 'multer'
import config from './config';

@Injectable()
export class S3Service {
    private readonly s3: S3;

    constructor() {
        this.s3 = new S3({
            accessKeyId: config.AWS.ACCESS_KEY_ID,
            secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
            region: config.AWS.REGION,
        });
    }

    uploadImage(file: Multer.File): Promise<S3.ManagedUpload.SendData> {
        const params = {
            Bucket: config.AWS.S3_BUCKET,
            Key: `images/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            // ACL: 'public-read', // Optional: to make the file publicly accessible
        };

        return this.s3.upload(params).promise();
    }
}
