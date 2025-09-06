import Badge from '../common/Badge'
import styles from './style/CharacterCard.module.css'

export default function FilterSummary({resultsCount, activeFilters}) {
    return ( 
        <div className={`flex flex-row justify-between !px-[16px] ${styles.card}`}>
            <p className='!text-(--color-blue-400) font-semibold text-sm'>{`${resultsCount} ${resultsCount === 1 ? 'Character' : 'Characters'}`}</p>
            <Badge label={`${activeFilters} ${activeFilters === 1 ? 'Filter' : 'Filters'}`} />
        </div>
    )
}