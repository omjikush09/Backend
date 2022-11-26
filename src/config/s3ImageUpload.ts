import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer"
import multerS3 from "multer-s3"
import { AWS_S3_BUCKET_NAME, AWS_S3_REGION} from './config.keys';
// import  aws from 'aws-sdk';

const s3 = new S3Client({region:AWS_S3_REGION})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket:AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const ext=file?.originalname.split(".")[1]
      cb(null, Date.now().toString()+`.${ext}`)
    }
  })
})

export default upload;
