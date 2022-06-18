declare module 'ic-stoic-identity' {
  interface StoicIdentity {
    load(): Promise<SignIdentity>;
    connect(): Promise<SignIdentity>;
    disconnect(): void;
  }
  let StoicIdentity: StoicIdentity;
}
