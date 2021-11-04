import { people } from '../../../data/people';

export default function getPerson({ query: { id }}, res) {
  const filtered = people.filter(p => p.id === id)

  if(filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: 'Id not found'})
  }
}
