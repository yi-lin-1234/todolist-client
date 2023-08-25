import { FinishedTask, GroupedAttribute } from "../types/type";

export function groupTasksByPriority(tasks: FinishedTask[]) {
  if (!Array.isArray(tasks)) {
    throw new Error("Input should be an array");
  }

  const attributeCounts = tasks.reduce((acc: GroupedAttribute, task) => {
    const priority = task.priority;

    // Validate that the priority property exists and is a string
    if (typeof priority !== "string") {
      throw new Error(
        "Each task should have a priority property of type string"
      );
    }

    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(attributeCounts).map((priority) => ({
    priority: priority,
    count: attributeCounts[priority],
  }));
}

export function groupTasksByDifficulty(tasks: FinishedTask[]) {
  if (!Array.isArray(tasks)) {
    throw new Error("Input should be an array");
  }

  const attributeCounts = tasks.reduce((acc: GroupedAttribute, task) => {
    const difficulty = task.difficulty;

    // Validate that the difficulty property exists and is a string
    if (typeof difficulty !== "string") {
      throw new Error(
        "Each task should have a difficulty property of type string"
      );
    }

    acc[difficulty] = (acc[difficulty] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(attributeCounts).map((difficulty) => ({
    difficulty: difficulty,
    count: attributeCounts[difficulty],
  }));
}

export function groupTasksByEstimate(tasks: FinishedTask[]) {
  if (!Array.isArray(tasks)) {
    throw new Error("Input should be an array");
  }

  const attributeCounts = tasks.reduce((acc: GroupedAttribute, task) => {
    const estimate = task.estimate;

    // Validate that the estimate property exists and is a string or number
    if (typeof estimate !== "string" && typeof estimate !== "number") {
      throw new Error(
        "Each task should have an estimate property of type string or number"
      );
    }

    acc[estimate] = (acc[estimate] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(attributeCounts).map((estimate) => ({
    estimate: estimate,
    count: attributeCounts[estimate],
  }));
}
