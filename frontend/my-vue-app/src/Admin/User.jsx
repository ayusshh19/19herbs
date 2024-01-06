import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, deleteUser, getAllUsers } from "../actions/useraction";
import { useNavigate } from "react-router-dom";
import { DELETE_USER_RESET } from "../constants/userconstant";

function User() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/user");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  return (
    <div>
      <Sidebar />
      <div class="sm:mx-auto ml-10 max-w-screen-xl    px-4 py-20 sm:px-8">
        <div class="flex items-center justify-between pb-6">
          <div>
            <h2 class="font-semibold text-gray-700">User Accounts</h2>
            <span class="text-xs text-gray-500">
              View accounts of registered users
            </span>
          </div>
        </div>
        <div class="overflow-y-hidden rounded-lg border">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-darkuse text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">ID</th>
                  <th class="px-5 py-3">Full Name</th>
                  <th class="px-5 py-3">User Role</th>
                  <th class="px-5 py-3">Created at</th>
                  <th class="px-5 py-3">Email</th>
                  <th class="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody class="text-gray-500">
                {users &&
                  users.map((data) => {
                    return (
                      <tr>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{data._id}</p>
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                              <img
                                class="h-full w-full rounded-full"
                                src="https://static.thenounproject.com/png/4035887-200.png"
                                alt=""
                              />
                            </div>
                            <div class="ml-3">
                              <p class="whitespace-no-wrap">{data.name}</p>
                            </div>
                          </div>
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{data.role}</p>
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{data.createdAt}</p>
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{data.email}</p>
                        </td>

                        <td class="border-b border-gray-200 bg-white cursor-pointer px-5 py-5 text-sm">
                          {data.role==="admin"?(<svg class="h-8 w-8 text-green-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>):(<svg
                            class="h-8 w-8 text-green-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            onClick={() =>
                              deleteUserHandler(data._id)
                            }
                          >
                            {" "}
                            <path stroke="none" d="M0 0h24v24H0z" />{" "}
                            <line x1="18" y1="6" x2="6" y2="18" />{" "}
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>)}
                          
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
