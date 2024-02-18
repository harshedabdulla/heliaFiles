import express from 'express'
import multer from 'multer' // For handling file uploads
import { create } from 'ipfs-core'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

const upload = multer({ dest: 'uploads/' }) // Temporarily store files here

const app = express()
const PORT = 3000
app.use(cors())

// Initialize IPFS
let ipfs
async function initIPFS() {
  ipfs = await create()
  console.log('IPFS node is ready')
}

initIPFS()

app.use(express.static('public')) // Serve static files from 'public' directory

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  try {
    const file = fs.readFileSync(req.file.path)
    const { cid } = await ipfs.add(file)
    // Clean up the uploaded file
    fs.unlinkSync(req.file.path)
    console.log('Uploaded image CID:', cid.toString())
    res.json({ cid: cid.toString() })
  } catch (error) {
    console.error('Error uploading file to IPFS:', error)
    res.status(500).send('Error uploading file.')
  }
})

app.get('/retrieve', async (req, res) => {
  const { cid } = req.query
  if (!cid) {
    return res.status(400).send('CID is required')
  }

  try {
    const chunks = []
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk)
    }
    const imageBuffer = Buffer.concat(chunks)
    // Set appropriate content type
    res.type('image/png')
    res.send(imageBuffer)
  } catch (error) {
    console.error('Error retrieving file from IPFS:', error)
    res.status(500).send('Error retrieving file.')
  }
})

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
