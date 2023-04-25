import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { type, data } = JSON.parse(req.body);

      let result;

      if (type === "safetyUpdate") {
        result = await prisma.safetyUpdate.create({ data });
      } else if (type === "servicePost") {
        result = await prisma.servicePost.create({ data });
      } else {
        // BusTrip
        data.departureDateTime = new Date(data.departureDateTime);
        result = await prisma.busTrip.create({ data });      }

      res.status(200).json({ message: "Post created successfully", result });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}