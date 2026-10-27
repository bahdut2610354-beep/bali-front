import type { LegalLocaleContent } from '../types';

const en: LegalLocaleContent = {
  ui: {
    updated: 'Effective date',
    company: 'Company details',
    related: 'See also',
    consent: 'By paying you agree to the {terms}, the {refund} and the {privacy}.',
    consentNames: { terms: 'Rental Terms', refund: 'Cancellation & Refund Policy', privacy: 'Privacy Policy' },
    footerLegal: 'Legal',
    companyLabels: { name: 'Legal name', address: 'Registered address', email: 'Email', phone: 'Phone / WhatsApp' },
  },
  docs: {
    terms: {
      title: 'Rental Terms and Conditions',
      short: 'Rental Terms',
      description: 'Scooter rental terms of TROPICAL BIKES (PT ART TREADING GLOBAL), Bali: booking, payment, documents, use of the scooter, damage, fines and returns.',
      sections: [
        { h: '1. Who we are', p: [
          'The website {site} and the TROPICAL BIKES brand are operated by {company}, a limited liability company with foreign investment (PT PMA) registered in the Republic of Indonesia, address: {address}.',
          'These Terms apply to every booking made on the website, by WhatsApp, Telegram or in person. By making a booking or a payment you confirm that you have read and accept these Terms, the Cancellation & Refund Policy and the Privacy Policy.',
        ] },
        { h: '2. Booking and confirmation', p: [
          'A booking is confirmed when you receive a confirmation by email, WhatsApp or in your personal account. We may refuse or cancel a booking if the scooter is unavailable, the details provided are incomplete or false, or the payment is not received; in that case any amount paid is refunded in full.',
          'The rental period is counted in 24-hour days from the agreed delivery time. The model shown in the booking is guaranteed; if it becomes unavailable for reasons beyond our control we will offer a scooter of the same or a higher class at no extra cost, or a full refund.',
        ] },
        { h: '3. Prices and payment', p: [
          'Prices are set in Indonesian rupiah (IDR). Amounts in other currencies are shown for convenience; the charge is made in IDR or at the rate shown on the payment page. Your bank may apply its own conversion fees.',
          'The price includes the scooter, a helmet, basic roadside support and delivery inside the free delivery zone. Delivery to other areas, additional helmets, damage protection and other extras are shown separately before payment.',
          'You can pay online by bank card, QRIS, e-wallet or other methods offered on the payment page, by cryptocurrency, or in cash on delivery where this option is offered. Online card and QR payments are processed by licensed payment providers; we never receive or store your full card details.',
          'At handover we take a refundable deposit of $100 or IDR 1.5 million. It is returned in full when the scooter is returned, less any amounts due under section 7 (damage, lost keys or documents, unpaid fines). We do not hold your passport.',
        ] },
        { h: '4. Requirements for the rider', p: [
          'The rider must be at least 18 years old and hold a valid driving licence that covers motorcycles (category A) together with an International Driving Permit, or an Indonesian SIM C. You are responsible for complying with Indonesian traffic law.',
          'At handover we check the rider’s licence and an identity document. Only the person who made the booking and riders approved by us may ride the scooter.',
        ] },
        { h: '5. Handover and return', p: [
          'The scooter is delivered clean, serviced and with fuel. At handover we photograph its condition together with you; please report any existing damage at that moment.',
          'Return the scooter at the agreed time and place in the same condition, except for normal wear. Fuel used is not charged; a scooter returned with an empty tank may be charged for refuelling at cost.',
          'A late return of up to 1 hour is free. After that each started day is charged at the daily rate unless an extension has been agreed. If the scooter is not returned and you cannot be reached within 24 hours of the end of the rental, we may report it to the police.',
        ] },
        { h: '6. Use of the scooter', p: [
          'Ride carefully, always wear a helmet, and do not carry more than one passenger. The scooter may not be used under the influence of alcohol or drugs, for racing, off-road riding, commercial transport, or taken off the island of Bali (including to Nusa Penida, Lombok or Java) without our written consent.',
          'Always lock the scooter and keep the key with you. Do not repair or modify the scooter yourself; contact us and we will arrange help or a replacement.',
        ] },
        { h: '7. Damage, theft and fines', p: [
          'You are responsible for damage to the scooter, loss of the key or documents, and theft caused by negligence (for example, an unlocked scooter or a key left in the ignition) during the rental period. Repairs are charged at the price of an official service centre; lost keys and documents are charged at the actual cost of replacement.',
          'If you purchased damage protection, your liability is limited to the amount stated in the booking, except for damage caused by riding without a valid licence, under the influence, or in breach of section 6.',
          'Traffic fines and penalties issued during the rental are paid by the rider. In case of an accident or theft, contact us immediately and, if required, the police.',
        ] },
        { h: '8. Our liability', p: [
          'We are liable for providing a roadworthy scooter. If it breaks down because of a technical fault, we will repair or replace it free of charge, usually within a few hours inside our service area, or refund the unused days.',
          'To the extent permitted by law, we are not liable for indirect losses, missed flights or activities, or for injury and damage caused by the rider’s own actions. Riding a scooter carries risks; we recommend travel insurance that covers motorcycle riding.',
        ] },
        { h: '9. Cancellation and refunds', p: [
          'Cancellations, changes and refunds are governed by the Cancellation & Refund Policy, which forms part of these Terms.',
        ] },
        { h: '10. Governing law and complaints', p: [
          'These Terms are governed by the laws of the Republic of Indonesia. Please send any complaint to {email} or WhatsApp {phone}; we answer within 2 business days and try to resolve every issue amicably. Disputes that cannot be resolved amicably are settled by the competent court in Denpasar, Bali.',
          'We may update these Terms. The version published on the website on the date of your booking applies to that booking.',
        ] },
      ],
    },
    refund: {
      title: 'Cancellation & Refund Policy',
      short: 'Cancellation & Refunds',
      description: 'Free cancellation up to 24 hours before delivery, refund timelines and rules for early return at TROPICAL BIKES scooter rental in Bali.',
      sections: [
        { h: '1. Free cancellation', p: [
          'You can cancel any booking free of charge up to 24 hours before the scheduled delivery time and receive a full refund of the amount paid.',
          'To cancel, use your personal account or write to us by WhatsApp {phone} or email {email}. The time your message is received counts as the time of cancellation.',
        ] },
        { h: '2. Late cancellation and no-show', p: [
          'If you cancel less than 24 hours before delivery, the price of the first rental day is kept and the rest is refunded.',
          'If you are not at the agreed place and cannot be reached within 2 hours of the scheduled delivery time, the booking is treated as a no-show: the price of the first rental day and any paid delivery fee are kept, and the rest is refunded.',
        ] },
        { h: '3. Changes to a booking', p: [
          'You can change dates, address or scooter free of charge, subject to availability, up to 24 hours before delivery. If the new booking costs more, you pay the difference; if it costs less, the difference is refunded.',
          'Extensions during the rental are charged at the tariff for the total rental period whenever possible.',
        ] },
        { h: '4. Early return', p: [
          'If you return the scooter early, unused days are not refunded, except where the rental is ended because of a technical fault that we could not fix or replace.',
          'For monthly rentals ended early at your request, we may, at our discretion, recalculate the price at the tariff for the period actually used and refund the difference.',
        ] },
        { h: '5. Cancellation by us', p: [
          'If we cannot provide the booked scooter or a scooter of the same or a higher class, or we cancel the booking for any reason not caused by you, you receive a full refund of all amounts paid.',
        ] },
        { h: '6. How and when refunds are paid', p: [
          'Refunds are made to the original payment method: bank card, e-wallet or bank account. Card and e-wallet payments cannot be refunded in cash. Cryptocurrency payments are refunded in the same currency to a wallet you specify, based on the IDR amount of the booking.',
          'We initiate the refund within 3 business days of the cancellation. Depending on your bank or payment provider, the money usually arrives within 5–14 business days. Refunds are made in IDR; we are not responsible for exchange-rate differences or fees charged by your bank.',
        ] },
        { h: '7. Disputes and chargebacks', p: [
          'If something went wrong, please contact us before opening a dispute with your bank — we usually resolve issues on the same day. Opening a chargeback for a service that was provided in accordance with these rules may be contested with the handover photos and booking records.',
        ] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      short: 'Privacy',
      description: 'How TROPICAL BIKES (PT ART TREADING GLOBAL) collects, uses and protects personal data of customers of bali.bike, in line with Indonesian Law No. 27 of 2022.',
      sections: [
        { h: '1. Data controller', p: [
          'Your personal data is controlled by {company}, {address} (“we”). This policy explains how we process personal data in accordance with Law of the Republic of Indonesia No. 27 of 2022 on Personal Data Protection and other applicable law. Contact: {email}.',
        ] },
        { h: '2. Data we collect', p: [
          'Booking and contact data: name, email, phone number, messenger (WhatsApp, Telegram, WeChat), delivery address and map location, rental dates, chosen scooter and extras.',
          'Rider data: driving licence and identity document details checked at handover, and photos of the scooter’s condition.',
          'Payment data: amount, method and status of the payment. Card and e-wallet details are entered on the secure page of the payment provider; we never receive or store the full card number or CVV.',
          'Technical data: IP address, device and browser type, pages visited, cookies and similar technologies, and data from analytics and advertising tools such as Google Analytics and Google Ads.',
        ] },
        { h: '3. Why we use the data', p: [
          'To accept, confirm and carry out your booking, deliver and collect the scooter, take payments and make refunds (performance of the contract).',
          'To contact you about your rental, provide support and handle complaints, accidents, fines and damage claims (contract and legitimate interest).',
          'To keep accounting and tax records and respond to lawful requests from authorities (legal obligation).',
          'To improve the website, measure advertising and, if you agree, send you offers (legitimate interest and consent). You can refuse marketing messages at any time.',
        ] },
        { h: '4. Who we share data with', p: [
          'We do not sell personal data. We share it only with: our staff and drivers who deliver the scooter; payment providers and banks that process payments; hosting, email, messaging and analytics providers that work for us; insurers, police or other authorities when required by law or needed to handle an accident, theft or fine.',
          'Some of these providers may store data outside Indonesia. In such cases we use providers that ensure an adequate level of protection, as required by Indonesian law.',
        ] },
        { h: '5. How long we keep data', p: [
          'Booking and payment records are kept for as long as required by Indonesian tax and accounting law (up to 10 years). Handover photos are kept for 6 months after the rental unless needed for a claim. Marketing data is kept until you withdraw consent. Account data is deleted on request, except for records we must keep by law.',
        ] },
        { h: '6. Security', p: [
          'We use HTTPS encryption, access control and reputable providers to protect personal data. Online payments are processed by PCI DSS certified payment providers.',
        ] },
        { h: '7. Your rights', p: [
          'You have the right to obtain information about and a copy of your personal data, to correct it, to request its deletion or restriction of processing, to withdraw consent and to object to processing, and to file a complaint with the competent authority. To exercise your rights, write to {email}; we respond within the time limits set by law.',
        ] },
        { h: '8. Cookies', p: [
          'The website uses necessary cookies (language, currency, login, booking draft) and analytics and advertising cookies. You can block or delete cookies in your browser settings; some functions of the website may then work incorrectly.',
        ] },
        { h: '9. Changes', p: [
          'We may update this policy. The current version is always published on this page with its effective date.',
        ] },
      ],
    },
  },
};

export default en;
