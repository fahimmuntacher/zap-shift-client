import React from "react";
import Logo from "../components/Logo/Logo";
import { Link, NavLink, Outlet } from "react-router";
import "./dashboard.css";
import { GrDeliver } from "react-icons/gr";
import { MdDashboardCustomize, MdDirectionsBike } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import { FaHistory, FaUsers } from "react-icons/fa";
import useRole from "../Hooks/useRole";
import Loading from "../components/Logo/Loading/Loading";

const DashBoardLayout = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  console.log(role);
  if(loading || roleLoading){
    return <Loading></Loading>
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex justify-between px-5">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <Link to="/">
            <div className="pl-2.5">
              <Logo></Logo>
            </div>
          </Link>

          <div>{user && <p>{user.displayName}</p>}</div>
        </nav>
        {/* Page content here */}

        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow space-y-3.5">
            {/* List item */}
            <li>
              <NavLink to="/dashboard">
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2.5">
                  {/* Dashboard icon */}

                  <MdDashboardCustomize></MdDashboardCustomize>
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/send-parcel"
                className={({ isActive }) =>
                  isActive ? "active-nav" : "inactive-nav"
                }
              >
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2.5">
                  {/* Dashboard icon */}
                  <GrDeliver />
                  <span className="is-drawer-close:hidden">Send Parcel</span>
                </button>
              </NavLink>
            </li>
            {/* payment history */}
            <li>
              <NavLink
                to="payment-history"
                className={({ isActive }) =>
                  isActive ? "active-nav" : "inactive-nav"
                }
              >
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2.5">
                  {/* Dashboard icon */}
                  <FaHistory />

                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </button>
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="approve-riders"
                    className={({ isActive }) =>
                      isActive ? "active-nav" : "inactive-nav"
                    }
                  >
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2.5">
                      {/* Dashboard icon */}
                      <MdDirectionsBike />

                      <span className="is-drawer-close:hidden">
                        Approve Riders
                      </span>
                    </button>
                  </NavLink>
                </li>
                {/* users management */}
                <li>
                  <NavLink
                    to="users-management"
                    className={({ isActive }) =>
                      isActive ? "active-nav" : "inactive-nav"
                    }
                  >
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2.5">
                        
                      <FaUsers></FaUsers>

                      <span className="is-drawer-close:hidden">
                        Users Management
                      </span>
                    </button>
                  </NavLink>
                </li>
              </>
            )}
            {/* approve riders */}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
