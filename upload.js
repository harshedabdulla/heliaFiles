import { create } from 'ipfs-core'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function uploadImage(filePath) {
  const ipfs = await create()
  const file = fs.readFileSync(filePath)

  const { cid } = await ipfs.add(file)
  console.log('Uploaded image CID:', cid.toString())

  await ipfs.stop()
  return cid.toString()
}

const filePath = process.argv[2]
uploadImage(filePath).then((cid) =>
  console.log(`Image uploaded with CID: ${cid}`)
)
