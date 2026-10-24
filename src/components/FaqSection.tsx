'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Faq {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  faqs: Faq[];
}

export default function FaqSection({ title = 'Frequently Asked Questions', faqs }: FaqSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <section className="seo-content-section" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="section-heading-wrapper">
        <h2 id="faq-heading" className="section-heading">
          {title}
        </h2>
        <p className="section-subheading">
          Clear answers about browser processing, performance, security, and privacy.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          const answerId = `faq-ans-${idx}`;
          const questionId = `faq-q-${idx}`;
          return (
            <div key={idx} className="faq-item">
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="faq-question"
                onClick={() => toggleIndex(idx)}
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {isOpen && (
                <div id={answerId} role="region" aria-labelledby={questionId} className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
