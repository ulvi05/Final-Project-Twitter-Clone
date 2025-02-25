export default function ChatPage() {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row w-full h-full overflow-x-hidden">
        <div className="flex flex-col flex-shrink-0 w-64 py-8 pl-2 pr-2.5 bg-black border-r border-gray-700">
          <div className="flex flex-row items-center justify-center w-full h-12">
            <div className="flex items-center justify-center w-10 h-10 text-black bg-indigo-100 rounded-2xl">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 text-2xl font-bold text-white">Messages</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold text-white">Active Conversations</span>
              <span className="flex items-center justify-center w-4 h-4 text-black bg-white rounded-full">
                4
              </span>
            </div>
            <div className="flex flex-col mt-4 -mx-2 space-y-1 overflow-y-auto h-52">
              <button className="flex flex-row items-center p-2 hover:bg-[#1D1F23] rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-200 rounded-full">
                  H
                </div>
                <div className="ml-2 text-sm font-semibold text-white">
                  Henry Boyd
                </div>
              </button>
              <button className="flex flex-row items-center p-2 hover:bg-[#1D1F23] rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  M
                </div>
                <div className="ml-2 text-sm font-semibold text-white">
                  Marta Curtis
                </div>
                <div className="flex items-center justify-center w-4 h-4 ml-auto text-xs leading-none text-white bg-red-500 rounded">
                  2
                </div>
              </button>
              <button className="flex flex-row items-center p-2 hover:bg-[#1D1F23] rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-orange-200 rounded-full">
                  P
                </div>
                <div className="ml-2 text-sm font-semibold text-white">
                  Philip Tucker
                </div>
              </button>
              <button className="flex flex-row items-center p-2 hover:bg-[#1D1F23] rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-pink-200 rounded-full">
                  C
                </div>
                <div className="ml-2 text-sm font-semibold text-white">
                  Christine Reid
                </div>
              </button>
              <button className="flex flex-row items-center p-2 hover:bg-[#1D1F23] rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full">
                  J
                </div>
                <div className="ml-2 text-sm font-semibold text-white">
                  Jerry Guzman
                </div>
              </button>
            </div>
            <div className="flex flex-row items-center justify-between mt-6 text-xs">
              <span className="font-bold text-white">Archivied</span>
              <span className="flex items-center justify-center w-4 h-4 bg-white rounded-full">
                7
              </span>
            </div>
            <div className="flex flex-col mt-4 -mx-2 space-y-1">
              <button className="flex flex-row items-center p-2 hover:bg-[#1D1F23] rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-200 rounded-full">
                  H
                </div>
                <div className="ml-2 text-sm font-semibold text-white">
                  Henry Boyd
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6 border-r border-gray-700">
          <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 text-white bg-black rounded-2xl">
            <div className="flex flex-col h-full mb-4 overflow-x-auto">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 ml-3 text-sm bg-[#2f3336] shadow rounded-xl">
                        <div>Hey How are you today?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 ml-3 text-sm bg-[#2f3336] shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vel ipsa commodi illum saepe numquam maxime
                          asperiores voluptate sit, minima perspiciatis.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex flex-row-reverse items-center justify-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 mr-3 text-sm bg-blue-500 shadow rounded-xl">
                        <div>I'm ok what about you?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex flex-row-reverse items-center justify-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 mr-3 text-sm bg-blue-500 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 ml-3 text-sm bg-[#2f3336] shadow rounded-xl">
                        <div>Lorem ipsum dolor sit amet !</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex flex-row-reverse items-center justify-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 mr-3 text-sm bg-blue-500 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                        <div className="absolute bottom-0 right-0 mr-2 -mb-5 text-xs text-gray-500">
                          Seen
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 ml-3 text-sm bg-[#2f3336] shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis, in.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                        A
                      </div>
                      <div className="relative px-4 py-2 ml-3 text-sm bg-[#2f3336] shadow rounded-xl">
                        <div className="flex flex-row items-center">
                          <button className="flex items-center justify-center w-10 h-8 bg-blue-500 rounded-full hover:bg-blue-700">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </button>
                          <div className="flex flex-row items-center ml-4 space-x-px">
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-4 bg-white rounded-lg"></div>
                            <div className="w-1 h-8 bg-white rounded-lg"></div>
                            <div className="w-1 h-8 bg-white rounded-lg"></div>
                            <div className="w-1 h-10 bg-white rounded-lg"></div>
                            <div className="w-1 h-10 bg-white rounded-lg"></div>
                            <div className="w-1 h-12 bg-white rounded-lg"></div>
                            <div className="w-1 h-10 bg-white rounded-lg"></div>
                            <div className="w-1 h-6 bg-white rounded-lg"></div>
                            <div className="w-1 h-5 bg-white rounded-lg"></div>
                            <div className="w-1 h-4 bg-white rounded-lg"></div>
                            <div className="w-1 h-3 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-10 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-10 bg-white rounded-lg"></div>
                            <div className="w-1 h-8 bg-white rounded-lg"></div>
                            <div className="w-1 h-8 bg-white rounded-lg"></div>
                            <div className="w-1 h-1 bg-white rounded-lg"></div>
                            <div className="w-1 h-1 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-8 bg-white rounded-lg"></div>
                            <div className="w-1 h-8 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-2 bg-white rounded-lg"></div>
                            <div className="w-1 h-4 bg-white rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center w-full h-16 px-4 bg-[#202327] rounded-xl">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-blue-300"
                  />
                  <button className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="flex items-center justify-center flex-shrink-0 px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-xl">
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 -mt-px transform rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
