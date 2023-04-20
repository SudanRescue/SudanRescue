// pages/api/posts.js
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const postData = JSON.parse(req.body)
    try {
      let newPost
      if (postData.type === 'safetyUpdate') {
        newPost = await prisma.safetyUpdate.create({ data: postData.data })
      } else {
        newPost = await prisma.servicePost.create({ data: postData.data })
      }
      res.status(201).json(newPost)
    } catch (error) {
      res.status(400).json({ error: 'Failed to create post' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
