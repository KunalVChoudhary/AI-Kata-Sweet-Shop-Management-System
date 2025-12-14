import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import styles from './About.module.scss';
import Card from '../Card/Card';
import { useAuth } from '../../hooks/useAuth';
import CreateSweet from '../CreateSweet/CreateSweet'

function About() {

  const {role} = useAuth()
  const [searchParams,setSearchParams] = useSearchParams();
  const [sweetsArray, setSweetsArray] = useState([]);


  useEffect(() => {
    const query = searchParams.toString();
    const baseUrl = import.meta.env.VITE_API_URL;

    const url = query
    ? `${baseUrl}/api/sweets/search?${query}`  // filters or search params present
    : `${baseUrl}/api/sweets`;  

    fetch(url,{
      method:'GET',credentials:'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSweetsArray(data)
      })
    }, [searchParams]);


    return (
      <>
        <div className={`${styles['sweetListContainer']} p-3` }>
          <div className={`${styles['sweetCardContainer']} p-3`}>
            {sweetsArray.map((element,index)=>{
              return <Card key={index} setSweetsArray={setSweetsArray} cardDetail={element}/>
            })}
          </div>
        </div>
        {role=='ADMIN'?
        <div className={`${styles["createSweetContainer"]}`}>
            <CreateSweet setSweetsArray={setSweetsArray} />
        </div>
        :''
        }
      </>
    )
  }

export default About