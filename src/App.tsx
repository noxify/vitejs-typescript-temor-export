import "./App.css"

import { Menu, Transition } from "@headlessui/react"
import { useToSvg, useToPng, useToBlob } from "@hugocxl/react-to-image"

import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  AreaChart,
} from "@tremor/react"
import { Options } from "html-to-image/lib/types"
import { Fragment } from "react"

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
]

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString()
}

export default function App() {
  const exportOptions: Partial<Options> = {
    quality: 1,
    backgroundColor: "#fff",
    style: {
      marginTop: "10px",
      marginBottom: "10px",
    },
  }

  const [, copyToClipboard] = useToBlob<HTMLDivElement>({
    selector: "#tremor-area-chart",
    ...exportOptions,
    onSuccess: (data) => {
      if (data) {
        navigator.clipboard.write([
          new ClipboardItem({
            [data.type]: new Promise((resolve) => resolve(data)),
          }),
        ])
      } else {
        console.error("Something went totally wrong")
      }
    },
  })

  const [, downloadAsPng] = useToPng<HTMLDivElement>({
    selector: "#tremor-area-chart",
    ...exportOptions,
    onSuccess: (data) => {
      const link = document.createElement("a")
      link.download = "tremor-area-chart.png"
      link.href = data
      link.click()
    },
  })

  const [, downloadAsSvg] = useToSvg<HTMLDivElement>({
    selector: "#tremor-area-chart",
    ...exportOptions,
    onSuccess: (data) => {
      const link = document.createElement("a")
      link.download = "tremor-area-chart.svg"
      link.href = data
      link.click()
    },
  })
  return (
    <main className="px-12 py-12 mx-auto max-w-7xl">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="flex justify-end space-x-2">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Export
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="-mr-1 h-5 w-5"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            <button
                              onClick={downloadAsPng}
                              className="text-gray-700 block px-4 py-2 text-sm"
                            >
                              Save as PNG
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              onClick={downloadAsSvg}
                              className="text-gray-700 block px-4 py-2 text-sm"
                            >
                              Save as SVG
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              onClick={copyToClipboard}
                              className="text-gray-700 block px-4 py-2 text-sm"
                            >
                              Copy to clipboard
                            </button>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div>
                  <AreaChart
                    id="tremor-area-chart"
                    className="h-72 mt-4"
                    data={chartdata}
                    index="date"
                    categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                    colors={["indigo", "cyan"]}
                    valueFormatter={dataFormatter}
                  />
                </div>
              </Card>
            </div>

            <div className="mt-6">Result</div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  )
}
