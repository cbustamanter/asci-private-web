import { Tr, Td, Table, Tbody } from "@chakra-ui/react";
import React from "react";

interface EmptyTableProps {
  colspan: number;
}

export const EmptyTable: React.FC<EmptyTableProps> = ({ colspan }) => {
  return (
    <>
      <Tr>
        <Td colSpan={colspan}>
          <div>
            <Table>
              <Tbody>
                <Tr>
                  <Td>No existe data</Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </Td>
      </Tr>
    </>
  );
};
