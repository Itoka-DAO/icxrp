import { SignIdentity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';

export const connect = async (): Promise<SignIdentity> => {
  const client = await AuthClient.create();
  return new Promise(async (resolve, reject) => {
    const isAuthenticated = await client.isAuthenticated();
    if (isAuthenticated) {
      resolve(getIdentity());
    } else {
      client.login({
        onSuccess: () => resolve(getIdentity()),
        onError: reject,
      });
    }
  });
};

export const getIdentity = async () => {
  const client = await AuthClient.create();
  return client.getIdentity() as SignIdentity;
};

export const disconnect = async () => {
  const client = await AuthClient.create();
  return client.logout();
};

export const isAuthenticated = async () => {
  const client = await AuthClient.create();
  return client.isAuthenticated();
};

const InternetIdentity = {
  connect,
  getIdentity,
  disconnect,
  isAuthenticated,
};

export default InternetIdentity;
