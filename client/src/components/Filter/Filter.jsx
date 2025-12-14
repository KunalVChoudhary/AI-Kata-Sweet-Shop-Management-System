import styles from './Filter.module.scss'
import ReactSlider from 'react-slider'
import { useSearchParams } from 'react-router';
import { useState } from 'react';

function Filter(){

  const [category, setCategory] = useState('')
  const [minPrice,setMinPrice]=useState(0);
  const [maxPrice,setMaxPrice]=useState(10000);

  const [searchParams,setSearchParams] = useSearchParams()
  
  const handlePriceChange = (value) => {
    setMaxPrice(value[1])
    setMinPrice(value[0])
  }

  const handleInputClick=(e)=>{
    if (e.target.name=='category') setCategory(e.target.value)
    else if (e.target.name=='sortBy') setSortBy(e.target.value)
  }

  //sets search param for filters to work
  const handleSubmission=()=>{
    const newParams = new URLSearchParams(searchParams);

    newParams.set('category',category);
    
    newParams.set('minPrice',minPrice);
    newParams.set('maxPrice',maxPrice);

    setSearchParams(newParams);
  }

  
  return (
    <div className={`${styles['filterSection']} d-flex flex-column p-3 row-gap-4`}>
      <div className={`${styles['filterHeading']} fs-4 fw-bolder text-center m-2 pb-2`}>Filter</div>
       {/* DropDown to select Category */}
      <details className={`${styles['filterDropDown']} p-2 fs-6`}>
        <summary>Category</summary>
        <label><input type="radio" name='category' onClick={handleInputClick} value="Indian" /> Indian</label><br/>
        <label><input type="radio" name='category' onClick={handleInputClick} value="French" /> FRench</label><br/>
        <label><input type="radio" name='category' onClick={handleInputClick} value="Chinese" /> Chinese</label><br/>
      </details>

      {/* DropDown to select PriceRange */}
      <details className={`${styles['filterDropDown']} p-2 fs-6`}>
        <summary>Price Range</summary>
        <div className=''>
          <div className={`d-flex justify-content-between`}>
            <span className={`ps-2`}>Min: ${minPrice}</span>
            <span className={`pe-2`}>Max: ${maxPrice}</span>
          </div>
          <ReactSlider
            className={`${styles["horizontal-slider"]} m-0`}
            thumbClassName={`${styles["thumb"]}`}
            trackClassName={`${styles["track"]}`}
            value={[minPrice,maxPrice]}
            min={0}
            max={30}
            step={1}
            onChange={handlePriceChange}
            withTracks={true}
            pearling
            minDistance={10}
          />
          <div className={`d-flex justify-content-between`}>
            <span className={`ps-2`} style={{fontSize: 0.75+'rem'}}>0</span>
            <span className={`pe-2`} style={{fontSize: 0.75+'rem'}}>30</span>
          </div>
        </div>
      </details>

      <button className={`${styles["applyFilterBtn"]} p-2 fw-bolder mb-2`} onClick={handleSubmission}>Apply Filter</button>

    </div>
  )
}

export default Filter