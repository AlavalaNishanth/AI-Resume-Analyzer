import ResumeUpload from "../components/ResumeUpload"

function Dashboard() {

    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-r
                from-blue-100
                to-purple-100
                p-10
            "
        >

            <div
                className="
                    max-w-5xl
                    mx-auto
                    bg-white
                    shadow-2xl
                    rounded-3xl
                    p-10
                "
            >

                <h1
                    className="
                        text-5xl
                        font-bold
                        text-center
                        mb-10
                    "
                >
                    AI Resume Analyzer
                </h1>

                <ResumeUpload />

            </div>

        </div>
    )
}

export default Dashboard