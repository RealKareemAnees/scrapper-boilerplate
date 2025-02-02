import { join } from 'path';
import { ImageUploader } from './ImageUploader';
import * as fs from 'fs';

const imagepath = join(__dirname, '..', '..', '..', 'Assets', 'image-1.png');

describe('ImageUploader', () => {
    it('should upload image to S3', async () => {
        const readstream = fs.createReadStream(imagepath);
        const imageUploader = new ImageUploader();
        const fileName = 'test.png';
        const result = await imageUploader.pipeToS3(readstream, fileName);
        expect(result).toBe(
            'https://testingawss3bucketformyscrappertrial.s3.us-east-1.amazonaws.com/' +
                fileName,
        );
    });

    it('should upload image to S3 using URL', async () => {
        const url =
            'https://th.bing.com/th/id/R.838eaba915103573b004968f95b69046?rik=QhwV9gXpO%2fiw4Q&pid=ImgRaw&r=0';

        const imageUploader = new ImageUploader();
        const fileName = 'test.png';
        const result = await imageUploader.pullAndUploadImage(url, fileName);
        expect(result).toBe(
            'https://testingawss3bucketformyscrappertrial.s3.us-east-1.amazonaws.com/' +
                fileName,
        );
    });
});
