import { Block, ethers, Provider } from "ethers";
import { DataHexString } from 'ethers/lib.commonjs/utils/data';

export default async function getTransactiList(blockNumber:number|undefined,provider:Provider):Promise< readonly DataHexString[]| undefined> {

    if(blockNumber){
        console.log(`Pulling Transaction list from the BlockNumber : ${blockNumber}`)
        try {
            const blockDetails:Block|null = await provider.getBlock(blockNumber)
            if (blockDetails) {
                const transactionHashList: readonly DataHexString[] = blockDetails.transactions
                return transactionHashList;
            }
        } catch (error) {
            console.log(`Unexpected Error Occured At Blokc:${blockNumber} While Pullling Transaction List`)
            console.log(error)
            return undefined          
        }
    }
}