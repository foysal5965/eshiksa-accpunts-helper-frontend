export const getBaseUrl =(): string=>{
    return process.env.NEXT_DEVELOPMENT_URL || "https://eshiksa.vercel.app/api/v1"
}