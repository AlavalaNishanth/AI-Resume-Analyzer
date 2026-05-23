function MatchCard({
    title,
    value
}) {

    return (

        <div
            className="
                bg-white
                p-6
                rounded-2xl
                shadow-lg
                text-center
            "
        >

            <h2
                className="
                    text-xl
                    font-bold
                "
            >
                {title}
            </h2>

            <p
                className="
                    text-4xl
                    text-blue-600
                    font-bold
                    mt-4
                "
            >
                {value}
            </p>

        </div>
    )
}

export default MatchCard