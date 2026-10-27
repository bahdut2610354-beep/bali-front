import type { LegalLocaleContent } from '../types';

const fr: LegalLocaleContent = {
  ui: {
    updated: 'Date d’entrée en vigueur',
    company: 'Informations sur la société',
    related: 'Voir aussi',
    consent: 'En payant, vous acceptez les {terms}, la {refund} et la {privacy}.',
    consentNames: { terms: 'Conditions de location', refund: 'Politique d’annulation et de remboursement', privacy: 'Politique de confidentialité' },
    footerLegal: 'Mentions légales',
    companyLabels: { name: 'Raison sociale', address: 'Adresse du siège', email: 'E-mail', phone: 'Téléphone / WhatsApp' },
  },
  docs: {
    terms: {
      title: 'Conditions générales de location',
      short: 'Conditions de location',
      description: 'Conditions de location de scooters TROPICAL BIKES (PT ART TREADING GLOBAL) à Bali : réservation, paiement, documents, utilisation, dommages, amendes et restitution.',
      sections: [
        { h: '1. Qui sommes-nous', p: [
          'Le site {site} et la marque TROPICAL BIKES sont exploités par {company}, société à responsabilité limitée à capitaux étrangers (PT PMA) immatriculée en République d’Indonésie, adresse : {address}.',
          'Ces Conditions s’appliquent à toute réservation effectuée sur le site, par WhatsApp, Telegram ou en personne. En réservant ou en payant, vous confirmez avoir lu et accepté ces Conditions, la Politique d’annulation et de remboursement et la Politique de confidentialité.',
        ] },
        { h: '2. Réservation et confirmation', p: [
          'Une réservation est confirmée lorsque vous recevez une confirmation par e-mail, WhatsApp ou dans votre espace client. Nous pouvons refuser ou annuler une réservation si le scooter n’est pas disponible, si les informations sont incomplètes ou fausses, ou si le paiement n’est pas reçu ; dans ce cas, la somme payée est intégralement remboursée.',
          'La durée de location est comptée par périodes de 24 heures à partir de l’heure de livraison convenue. Le modèle réservé est garanti ; s’il devient indisponible pour des raisons indépendantes de notre volonté, nous proposons un scooter de catégorie égale ou supérieure sans supplément, ou un remboursement intégral.',
        ] },
        { h: '3. Prix et paiement', p: [
          'Les prix sont fixés en roupies indonésiennes (IDR). Les montants dans d’autres devises sont indicatifs ; le débit est effectué en IDR ou au taux affiché sur la page de paiement. Votre banque peut appliquer ses propres frais de change.',
          'Le prix comprend le scooter, un casque, l’assistance de base et la livraison dans la zone gratuite. La livraison dans d’autres zones, les casques supplémentaires, la protection dommages et les autres options sont indiqués séparément avant le paiement.',
          'Vous pouvez payer en ligne par carte bancaire, QRIS, portefeuille électronique ou tout autre moyen proposé sur la page de paiement, en cryptomonnaie, ou en espèces à la livraison lorsque cette option est proposée. Les paiements par carte et QR sont traités par des prestataires de paiement agréés ; nous ne recevons ni ne conservons jamais vos données de carte complètes.',
          'Nous ne demandons pas de caution et ne conservons pas votre passeport.',
        ] },
        { h: '4. Conditions pour le conducteur', p: [
          'Le conducteur doit avoir au moins 18 ans et détenir un permis valide pour les motos (catégorie A) accompagné d’un permis international, ou un SIM C indonésien. Vous êtes responsable du respect du code de la route indonésien.',
          'À la remise du scooter, nous vérifions le permis et une pièce d’identité. Seuls la personne ayant réservé et les conducteurs approuvés par nous peuvent conduire le scooter.',
        ] },
        { h: '5. Remise et restitution', p: [
          'Le scooter est livré propre, entretenu et avec du carburant. À la remise, nous photographions son état avec vous ; signalez tout dommage existant à ce moment-là.',
          'Restituez le scooter à l’heure et au lieu convenus dans le même état, hors usure normale. Le carburant consommé n’est pas facturé ; un scooter rendu avec le réservoir vide peut donner lieu à la facturation du plein au prix coûtant.',
          'Un retard de restitution jusqu’à 1 heure est gratuit. Au-delà, chaque jour entamé est facturé au tarif journalier, sauf prolongation convenue. Si le scooter n’est pas restitué et que vous êtes injoignable 24 heures après la fin de la location, nous pouvons le signaler à la police.',
        ] },
        { h: '6. Utilisation du scooter', p: [
          'Conduisez prudemment, portez toujours un casque et ne transportez pas plus d’un passager. Il est interdit de conduire sous l’emprise de l’alcool ou de drogues, de faire des courses, du tout-terrain, du transport commercial, ou de quitter l’île de Bali (y compris pour Nusa Penida, Lombok ou Java) sans notre accord écrit.',
          'Verrouillez toujours le scooter et gardez la clé sur vous. Ne réparez ni ne modifiez le scooter vous-même ; contactez-nous et nous organiserons une assistance ou un remplacement.',
        ] },
        { h: '7. Dommages, vol et amendes', p: [
          'Pendant la location, vous êtes responsable des dommages au scooter, de la perte de la clé ou des documents, et du vol résultant d’une négligence (par exemple scooter non verrouillé ou clé laissée sur le contact). Les réparations sont facturées au tarif d’un atelier officiel ; les clés et documents perdus au coût réel de remplacement.',
          'Si vous avez souscrit une protection dommages, votre responsabilité est limitée au montant indiqué dans la réservation, sauf pour les dommages causés en conduisant sans permis valide, sous l’emprise de l’alcool ou de drogues, ou en violation de l’article 6.',
          'Les amendes reçues pendant la location sont à la charge du conducteur. En cas d’accident ou de vol, contactez-nous immédiatement et, si nécessaire, la police.',
        ] },
        { h: '8. Notre responsabilité', p: [
          'Nous sommes responsables de fournir un scooter en bon état de marche. En cas de panne due à un défaut technique, nous le réparons ou le remplaçons gratuitement, généralement en quelques heures dans notre zone de service, ou remboursons les jours non utilisés.',
          'Dans les limites permises par la loi, nous ne sommes pas responsables des pertes indirectes, des vols ou activités manqués, ni des blessures et dommages causés par les actions du conducteur lui-même. La conduite d’un scooter comporte des risques ; nous recommandons une assurance voyage couvrant la conduite de deux-roues.',
        ] },
        { h: '9. Annulation et remboursement', p: [
          'Les annulations, modifications et remboursements sont régis par la Politique d’annulation et de remboursement, qui fait partie intégrante des présentes Conditions.',
        ] },
        { h: '10. Droit applicable et réclamations', p: [
          'Les présentes Conditions sont régies par le droit de la République d’Indonésie. Adressez vos réclamations à {email} ou par WhatsApp au {phone} ; nous répondons sous 2 jours ouvrés et cherchons toujours une solution amiable. Les litiges qui ne peuvent être réglés à l’amiable relèvent du tribunal compétent de Denpasar, Bali.',
          'Nous pouvons mettre à jour ces Conditions. La version publiée sur le site à la date de votre réservation s’applique à celle-ci.',
        ] },
      ],
    },
    refund: {
      title: 'Politique d’annulation et de remboursement',
      short: 'Annulation et remboursement',
      description: 'Annulation gratuite jusqu’à 24 heures avant la livraison, délais de remboursement et règles de restitution anticipée chez TROPICAL BIKES à Bali.',
      sections: [
        { h: '1. Annulation gratuite', p: [
          'Vous pouvez annuler toute réservation gratuitement jusqu’à 24 heures avant l’heure de livraison prévue et être intégralement remboursé.',
          'Pour annuler, utilisez votre espace client ou écrivez-nous par WhatsApp au {phone} ou par e-mail à {email}. L’heure de réception de votre message fait foi.',
        ] },
        { h: '2. Annulation tardive et absence', p: [
          'En cas d’annulation moins de 24 heures avant la livraison, le prix du premier jour de location est conservé et le reste est remboursé.',
          'Si vous n’êtes pas au lieu convenu et êtes injoignable dans les 2 heures suivant l’heure de livraison prévue, la réservation est considérée comme une non-présentation : le prix du premier jour et les frais de livraison payés sont conservés, le reste est remboursé.',
        ] },
        { h: '3. Modification de la réservation', p: [
          'Vous pouvez modifier gratuitement les dates, l’adresse ou le scooter, sous réserve de disponibilité, jusqu’à 24 heures avant la livraison. Si la nouvelle réservation coûte plus cher, vous payez la différence ; si elle coûte moins cher, la différence est remboursée.',
          'Les prolongations en cours de location sont, dans la mesure du possible, calculées au tarif correspondant à la durée totale.',
        ] },
        { h: '4. Restitution anticipée', p: [
          'En cas de restitution anticipée, les jours non utilisés ne sont pas remboursés, sauf si la location prend fin en raison d’un défaut technique que nous n’avons pu ni réparer ni résoudre par un remplacement.',
          'Pour les locations mensuelles terminées plus tôt à votre demande, nous pouvons, à notre discrétion, recalculer le prix au tarif de la période réellement utilisée et rembourser la différence.',
        ] },
        { h: '5. Annulation de notre part', p: [
          'Si nous ne pouvons pas fournir le scooter réservé ou un scooter de catégorie égale ou supérieure, ou si nous annulons la réservation pour une raison qui ne vous est pas imputable, vous êtes intégralement remboursé de toutes les sommes versées.',
        ] },
        { h: '6. Modalités et délais de remboursement', p: [
          'Les remboursements sont effectués sur le moyen de paiement d’origine : carte bancaire, portefeuille électronique ou compte bancaire. Les paiements par carte et portefeuille ne peuvent pas être remboursés en espèces. Les paiements en cryptomonnaie sont remboursés dans la même devise sur le portefeuille que vous indiquez, sur la base du montant en IDR de la réservation.',
          'Nous initions le remboursement sous 3 jours ouvrés après l’annulation. Selon votre banque ou prestataire, l’argent arrive généralement sous 5 à 14 jours ouvrés. Les remboursements sont effectués en IDR ; nous ne sommes pas responsables des écarts de change ni des frais de votre banque.',
        ] },
        { h: '7. Litiges et rétrofacturations', p: [
          'En cas de problème, contactez-nous avant d’ouvrir un litige auprès de votre banque — nous le résolvons généralement le jour même. Une rétrofacturation pour un service fourni conformément à ces règles peut être contestée à l’aide des photos de remise et des données de réservation.',
        ] },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      short: 'Confidentialité',
      description: 'Comment TROPICAL BIKES (PT ART TREADING GLOBAL) collecte, utilise et protège les données personnelles des clients de bali.bike, conformément à la loi indonésienne n° 27 de 2022.',
      sections: [
        { h: '1. Responsable du traitement', p: [
          'Le responsable du traitement de vos données personnelles est {company}, {address} (« nous »). Cette politique explique comment nous traitons les données personnelles conformément à la loi de la République d’Indonésie n° 27 de 2022 sur la protection des données personnelles et aux autres lois applicables. Contact : {email}.',
        ] },
        { h: '2. Données collectées', p: [
          'Données de réservation et de contact : nom, e-mail, téléphone, messagerie (WhatsApp, Telegram, WeChat), adresse et localisation de livraison, dates de location, scooter et options choisis.',
          'Données du conducteur : informations du permis et de la pièce d’identité vérifiées à la remise, ainsi que les photos de l’état du scooter.',
          'Données de paiement : montant, moyen et statut du paiement. Les données de carte et de portefeuille sont saisies sur la page sécurisée du prestataire de paiement ; nous ne recevons ni ne conservons jamais le numéro complet de la carte ni le CVV.',
          'Données techniques : adresse IP, type d’appareil et de navigateur, pages consultées, cookies et technologies similaires, ainsi que les données d’outils d’analyse et de publicité tels que Google Analytics et Google Ads.',
        ] },
        { h: '3. Finalités', p: [
          'Accepter, confirmer et exécuter votre réservation, livrer et récupérer le scooter, encaisser les paiements et effectuer les remboursements (exécution du contrat).',
          'Vous contacter au sujet de la location, assurer le support et traiter les réclamations, accidents, amendes et dommages (contrat et intérêt légitime).',
          'Tenir la comptabilité et les registres fiscaux et répondre aux demandes légales des autorités (obligation légale).',
          'Améliorer le site, mesurer la publicité et, avec votre accord, vous envoyer des offres (intérêt légitime et consentement). Vous pouvez refuser les messages marketing à tout moment.',
        ] },
        { h: '4. Destinataires', p: [
          'Nous ne vendons pas de données personnelles. Nous les partageons uniquement avec notre personnel et nos livreurs ; les prestataires de paiement et les banques ; les fournisseurs d’hébergement, d’e-mail, de messagerie et d’analyse travaillant pour nous ; les assureurs, la police ou d’autres autorités lorsque la loi l’exige ou que c’est nécessaire pour traiter un accident, un vol ou une amende.',
          'Certains de ces prestataires peuvent stocker des données hors d’Indonésie. Dans ce cas, nous faisons appel à des prestataires garantissant un niveau de protection adéquat, comme l’exige la loi indonésienne.',
        ] },
        { h: '5. Durée de conservation', p: [
          'Les données de réservation et de paiement sont conservées aussi longtemps que l’exige la législation fiscale et comptable indonésienne (jusqu’à 10 ans). Les photos de remise sont conservées 6 mois après la location, sauf si elles sont nécessaires à une réclamation. Les données marketing jusqu’au retrait du consentement. Les données de compte sont supprimées sur demande, sauf les enregistrements que la loi nous oblige à conserver.',
        ] },
        { h: '6. Sécurité', p: [
          'Nous protégeons les données personnelles par le chiffrement HTTPS, le contrôle des accès et des prestataires fiables. Les paiements en ligne sont traités par des prestataires certifiés PCI DSS.',
        ] },
        { h: '7. Vos droits', p: [
          'Vous avez le droit d’obtenir des informations et une copie de vos données, de les rectifier, d’en demander l’effacement ou la limitation du traitement, de retirer votre consentement, de vous opposer au traitement et de déposer une plainte auprès de l’autorité compétente. Pour exercer vos droits, écrivez à {email} ; nous répondons dans les délais prévus par la loi.',
        ] },
        { h: '8. Cookies', p: [
          'Le site utilise des cookies nécessaires (langue, devise, connexion, brouillon de réservation) ainsi que des cookies d’analyse et de publicité. Vous pouvez bloquer ou supprimer les cookies dans les paramètres de votre navigateur ; certaines fonctions du site pourraient alors ne pas fonctionner correctement.',
        ] },
        { h: '9. Modifications', p: [
          'Nous pouvons mettre à jour cette politique. La version en vigueur est toujours publiée sur cette page avec sa date d’entrée en vigueur.',
        ] },
      ],
    },
  },
};

export default fr;
