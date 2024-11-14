export default async function retry (fn:Function, timeout:number, maxTry:number, attemp:number = 1):Promise<Function> {
    return fn().catch((error:Error) => {
      let delayTime = timeout * 1000;
      console.log(`Attempt Number ${attemp} `);
      if (error) {
        console.log(error);
        console.log(`Retrying In ${timeout} Seconds`);
        if (attemp < maxTry) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(retry(fn, timeout, maxTry, attemp + 1));
            }, delayTime*2);
          });
        }
        return Promise.reject(error);
      }
    });
};