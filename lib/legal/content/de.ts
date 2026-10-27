import type { LegalLocaleContent } from '../types';

const de: LegalLocaleContent = {
  ui: {
    updated: 'Gültig ab',
    company: 'Unternehmensangaben',
    related: 'Siehe auch',
    consent: 'Mit der Zahlung akzeptierst du die {terms}, die {refund} und die {privacy}.',
    consentNames: { terms: 'Mietbedingungen', refund: 'Stornierungs- und Erstattungsrichtlinie', privacy: 'Datenschutzerklärung' },
    footerLegal: 'Rechtliches',
    companyLabels: { name: 'Firmenname', address: 'Eingetragene Adresse', email: 'E-Mail', phone: 'Telefon / WhatsApp' },
  },
  docs: {
    terms: {
      title: 'Mietbedingungen',
      short: 'Mietbedingungen',
      description: 'Mietbedingungen von TROPICAL BIKES (PT ART TREADING GLOBAL) auf Bali: Buchung, Zahlung, Dokumente, Nutzung des Rollers, Schäden, Bußgelder und Rückgabe.',
      sections: [
        { h: '1. Wer wir sind', p: [
          'Die Website {site} und die Marke TROPICAL BIKES werden von {company} betrieben, einer in der Republik Indonesien eingetragenen Gesellschaft mit beschränkter Haftung mit ausländischer Beteiligung (PT PMA), Adresse: {address}.',
          'Diese Bedingungen gelten für jede Buchung über die Website, per WhatsApp, Telegram oder persönlich. Mit einer Buchung oder Zahlung bestätigst du, dass du diese Bedingungen, die Stornierungs- und Erstattungsrichtlinie und die Datenschutzerklärung gelesen hast und akzeptierst.',
        ] },
        { h: '2. Buchung und Bestätigung', p: [
          'Eine Buchung gilt als bestätigt, sobald du eine Bestätigung per E-Mail, WhatsApp oder im Kundenkonto erhältst. Wir können eine Buchung ablehnen oder stornieren, wenn der Roller nicht verfügbar ist, die Angaben unvollständig oder falsch sind oder die Zahlung nicht eingeht; in diesem Fall wird der gezahlte Betrag vollständig erstattet.',
          'Die Mietdauer wird in 24-Stunden-Tagen ab der vereinbarten Lieferzeit berechnet. Das gebuchte Modell ist garantiert; ist es aus Gründen außerhalb unserer Kontrolle nicht verfügbar, bieten wir einen Roller derselben oder einer höheren Klasse ohne Aufpreis oder eine vollständige Erstattung an.',
        ] },
        { h: '3. Preise und Zahlung', p: [
          'Die Preise werden in indonesischen Rupiah (IDR) festgelegt. Beträge in anderen Währungen dienen der Orientierung; belastet wird in IDR oder zu dem auf der Zahlungsseite angezeigten Kurs. Deine Bank kann eigene Umrechnungsgebühren erheben.',
          'Im Preis enthalten sind Roller, Helm, Basis-Pannenhilfe und Lieferung innerhalb der kostenlosen Zone. Lieferung in andere Gebiete, zusätzliche Helme und weitere Extras werden vor der Zahlung separat ausgewiesen.',
          'Bezahlt werden kann online per Bankkarte, QRIS, E-Wallet oder anderen auf der Zahlungsseite angebotenen Methoden, per Kryptowährung oder, sofern angeboten, bar bei Lieferung. Karten- und QR-Zahlungen werden von lizenzierten Zahlungsdienstleistern abgewickelt; wir erhalten oder speichern niemals deine vollständigen Kartendaten.',
          'Bei der Übergabe nehmen wir eine rückzahlbare Kaution von 100 $ oder 1,5 Mio. IDR. Sie wird bei Rückgabe des Rollers vollständig erstattet, abzüglich der nach Abschnitt 7 geschuldeten Beträge (Schäden, verlorene Schlüssel oder Papiere, unbezahlte Bußgelder). Deinen Reisepass behalten wir nicht ein.',
        ] },
        { h: '4. Anforderungen an den Fahrer', p: [
          'Der Fahrer muss mindestens 18 Jahre alt sein und einen gültigen Führerschein für Motorräder (Klasse A) zusammen mit einem Internationalen Führerschein oder einen indonesischen SIM C besitzen. Du bist für die Einhaltung der indonesischen Verkehrsregeln verantwortlich.',
          'Bei der Übergabe prüfen wir Führerschein und Ausweisdokument. Nur der Buchende und von uns freigegebene Fahrer dürfen den Roller fahren.',
        ] },
        { h: '5. Übergabe und Rückgabe', p: [
          'Der Roller wird sauber, gewartet und betankt geliefert. Bei der Übergabe fotografieren wir gemeinsam mit dir seinen Zustand; melde vorhandene Schäden bitte in diesem Moment.',
          'Gib den Roller zur vereinbarten Zeit und am vereinbarten Ort im gleichen Zustand zurück, abgesehen von normaler Abnutzung. Verbrauchter Kraftstoff wird nicht berechnet; bei Rückgabe mit leerem Tank kann das Betanken zum Selbstkostenpreis berechnet werden.',
          'Eine Verspätung von bis zu 1 Stunde ist kostenlos. Danach wird jeder angefangene Tag zum Tagespreis berechnet, sofern keine Verlängerung vereinbart wurde. Wird der Roller nicht zurückgegeben und bist du 24 Stunden nach Mietende nicht erreichbar, können wir die Polizei informieren.',
        ] },
        { h: '6. Nutzung des Rollers', p: [
          'Fahre vorsichtig, trage immer einen Helm und nimm höchstens einen Mitfahrer mit. Der Roller darf nicht unter Alkohol- oder Drogeneinfluss, für Rennen, im Gelände, für gewerbliche Transporte genutzt oder ohne unsere schriftliche Zustimmung von der Insel Bali gebracht werden (auch nicht nach Nusa Penida, Lombok oder Java).',
          'Schließe den Roller immer ab und behalte den Schlüssel bei dir. Repariere oder verändere den Roller nicht selbst; kontaktiere uns, und wir organisieren Hilfe oder Ersatz.',
        ] },
        { h: '7. Schäden, Diebstahl und Bußgelder', p: [
          'Während der Miete haftest du für Schäden am Roller, den Verlust von Schlüssel oder Papieren sowie für Diebstahl durch Fahrlässigkeit (z. B. nicht abgeschlossener Roller oder steckender Schlüssel). Reparaturen werden zu den Preisen einer offiziellen Vertragswerkstatt berechnet, verlorene Schlüssel und Papiere zu den tatsächlichen Ersatzkosten.',
          'Bußgelder während der Mietzeit zahlt der Fahrer. Bei einem Unfall oder Diebstahl kontaktiere sofort uns und, falls erforderlich, die Polizei.',
        ] },
        { h: '8. Unsere Haftung', p: [
          'Wir haften für die Bereitstellung eines verkehrssicheren Rollers. Fällt er wegen eines technischen Defekts aus, reparieren oder ersetzen wir ihn kostenlos, in unserem Servicegebiet meist innerhalb weniger Stunden, oder erstatten die ungenutzten Tage.',
          'Soweit gesetzlich zulässig, haften wir nicht für indirekte Schäden, verpasste Flüge oder Aktivitäten sowie für Verletzungen und Schäden, die durch das eigene Verhalten des Fahrers entstehen. Rollerfahren birgt Risiken; wir empfehlen eine Reiseversicherung, die das Motorradfahren abdeckt.',
        ] },
        { h: '9. Stornierung und Erstattung', p: [
          'Stornierungen, Änderungen und Erstattungen richten sich nach der Stornierungs- und Erstattungsrichtlinie, die Bestandteil dieser Bedingungen ist.',
        ] },
        { h: '10. Anwendbares Recht und Beschwerden', p: [
          'Es gilt das Recht der Republik Indonesien. Beschwerden richte bitte an {email} oder per WhatsApp an {phone}; wir antworten innerhalb von 2 Werktagen und bemühen uns um eine gütliche Lösung. Nicht gütlich beizulegende Streitigkeiten entscheidet das zuständige Gericht in Denpasar, Bali.',
          'Wir können diese Bedingungen aktualisieren. Für eine Buchung gilt die am Buchungstag auf der Website veröffentlichte Fassung.',
        ] },
      ],
    },
    refund: {
      title: 'Stornierungs- und Erstattungsrichtlinie',
      short: 'Stornierung & Erstattung',
      description: 'Kostenlose Stornierung bis 24 Stunden vor Lieferung, Erstattungsfristen und Regeln für die vorzeitige Rückgabe bei TROPICAL BIKES auf Bali.',
      sections: [
        { h: '1. Kostenlose Stornierung', p: [
          'Du kannst jede Buchung bis 24 Stunden vor der geplanten Lieferzeit kostenlos stornieren und erhältst den gezahlten Betrag vollständig zurück.',
          'Storniere über dein Kundenkonto oder schreibe uns per WhatsApp {phone} oder E-Mail {email}. Maßgeblich ist der Zeitpunkt, zu dem deine Nachricht eingeht.',
        ] },
        { h: '2. Späte Stornierung und Nichterscheinen', p: [
          'Bei einer Stornierung weniger als 24 Stunden vor Lieferung wird der Preis des ersten Miettages einbehalten, der Rest wird erstattet.',
          'Bist du nicht am vereinbarten Ort und innerhalb von 2 Stunden nach der geplanten Lieferzeit nicht erreichbar, gilt die Buchung als Nichterscheinen: Der Preis des ersten Tages und eine bezahlte Liefergebühr werden einbehalten, der Rest wird erstattet.',
        ] },
        { h: '3. Änderungen der Buchung', p: [
          'Daten, Adresse oder Roller kannst du je nach Verfügbarkeit bis 24 Stunden vor Lieferung kostenlos ändern. Ist die neue Buchung teurer, zahlst du die Differenz; ist sie günstiger, wird die Differenz erstattet.',
          'Verlängerungen während der Miete werden nach Möglichkeit zum Tarif für die gesamte Mietdauer berechnet.',
        ] },
        { h: '4. Vorzeitige Rückgabe', p: [
          'Bei vorzeitiger Rückgabe werden ungenutzte Tage nicht erstattet, außer die Miete endet wegen eines technischen Defekts, den wir nicht beheben oder durch Ersatz lösen konnten.',
          'Bei Monatsmieten, die auf deinen Wunsch vorzeitig enden, können wir nach eigenem Ermessen den Preis zum Tarif des tatsächlich genutzten Zeitraums neu berechnen und die Differenz erstatten.',
        ] },
        { h: '5. Stornierung durch uns', p: [
          'Können wir den gebuchten Roller oder einen Roller derselben oder höheren Klasse nicht bereitstellen oder stornieren wir aus einem Grund, den du nicht zu vertreten hast, erhältst du alle gezahlten Beträge vollständig zurück.',
        ] },
        { h: '6. Wie und wann erstattet wird', p: [
          'Erstattungen erfolgen auf das ursprüngliche Zahlungsmittel: Bankkarte, E-Wallet oder Bankkonto. Karten- und E-Wallet-Zahlungen können nicht bar erstattet werden. Krypto-Zahlungen werden in derselben Währung an eine von dir angegebene Wallet erstattet, bezogen auf den IDR-Betrag der Buchung.',
          'Wir veranlassen die Erstattung innerhalb von 3 Werktagen nach der Stornierung. Je nach Bank oder Zahlungsdienst trifft das Geld meist innerhalb von 5–14 Werktagen ein. Erstattet wird in IDR; für Kursdifferenzen oder Gebühren deiner Bank sind wir nicht verantwortlich.',
        ] },
        { h: '7. Streitfälle und Chargebacks', p: [
          'Wenn etwas schiefgelaufen ist, kontaktiere uns bitte, bevor du einen Streitfall bei deiner Bank eröffnest — meist lösen wir es noch am selben Tag. Ein Chargeback für eine gemäß diesen Regeln erbrachte Leistung können wir mit Übergabefotos und Buchungsdaten anfechten.',
        ] },
      ],
    },
    privacy: {
      title: 'Datenschutzerklärung',
      short: 'Datenschutz',
      description: 'Wie TROPICAL BIKES (PT ART TREADING GLOBAL) personenbezogene Daten von Kunden von bali.bike gemäß dem indonesischen Gesetz Nr. 27/2022 erhebt, nutzt und schützt.',
      sections: [
        { h: '1. Verantwortlicher', p: [
          'Verantwortlich für deine personenbezogenen Daten ist {company}, {address} („wir“). Diese Erklärung beschreibt, wie wir personenbezogene Daten gemäß dem Gesetz der Republik Indonesien Nr. 27 von 2022 über den Schutz personenbezogener Daten und anderem anwendbaren Recht verarbeiten. Kontakt: {email}.',
        ] },
        { h: '2. Welche Daten wir erheben', p: [
          'Buchungs- und Kontaktdaten: Name, E-Mail, Telefonnummer, Messenger (WhatsApp, Telegram, WeChat), Lieferadresse und Standort, Mietdaten, gewählter Roller und Extras.',
          'Fahrerdaten: Angaben aus Führerschein und Ausweis, die bei der Übergabe geprüft werden, sowie Fotos vom Zustand des Rollers.',
          'Zahlungsdaten: Betrag, Methode und Status der Zahlung. Karten- und E-Wallet-Daten werden auf der sicheren Seite des Zahlungsdienstleisters eingegeben; wir erhalten oder speichern niemals die vollständige Kartennummer oder den CVV.',
          'Technische Daten: IP-Adresse, Geräte- und Browsertyp, besuchte Seiten, Cookies und ähnliche Technologien sowie Daten aus Analyse- und Werbetools wie Google Analytics und Google Ads.',
        ] },
        { h: '3. Wofür wir die Daten nutzen', p: [
          'Um deine Buchung anzunehmen, zu bestätigen und durchzuführen, den Roller zu liefern und abzuholen, Zahlungen anzunehmen und Erstattungen vorzunehmen (Vertragserfüllung).',
          'Um dich zu deiner Miete zu kontaktieren, Support zu leisten und Beschwerden, Unfälle, Bußgelder und Schadensfälle zu bearbeiten (Vertrag und berechtigtes Interesse).',
          'Für Buchhaltung und Steuern sowie zur Beantwortung rechtmäßiger Anfragen von Behörden (rechtliche Verpflichtung).',
          'Um die Website zu verbessern, Werbung zu messen und dir mit deiner Einwilligung Angebote zu senden (berechtigtes Interesse und Einwilligung). Werbenachrichten kannst du jederzeit ablehnen.',
        ] },
        { h: '4. Empfänger der Daten', p: [
          'Wir verkaufen keine personenbezogenen Daten. Wir geben sie nur weiter an unsere Mitarbeiter und Fahrer, die den Roller liefern; an Zahlungsdienstleister und Banken; an Hosting-, E-Mail-, Messaging- und Analyseanbieter, die für uns arbeiten; an Versicherer, Polizei oder andere Behörden, wenn das Gesetz es verlangt oder es zur Abwicklung eines Unfalls, Diebstahls oder Bußgelds nötig ist.',
          'Einige dieser Anbieter können Daten außerhalb Indonesiens speichern. In diesem Fall nutzen wir Anbieter, die ein angemessenes Schutzniveau gemäß indonesischem Recht gewährleisten.',
        ] },
        { h: '5. Speicherdauer', p: [
          'Buchungs- und Zahlungsdaten werden so lange aufbewahrt, wie es das indonesische Steuer- und Handelsrecht verlangt (bis zu 10 Jahre). Übergabefotos werden 6 Monate nach der Miete gelöscht, sofern sie nicht für einen Schadensfall benötigt werden. Marketingdaten bis zum Widerruf der Einwilligung. Kontodaten werden auf Anfrage gelöscht, außer Aufzeichnungen, die wir gesetzlich aufbewahren müssen.',
        ] },
        { h: '6. Sicherheit', p: [
          'Wir schützen personenbezogene Daten mit HTTPS-Verschlüsselung, Zugriffskontrollen und seriösen Dienstleistern. Online-Zahlungen werden von PCI-DSS-zertifizierten Zahlungsdienstleistern abgewickelt.',
        ] },
        { h: '7. Deine Rechte', p: [
          'Du hast das Recht auf Auskunft und eine Kopie deiner Daten, auf Berichtigung, Löschung oder Einschränkung der Verarbeitung, auf Widerruf der Einwilligung, auf Widerspruch gegen die Verarbeitung sowie auf Beschwerde bei der zuständigen Behörde. Schreibe dazu an {email}; wir antworten innerhalb der gesetzlichen Fristen.',
        ] },
        { h: '8. Cookies', p: [
          'Die Website verwendet notwendige Cookies (Sprache, Währung, Login, Buchungsentwurf) sowie Analyse- und Werbe-Cookies. Du kannst Cookies in deinen Browsereinstellungen blockieren oder löschen; einige Funktionen der Website funktionieren dann möglicherweise nicht richtig.',
        ] },
        { h: '9. Änderungen', p: [
          'Wir können diese Erklärung aktualisieren. Die aktuelle Fassung ist stets mit ihrem Gültigkeitsdatum auf dieser Seite veröffentlicht.',
        ] },
      ],
    },
  },
};

export default de;
