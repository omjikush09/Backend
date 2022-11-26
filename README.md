# Backend

###How To Deploy Locally

>Requriment:-
[Node](https://nodejs.org/en/) lts version and [pnpm](https://pnpm.io/) package manaer.

Now clone the repo.
>git clone https://github.com/omjikush09/Backend.git

Go inside the folder and create the `.env` file and following variable, how to add variable given ahead.

```
DATABASE_URL=
JWT_SECRET=
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
AWS_S3_BUCKET_NAME=
AWS_S3_REGION=
```

As we are using MongoDB as our database so you need to get its connection [url](https://www.prisma.io/docs/concepts/database-connectors/mongodb). and to environment variable.

As we will be uploading image to s3 we need you to create bucket on s3 and enable anonymous public read and more on this [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html).

After that add that `bucket name` in Environment variable and if you don't add it will be by `defalut` will be named as `omjitest`.

Also need to add the `region of bucket` in environment variable if you don't add by  `defalut` it will be `us-east-1`.

Then create Access Key and Secret Key of IAM user who have access of previous created bucket and add it to Environment variable.

Now create a radom and long string to use as secret for JWT Token and add it to  environment variable 


After adding this do following step.
>pnpm install

>npx prisma db push

>pnpm build

>pnpm start


Congrats you have Successfully run the Server.

if you wnant to run in Development mode then run
>pnpm dev


