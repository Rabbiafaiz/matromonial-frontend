declare module '@cashfreepayments/cashfree-js' {
    interface CashfreeCheckoutOptions {
      paymentSessionId: string;
      redirectTarget: "_self" | "_modal";
    }
  
    interface CashfreeInstance {
      checkout(options: CashfreeCheckoutOptions): Promise<{
        error?: { message: string };
        redirect?: boolean;
        paymentDetails?: { paymentMessage: string };
      }>;
    }
  
    const load: (options: { mode: "sandbox" | "production" }) => Promise<CashfreeInstance>;
    export {load};
  }