import { Provider, Block } from 'ethers';
import { DataHexString } from "ethers/lib.commonjs/utils/data";
import getProvider from "./provider";
import logFilteredTransaction from "./logFilteredTransaction";
import getTransactiList from './getTransactionList';
import retry from './retry';

async function wait3min() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("")
        }, 30000)
    })
}
/**
 * scouteNetwork()
 * It All Always Listens For The New Mined Bloked
 * Then Pulls The Transaction Hash From That Block
 * Send The That Transaction Hashes List The logFilteredTransaction()
 * For Logging.
 * @param address Interested Address For The Logging. 
 */

export default async function scouteNetwork(address: string, provider_url: string) {
    const provider: Provider | undefined = await getProvider(provider_url);
    const fakeBlockNumber: number = 1256987459852156
    const fakeProvider: Provider | undefined = await getProvider("https://zetachain-athens.g.allthatnode.com/archive/")
    let blockList: number[] = [];
    let isProcessing = false;

    if (provider) {
        provider.on("block", async (blockNumber) => {
            console.log('New block:', blockNumber);
            blockList.push(blockNumber);
            if (!isProcessing) {
                isProcessing = true;
                try {
                    const blockToLook = blockList.shift();
                    console.log('Processing block:', blockToLook);
                    const transactions = await retry(() => getTransactiList(blockToLook, provider), 10, 5);
                    await retry(() => logFilteredTransaction(transactions, fakeProvider, address), 10, 5);
                    // console.log("waiting 20 seconds")
                    // await wait3min();
                    // console.log("Waited 20 Seconds")
                    isProcessing = false;

                } catch (error) {
                    console.log("An Unexpected Error Occurred\n");
                    console.log(error);
                }
            } else {
                console.log('Already processing a block, queuing block:', blockNumber);
            }
        });
    }
}

scouteNetwork("", "")


