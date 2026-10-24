import React from 'react';

interface Step {
  title: string;
  text: string;
}

interface HowToSectionProps {
  toolName: string;
  steps: Step[];
}

export default function HowToSection({ toolName, steps }: HowToSectionProps) {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${toolName}`,
    description: `Step-by-step instructions for using the free online ${toolName} on DocuForge.`,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.title,
      text: step.text
    }))
  };

  return (
    <section className="seo-content-section" aria-labelledby="howto-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="section-heading-wrapper">
        <h2 id="howto-heading" className="section-heading">
          How to Use {toolName}
        </h2>
        <p className="section-subheading">
          Follow these quick steps to process your files in seconds.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step, idx) => (
          <div key={idx} className="step-card">
            <div className="step-number">{idx + 1}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-text">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
