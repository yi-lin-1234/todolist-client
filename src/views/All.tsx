import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import {
  getSortedTasks,
  deleteTaskById,
  updateStatusToFinished,
} from "../service/api";
import DropDown from "../components/DropDown";
import { UnfinishedTask } from "../types/type";
import { format } from "date-fns";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Created At: Newest to Oldest", order: "createdAt desc" },
  { name: "Created At: Oldest to Newest", order: "createdAt asc" },
  { name: "Priority: Low to Urgent", order: "priority asc" },
  { name: "Priority: Urgent to Low", order: "priority desc" },
  { name: "Difficulty: Easy to Hard", order: "difficulty asc" },
  { name: "Difficulty: Hard to Easy", order: "difficulty desc" },
  { name: "Estimated Time: Mins to Years", order: "estimate asc" },
  { name: "Estimated Time: Years to Mins", order: "estimate desc" },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function All() {
  const [tasks, setTasks] = useState<UnfinishedTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState(sortOptions[0]);
  const navigate = useNavigate();

  const completeTask = async (id: string) => {
    try {
      await updateStatusToFinished(id);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskById(id);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (id: string) => {
    try {
      navigate(`/dashboard/edit/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const actionsOptions = [
    { name: "Done", click: completeTask },
    { name: "Edit", click: editTask },
    { name: "Delete", click: deleteTask },
  ];

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const field = sortOrder.order.split(" ")[0];
        const order = sortOrder.order.split(" ")[1];
        const data = await getSortedTasks(field, order);

        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [sortOrder.order]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-4 px-4 sm:px-6 lg:px-8">
      <div className="w-1/3">
        {" "}
        <DropDown
          label="Sort by:"
          options={sortOptions}
          value={sortOrder}
          onChange={setSortOrder}
        />
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Difficulty
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Estimated Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {task.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.priority}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.difficulty}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.estimate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(task.createdAt), "yyyy-MM-dd")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Menu as="div" className="relative">
                          <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                              {actionsOptions.map((action) => (
                                <Menu.Item key={action.name}>
                                  {({ active }) => (
                                    <span
                                      onClick={() => action.click(task.id)}
                                      className={classNames(
                                        active ? "bg-gray-50" : "",
                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                      )}
                                    >
                                      {action.name}
                                    </span>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default All;
