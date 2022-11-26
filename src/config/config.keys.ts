//General
export const PORT=process.env.PORT || 8000
export const JWT_SECRET=process.env.JWT_SECRET || "secret"

//AWS
export const AWS_ACCESS_KEY=process.env.AWS_ACCESS_KEY || ""
export const AWS_ACCESS_ID=process.env.AWS_ACCESS_ID || ""
export const AWS_S3_BUCKET_NAME=process.env.AWS_S3_BUCKET_NAME || "omjitest"
export const AWS_S3_REGION=process.env.AWS_S3_REGION || "us-east-1"