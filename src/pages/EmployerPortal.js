import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseconfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';

const EmployerPortal = () => {
    useDocTitle('Employer Portal');

    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);
    const [isJobFormOpen, setIsJobFormOpen] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobQuestions, setJobQuestions] = useState(['']);
    const [employerId, setEmployerId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmployerId(user.uid);
            } else {
                setEmployerId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (employerId) {
            const fetchJobPostings = async () => {
                const q = query(collection(db, 'jobPostings'), where('employerId', '==', employerId));
                const querySnapshot = await getDocs(q);
                const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setJobPostings(jobs);
            };

            fetchJobPostings();
        }
    }, [employerId]);

    const handleViewApplications = async (job) => {
        setSelectedJob(job);
        const q = query(collection(db, 'applications'), where('jobId', '==', job.id));
        const querySnapshot = await getDocs(q);
        const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(apps);
        setIsApplicationsModalOpen(true);
    };

    const handleAddJobPosting = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'jobPostings'), {
                companyName: companyName,
                title: jobTitle,
                description: jobDescription,
                questions: jobQuestions.filter(question => question.trim() !== ''), // Filter out empty questions
                employerId: employerId,
                applications: 0,
                status: 'Pending',
            });
            alert('Job posting added successfully!');
            setCompanyName('');
            setJobTitle('');
            setJobDescription('');
            setJobQuestions(['']);
            // Refresh job postings
            const q = query(collection(db, 'jobPostings'), where('employerId', '==', employerId));
            const querySnapshot = await getDocs(q);
            const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobPostings(jobs);
        } catch (error) {
            console.error('Error adding job posting: ', error);
        }
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...jobQuestions];
        newQuestions[index] = value;
        setJobQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setJobQuestions([...jobQuestions, '']);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = jobQuestions.filter((_, i) => i !== index);
        setJobQuestions(newQuestions);
    };

    return (
        <>
            <NavBar />
            <div className="container mx-auto p-6" data-aos="fade-up">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Employer Portal</h1>
                <p className="text-lg text-gray-600 mb-8">
                    This is the central hub for managing your job postings and reviewing applications.
                </p>

                <section className="dashboard mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
                    <div className="flex gap-8">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
                            <h3 className="text-xl font-medium text-gray-700">Total Job Postings</h3>
                            <p className="text-2xl font-bold text-gray-800">{jobPostings.length}</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
                            <h3 className="text-xl font-medium text-gray-700">Total Applications</h3>
                            <p className="text-2xl font-bold text-gray-800">
                                {jobPostings.reduce((total, job) => total + job.applications, 0)}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="job-postings mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Job Postings</h2>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4"
                        onClick={() => setIsJobFormOpen(true)}
                    >
                        Add Job Posting
                    </button>
                    <ul className="space-y-4">
                        {jobPostings.map((job) => (
                            <li key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
                                <p className="text-gray-700 mt-2">Status: {job.status}</p>
                                <p className="text-gray-700 mt-2">Applications: {job.applications}</p>
                                <button
                                    className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                                    onClick={() => handleViewApplications(job)}
                                >
                                    View Applications
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {isJobFormOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Job Posting</h3>
                        <form onSubmit={handleAddJobPosting}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Job Title</label>
                                <input
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Job Description</label>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Questions (Optional)</label>
                                {jobQuestions.map((question, index) => (
                                    <div key={index} className="mb-2 flex items-center">
                                        <input
                                            type="text"
                                            value={question}
                                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            className="ml-2 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                                            onClick={() => handleRemoveQuestion(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                                    onClick={handleAddQuestion}
                                >
                                    Add Question
                                </button>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsJobFormOpen(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    Add Job Posting
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isApplicationsModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applications for {selectedJob?.title}</h3>
                        <ul className="space-y-4">
                            {applications.map((app) => (
                                <li key={app.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <p className="text-gray-700"><strong>Name:</strong> {app.applicantName}</p>
                                    <p className="text-gray-700"><strong>Email:</strong> {app.applicantEmail}</p>
                                    <p className="text-gray-700"><strong>Cover Letter:</strong> <a href={app.coverLetterURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></p>
                                    {app.answers.map((answer, index) => (
                                        <p key={index} className="text-gray-700"><strong>Answer {index + 1}:</strong> {answer}</p>
                                    ))}
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                                onClick={() => setIsApplicationsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default EmployerPortal;