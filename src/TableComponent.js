import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TableSortLabel } from "@mui/material";

const TableComponent = (props) =>{
    const {tabledata: sortedData, sorting, order} = props;
    return (
        <TableContainer component={Paper}>
        <Table aria-label='simple table'>
            <TableHead>
                <TableRow>
                    <TableCell>
                    <TableSortLabel active={true}  direction={order} onClick={()=>sorting("Date")}> 
                       Date </TableSortLabel>
                    </TableCell>
                    <TableCell onClick={() => sorting("Weight")}>Weight</TableCell>
                    <TableCell onClick={() => sorting("BMI")}>BMI</TableCell>
                    <TableCell onClick={() => sorting("BodyFat")}>BodyFat</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData.map((row) => (
                    <TableRow key={row.Date}>
                        <TableCell>{row.Date}</TableCell>
                        <TableCell>{row.Weight}</TableCell>
                        <TableCell>{row.BMI}</TableCell>
                        <TableCell>{row.BodyFat}</TableCell>
                    </TableRow>        
                ))}
            </TableBody>
        </Table>
    </TableContainer> 
    )
}

export default TableComponent;