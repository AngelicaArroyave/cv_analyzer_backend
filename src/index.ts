import cors from 'cors'
import express from 'express'

process.loadEnvFile()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())

// Routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})