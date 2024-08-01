import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseForm from './CourseForm';

function CourseTable({ onLogout, setUserMessage }) {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      setUserMessage('Failed to fetch courses.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = () => {
    setIsAdding(true);
    setEditingCourse(null);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsAdding(false);
  };

  const handleDeleteCourse = async (cid) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/courses/${cid}`);
      if (response.data.success) {
        setUserMessage(response.data.message);
        fetchCourses();
      } else {
        setUserMessage(response.data.message);
      }
    } catch (error) {
      setUserMessage('Failed to delete course.');
    }
  };

  const handleFormClose = () => {
    setEditingCourse(null);
    setIsAdding(false);
    fetchCourses();
  };

  return (
    <div className="course-table">
      <h2>Course Management</h2>
      <button onClick={onLogout}>Logout</button>
      <button onClick={handleAddCourse}>Add Course</button>
      {isAdding && (
        <CourseForm
          setUserMessage={setUserMessage}
          onClose={handleFormClose}
          fetchCourses={fetchCourses}
        />
      )}
      {editingCourse && (
        <CourseForm
          course={editingCourse}
          setUserMessage={setUserMessage}
          onClose={handleFormClose}
          fetchCourses={fetchCourses}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>CID</th>
            <th>Course Name</th>
            <th>Fees</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.cid}>
              <td>{course.cid}</td>
              <td>{course.cname}</td>
              <td>{course.fees}</td>
              <td>{course.duration}</td>
              <td>
                <button onClick={() => handleEditCourse(course)}>Update</button>
                <button onClick={() => handleDeleteCourse(course.cid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
