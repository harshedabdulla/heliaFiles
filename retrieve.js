import { create } from 'ipfs-core'
import fs from 'fs'

async function retrieveImage(cid, outputPath) {
  const ipfs = await create()
  const stream = ipfs.cat(cid)

  let data = new Uint8Array([])
  for await (const chunk of stream) {
    data = new Uint8Array([...data, ...chunk])
  }

  fs.writeFileSync(outputPath, data)
  console.log(`Image retrieved and saved to ${outputPath}`)

  await ipfs.stop()
}

const cid = process.argv[2]
const outputPath = process.argv[3]
retrieveImage(cid, outputPath)
