import { Box, Grid, Typography } from "@mui/material";
//import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TableSortLabel } from "@mui/material";
import { useState, useEffect } from "react"; 
// import Highcharts from 'highcharts';
//import HighchartsReact from 'highcharts-react-official';
// import PieChart from 'highcharts-react-official';
import TableComponent from "./TableComponent";
//import { createTheme } from "@mui/material";
//import { ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import ChartComponent from "./ChartComponent";
import KPIComponent from "./KPIComponent";
import { config } from "./config";

const Home = () => {
    const [tabledata, setTabledata] = useState(
        [{
            "Date": "1-Sep-2022",
            "Weight": 60,
            "BMI": 21,
            "BodyFat": 19,
            "MuscleMass": 46.0,
            "BodyWater": 57.5
        }]
    // null 
        );
    const [order, setorder] = useState('asc');
    const [sortedData, setsortedData] = useState(tabledata);

    useEffect(() => {
        fetch(config.json_server)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let sorted = data.sort((a, b) => moment(a.Date).format("YYYYMMDD") - moment(b.Date).format("YYYYMMDD"))
            setTabledata(sorted);
            setsortedData(sorted);
        });
    }, []);

    // const options = {
    //     title: {text: 'Weekly trend'},
    //     xAxis: {
    //         categories: tabledata.map((row) => moment(row.Date).format("D-MMM"))
    //     },
    //     yAxis: {
    //         title: { text: 'lbs' }
    //     },
    //     series: [{ 
    //         name: 'Weight',
    //         data: tabledata.map((row) => row.Weight)
    //     }, {
    //         name: 'Muscle mass',
    //         data: tabledata.map((row) => row.MuscleMass)
    //     }]
    // };

    // const options2 = {
    //     chart: {type: "pie"},
    //     series: [{ 
    //         name: 'Sept 2022',
    //         data: tabledata.map((row) => row.BMI)
    //     }]
    // };

    const sorting = (col) => {
        if (order === 'asc') {
            const sorted = [...sortedData].sort((a,b) => 
            a[col] > b[col] ? 1 : -1
            );
        setsortedData(sorted);  
        setorder('desc');
        }
        if (order === 'desc') {
            const sorted = [...sortedData].sort((a,b) => 
            a[col] < b[col] ? 1 : -1
            );
        setsortedData(sorted); 
        setorder('asc');
        }
    } 

    // // const createTheme = () => {
    // //     return createTheme({
    // //         MUIDataTableHeadCell:{ root:{ “& .MUITableSortLabel-icon”: { color: “black” }    
    // //     )}
    // // } 

    // const theme = createTheme({
    //     components: {
    //       // Name of the component
    //       MUIDataTableHeadCell: {
    //         styleOverrides: {
    //           // Name of the slot
    //           root: {
    //             // Some CSS
    //             color: "red"
    //           },
    //         },
    //       },
    //     },
    //   });
      
      

    return (
        <div className="home">
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item sm={12} md={8}>
                    <Box p={2} height={650} >
                        <Typography variant="h5" gutterBottom>
                            WEEKLY DATA
                        </Typography>
                        <TableComponent tabledata = {sortedData} order = {order} sorting = {sorting}></TableComponent>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box p={2}>
                        <Typography variant="h5" gutterBottom>
                            WEIGHT TREND
                        </Typography>
                        <ChartComponent tabledata={tabledata}></ChartComponent>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box p={2} border='1px dashed grey'>
                        <Typography variant="h1" gutterBottom align="center">
                            <KPIComponent tabledata={tabledata}></KPIComponent>
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
                {/* <Grid item xs={4}>
                    <Box  p={2}>
                        <PieChart highcharts={Highcharts} options={options2} />
                    </Box>
                </Grid> */}
            </Grid>
        </div>
    );
}
 
export default Home;