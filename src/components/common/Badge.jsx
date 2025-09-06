export default function Badge({label}) {
    return (
        <div className="rounded-full !bg-(--color-green-100) 
            !text-(--color-green-400)
            text-sm font-semibold
            h-[24px] px-[12px] py-[2px]"
        >{label}</div>
    )
}