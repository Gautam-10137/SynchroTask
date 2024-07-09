import React, { useState } from 'react';

const TaskDetailDialog = ({ task, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    assignedTo: task.assignedTo,
    dueDate: task.dueDate,
    _id:task._id
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md">
        {isEditing ? (
          <>
            <h3 className="text-2xl font-semibold mb-4">Edit Task</h3>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Priority:
              <select
                name="priority"
                value={editedTask.priority}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="block mb-2">
              Status:
              <select
                name="status"
                value={editedTask.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="to-do">To-do</option>
                <option value="in-progress">In-progress</option>
                <option value="done">Done</option>
              </select>
            </label>
            <label className="block mb-2">
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={editedTask.dueDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-4">{task.title}</h3>
            <p className="text-gray-700 mb-2"><strong>Description:</strong></p>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <p className="text-gray-700 mb-2"><strong>Priority:</strong> {task.priority}</p>
            <p className="text-gray-700 mb-2"><strong>Status:</strong> {task.status}</p>
            <p className="text-gray-700 mb-2"><strong>Assigned To:</strong></p>
            <ul className="list-disc list-inside mb-2">
              {task.assignedTo.map((user, index) => (
                <li key={index} className="text-gray-600">
                  {user.name}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mb-2"><strong>Due Date:</strong> {task.dueDate}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailDialog;
