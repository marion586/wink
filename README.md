# WINK - Frontend Application

Application frontend Nuxt 3 pour la création de compte entreprise avec flow d'onboarding multi-étapes.

## 🚀 Stack Technique

- **Framework** : Nuxt 3
- **UI Framework** : Nuxt UI
- **State Management** : Pinia
- **Styling** : Tailwind CSS
- **Type Safety** : TypeScript
- **Internationalisation** : @nuxtjs/i18n
- **Validation** : Zod

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 📁 Structure du projet

```
wink/
├── components/          # Composants Vue réutilisables
├── composables/        # Composables Nuxt (logique réutilisable)
├── layouts/            # Layouts Nuxt
├── pages/              # Routes automatiques
├── server/             # API routes (Nuxt server)
├── stores/             # Stores Pinia
├── types/              # Types TypeScript
├── utils/              # Utilitaires
└── locales/            # Fichiers de traduction i18n
```

## 🎯 Fonctionnalités

- Flow d'onboarding en 3 étapes
- Upload de logo/photo avec preview
- Validation de formulaires en temps réel
- Pré-remplissage automatique depuis l'email
- Gestion d'état avec Pinia
- Internationalisation (FR/EN)
- Design responsive (Desktop first)

## 📝 Notes

- Les routes API serveur sont actuellement mockées (TODO: intégrer PostgreSQL)
- L'upload de fichiers est simulé (TODO: intégrer un stockage réel)
- Le pré-remplissage depuis le domaine email utilise des données mockées

## 🔧 Configuration

Voir `nuxt.config.ts` pour la configuration complète.

