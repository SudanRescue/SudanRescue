import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          timestamp: "desc",
        },
      });

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
