export enum Environment {
  DEV = "development",
  PROD = "production",
}
export const getEnvironment = () => {
  if (
    process.env.ENVIRONMENT === "development" ||
    process.env.QLSTATE === "development" ||
    process.env.ENVIROMENT === "development"
  )
    return Environment.DEV;
  if (
    process.env.ENVIRONMENT === "production" ||
    process.env.QLSTATE === "production" ||
    process.env.ENVIROMENT === "production"
  )
    return Environment.PROD;
  console.warn("Unknown environment, defaulting to development");
  return Environment.DEV;
};
