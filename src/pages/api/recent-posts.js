// pages/api/recent-posts.js
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const safetyUpdates = await prisma.safetyUpdate.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      })

      const servicePosts = await prisma.servicePost.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      })

      res.status(200).json({ safetyUpdates, servicePosts })
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch recent posts' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
