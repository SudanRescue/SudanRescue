import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { description, latitude, longitude, city, state } = req.body;
      const post = await prisma.post.create({
        data: {
          description,
          latitude,
          longitude,
          city,
          state,
          createdAt: new Date(),
        },
      });

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
