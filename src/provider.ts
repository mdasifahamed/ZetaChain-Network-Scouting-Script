import { ethers } from "ethers";
import { Provider,Network } from "ethers";

export default async function getProvider(provider_url:string):Promise<Provider|undefined>{
    const provider:Provider = new ethers.JsonRpcProvider(provider_url)
    try {
        const provider:Provider = new ethers.JsonRpcProvider(provider_url)
        const network:Network = await provider.getNetwork();
        if(network){
            console.log("Network Connected")
            return provider;
        }
    } catch (error) {
        console.log("Network Not Connected")
        console.log(error)
        return undefined
    }
    
}
