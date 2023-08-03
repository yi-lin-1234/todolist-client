import { useState, FormEvent } from "react";
import { createNewTask } from "../apiService";

import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import CustomRadioGroup from "../components/CustomRadioGroup";

const priorityOptions = ["low", "moderate", "high", "urgent"];
const difficultyOptions = ["easy", "moderate", "hard"];
const estimatedTimeOptions = [
  "mins",
  "hours",
  "days",
  "weeks",
  "months",
  "years",
];

function Create() {
  const [name, setName] = useState<string>("");
  const [priority, setPriority] = useState<string>(priorityOptions[0]);
  const [difficulty, setDifficulty] = useState<string>(difficultyOptions[0]);
  const [estimate, setEstimate] = useState<string>(estimatedTimeOptions[0]);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    // Validate text input fields (should not be just spaces)
    if (!name.trim()) {
      alert("Name cannot be empty or consist of only spaces.");
      return;
    }

    // Initialize request body
    const body = {
      name: name,
      priority: priority,
      difficulty: difficulty,
      estimate: estimate,
    };

    try {
      await createNewTask(body);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError(error);
    }
  }

  return (
    <div className="bg-background-grey py-10 px-5 h-screen">
      <form
        className="mx-auto max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        onSubmit={handleOnSubmit}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  type="text"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <CustomRadioGroup
              label="Priority"
              value={priority}
              onChange={setPriority}
              options={priorityOptions}
            />
            <CustomRadioGroup
              label="Difficulty"
              value={difficulty}
              onChange={setDifficulty}
              options={difficultyOptions}
            />
            <CustomRadioGroup
              label="Estimated Time"
              value={estimate}
              onChange={setEstimate}
              options={estimatedTimeOptions}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          {error && <ErrorAlert error={error} />}
          {success && <SuccessAlert message="new task create successfully!" />}
          <button
            type="submit"
            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
