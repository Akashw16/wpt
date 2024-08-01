import React, { useState } from 'react';
import axios from 'axios';

function CourseForm({ course, setUserMessage, onClose, fetchCourses }) {
  const [cid, setCid] = useState(course ? course.cid : '');
  const [cname, setCname] = useState(course ? course.cname : '');
  const [fees, setFees] = useState(course ? course.fees : '');
  const [duration, setDuration] = useState(course ? course.duration : '');

  const isEditMode = Boolean(course);

  const handleSubmit = async () => {
    try {
      if (!cid || !cname || !fees || !duration) {
        setUserMessage('All fields are mandatory');
        return;
      }
      if (/\d/.test(cname)) {
        setUserMessage('Course name should not contain numbers');
        return;
      }
      if (fees <= 0) {
        setUserMessage('Fees should be greater than zero');
        return;
      }
      if (duration <= 0) {
        setUserMessage('Duration should be greater than zero');
        return;
      }

      if (isEditMode) {
        const response = await axios.put(`http://localhost:5000/api/courses/${cid}`, {
          cname,
          fees,
          duration,
        });
        setUserMessage(response.data.message);
      } else {
        const response = await axios.post('http://localhost:5000/api/courses', {
          cid,
          cname,
          fees,
          duration,
        });
        setUserMessage(response.data.message);
      }

      fetchCourses();
      onClose();
    } catch (error) {
      setUserMessage('Error while saving the course. Please try again.');
    }
  };

  return (
    <div className="course-form">
      <h2>{isEditMode ? 'Update Course' : 'Add Course'}</h2>
      <div>
        <label>CID:</label>
        <input
          type="number"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          disabled={isEditMode}
        />
      </div>
      <div>
        <label>Course Name:</label>
        <input
          type="text"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
        />
      </div>
      <div>
        <label>Fees:</label>
        <input
          type="number"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (months):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>{isEditMode ? 'Modify' : 'Save'}</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CourseForm;
