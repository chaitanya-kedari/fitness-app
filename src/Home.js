import { Box, Grid, Typography } from "@mui/material";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TableSortLabel } from "@mui/material";
import { useState, useEffect } from "react"; 
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PieChart from 'highcharts-react-official';
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";

const Home = () => {
    const [tabledata, setTabledata] = useState([
        {
            "Date": "1-Sep-2022",
            "Weight": 60,
            "BMI": 21,
            "BodyFat": 19,
            "MuscleMass": 46.0,
            "BodyWater": 57.5
        }]);
    const [order, setorder] = useState('asc');

    useEffect(() => {
        fetch('http://localhost:8000/tabledata')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setTabledata(data);
        });
    }, []);

    const options = {
        title: {text: 'Weight'},
        series: [{ 
            name: 'Last month',
            data: tabledata.map((row) => row.Weight)
        }]
    };

    const options2 = {
        chart: {type: "pie"},
        series: [{ 
            name: 'Sept 2022',
            data: tabledata.map((row) => row.BMI)
        }]
    };

    const sorting = (col) => {
        if (order === 'asc') {
            const sorted = [...tabledata].sort((a,b) => 
            a[col] > b[col] ? 1 : -1
            );
        setTabledata(sorted); 
        setorder('desc');
        }
        if (order === 'desc') {
            const sorted = [...tabledata].sort((a,b) => 
            a[col] < b[col] ? 1 : -1
            );
        setTabledata(sorted); 
        setorder('asc');
        }
    } 

    // const createTheme = () => {
    //     return createTheme({
    //         MUIDataTableHeadCell:{ root:{ “& .MUITableSortLabel-icon”: { color: “black” }    
    //     )}
    // } 

    const theme = createTheme({
        components: {
          // Name of the component
          MUIDataTableHeadCell: {
            styleOverrides: {
              // Name of the slot
              root: {
                // Some CSS
                color: "red"
              },
            },
          },
        },
      });
      
      

    return (
        <div className="home">
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item sm={12} md={8}>
                    <Box p={2} height={650} >
                        <Typography variant="h5" gutterBottom>
                            WEEKLY DATA
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                        <ThemeProvider theme={theme}>
                                        <TableSortLabel active='true'  direction={order} onClick={()=>sorting("Date")}> 

                                           Date </TableSortLabel>
                                           </ThemeProvider>
                                        </TableCell>
                                        <TableCell onClick={() => sorting("Weight")}>Weight</TableCell>
                                        <TableCell onClick={() => sorting("BMI")}>BMI</TableCell>
                                        <TableCell onClick={() => sorting("BodyFat")}>BodyFat</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tabledata.map((row) => (
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
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box p={2}>
                        <Typography variant="h5" gutterBottom>
                            WEIGHT TREND
                        </Typography>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box p={2} border='1px dashed grey'>
                        <Typography variant="h1" gutterBottom align="center">
                            250
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom align="center">
                            average calories burned
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box p={2} border='1px dashed grey'>
                        <Typography variant="h1" gutterBottom align="center">
                            1.5
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom align="center">
                            average weight lost
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box p={2} border='1px dashed grey'>
                        <Typography variant="h1" gutterBottom align="center">
                            20%
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom align="center">
                            bodyfat percentage
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box  p={2}>
                        <PieChart highcharts={Highcharts} options={options2} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
 
export default Home;