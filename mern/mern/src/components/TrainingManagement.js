import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainingManagement() {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []); // Ensure fetchCourses is called only once when the component mounts

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:5000/courses");
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    };

    const addCourse = async () => {
        try {
            const response = await axios.post("http://localhost:5000/courses", {
                title,
                description,
                duration,
            });
            fetchCourses();
            setTitle("");
            setDescription("");
            setDuration("");
        } catch (error) {
            console.error("Error adding course: ", error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/courses/${id}`);
            fetchCourses();
        } catch (error) {
            console.error("Error deleting course: ", error);
        }
    };

    const updateCourse = async () => {
        try {
            await axios.put(`http://localhost:5000/courses/${editId}`, {
                title,
                description,
                duration,
            });
            fetchCourses();
            setTitle("");
            setDescription("");
            setDuration("");
            setEditId(null);
        } catch (error) {
            console.error("Error updating course: ", error);
        }
    };

    const handleEdit = (course) => {
        setTitle(course.title);
        setDescription(course.description);
        setDuration(course.duration);
        setEditId(course.id);
    };

    return (
        <div className="container">
            <h1 className="my-4">Training Management System</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Course</h5>
                            <input
                                type="text"
                                value={title}
                                placeholder="Title"
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control mb-2"
                            />
                            <input
                                type="text"
                                value={description}
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control mb-2"
                            />
                            <input
                                type="text"
                                value={duration}
                                placeholder="Duration"
                                onChange={(e) => setDuration(e.target.value)}
                                className="form-control mb-2"
                            />
                            {editId ? (
                                <button onClick={updateCourse} className="btn btn-primary mr-2">Update</button>
                            ) : (
                                <button onClick={addCourse} className="btn btn-primary mr-2">Add Course</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        {courses.map((course) => (
                            <div key={course.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{course.title}</h5>
                                        <p className="card-text">Description: {course.description}</p>
                                        <p className="card-text">Duration: {course.duration}</p>
                                        <button onClick={() => deleteCourse(course.id)} className="btn btn-danger mr-2">Delete</button>
                                        <button onClick={() => handleEdit(course)} className="btn btn-primary">Edit</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrainingManagement;
