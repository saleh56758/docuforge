import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cookie Policy — DocuForge',
  description: 'Detailed explanation of cookie usage and local preferences on DocuForge.',
  alternates: {
    canonical: 'https://docuforge.app/cookies'
  }
};

export default function CookiesPage() {
  return (
    <div className="container article-page">
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

      <header className="article-header">
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem' }}>
          Cookie Policy
        </h1>
        <p className="article-meta">
          Last Updated: October 2026 • Effective Date: October 2026
        </p>
      </header>

      <div className="prose">
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your computer or mobile device when you load websites. They are widely used to make websites work efficiently and provide analytical information to site operators.
        </p>

        <h2>How DocuForge Uses Cookies and Local Storage</h2>
        <p>
          DocuForge prioritizes a minimal cookie footprint. Here is how storage is utilized:
        </p>

        <table>
          <thead>
            <tr>
              <th>Type / Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Lifespan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>df_theme</code></td>
              <td>DocuForge (Local Storage)</td>
              <td>Remembers your Dark Mode / Light Mode color preference.</td>
              <td>Persistent (Local to device)</td>
            </tr>
            <tr>
              <td>Advertising Cookies</td>
              <td>Google AdSense</td>
              <td>Serves non-personalized or personalized ads and frequency caps impressions.</td>
              <td>Varies (up to 13 months)</td>
            </tr>
          </tbody>
        </table>

        <h2>Managing and Disabling Cookies</h2>
        <p>
          You have full control over cookie settings. Most web browsers allow you to modify your preferences to block or delete cookies:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies.</li>
          <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection.</li>
          <li><strong>Apple Safari:</strong> Preferences → Privacy → Manage Website Data.</li>
          <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions.</li>
        </ul>
        <p>
          Because our core image and PDF utilities run purely on local browser APIs (Canvas, Web Workers, and FileReader), disabling third-party cookies will not hinder your ability to compress, resize, or merge your files.
        </p>
      </div>
    </div>
  );
}
