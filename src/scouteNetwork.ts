import {Provider,Block } from 'ethers';
import { DataHexString } from "ethers/lib.commonjs/utils/data";
import getProvider from "./provider";
import logFilteredTransaction from "./logFilteredTransaction";
import getTransactiList from './getTransactionList';


/**
 * scouteNetwork()
 * It All Always Listens For The New Mined Bloked
 * Then Pulls The Transaction Hash From That Block
 * Send The That Transaction Hashes List The logFilteredTransaction()
 * For Logging.
 * @param address Interested Address For The Logging. 
 */

export default async function scouteNetwork(address:string,provider_url:string){
    const provider:Provider|undefined = await getProvider(provider_url)
    let blockList:number[]=[]
    if(provider){
        provider.on("block",async (blockNumber)=>{
            blockList.push(blockNumber)
            let blockToLook = blockList.shift()
            try {
                let transactions: readonly DataHexString[]|undefined = await getTransactiList(blockToLook,provider);
                await logFilteredTransaction(transactions,provider,address)
            } catch (error) {
                console.log("An Unexpected Error Occured\n")
                console.log(error)
            }
        })
    }
   
}

scouteNetwork("","")


