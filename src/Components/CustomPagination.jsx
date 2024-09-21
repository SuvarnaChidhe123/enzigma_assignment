function CustomPagination({ totalRecords, recordsPerPage, currentPage, onPageChange, onRecordsPerPageChange }) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const handleFirstPage = () => onPageChange(1);
    const handlePrevPage = () => onPageChange(currentPage - 1);
    const handleNextPage = () => onPageChange(currentPage + 1);
    const handleLastPage = () => onPageChange(totalPages);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            {/* Dropdown for selecting number of records per page */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Select
                    value={recordsPerPage}
                    onChange={(e) => onRecordsPerPageChange(e.target.value)}
                    style={{ width: '80px', marginRight: '15px' }}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </div>

            {/* Pagination Buttons */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleFirstPage} disabled={currentPage === 1} style={{ marginRight: '5px' }}>
                    <FirstPageIcon />
                    First
                </Button>
                <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1} style={{ marginRight: '5px' }}>
                    <NavigateBeforeIcon />
                    Prev
                </Button>
                <span style={{ margin: '0 10px' }}>{currentPage}</span>
                <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginRight: '5px' }}>
                    Next
                    <NavigateNextIcon />
                </Button>
                <Button variant="outlined" onClick={handleLastPage} disabled={currentPage === totalPages}>
                    Last
                    <LastPageIcon />
                </Button>
            </div>
        </div>
    );
}
