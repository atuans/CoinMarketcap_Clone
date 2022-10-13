import React from 'react'
import Down from '../../images/svg/chevronDown'
import Up from '../../images/svg/chevronUp'

const styles = {
    rate: `rate flex items-center`,
    red: `ml-2 text-[#EA3943]`,
    green: `ml-2 text-[#17C784]`
}

const Rate = ({isIncrement, rate}) => {
  return (
    <div className={styles.rate}>
        {isIncrement ? <Up fill='#17C784'/> : <Down fill='#EA3943'/>}
        <p className={isIncrement ? styles.green : styles.red}>{rate}</p>
    </div>
  )
}

export default Rate;