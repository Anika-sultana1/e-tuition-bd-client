import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaEdit, FaHourglassHalf, FaTimes, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const AppliedTutors = () => {
    const axiosSecure = useAxiosSecure();

    const { data: appliedTutors = [] } = useQuery({
        queryKey: ['appliedTutors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications');
            return res?.data;
        }
    });

    const handleStatusBadge = (status) => {
        status = status.toLowerCase();
        if (status === 'approved') {
            return <span className="badge badge-success flex items-center gap-1"><FaCheck /> {status}</span>;
        } else if (status === 'pending') {
            return <span className="badge badge-warning flex items-center gap-1"><FaHourglassHalf /> {status}</span>;
        } else if (status === 'rejected') {
            return <span className="badge badge-error flex items-center gap-1"><FaTimes /> {status}</span>;
        } else {
            return <span className="badge">{status}</span>;
        }
    };

    const handleRemoveappliedTutor = (id) => {
        console.log("Remove applied tutor:", id);
    }

    return (
        <div className="overflow-x-auto p-4 bg-base-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">My Applications</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Qualifications</th>
                        <th>Experiences</th>
                        <th>Status</th>
                        <th>Salary</th>
                        <th>Applied At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appliedTutors.map((appliedTutor, index) => (
                        <tr key={appliedTutor._id}>
                            <th>{index + 1}</th>
                            <td>{appliedTutor.name}</td>
                            <td>{appliedTutor.qualifications}</td>
                            <td>{appliedTutor.experience}</td>
                            <td>{handleStatusBadge(appliedTutor.status)}</td>
                            <td>{appliedTutor.expectedSalary}</td>
                            <td>{new Date(appliedTutor.date).toLocaleDateString()}</td>
                            <td className="flex gap-2">
                                <Link to={`../updateappliedTutor/${appliedTutor._id}`}>
                                    <button className="btn btn-sm btn-info flex items-center gap-1">
                                        <FaEdit /> Approve
                                    </button>
                                </Link>
                                <button onClick={() => handleRemoveappliedTutor(appliedTutor._id)} className="btn btn-sm btn-error flex items-center gap-1">
                                    <FaTrash /> Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {appliedTutors.length === 0 && (
                <p className="text-center mt-4 text-gray-500">No applied tutors found.</p>
            )}
        </div>
    );
};

export default AppliedTutors;
