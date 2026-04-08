// app/refund-policy/page.tsx
import React from 'react';

const RefundPolicyPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 text-justify">
      <h1 className="text-4xl font-bold mb-8 text-center text-text">Refund Policy</h1>

      <section className="mb-6">
        <p className="mb-4">
          The payments made by any <strong>Vaishakhi Matrimony</strong> member by way of membership, renewal fee, or
          auto-renewal are treated as <strong>non-refundable</strong>. Once a payment is made, it cannot be refunded under any circumstances.
        </p>
      </section>

      <section className="mb-6">
        <p className="mb-4">
          Payment once made for <strong>Vaishakhi Matrimony</strong> services cannot be assigned to any other person or party,
          nor can it be adjusted towards any other product or package offered by the Company.
        </p>
      </section>

      <section className="mb-6">
        <p className="mb-4">
          In the event that you choose to terminate your membership voluntarily, you shall not be entitled to any
          refund for the subscription fees, if any, already paid by you.
        </p>
      </section>

      <section className="mt-10 border-t pt-6 text-sm text-gray-600">
        <p>
          If you have questions or require clarification regarding this policy, please contact us at:{' '}
          <strong>info@vaishakhimatrimony.com</strong>.
        </p>
      </section>
    </main>
  );
};

export default RefundPolicyPage;
