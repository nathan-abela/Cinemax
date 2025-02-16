import React from 'react';
import { Button, Typography } from '@mui/material';

import useStyles from './styles';

function Pagination({ currentPage, setPage, totalPages }) {
  const classes = useStyles(); // Import custom styles

  // Handler for navigating to the previous page
  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  // Handler for navigating to the next page
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // If there are no pages to display, don't render the pagination component
  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={classes.container}>
      {/* Previous Page Button - Disabled if on the first page */}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        Prev
      </Button>

      {/* Displays the current page number */}
      <Typography
        variant="h4"
        className={classes.pageNumber}
      >
        {currentPage}
      </Typography>

      {/* Next Page Button - Disabled if on the last page */}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
