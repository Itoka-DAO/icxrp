import { StoicIdentity } from 'ic-stoic-identity';
import { SignIdentity } from '@dfinity/agent';

export const connect = async (): Promise<SignIdentity> => {
  return new Promise(async (resolve) => {
    StoicIdentity.load().then((identity: SignIdentity | false) => {
      if (identity !== false) {
        resolve(identity);
      } else {
        return StoicIdentity.connect();
      }
    });
  });
};

export const getIdentity = async (): Promise<SignIdentity> => {
  return new Promise(async (resolve) => {
    StoicIdentity.load().then((identity: SignIdentity | false) => {
      if (identity !== false) {
        resolve(identity);
      } else {
        return StoicIdentity.connect();
      }
    });
  });
};

export const disconnect = async (): Promise<void> => {
  return new Promise((resolve) => {
    StoicIdentity.disconnect();
    resolve();
  });
};

export const isAuthenticated = async () => {
  return new Promise(async (resolve) => {
    StoicIdentity.load().then((identity: SignIdentity | false) => {
      resolve(identity);
    });
  });
};

const Stoic = {
  connect,
  getIdentity,
  disconnect,
  isAuthenticated,
};

export default Stoic;
