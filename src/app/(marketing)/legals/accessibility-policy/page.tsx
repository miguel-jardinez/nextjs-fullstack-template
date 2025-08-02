const TermsAndConditions = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-sm leading-6 text-gray-800 space-y-6">
    <h1 className="text-2xl font-bold">Terms and Conditions</h1>
    <p>Last updated: [Date]</p>

    <section>
      <h2 className="text-lg font-semibold">1. About the App</h2>
      <p>
        This is a personal finance tool that helps you track your income,
        expenses, budgets, savings goals, and credit cards. It’s available on
        web and mobile, and your data syncs across devices through the cloud.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-semibold">2. Personal Use</h2>
      <p>
        This app is intended for individual use only. Each account is personal
        and non-transferable. Sharing login credentials is not allowed.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-semibold">3. Data Sync and Security</h2>
      <p>
        Your data is securely stored in the cloud and synced across devices so
        you can access it anytime. We use encryption and follow best practices
        for security, but we cannot guarantee complete protection against
        external attacks.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-semibold">4. Responsibility</h2>
      <p>
        This app is designed to help you manage your money, but it does not
        replace financial advice from professionals. You are solely responsible
        for any decisions you make based on the information in the app.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-semibold">5. Updates and Changes</h2>
      <p>
        We may update or improve features at any time to enhance your
        experience. We’ll notify you of significant changes.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-semibold">6. Contact</h2>
      <p>
        If you have any questions or feedback, reach out to us at{" "}
        <strong>[your_email@email.com]</strong>.
      </p>
    </section>
  </div>
);

export default TermsAndConditions;
