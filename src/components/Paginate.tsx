import { Box, Button, Flex, HStack, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface PaginateProps {
  totalPages?: number;
  prev?: number | null;
  currentPage: number;
  onClick: (page: number) => void;
}

export const Paginate: React.FC<PaginateProps> = ({
  totalPages = 1,
  prev,
  currentPage,
  onClick,
}) => {
  const pageList = getPageList(totalPages, currentPage, 7);
  return (
    <Flex justifyContent="center" alignItems="center">
      <HStack>
        <Box>
          <IconButton
            aria-label="prev"
            onClick={() => onClick(currentPage - 1)}
            variant="paginate"
            icon={<Icon as={GrFormPrevious} fontSize="lg" />}
            isDisabled={prev === null}
          />
        </Box>
        {pageList.map((page, idx) => (
          <Button
            isActive={currentPage === page}
            disabled={page ? false : true}
            variant="paginate"
            onClick={() => onClick(page)}
            key={idx}
          >
            {page || "..."}
          </Button>
        ))}
        <Box>
          <IconButton
            aria-label="prev"
            variant="paginate"
            onClick={() => onClick(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            icon={<Icon as={GrFormNext} fontSize="lg" />}
          />
        </Box>
      </HStack>
    </Flex>
  );
};

const getPageList = (totalPages: number, page: number, maxLength: number) => {
  if (maxLength < 5) throw "maxLength must be at least 5";

  function range(start: number, end: number) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }

  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
  if (totalPages <= maxLength) {
    // no breaks in list
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    // no break on left of page
    return range(1, maxLength - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    // no break on right of page
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    );
  }
  // Breaks on both sides
  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  );
};
