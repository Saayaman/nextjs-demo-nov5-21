import { people } from '../../../data/people';
 
export default function handler(req, res) {
  res.status(200).json(people)
}

