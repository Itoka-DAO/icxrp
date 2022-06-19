import { Agent, SignIdentity } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';

const plug = window.ic.plug;

const connect = async (): Promise<SignIdentity> => {
  return new Promise(async (resolve) => {
    isAuthenticated().then((res) => {
      if (res) {
        resolve(getIdentity());
      } else {
        plug.requestConnect().then((res) => {
          resolve(getIdentity());
        });
      }
    });
  });
};

const isAuthenticated = async () => {
  return plug.isConnected();
};

const getIdentity = async (): Promise<SignIdentity> => {
  plug.requestConnect().then((res) => {});
  return '' as unknown as SignIdentity;
};

const getAgent = async (): Promise<Agent> => {
  return new Promise(async (resolve) => {
    if (!plug.agent) {
      await plug.createAgent();
    }
    if (plug.agent) {
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
  plug.disconnect();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 0);
  });
};

const Plug = { connect, isAuthenticated, disconnect, getActor };

export default Plug;
