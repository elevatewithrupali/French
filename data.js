// ============================================================
// FRENCH C1 MISSION — DATA
// ============================================================

const PHASES = {
  1: { days: [1,4],   label: 'Foundations',        color: '#c9a84c' },
  2: { days: [5,14],  label: 'Skill Immersion',     color: '#4c9dc9' },
  3: { days: [15,24], label: 'Skill + Exam',         color: '#9d4cc9' },
  4: { days: [25,40], label: 'Exam + Consolidation', color: '#c94c4c' },
};

function getPhase(day) {
  if (day <= 4)  return 1;
  if (day <= 14) return 2;
  if (day <= 24) return 3;
  return 4;
}

function getPhaseDayClass(day) {
  return `ph${getPhase(day)}-day`;
}

// ---- SCHEDULES ----
const SCHEDULES = {
  phase1: [
    { time:'08:00–10:00', name:'Phonics & Tense Deep-Dive', desc:'Lawless French + conjugation tables. Passé composé, imparfait, futur.', tag:'grammar', type:'grammar' },
    { time:'10:00–11:00', name:'Anki Vocabulary', desc:'100 new cards from French Core 2000. Audio on, no skipping.', tag:'vocab', type:'vocab' },
    { time:'11:00–12:30', name:'Irregular Verbs Drilling', desc:'Top 30 irregular verbs, all tenses, write each 3×.', tag:'grammar', type:'grammar' },
    { time:'12:30–13:00', name:'Break', desc:'', tag:'', type:'break' },
    { time:'13:00–14:00', name:'Français Authentique', desc:'YouTube playlist — Episodes 1–6. Subtitles on.', tag:'listen', type:'listening' },
    { time:'14:00–15:30', name:'Subjunctive & Conditionals', desc:'Formation, triggers, si-clauses. Reverso conjugator for practice.', tag:'grammar', type:'grammar' },
    { time:'15:30–16:00', name:'Anki Review', desc:'Review all cards from morning session.', tag:'vocab', type:'vocab' },
    { time:'16:00–17:00', name:'Write 10 Sentences', desc:'One sentence per tense learned. Use WordReference for lookups.', tag:'write', type:'writing' },
  ],
  phase2: [
    { time:'08:00–09:00', name:'Reading Block 1', desc:'TV5Monde article — scan, annotate, summarize in 3 French sentences.', tag:'read', type:'reading' },
    { time:'09:00–10:00', name:'Writing Block 1', desc:'150-word paragraph on a topic. Post on iTalki Notebook.', tag:'write', type:'writing' },
    { time:'10:00–11:00', name:'Listening Block 1', desc:'Inner French Podcast — episode, shadow 5 min of audio.', tag:'listen', type:'listening' },
    { time:'11:00–12:00', name:'Speaking Block 1', desc:'Pimsleur / iTalki partner / recording on TCF topic.', tag:'speak', type:'speaking' },
    { time:'12:00–13:00', name:'Break + Passive Immersion', desc:'French TV/radio in background. Le Journal RFI.', tag:'', type:'break' },
    { time:'13:00–14:00', name:'Reading Block 2', desc:'Second article, harder level. Build vocab list from text.', tag:'read', type:'reading' },
    { time:'14:00–15:00', name:'Writing Block 2', desc:'Opinion paragraph — thesis + 2 arguments. Check with LanguageTool.', tag:'write', type:'writing' },
    { time:'15:00–16:00', name:'Listening Block 2', desc:'News in Slow French or Easy French YouTube. Take notes.', tag:'listen', type:'listening' },
    { time:'16:00–17:00', name:'Speaking Block 2', desc:'Record 3-min monologue. Compare to native model. Anki review.', tag:'speak', type:'speaking' },
  ],
  phase3: [
    { time:'08:00–09:00', name:'Reading — Authentic Texts', desc:'Le Monde editorial or France 24. B2 complexity. 20min vocab follow-up.', tag:'read', type:'reading' },
    { time:'09:00–10:00', name:'Writing — TCF Format', desc:'Timed 220-word essay: lettre formelle or article de blog.', tag:'write', type:'writing' },
    { time:'10:00–11:00', name:'Listening — Authentic French', desc:'France Culture 15min clip + shadowing + note-taking exercise.', tag:'listen', type:'listening' },
    { time:'11:00–12:00', name:'Speaking — Recorded Monologue', desc:'3-min response to TCF topic. Self-evaluate fluency, accuracy, range.', tag:'speak', type:'speaking' },
    { time:'12:00–13:00', name:'Break', desc:'', tag:'', type:'break' },
    { time:'13:00–14:00', name:'Exam — Timed Reading Set', desc:'20 comprehension questions, 60 minutes. TCF/TEF format strictly.', tag:'exam', type:'exam' },
    { time:'14:00–15:00', name:'Exam — Timed Listening Set', desc:'Official YouTube TCF audio practice with answer sheet.', tag:'exam', type:'exam' },
    { time:'15:00–16:00', name:'Exam — Timed Writing', desc:'One full writing task under exam conditions. No LanguageTool.', tag:'exam', type:'exam' },
    { time:'16:00–17:00', name:'Exam Review & Error Log', desc:'Categorize all errors: grammar / vocab / strategy. Fix each one.', tag:'exam', type:'exam' },
  ],
  phase4: [
    { time:'08:00–10:00', name:'Full Mock Exam — Part 1', desc:'Reading + Listening under strict timed exam conditions.', tag:'exam', type:'exam' },
    { time:'10:00–12:00', name:'Full Mock Exam — Part 2', desc:'Writing + Speaking (recorded) under exam conditions.', tag:'exam', type:'exam' },
    { time:'12:00–13:00', name:'Break', desc:'', tag:'', type:'break' },
    { time:'13:00–14:00', name:'Target Weakness', desc:'Drill the skill where you lost most points in this morning\'s exam.', tag:'exam', type:'exam' },
    { time:'14:00–15:00', name:'Vocabulary Consolidation', desc:'Anki review + C1 word list. 20 new, review all weak cards.', tag:'vocab', type:'vocab' },
    { time:'15:00–16:00', name:'Listening or Reading (Alternate)', desc:'Authentic French media at C1 level. Le Monde, France Culture.', tag:'listen', type:'listening' },
    { time:'16:00–17:00', name:'Speaking — iTalki or Recording', desc:'Final speaking practice. Focus on naturalness and correction.', tag:'speak', type:'speaking' },
  ],
};

// For today's dashboard schedule - by phase
function getTodaySchedule(day) {
  const phase = getPhase(day);
  return SCHEDULES[`phase${phase}`];
}

// ---- WRITING PROMPTS ----
const WRITING_PROMPTS = [
  { type:'Lettre formelle', prompt:'Vous avez séjourné dans un hôtel à Montréal et le service était décevant. Écrivez une lettre de réclamation au directeur (180–220 mots).' },
  { type:'Article de blog', prompt:'Selon vous, les réseaux sociaux ont-ils un impact positif ou négatif sur la société ? Donnez votre opinion avec des arguments (200 mots).' },
  { type:'Courriel formel', prompt:'Vous postulez pour un poste dans une entreprise francophone. Rédigez un courriel de motivation en présentant vos compétences.' },
  { type:'Opinion', prompt:'«L\'intelligence artificielle représente plus une menace qu\'une opportunité pour l\'emploi.» Êtes-vous d\'accord ? Justifiez votre point de vue.' },
  { type:'Description', prompt:'Décrivez votre ville idéale. Que devrait-elle avoir pour être agréable à vivre ? Quels problèmes devrait-elle éviter ?' },
  { type:'Lettre formelle', prompt:'Vous êtes locataire et votre propriétaire refuse de faire des réparations urgentes. Écrivez-lui une lettre officielle (180 mots).' },
  { type:'Compte-rendu', prompt:'Résumez les avantages et inconvénients du télétravail selon des études récentes que vous auriez consultées (200 mots).' },
  { type:'Article de blog', prompt:'Les voyages forment-ils la jeunesse ? Racontez une expérience et dégagez les leçons apprises.' },
  { type:'Opinion', prompt:'Pensez-vous que l\'apprentissage d\'une deuxième langue devrait être obligatoire dans tous les systèmes éducatifs ?' },
  { type:'Synthèse', prompt:'À partir de vos lectures récentes, rédigez une synthèse sur les défis environnementaux auxquels font face les grandes villes (220 mots).' },
  { type:'Lettre formelle', prompt:'Rédigez une lettre à votre municipalité pour proposer l\'amélioration des transports en commun dans votre quartier.' },
  { type:'Article de blog', prompt:'«Mieux vaut prévenir que guérir» — Appliquez ce proverbe au système de santé moderne dans un texte argumentatif.' },
];

// ---- SPEAKING TOPICS ----
const SPEAKING_TOPICS = [
  { level:'B1', topic:'Présentez-vous : votre parcours, votre famille, vos projets professionnels.' },
  { level:'B1', topic:'Décrivez votre routine quotidienne et ce que vous feriez si vous aviez plus de temps libre.' },
  { level:'B2', topic:'Pensez-vous que la technologie nous rend plus isolés ou plus connectés ? Donnez votre avis.' },
  { level:'B2', topic:'Quels sont les avantages et les inconvénients de vivre dans une grande ville par rapport à la campagne ?' },
  { level:'B2', topic:'Parlez des changements climatiques : quelles mesures les gouvernements devraient-ils prendre ?' },
  { level:'B2', topic:'L\'immigration est un sujet complexe. Quels sont selon vous ses effets sur la société d\'accueil ?' },
  { level:'C1', topic:'Analysez les causes et les conséquences de l\'inégalité économique dans les pays développés.' },
  { level:'C1', topic:'Comment la numérisation a-t-elle transformé le marché du travail ? Quelles compétences seront essentielles dans 10 ans ?' },
  { level:'C1', topic:'Débattez : «La liberté d\'expression a des limites qu\'il faut définir légalement.» Pour ou contre ?' },
  { level:'C1', topic:'Analysez le rôle des médias dans la formation de l\'opinion publique dans une démocratie.' },
  { level:'C1', topic:'La mondialisation : bénédiction économique ou menace pour les cultures locales ? Défendez une position.' },
  { level:'C1', topic:'Quelle est votre vision de l\'enseignement idéal ? Comment reformeriez-vous le système éducatif ?' },
];

// ---- TOPIC CLUSTERS ----
const TOPIC_CLUSTERS = [
  { name:'Environnement', words:['le réchauffement climatique','les énergies renouvelables','la biodiversité','le développement durable','les émissions de carbone','la déforestation','la pollution','l\'écosystème','la transition énergétique','le tri sélectif'] },
  { name:'Travail & Économie', words:['le marché du travail','le chômage','les compétences','la reconversion','le télétravail','le salaire minimum','la productivité','l\'entrepreneuriat','la mondialisation','la startup'] },
  { name:'Santé', words:['le système de santé','la prévention','le médecin généraliste','la chirurgie','le remboursement','l\'assurance maladie','le bien-être','la santé mentale','les maladies chroniques','la vaccination'] },
  { name:'Technologie', words:['l\'intelligence artificielle','les réseaux sociaux','la cybersécurité','le numérique','les données personnelles','l\'innovation','la robotisation','le cloud','les algorithmes','la vie privée'] },
  { name:'Éducation', words:['le cursus scolaire','le diplôme','l\'apprentissage','la formation continue','les inégalités scolaires','le tutorat','les bourses','l\'enseignement supérieur','l\'alphabétisation','la pédagogie'] },
  { name:'Société & Culture', words:['la diversité culturelle','l\'intégration','les droits de l\'homme','la laïcité','la citoyenneté','les inégalités sociales','la mobilité sociale','le patrimoine','les valeurs','la solidarité'] },
  { name:'Immigration & Identité', words:['l\'immigration','le statut de réfugié','la résidence permanente','la naturalisation','l\'identité culturelle','le multiculturalisme','le pays d\'accueil','l\'intégration','le visa','la diaspora'] },
  { name:'Politique', words:['le gouvernement','les élections','la démocratie','la loi','le parlement','le droit de vote','la politique publique','le budget','les impôts','la Constitution'] },
  { name:'Voyages & Géographie', words:['le transport','les frontières','le tourisme durable','le patrimoine mondial','la destination','le visa de travail','la carte de séjour','la province','la région','la métropole'] },
];

// ---- GRAMMAR CHECKLIST ----
const GRAMMAR_ITEMS = {
  'Phase 1 — Days 1–4': [
    'Présent indicatif (-er, -ir, -re + irréguliers)',
    'Passé composé (avoir + être, accords)',
    'Imparfait (formation + usage)',
    'Plus-que-parfait',
    'Futur simple (régulier + irrégulier)',
    'Futur proche (aller + infinitif)',
    'Conditionnel présent',
    'Conditionnel passé',
    'Si-clauses (Types 1, 2, 3)',
    'Subjonctif présent (formation)',
    'Subjonctif passé',
    'Négation complète (jamais, rien, que…)',
    'Questions (inversion, est-ce que, in situ)',
  ],
  'Phase 2 — Days 5–14': [
    'Pronoms relatifs (qui, que, dont, où, lequel)',
    'Pronoms COD et COI',
    'Pronoms y et en',
    'Discours indirect (concordance des temps)',
    'Voix passive (être + participe passé)',
    'Participe présent et gérondif',
    'Articles (défini, indéfini, partitif)',
    'Comparatif et superlatif',
    'Adverbes de manière, fréquence, intensité',
    'Ordre des mots avec double pronom',
  ],
  'Phase 3 — Days 15–24': [
    'Subjonctif: tous les cas et triggers',
    'Infinitif passé (après avoir / être + pp)',
    'Connecteurs logiques (opposition, cause, conséquence)',
    'Nominalisation (verbe → nom)',
    'Expression du temps (depuis, pendant, il y a, dans)',
    'Hypothèse et nuance (peut-être, il se peut que…)',
    'Registres: formel vs informel',
    'Structures emphatiques (c\'est… que/qui)',
  ],
  'Phase 4 — Days 25–40': [
    'Révision ciblée des erreurs récurrentes',
    'Vocabulaire de la nuance et de l\'atténuation',
    'Cohérence textuelle et connecteurs C1',
    'Inversion dans les phrases complexes',
    'Subjonctif imparfait (reconnaissance)',
    'Maîtrise des registres dans l\'écrit et l\'oral',
  ],
};

// ---- MINI TEST ----
const MINI_TESTS = [
  {
    passage: 'Le télétravail s\'est considérablement développé depuis la pandémie de 2020. Si certaines entreprises y voient un moyen d\'améliorer la productivité et de réduire les coûts immobiliers, d\'autres craignent une perte de cohésion d\'équipe et de créativité collective. Une étude publiée en 2023 révèle que 67% des employés préfèrent un modèle hybride, combinant présence au bureau et travail à domicile.',
    question: 'Selon le texte, quelle est l\'attitude des employés face au télétravail ?',
    options: [
      'La majorité préfère travailler entièrement à domicile.',
      'La plupart souhaitent un système mixte bureau/domicile.',
      'Ils sont contre le télétravail à cause de la solitude.',
      'Les employés veulent retourner entièrement au bureau.',
    ],
    answer: 1,
    explanation: 'Le texte précise que 67% des employés préfèrent un modèle «hybride» — ce qui signifie une combinaison des deux modes de travail.'
  },
  {
    passage: 'La biodiversité mondiale est menacée par plusieurs facteurs conjugués: la déforestation, la pollution des eaux, les changements climatiques et la surexploitation des ressources naturelles. Selon l\'IPBES, un million d\'espèces animales et végétales risquent de disparaître dans les prochaines décennies si des mesures urgentes ne sont pas prises. Les scientifiques appellent à une transition profonde dans nos modèles de production et de consommation.',
    question: 'Quelle est la principale conclusion des scientifiques mentionnés dans ce texte ?',
    options: [
      'Il faut immédiatement interdire toute activité humaine en forêt.',
      'La pollution de l\'eau est le seul problème à résoudre.',
      'Un changement radical de nos habitudes économiques est nécessaire.',
      'Les espèces en danger peuvent se rétablir naturellement.',
    ],
    answer: 2,
    explanation: 'Les scientifiques réclament «une transition profonde dans nos modèles de production et de consommation» — soit un changement structurel majeur.'
  },
  {
    passage: 'L\'apprentissage d\'une langue étrangère présente de nombreux avantages cognitifs. Des recherches en neurosciences suggèrent que le bilinguisme retarderait l\'apparition des symptômes de la maladie d\'Alzheimer de quatre à cinq ans en moyenne. Par ailleurs, les personnes bilingues démontrent généralement de meilleures capacités d\'attention sélective et de résolution de problèmes complexes, comparées aux personnes monolingues.',
    question: 'Selon les recherches citées, quel est l\'un des bénéfices du bilinguisme ?',
    options: [
      'Il permet de guérir la maladie d\'Alzheimer.',
      'Il améliore la mémoire à court terme uniquement.',
      'Il peut repousser les symptômes d\'une maladie neurodégénérative.',
      'Il rend les personnes bilingues plus intelligentes que les monolingues.',
    ],
    answer: 2,
    explanation: 'Le texte dit que le bilinguisme «retarderait l\'apparition des symptômes de la maladie d\'Alzheimer» — c\'est-à-dire repousser, pas guérir.'
  },
  {
    passage: 'Les villes intelligentes, ou «smart cities», intègrent les technologies numériques pour optimiser la gestion des services urbains: transports, énergie, déchets, eau. Bien que prometteuses, ces initiatives soulèvent des questions cruciales sur la protection des données personnelles et la surveillance des citoyens. Certains experts estiment que sans cadre juridique solide, les smart cities pourraient se transformer en outils de contrôle social.',
    question: 'Quelle préoccupation principale les experts soulèvent-ils concernant les smart cities ?',
    options: [
      'Le coût trop élevé des infrastructures numériques.',
      'Le risque d\'utilisation des données à des fins de contrôle.',
      'L\'inefficacité des technologies dans la gestion des déchets.',
      'Le manque d\'intérêt des citoyens pour ces innovations.',
    ],
    answer: 1,
    explanation: 'Les experts craignent que sans cadre juridique, les smart cities deviennent des «outils de contrôle social» — soit un usage des données à des fins de surveillance.'
  },
];
