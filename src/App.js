import React, { useState } from 'react';
import OpenAI from 'openai';

const token = process.env.REACT_APP_GITHUB_TOKEN;
const endpoint = process.env.REACT_APP_API_ENDPOINT;
const modelName = process.env.REACT_APP_MODEL_NAME;

const client = new OpenAI({ baseURL: endpoint, apiKey: token, dangerouslyAllowBrowser: true });

const DatasetForm = ({ onSubmit }) => {
  const [datasetName, setDatasetName] = useState('');
  const [datasetDescription, setDatasetDescription] = useState('');
  const [columns, setColumns] = useState([{ name: '', description: '' }]);

  const addColumn = () => {
    setColumns([...columns, { name: '', description: '' }]);
  };

  const updateColumn = (index, field, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index][field] = value;
    setColumns(updatedColumns);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ datasetName, datasetDescription, columns });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={datasetName}
        onChange={(e) => setDatasetName(e.target.value)}
        placeholder="Dataset Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={datasetDescription}
        onChange={(e) => setDatasetDescription(e.target.value)}
        placeholder="Dataset Description"
        className="w-full p-2 border rounded h-24"
        required
      />
      {columns.map((column, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            value={column.name}
            onChange={(e) => updateColumn(index, 'name', e.target.value)}
            placeholder="Column Name"
            className="flex-1 p-2 border rounded"
            required
          />
          <input
            type="text"
            value={column.description}
            onChange={(e) => updateColumn(index, 'description', e.target.value)}
            placeholder="Column Description"
            className="flex-2 p-2 border rounded"
            required
          />
        </div>
      ))}
      <div className="flex space-x-2">
        <button type="button" onClick={addColumn} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          Add Column
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Create Dataset
        </button>
      </div>
    </form>
  );
};

const ProgressBar = ({ value, max }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${(value / max) * 100}%` }}></div>
  </div>
);

export default function App() {
  const [dataset, setDataset] = useState(null);
  const [generatedData, setGeneratedData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState(null);

  const generatePrompt = (dataset) => {
    const columnDescriptions = dataset.columns.map(col => `${col.name}: ${col.description}`).join(', ');
    return `Generate a dataset with the following columns: ${columnDescriptions}. 
    The dataset is about: ${dataset.datasetDescription}. 
    Respond ONLY with a JSON array of objects, where each object represents a row in the dataset. 
    Generate 10 diverse and realistic entries. 
    Do not include any explanatory text or markdown formatting.`;
  };

  const sanitizeResponse = (content) => {
    // Remove any ```json or similar markdown formatting
    const sanitized = content.replace(/```json|```/g, '').trim();
    return sanitized;
  };

  const generateData = async () => {
    if (!dataset) return;

    setIsGenerating(true);
    setError(null);
    setProgress({ current: 0, total: 10 });
    let allData = [];

    try {
      for (let i = 0; i < 10; i++) {
        const prompt = generatePrompt(dataset);
        const response = await client.chat.completions.create({
          messages: [
            { role: "system", content: "You are a data generation assistant. Always respond with valid JSON only." },
            { role: "user", content: prompt }
          ],
          model: modelName
        });

        const content = sanitizeResponse(response.choices[0].message.content);
        let newData;
        try {
          newData = JSON.parse(content);
        } catch (parseError) {
          throw new Error(`Invalid JSON received: ${content.substring(0, 100)}...`);
        }

        if (!Array.isArray(newData)) {
          throw new Error("Received data is not an array");
        }

        allData = [...allData, ...newData];
        setGeneratedData(allData);
        setProgress(prev => ({ current: prev.current + 1, total: prev.total }));
      }
    } catch (error) {
      console.error("Error generating data:", error);
      setError(`Error generating data: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCSV = () => {
    if (!dataset || generatedData.length === 0) return;

    const headers = dataset.columns.map(col => col.name).join(',');
    const rows = generatedData.map(row => 
      dataset.columns.map(col => JSON.stringify(row[col.name] || "")).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${dataset.datasetName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-5 text-center text-indigo-600">Advanced Dataset Generator</h1>
          
          {!dataset ? (
            <DatasetForm onSubmit={setDataset} />
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">{dataset.datasetName}</h2>
              <p className="text-gray-600 italic">{dataset.datasetDescription}</p>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">Columns:</h3>
                <ul className="list-disc list-inside">
                  {dataset.columns.map((col, index) => (
                    <li key={index} className="text-gray-600">{col.name}: {col.description}</li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={generateData} 
                disabled={isGenerating}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 hover:bg-indigo-600 transition-colors"
              >
                {isGenerating ? 'Generating...' : 'Generate Data'}
              </button>
              {isGenerating && (
                <div className="space-y-2">
                  <ProgressBar value={progress.current} max={progress.total} />
                  <p className="text-center text-gray-600">Generating batch {progress.current} of {progress.total}</p>
                </div>
              )}
              {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
              {generatedData.length > 0 && (
                <div className="space-y-4">
                  <p className="text-green-600 font-medium">Generated {generatedData.length} entries</p>
                  <button 
                    onClick={downloadCSV}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Download CSV
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
