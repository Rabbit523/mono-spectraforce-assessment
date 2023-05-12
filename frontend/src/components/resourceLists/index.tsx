import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import { logout } from "../../store/authSlice";

interface Resource {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

const fetchResources = async (page: number): Promise<Resource[]> => {
  const { data } = await axios.get(
    `http://localhost:5000/api/resource?page=${page}`
  );
  return data.data;
};

const ResourceList: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    data: resources,
    isLoading,
    isError,
  } = useQuery(["resources", page], () => fetchResources(page));

  const mutation = useMutation(
    (id: number) => axios.delete(`http://localhost:5000/api/resource/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("resources");
      },
    }
  );

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/logout");
      // handle successful logout
      console.log(response);
      dispatch(logout());
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !resources) return <div>Error loading resources.</div>;

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Resources</h1>
      {resources.map((resource: Resource) => (
        <div key={resource.id}>
          <h2>{resource.name}</h2>
          <p>
            {resource.year} - {resource.color} - {resource.pantone_value}
          </p>
          <button onClick={() => mutation.mutate(resource.id)}>Remove</button>
        </div>
      ))}
      <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
        Previous Page
      </button>
      <button onClick={() => setPage((old) => old + 1)}>Next Page</button>
      {mutation.isLoading ? (
        "Removing..."
      ) : (
        <>
          {mutation.isError ? (
            <div>
              An error occurred: {(mutation.error as AxiosError).message}
            </div>
          ) : null}

          {mutation.isSuccess ? <div>Resource removed!</div> : null}
        </>
      )}
    </div>
  );
};

export default ResourceList;
