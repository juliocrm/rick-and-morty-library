import Badge from '../../common/Badge'
import styles from '../style/CharacterCard.module.css'
import useIsDesktop from '../../../hooks/useIsDesktop'

export default function FilterSummary({resultsCount, activeFilters}) {
    const isDesktop = useIsDesktop();

    return ( 
        <div className={`flex flex-row justify-between !px-[16px] !h-[56px] items-center ${isDesktop? '':styles.card}`}>
            <p className='!text-(--color-blue-400) font-semibold text-sm'>{`${resultsCount} ${resultsCount === 1 ? 'Result' : 'Results'}`}</p>
            <Badge label={`${activeFilters} ${activeFilters === 1 ? 'Filter' : 'Filters'}`} />
        </div>
    )
}