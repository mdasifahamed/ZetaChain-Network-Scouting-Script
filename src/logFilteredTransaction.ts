import { Provider, TransactionReceipt,ethers } from "ethers";
import { DataHexString } from "ethers/lib.commonjs/utils/data";
import checkAddress from "./checkAddress"

/**
 * logFilteredTransaction()
 * Logs The Filtered transaction from the list of the transactions hash
 * by retriving the transaction receipt from onchain. 
 * @param transactionHashes array of the transaction hash of a block
 * @param provider node provider
 * @param address intrested address for logging transaction
 */

export default async function logFilteredTransaction(transactionHashes:readonly DataHexString[] | undefined,provider:Provider,address:string) {
    transactionHashes?.forEach(async(hash) => {
        try {
        const trxReceipt:TransactionReceipt|null=await provider.getTransactionReceipt(hash)
            if(checkAddress(trxReceipt,address)){
                console.log(`''''''''''' Logging Started '''''''''''`)
                console.log(trxReceipt)
                console.log(`''''''''''' Logging Ended '''''''''''\n`)
            }
        } catch (error) {
            console.log("Unexpected Error Occured\n")
            console.log(error)
        }
   
    
    });
    
}