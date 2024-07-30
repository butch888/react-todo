const Radio = (props) => {
  const {checkAll, handleCheckAll, checkDoned, handleCheckDoned, active, handlActive} = props;
  return (
    <div style={{margin: '10px 0'}}>
        <input onChange={handleCheckAll} type='radio' checked={checkAll}/><span>All</span>
        <input onChange={handleCheckDoned} type='radio' checked={checkDoned}/><span>Doned</span>
        <input onChange={handlActive} type='radio' checked={active}/><span>Active</span>
      </div>
  )
}

export default Radio;