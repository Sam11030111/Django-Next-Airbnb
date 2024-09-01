/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**'
            },
            {
                protocol: 'http',
                hostname: '159.203.41.135',
                port: '1337',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
