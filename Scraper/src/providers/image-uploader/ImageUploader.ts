import { PassThrough } from 'stream';
import { Configs } from '../configs/Configs';
import { Logger } from '../logger/logger';
import { Constants } from '@/interfaces/Constants.type';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage'; // Use Upload class for streaming
import { Readable } from 'stream';
import axios from 'axios';

export class ImageUploader {
    private configs = new Configs();
    private logger = new Logger('ImageUploader');
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: this.configs.get(Constants.S3_REGION_NAME),
            credentials: {
                accessKeyId: this.configs.get(Constants.S3_ACCESS_KEY_ID),
                secretAccessKey: this.configs.get(
                    Constants.S3_SECRET_ACCESS_KEY,
                ),
            },
        });
    }

    /**
     *
     * @param imageStream
     * @param fileName
     * @returns the S3 URL of the uploaded image
     */
    async pipeToS3(imageStream: Readable, fileName: string): Promise<string> {
        const passThrough = new PassThrough();
        imageStream.pipe(passThrough); // Pipe the input stream into PassThrough

        try {
            const upload = new Upload({
                client: this.s3Client,
                params: {
                    Bucket: this.configs.get(Constants.S3_BUCKET_NAME),
                    Key: fileName,
                    Body: passThrough, // Streaming body
                },
            });

            const result = await upload.done();
            this.logger.info(`Image uploaded to S3: ${result.Location}`);
            return result.Location; // Return the S3 URL
        } catch (err) {
            this.logger.error(`Error uploading image to S3: ${err}`);
            throw err;
        }
    }

    public async pullAndUploadImage(
        URL: string,
        fileName: string,
    ): Promise<string> {
        try {
            const response = await axios.get(URL, {
                responseType: 'stream',
            });

            const imageStream = response.data;
            return await this.pipeToS3(imageStream, fileName);
        } catch (err) {
            this.logger.error(`Error pulling and uploading image: ${err}`);
            throw err;
        }
    }
}
