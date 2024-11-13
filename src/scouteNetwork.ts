import { ethers,Block,TransactionResponse,TransactionReceipt } from "ethers";
import { DataHexString } from "ethers/lib.commonjs/utils/data";
import logFilteredTransaction from "./logFilteredTransaction";
const provider = new ethers.JsonRpcProvider("https://zetachain-athens.g.allthatnode.com/archive/evm")

/**
 * scouteNetwork()
 * It All Always Listens For The New Mined Bloked
 * Then Pulls The Transaction Hash From That Block
 * Send The That Transaction Hashes List The logFilteredTransaction()
 * For Logging.
 * @param address Interested Address For The Logging. 
 */

async function scouteNetwork(address:string){
    provider.on("block",async (blockNumber)=>{
        try {
            let block:Block|null = await provider.getBlock(blockNumber);
            let transactions: readonly DataHexString[]|undefined = block?.transactions;
            await logFilteredTransaction(transactions,provider,address)
        } catch (error) {
            console.log("An Unexpected Error Occured\n")
            console.log(error)
        }
        
    })
}

scouteNetwork("Interested Address To Log")


