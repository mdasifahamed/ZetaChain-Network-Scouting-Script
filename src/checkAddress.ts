import { TransactionReceipt } from "ethers";

/**
 * checkAddress()
 * It checks for the status of the transaction and 
 * Then checks, is the transaction is related to our wallet or not
 * @param transactionReceipt the trasactionReciept object we are will be looking
 * @param address address of the wallet
 * @returns true/false
 */
export default function checkAddress(transactionReceipt:TransactionReceipt|null,address:string):boolean {
    if(transactionReceipt?.status===1&&((transactionReceipt?.from===address)||(transactionReceipt?.to===address))){
        return true;
    }else{
        return false;
    }
}