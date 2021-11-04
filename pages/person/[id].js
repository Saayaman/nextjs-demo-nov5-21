import { useRouter } from 'next/router'
import useSWR from 'swr';

const Person = ({ data }) => {
  // const { query } = useRouter();
  // console.log("query", query);
  // const { data, error } = useSWR(`/api/people/${query.id}`,
  //   (url) => fetch(url).then(res => res.json()))
  
  if(!data) {
    return <div>Loading...</div>
  }

  return (
    <table>
      <tr>
        <th>Eye Color</th>
        <th>Gender</th>
        <th>Hair Color</th>
        <th>Height</th>
        <th>Name</th>
      </tr>
      <tr>
        <td>{data.eye_color}</td>
        <td>{data.gender}</td>
        <td>{data.hair_color}</td>
        <td>{data.name}</td>
      </tr>
    </table>
  )
}

export async function getStaticPaths() {
    const res = await fetch('https://nextjs-demo-nov5-21.vercel.app/api/people')
    console.log("res", res);
    const people = await res.json()
  
    const paths = people.map(person => ({
      params: { id: person.id },
    }))
  
    console.log('paths', paths);
    return {
      paths, fallback: false //must be false for getStaticPaths
    };
}

export async function getStaticProps({ params }) {

  console.log("params", params);

  // cannot use hooks inside here  
  const res = await fetch(`https://nextjs-demo-nov5-21.vercel.app/api/people/${params.id}`)
  const data = await res.json()
  // By returning { props: data }, the Onw component
  // will receive `data` as a prop at build time
  return {
    props: {
      data,
    },
  }
}

export default Person;