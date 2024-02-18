# HeliaFiles

## Introduction
HeliaFiles is a simple, user-friendly web application that demonstrates the power of IPFS (InterPlanetary File System) for storing and retrieving images in a decentralized manner. Built with Node.js and leveraging the Helia library, it offers an intuitive interface for users to upload images to IPFS and retrieve them using unique content identifiers (CIDs).

## Features
- **Image Upload**: Easily upload images to the IPFS network.
- **Image Retrieval**: Retrieve and display images from IPFS using CIDs.
- **Decentralized Storage**: Experience the benefits of decentralized data storage firsthand.

## Prerequisites
Before you get started, ensure you have the following installed:
- Node.js (v14 or newer)
- npm (comes with Node.js)
- IPFS (if interacting directly with a local IPFS node)

## Installation
To set up HeliaFiles on your local machine, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/harshedabdulla/heliaFiles.git
```

2. Run the commands:
```bash
npm i
node be.js
```
3. Run the program in live server

## Uploading an Image
Click the "Upload" button after selecting an image file.
Upon successful upload, a CID for the image will be displayed.

## Retrieving an Image
Enter a previously obtained CID in the retrieval section and click "Retrieve".
The corresponding image will be displayed on the page.
