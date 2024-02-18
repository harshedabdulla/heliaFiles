async function uploadImage() {
  const fileInput = document.getElementById('imageUpload')
  const file = fileInput.files[0]

  if (!file) {
    alert('Please select a file first!')
    return
  }

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    if (data.cid) {
      console.log('Upload successful, CID:', data.cid)
      document.getElementById(
        'imageCid'
      ).textContent = `Uploaded Image CID: ${data.cid}`
    } else {
      alert('Failed to upload image.')
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Error uploading image. Check console for details.')
  }
}

async function retrieveImage() {
  const cidInput = document.getElementById('imageCID')
  const cid = cidInput.value.trim()

  if (!cid) {
    alert('Please enter a CID first!')
    return
  }

  try {
    const imageUrl = `http://localhost:3000/retrieve?cid=${encodeURIComponent(
      cid
    )}`
    document.getElementById('retrievedImage').src = imageUrl
  } catch (error) {
    console.error('Error retrieving image:', error)
    alert('Error retrieving image. Check console for details.')
  }
}
