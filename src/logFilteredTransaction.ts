import { Provider, TransactionReceipt, ethers } from "ethers";
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

export default async function logFilteredTransaction(
    transactionHashes: readonly DataHexString[] | undefined,
    provider: Provider | undefined,
    address: string) {
    console.log(`Looking Transaction For ${address}`)
    if (!provider || !transactionHashes) {
        console.log("Unknown Proivder Or Undefined Transaction List")
        throw new Error("Unknown Proivder Or Undefined Transaction List");

    }
    transactionHashes.forEach(async (hash) => {
        try {
            const trxReceipt: TransactionReceipt | null = await provider.getTransactionReceipt(hash)
            if (checkAddress(trxReceipt, address)) {
                console.log(`''''''''''' Logging Started '''''''''''`)
                console.log(trxReceipt)
                console.log(`''''''''''' Logging Ended '''''''''''\n`)
            }
        } catch (error) {
            console.log("Unexpected Error Occured\n")
            console.log(error)
            throw error
        }
    });

}