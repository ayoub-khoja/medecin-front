// navigationConfig.ts
export const ROUTES = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  FORM_ONE: '/formone',
  FORM_TWO: '/formtwo',
  FORM_THREE: '/formthree',
  FORM_FOUR: '/formfour',
  ADD_PATIENT: '/add-patient',
  PATIENT_HISTORY: '/patient-management',
} as const;

export const NAVIGATION_ITEMS = [
  {
    path: ROUTES.DASHBOARD,
    label: 'Tableau de bord',
    icon: 'fas fa-home',
  },
  {
    path: ROUTES.ADD_PATIENT,
    label: 'Nouveau patient',
    icon: 'fas fa-user-plus',
  },
  {
    path: ROUTES.PATIENT_HISTORY,
    label: 'Historique',
    icon: 'fas fa-history',
  },
] as const; 