import { useDispatch, useSelector } from 'react-redux'
import { toggleFilter } from '../../store/filterSlice'
import CheckboxStyles from '../../utils/CheckboxStyles'
import classes from './Filter.module.scss'
import { RootState } from '../../store/store'

const Filter = () => {
  const filter = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch()

  const handleCheckboxChange = (option: keyof typeof filter) => {
    dispatch(toggleFilter({ option }))
  }

  return (
    <aside className={classes.Filter}>
      <h3 className={classes['Filter__title']}>Количество пересадок</h3>
      <div className={classes['Filter__checkbox']}>
        <CheckboxStyles checked={filter.all} onChange={() => handleCheckboxChange('all')}>
          Все
        </CheckboxStyles>
      </div>
      <CheckboxStyles
        className={classes['Filter__checkbox']}
        checked={filter.noStops}
        onChange={() => handleCheckboxChange('noStops')}
      >
        {' '}
        Без пересадок{' '}
      </CheckboxStyles>
      <CheckboxStyles
        className={classes['Filter__checkbox']}
        checked={filter.oneStop}
        onChange={() => handleCheckboxChange('oneStop')}
      >
        1 пересадка
      </CheckboxStyles>
      <CheckboxStyles
        className={classes['Filter__checkbox']}
        checked={filter.twoStops}
        onChange={() => handleCheckboxChange('twoStops')}
      >
        2 пересадки
      </CheckboxStyles>
      <CheckboxStyles
        className={classes['Filter__checkbox']}
        checked={filter.threeStops}
        onChange={() => handleCheckboxChange('threeStops')}
      >
        3 пересадки
      </CheckboxStyles>
    </aside>
  )
}

export default Filter
