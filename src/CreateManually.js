import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateManually = ({ theme }) => {
  const [datasetName, setDatasetName] = useState('');
  const [datasetDescription, setDatasetDescription] = useState('');
  const [fields, setFields] = useState([{ name: '', type: 'string' }]);

  const addField = () => {
    setFields([...fields, { name: '', type: 'string' }]);
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ datasetName, datasetDescription, fields });
    alert('Dataset created successfully!');
  };

  return (
    <div className={`flex h-screen ${theme === 'light' ? 'bg-gradient-to-br from-[#e6e6fa] to-[#b0e0e6]' : 'bg-gradient-to-br from-[#1e1e2f] to-[#2a1b3d]'} transition-colors duration-500`}>
      <div className="flex-grow p-8">
        <Link to="/" className={`flex items-center mb-6 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} hover:text-opacity-80`}>
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Create Dataset Manually</h1>
        <form onSubmit={handleSubmit} className={`${theme === 'light' ? 'bg-white' : 'bg-[#2d2d44]'} rounded-lg shadow-lg p-6`}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`} htmlFor="datasetName">
              Dataset Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'light' ? 'text-[#4a90e2] bg-[#f0e6fa]' : 'text-[#7f7fd5] bg-[#3d3d5c]'} leading-tight focus:outline-none focus:shadow-outline`}
              id="datasetName"
              type="text"
              placeholder="Enter dataset name"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`} htmlFor="datasetDescription">
              Dataset Description
            </label>
            <textarea
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'light' ? 'text-[#4a90e2] bg-[#f0e6fa]' : 'text-[#7f7fd5] bg-[#3d3d5c]'} leading-tight focus:outline-none focus:shadow-outline`}
              id="datasetDescription"
              placeholder="Enter dataset description"
              value={datasetDescription}
              onChange={(e) => setDatasetDescription(e.target.value)}
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Fields</label>
            {fields.map((field, index) => (
              <div key={index} className="flex mb-2">
                <input
                  className={`shadow appearance-none border rounded w-1/2 py-2 px-3 ${theme === 'light' ? 'text-[#4a90e2] bg-[#f0e6fa]' : 'text-[#7f7fd5] bg-[#3d3d5c]'} leading-tight focus:outline-none focus:shadow-outline mr-2`}
                  type="text"
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                  required
                />
                <select
                  className={`shadow appearance-none border rounded w-1/3 py-2 px-3 ${theme === 'light' ? 'text-[#4a90e2] bg-[#f0e6fa]' : 'text-[#7f7fd5] bg-[#3d3d5c]'} leading-tight focus:outline-none focus:shadow-outline mr-2`}
                  value={field.type}
                  onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className={`${theme === 'light' ? 'bg-[#4a90e2]' : 'bg-[#7f7fd5]'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addField}
              className={`${theme === 'light' ? 'bg-[#4a90e2]' : 'bg-[#7f7fd5]'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center mt-2`}
            >
              <Plus size={18} className="mr-2" />
              Add Field
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`${theme === 'light' ? 'bg-[#4a90e2]' : 'bg-[#7f7fd5]'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
            >
              <Save size={18} className="mr-2" />
              Create Dataset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateManually;