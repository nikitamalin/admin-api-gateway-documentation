import { Skeleton, Avatar } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";
export default function DriversSkeleton() {
  const divArray = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div
      className={`flex h-[calc(100svh-73px)] flex-col items-center pt-12 pb-20 bg-light `}
    >
      <form className="flex flex-col base:w-[95%] footerXM:w-[90%] md:w-[700px] bg-white py-8 px-12 rounded-lg shadow-lg">
        <div>
          <TableContainer className="bg-white rounded-lg mt-8">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Position</Th>
                  <Th>Driver</Th>
                  <Th>Votes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {divArray.map((standing: any, index: number) => {
                  return (
                    <Tr
                      key={index}
                      className={`text-3xl hover:cursor-pointer `}
                    >
                      <Td>
                        <span className="mr-2">{index + 1}</span>
                      </Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <Skeleton rounded="full">
                            <Avatar size="lg" />
                          </Skeleton>

                          <Skeleton rounded="full">
                            <span className="text-3xl">Hellos Skeletons</span>
                          </Skeleton>
                        </div>
                      </Td>
                      <Td>
                        <Skeleton rounded="full" className="text-3xl">
                          <span>50,000</span>
                        </Skeleton>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <div className="relative items-center mx-auto text-2xl mt-8 ">
          <div className="flex bg-orange text-white rounded-full transition-colors duration-200 hover:cursor-not-allowed py-2 px-4 whitespace-nowrap">
            Vote
          </div>
        </div>
      </form>
    </div>
  );
}
