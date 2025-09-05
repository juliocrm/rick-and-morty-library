export default function Property({title, value}){
    return <div className="w-full pb-2">
        <h2 className="text-gray-600">{title}</h2>
        <p className="text-gray-600">{value}</p>
    </div>
}