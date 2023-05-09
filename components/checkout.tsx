/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Product {
  id: number;
  name: string;
  href: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt: string;
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  products: Product[];
}

export const Checkout = ({ open, setOpen, products }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  const createSession = async () => {
    setIsLoading(true);
    const { data } = await axios.post("/api/create-session", {
      items: products,
    });
    // const url = data.payment_url.replace("checkout", "pos"); add this for POS mode
    router.push(data.payment_url);
  };

  useEffect(() => {
    const price = getPrice(products);
    setTotal(price);
  }, [products]);

  const getPrice = (products: any[]) => {
    let price: number = 0;
    products?.map((prod, index) => {
      price += prod.price * prod.quantity;
    });
    return price;
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {products?.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <div className="ml-4 text-gray-500">
                                          ${product.price} /item
                                        </div>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <p className="text-gray-500">
                                      Qty {product.quantity}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between pb-4 text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${total}</p>
                        </div>
                        <button
                          onClick={createSession}
                          className="!w-full !h-10 bg-indigo-600 rounded-md text-white font-medium hover:bg-indigo-700"
                        >
                          {isLoading ? (
                            <svg
                              className="animate-spin mx-48"
                              fill="none"
                              height="20"
                              viewBox="0 0 20 20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z"
                                fill="#fff"
                              />
                            </svg>
                          ) : (
                            <span>Checkout</span>
                          )}
                        </button>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500"></div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
