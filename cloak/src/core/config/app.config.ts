import * as dotenv from 'dotenv'
dotenv.config()

const appConfig =  () => ({
    CONNECTION_STRING: process.env.CONNECTION_STRING
})

export default appConfig

