const Documents = [
  {
    path: '/documents/document',
    name: 'documents.list',
    component: () => import('@pages/documents/list'),
    meta: {
      title: 'Documents',
      login: true
    }
  }
]
export default Documents
