import { Fragment, useContext, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Usercontext from "../context/Usercontext";
import { useDispatch, useSelector } from "react-redux";
import { totalcartitems } from "../actions/cartaction";
import { Link } from "react-router-dom";
import { logout } from "../actions/useraction";

const navigation = {
  categories: [
    {
      id: "Categories",
      name: "Categories",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://i.pinimg.com/564x/79/68/0d/79680d29dee2ee45a3ad2b3e6d90d3f6.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Best Sellers",
          href: "#",
          imageSrc:
            "https://i.pinimg.com/564x/8a/3f/97/8a3f97243d6d7a3cd92e72137a569200.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "Hair",
          name: "Hair Care",
          items: [
            { name: "Sadhana oil", href: "#" },
            { name: "Sadhana Shampoo", href: "#" },
            { name: "Sadhana oil", href: "#" },
            { name: "Sadhana Shampoo", href: "#" },
            { name: "Sadhana oil", href: "#" },
            { name: "Sadhana Shampoo", href: "#" },
          ],
        },
        {
          id: "Face",
          name: "Face Care",
          items: [
            { name: "Face cream", href: "#" },
            { name: "Face powder", href: "#" },
            { name: "Face product", href: "#" },
          ],
        },
        {
          id: "Others",
          name: "Others",
          items: [
            { name: "Face cream", href: "#" },
            { name: "Face powder", href: "#" },
            { name: "Face product", href: "#" },
            { name: "Face cream", href: "#" },
            { name: "Face powder", href: "#" },
            { name: "Face product", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "test", href: "#" },
    { name: "test", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userdropdownopen, setuserdropdownopen] = useState(false);

  const handleDropDown = () => {
    setuserdropdownopen(!userdropdownopen);
  };
  const { error, loading, isAuthenticated ,user} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const totalcountitemcart = useSelector((state) => state.cart.totalcount);
  // console.log(totalcountitemcart);
  const { setcartaddhandlesidebar } = useContext(Usercontext);
  const logoutuserbuttonsubmit=(e)=>{
    e.preventDefault();
    dispatch(logout())
  }
  return (
    <div className="">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-darkuse"
                                : "border-transparent text-darkuse",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center h-56"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
                {!isAuthenticated && (
                   <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                   <div className="flow-root">
                   <Link
                       to="/login"
                       className="text-sm font-medium text-darkuse hover:text-upperbar"
                     >
                       Sign in
                     </Link>
                   </div>
                   <div className="flow-root">
                   <Link
                       to="/register"
                       className="text-sm font-medium text-darkuse hover:text-upperbar"
                     >
                       Create account
                     </Link>
                   </div>
                 </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <p className="flex h-10 items-center justify-center bg-darktext px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get 20% off on purchase of 3 items
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-20 md:ml-4 flex md:justify-center justify-end  items-center gap-2 lg:ml-0 cursor-pointer">
                <Link
                  to="/"
                  className="flex justify-center gap-2 items-center "
                >
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://www.greenparty.ca/sites/default/files/downloads/logos/gpc_logo_web_green_flower.png"
                    alt=""
                  />
                  <h3 className="text-darkbutton font-semibold">19 HERB</h3>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "text-darkbutton"
                                  : " text-darkbutton hover:text-lighttext",
                                "relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-bold text-darkbutton"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1 text-lighttext"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-bold text-darkbutton"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-lighttext text-darktext"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-darkbutton hover:text-darktext"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {!isAuthenticated && (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-darkbutton hover:text-upperbar"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-upperbar" aria-hidden="true" />
                    <Link
                      to="/register"
                      className="text-sm font-medium text-darkbutton hover:text-upperbar"
                    >
                      Create account
                    </Link>
                  </div>
                )}

                {/* Cart */}
                <div
                  className="ml-4 flow-root lg:ml-6 cursor-pointer"
                  onClick={() => setcartaddhandlesidebar(true)}
                >
                  <a className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-darkbutton group-hover:text-darktext"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-darkbutton group-hover:text-darktext">
                      {totalcountitemcart}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
                {/* AVATAR   */}

                {
                  isAuthenticated && (<>
                  <img
                    id="avatarButton"
                    type="button"
                    onClick={handleDropDown}
                    data-dropdown-placement="bottom-start"
                    className="w-10 h-10 ml-3 sm:ml-9 rounded-full cursor-pointer"
                    src="https://i.pinimg.com/564x/cd/6d/31/cd6d31d9c6c34c8c480a4e53dff54de4.jpg"
                    alt="User dropdown"
                  />
  
                  <div
                    id="userDropdown"
                    className={`z-10 absolute right-5 top-28 sm:right-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                      userdropdownopen ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="px-4 py-3 text-sm text-darktext font-semibold dark:text-white">
                      <div>{user.name}</div>
                      <div className="truncate text-darktext font-semibold">{user.email}</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-darktext font-semibold dark:text-gray-200"
                      aria-labelledby="avatarButton"
                    >
                       {
                        user.role==="admin" && (
                          <li>
                        <Link to={"/admin/dashboard"}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                        )
                       }
                      <li>
                        <Link
                          to={"/me"}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/order/me"}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          My order
                        </Link>
                      </li>
  
                    </ul>
                    <div className="py-1">
                      <a
                        onClick={logoutuserbuttonsubmit}
                        className="block px-4 py-2 text-sm cursor-pointer text-darktext font-semibold hover:bg-textlight dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                       Log Out
                      </a>
                    </div>
                  </div></>)
                }
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
