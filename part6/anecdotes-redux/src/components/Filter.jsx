import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterSlice'

const Filter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      filter{' '}
      <input
        type="text"
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  )
}

export default Filter
