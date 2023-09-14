import { NextApiRequest, NextApiResponse } from "next";
import { candypay } from "../../helpers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { items } = req.body;

    try {
      const response = await candypay.session.create({
        success_url: "https://fomomagazine.vercel.app/items/1",
        cancel_url: "https://fomomagazine.vercel.app/items/1",
        tokens: ["samo", "bonk", "isc"],
        items: items,
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Internal server error, Error creating session",
      });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
};

export default handler;
