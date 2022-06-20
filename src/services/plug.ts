import { Agent } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';

const plug = window?.ic?.plug;

const connect = async (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    isAuthenticated().then((res) => {
      console.log('Plug: isAuthenticated', res);
      if (res) {
        resolve(true);
      } else {
        plug?.requestConnect().then((res) => {
          console.log(res, 'request connect plug');
          resolve(true);
        });
      }
    });
  });
};

const isAuthenticated = async () => {
  return plug?.isConnected();
};

const getAgent = async (): Promise<Agent> => {
  return new Promise(async (resolve) => {
    if (!plug?.agent) {
      await plug?.createAgent();
    }
    if (plug?.agent) {
      // @ts-ignore
      resolve(plug.agent);
    }
  });
};

const getActor = async <T>(
  canisterId: string,
  idlFactory: IDL.InterfaceFactory
) => {
  await getAgent();
  // @ts-ignore
  return plug.createActor<T>({
    canisterId,
    interfaceFactory: idlFactory as any,
  });
};

const disconnect = async (): Promise<void> => {
  plug?.disconnect();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 0);
  });
};

const Plug = { connect, isAuthenticated, disconnect, getActor };

export default Plug;
