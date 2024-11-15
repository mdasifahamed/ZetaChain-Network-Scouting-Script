import { Block, Provider } from "ethers";
import { DataHexString } from 'ethers/lib.commonjs/utils/data';

export default async function getTransactiList(
    blockNumber: number | undefined,
    provider: Provider | undefined
): Promise<readonly DataHexString[]> {

    if (!blockNumber || !provider) {
        throw new Error("Block number or provider is undefined");
    }

    console.log(`Pulling Transaction list from the BlockNumber : ${blockNumber}`);

    try {
        const blockDetails = await provider.getBlock(blockNumber);

        if (!blockDetails) {
            throw new Error(`No block details found for block ${blockNumber}`);
        }

        return blockDetails.transactions;

    } catch (error) {
        console.log(`Unexpected Error Occurred At Block:${blockNumber} While Pulling Transaction List`);
        console.log(error);
        throw error;
    }
}
