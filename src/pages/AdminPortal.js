import React, { useState, useEffect } from 'react';
import { db } from '../firebaseconfig';
import { collection, getDocs, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import sendJobPostingDeniedEmail from '../services/emailService';

const AdminPortal = () => {
    useDocTitle('Admin Portal');

    const [jobPostings, setJobPostings] = useState([]);

    useEffect(() => {
        const fetchJobPostings = async () => {
            const querySnapshot = await getDocs(collection(db, 'jobPostings'));
            const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Filter out approved job postings
            const pendingJobs = jobs.filter(job => job.status !== 'Approved');
            setJobPostings(pendingJobs);
        };

        fetchJobPostings();
    }, []);

    const handleApprove = async (jobId) => {
        const confirmApprove = window.confirm('Are you sure you want to approve this job posting?');
        if (confirmApprove) {
            try {
                const jobRef = doc(db, 'jobPostings', jobId);
                await updateDoc(jobRef, {
                    status: 'Approved'
                });
                alert('Job posting approved successfully!');
                // Remove the approved job from the state
                setJobPostings(prevJobPostings => prevJobPostings.filter(job => job.id !== jobId));
            } catch (error) {
                console.error('Error approving job posting: ', error);
            }
        }
    };

    const handleDeny = async (jobId, employerId) => {
        const confirmDeny = window.confirm('Are you sure you want to deny this job posting?');
        if (confirmDeny) {
            try {
                // Fetch employer's email from their ID
                const employerRef = doc(db, 'employers', employerId);
                const employerSnap = await getDoc(employerRef);
                if (employerSnap.exists()) {
                    const employerEmail = employerSnap.data().email;
    
                    // Fetch job details
                    const jobRef = doc(db, 'jobPostings', jobId);
                    const jobSnap = await getDoc(jobRef);
                    if (jobSnap.exists()) {
                        const jobTitle = jobSnap.data().title;
    
                        // Send email to the employer
                        sendJobPostingDeniedEmail(employerEmail, jobTitle);
    
                        // Delete the job posting
                        await deleteDoc(jobRef);
                        alert('Job posting denied and removed successfully!');
    
                        // Remove the denied job from the state
                        setJobPostings(prevJobPostings => prevJobPostings.filter(job => job.id !== jobId));
                    } else {
                        console.error('Job not found');
                    }
                } else {
                    console.error('Employer not found');
                }
            } catch (error) {
                console.error('Error denying job posting: ', error);
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className="container mx-auto p-6" data-aos="fade-up">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Admin Portal</h1>
                <p className="text-lg text-gray-600 mb-8">
                    This is the central hub for viewing job postings and managing your applications.
                </p>

                <section className="dashboard mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
                    <div className="flex gap-8">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
                            <h3 className="text-xl font-medium text-gray-700">Pending Job Postings</h3>
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
                                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                                        onClick={() => handleApprove(job.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                                        onClick={() => handleDeny(job.id, job.employerId)}
                                    >
                                        Deny
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default AdminPortal;