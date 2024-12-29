interface FetchTasksOptions {
  page?: number;
  limit?: number;
  category?: string;
  priority?: string;
}

export async function fetchTasks(options: FetchTasksOptions = {}) {
  const {
    page = 1,
    limit = 20,
    category,
    priority
  } = options;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(category && { category }),
    ...(priority && { priority })
  });

  const response = await fetch(`/api/tasks?${queryParams}`);
  return response.json();
} 