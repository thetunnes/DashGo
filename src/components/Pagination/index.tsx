import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, i) => {
      return from + i + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPage =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && <Flex color="gray.300" w={8} alignItems="flex-end" justifyContent="center">...</Flex>}
          </>
        )}

        {previousPage.length &&
          previousPage.map((page) => (
            <PaginationItem number={page} key={page} onPageChange={onPageChange} />
          ))}

        <PaginationItem number={currentPage} isCurrent onPageChange={onPageChange} />

        {nextPage.length &&
          nextPage.map((page) => <PaginationItem number={page} key={page} onPageChange={onPageChange} />)}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && <Flex color="gray.300" w={8} alignItems="flex-end" justifyContent="center">...</Flex>}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
