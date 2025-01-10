import React, { useState, useEffect } from 'react';
import { db } from '../firebaseconfig';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';

const StudentPortal = () => {
    useDocTitle('Student Portal');

    const [jobPostings, setJobPostings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [coverLetterURL, setCoverLetterURL] = useState('');
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchJobPostings = async () => {
            const querySnapshot = await getDocs(collection(db, 'jobPostings'));
            const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobPostings(jobs);
        };

        fetchJobPostings();
    }, []);

    const handleApply = (job) => {
        setSelectedJob(job);
        setAnswers(new Array(job.questions.length).fill(''));
        setIsModalOpen(true);
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'applications'), {
                jobId: selectedJob.id,
                applicantName: applicantName,
                applicantEmail: applicantEmail,
                coverLetterURL: coverLetterURL,
                answers: answers,
                status: 'Pending',
            });

            // Increment the applications count in the job posting
            const jobRef = doc(db, 'jobPostings', selectedJob.id);
            await updateDoc(jobRef, {
                applications: selectedJob.applications + 1
            });

            alert('Application submitted successfully!');
            setIsModalOpen(false);
            setApplicantName('');
            setApplicantEmail('');
            setCoverLetterURL('');
            setAnswers([]);
        } catch (error) {
            console.error('Error submitting application: ', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="container mx-auto p-6" data-aos="fade-up">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Student Portal</h1>
                <p className="text-lg text-gray-600 mb-8">
                    This is the central hub for viewing job postings and managing your applications.
                </p>

                <section className="dashboard mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
                    <div className="flex gap-8">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
                            <h3 className="text-xl font-medium text-gray-700">Total Job Postings</h3>
                            <p className="text-2xl font-bold text-gray-800">{jobPostings.length}</p>
                        </div>
                    </div>
                </section>

                <section className="job-postings">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Job Postings</h2>

                    <ul className="space-y-4">
                        {jobPostings.map((job) => (
                            <li key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
                                <p className="text-gray-600">{job.location}</p>
                                <p className="text-gray-700 mt-2">Applications: {job.applications}</p>
                                <p className="text-gray-700 mt-2">Company: {job.companyName}</p>
                                <p className="text-gray-700 mt-2">{job.description}</p>
                                <p className="text-gray-700 mt-2">Status: {job.status}</p>

                                <div className="mt-4 flex gap-4">
                                    <button
                                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                        onClick={() => handleApply(job)}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Apply for {selectedJob?.title}</h3>
                        <form onSubmit={handleSubmitApplication}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={applicantName}
                                    onChange={(e) => setApplicantName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={applicantEmail}
                                    onChange={(e) => setApplicantEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Cover Letter URL (to shared document)</label>
                                <input
                                    type="url"
                                    value={coverLetterURL}
                                    onChange={(e) => setCoverLetterURL(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            {selectedJob?.questions.map((question, index) => (
                                <div key={index} className="mb-4">
                                    <label className="block text-gray-700">{question}</label>
                                    <textarea
                                        value={answers[index]}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default StudentPortal;