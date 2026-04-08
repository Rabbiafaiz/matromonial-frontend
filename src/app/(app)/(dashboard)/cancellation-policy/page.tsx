// app/cancellation-policy/page.tsx
import React from 'react';

const CancellationPolicyPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 text-justify">
      <h1 className="text-4xl font-bold mb-8 text-center text-text">Cancellation Policy</h1>

      <section className="mb-6">
        <p className="mb-4">
          You may terminate your <strong>Vaishakhi Matrimony</strong> membership at any time and for any reason by following
          the account cancellation steps on our platform or by contacting our support team.
        </p>
      </section>

      <section className="mb-6">
        <p className="mb-4">
          However, please note that all payments made by way of registration, membership, renewal fees, or
          auto-renewal charges are strictly <strong>non-refundable</strong>, even if the membership is terminated before
          the end of the subscription period.
        </p>
      </section>

      <section className="mt-10 border-t pt-6 text-sm text-gray-600">
        <p>
          If you have any questions regarding your membership or cancellation process, feel free to contact us at:{' '}
          <strong>info@vaishakhimatrimony.com</strong>.
        </p>
      </section>
    </main>
  );
};

export default CancellationPolicyPage;
