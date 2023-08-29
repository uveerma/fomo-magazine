import {
    Keypair,
    Transaction,
    PublicKey,
    sendAndConfirmTransaction,
    Connection
  } from "@solana/web3.js";
  import {
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    createTransferCheckedInstruction,
  } from "@solana/spl-token";
  import base58 from "bs58";
  import dotenv from "dotenv";
  
  dotenv.config();
  
  export const airdrop = async (walletAddress: string, amount: number) => {
    const CONNECTION = new Connection(
      process.env.RPC_URL!
      );

    const payer = Keypair.fromSecretKey(
      base58.decode(process.env.BONK_PRIVATE_KEY!)
    );
    const transaction = new Transaction();
    const tokenAddress = new PublicKey(
      "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
    );
  
    // USDC Address- EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v , Decimals - 6
    // SAMO Address- 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU , Decimals - 9
    // BONK Address- DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 , Decimals - 5

  
    const payerAddress = payer.publicKey;
    const receiverAddress = new PublicKey(walletAddress);

    const receiverAccount = await getAssociatedTokenAddress(
      tokenAddress, // which token the account is for
      receiverAddress // who the token account belongs to (the buyer)
    );
    const receiverATAInfo = await CONNECTION.getAccountInfo(receiverAccount);

    if (receiverATAInfo === null) {
      const createATAInstruction = createAssociatedTokenAccountInstruction(
        payer.publicKey,
        receiverAccount,
        receiverAddress,
        tokenAddress
      );
  
      transaction.instructions.unshift(createATAInstruction);
    }

   /* const receiverAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      tokenAddress, // which token the account is for
      receiverAddress // who the token account belongs to (the buyer)
    ); */
    const payerAccount = await getAssociatedTokenAddress(
      tokenAddress,
      payerAddress
    );
  
    const transferInstruction = createTransferCheckedInstruction(
      payerAccount, // source account (coupons)
      tokenAddress, // token address (coupons)
      receiverAccount, // destination account (coupons)
      payerAddress, // owner of source account
      amount, // amount to transfer
      5 // decimals of the token - we know this is 0
    )
  
    transaction.instructions.push(transferInstruction);
  
    const tx = await sendAndConfirmTransaction(
      CONNECTION,
      transaction,
      [payer],
      {
        commitment: "confirmed",
      }
    );
    console.log("airdrop done, tx address:", tx)
    return tx;
  };
