const Documents = [
  {
    path: '/documents/document',
    name: 'documents.document.list',
    component: () => import('@pages/documents/document-list'),
    meta: {
      title: 'Documents',
      login: true
    }
  }
]
export default Documents
