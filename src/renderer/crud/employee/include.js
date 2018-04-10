import { models } from '@/orm'
const { Villages, Districts, Regencies, Provinces, JobTitles, EducationAlmamaters } = models
const include = [
  {
    model: JobTitles
  },
  {
    model: EducationAlmamaters,
    include: [
      {
        model: Regencies
      }
    ]
  },
  { model: Regencies, as: 'birth_place_regency' },
  {
    model: Villages,
    as: 'id_address_village',
    include: [
      {
        model: Districts,
        include: [
          {
            model: Regencies,
            include: [
              {
                model: Provinces
              }
            ]
          }
        ]
      }
    ]
  },
  {
    model: Villages,
    as: 'postal_address_village',
    include: [
      {
        model: Districts,
        include: [
          {
            model: Regencies,
            include: [
              {
                model: Provinces
              }
            ]
          }
        ]
      }
    ]
  }
]
export default include
