export default {
    client: {
        host: process.env.REACT_APP_BASIC_CLIENT_HOST,
        port: process.env.REACT_APP_BASIC_CLIENT_PORT,
    },
    server: {
        host: process.env.REACT_APP_BASIC_SERVER_HOST,
        port: process.env.REACT_APP_BASIC_SERVER_PORT,
    },
    aws: {
        bucket_name: process.env.REACT_APP_BASIC_AWS_BUCKET_NAME,
        region: process.env.REACT_APP_BASIC_AWS_REGION,
    },
};
