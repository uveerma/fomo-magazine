import { NextApiRequest, NextApiResponse } from "next";
import { airdrop } from "../../helpers";

const bonk = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const payload = req.body;
    console.log("Payload data", payload);
    try {
      const amount = 195000000000;

      airdrop(payload.customer, amount);
      console.log(`Transferd ${amount} BONK to ${payload.customer}.`);
      return res.status(200).json({
        message: "webhook is good!",
      });
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

export default bonk;
