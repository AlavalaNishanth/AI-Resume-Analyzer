import { useState } from "react"

import API from "../services/api"

import MatchCard from "./MatchCard"


function ResumeUpload() {

    const [file, setFile] = useState(null)

    const [jobDescription, setJobDescription] =
        useState("")

    const [analysis, setAnalysis] =
        useState(null)

    const [loading, setLoading] =
        useState(false)


    const uploadAndAnalyze = async () => {

        try {

            if (!file) {

                alert("Upload resume")

                return
            }

            setLoading(true)

            const formData = new FormData()

            formData.append(
                "resume",
                file
            )

            // Upload Resume

            const uploadResponse =
                await API.post(
                    "/upload-resume",
                    formData
                )

            const resumeText =
                uploadResponse.data.text

            // Analyze Resume

            const analyzeResponse =
                await API.post(
                    "/analyze",
                    {
                        resume: resumeText,
                        job_description:
                            jobDescription
                    }
                )

            console.log(
                analyzeResponse.data
            )

            setAnalysis(
                analyzeResponse.data
            )

        }
        catch(error) {

            console.log(error)

            alert(
                "Something went wrong"
            )
        }

        finally {

            setLoading(false)
        }
    }


    return (

        <div className="space-y-6">

            {/* Upload File */}

            <div>

                <input
                    type="file"
                    onChange={(e)=>
                        setFile(
                            e.target.files[0]
                        )
                    }
                />

            </div>


            {/* Job Description */}

            <textarea
                rows="10"
                className="
                    border
                    p-4
                    w-full
                    rounded-xl
                "
                placeholder="
                    Paste Job Description
                "
                value={jobDescription}
                onChange={(e)=>
                    setJobDescription(
                        e.target.value
                    )
                }
            />


            {/* Analyze Button */}

            <button
                onClick={uploadAndAnalyze}
                className="
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    hover:bg-gray-800
                "
            >

                Analyze Resume

            </button>


            {/* Loading */}

            {
                loading && (

                    <div
                        className="
                            bg-blue-100
                            p-4
                            rounded-xl
                            text-blue-700
                            font-bold
                        "
                    >

                        

                    </div>
                )
            }


            {/* Analysis Results */}

            {
                analysis && (

                    <div className="space-y-8">

                        {/* Match Cards */}

                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-6
                            "
                        >

                            <MatchCard
                                title="
                                    Match Percentage
                                "
                                value={
                                    analysis.match_percentage
                                }
                            />

                            <MatchCard
                                title="ATS Score"
                                value={
                                    analysis.ats_score
                                }
                            />

                        </div>


                        {/* Missing Skills */}

                        <div
                            className="
                                bg-white
                                p-6
                                rounded-2xl
                                shadow-lg
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    mb-4
                                "
                            >

                                Missing Skills

                            </h2>

                            <div
                                className="
                                    flex
                                    gap-4
                                    flex-wrap
                                "
                            >

                                {
                                    analysis
                                    .missing_skills
                                    ?.map(
                                        (
                                            skill,
                                            index
                                        ) => (

                                            <span
                                                key={index}
                                                className="
                                                    bg-red-100
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                "
                                            >

                                                {skill}

                                            </span>
                                        )
                                    )
                                }

                            </div>

                        </div>


                        {/* Suggestions */}

                        <div
                            className="
                                bg-white
                                p-6
                                rounded-2xl
                                shadow-lg
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    mb-4
                                "
                            >

                                Suggestions

                            </h2>

                            <ul className="space-y-2">

                                {
                                    analysis
                                    .suggestions
                                    ?.map(
                                        (
                                            suggestion,
                                            index
                                        ) => (

                                            <li key={index}>

                                                • {suggestion}

                                            </li>
                                        )
                                    )
                                }

                            </ul>

                        </div>


                        {/* Interview Questions */}

                        <div
                            className="
                                bg-white
                                p-6
                                rounded-2xl
                                shadow-lg
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    mb-4
                                "
                            >

                                Interview Questions

                            </h2>

                            <ul className="space-y-2">

                                {
                                    analysis
                                    .interview_questions
                                    ?.map(
                                        (
                                            question,
                                            index
                                        ) => (

                                            <li key={index}>

                                                • {question}

                                            </li>
                                        )
                                    )
                                }

                            </ul>

                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default ResumeUpload