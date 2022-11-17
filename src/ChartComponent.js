import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
// import { Stack } from '@mui/material';
import { useState, Fragment } from 'react';

const ChartComponent = (props) => {
    const {tabledata} = props;
    const [value, setvalue] = useState([moment('2022-09-02', 'YYYY-MM-DD'), moment('2022-09-30', 'YYYY-MM-DD')]);
    const [filteredData, setfilteredData] = useState(tabledata);


    const filter = (data) => {
        const startDate = moment(data[0].$d).format("YYYYMMDD");
        const endDate = moment(data[1].$d).format("YYYYMMDD");
        const filtered = [...tabledata].filter((row) => moment(row.Date).format("YYYYMMDD") >= startDate && moment(row.Date).format("YYYYMMDD") <= endDate);
        setfilteredData(filtered);
    }

    const options = {
        title: {text: 'Weekly trend'},
        xAxis: {
            categories: filteredData.map((row) => moment(row.Date).format("D-MMM"))
        },
        yAxis: {
            title: { text: 'lbs' }
        },
        series: [{ 
            name: 'Weight',
            data: filteredData.map((row) => row.Weight)
        }, {
            name: 'Muscle mass',
            data: filteredData.map((row) => row.MuscleMass)
        }]
    };

    return (
        <Fragment>
      
        <Grid container spacing={2}>
                <Grid xs={10} style ={{"paddingBottom":"30px"}}>
                    <LocalizationProvider 
                dateAdapter={AdapterDayjs}
                localeText={{start: 'start date', end: 'end date'}}
            >
                <DateRangePicker 
                    // disableFuture
                    minDate={moment('2022-09-01', 'YYYY-MM-DD')}
                    // disablePast
                    maxDate={moment('2022-10-01', 'YYYY-MM-DD')}
                    value={value}
                    onChange={(newValue) => setvalue(newValue)}
                    renderInput={(startProps, endProps) => (
                        <Fragment>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} />
                        </Fragment>
                    )} 
                />
            </LocalizationProvider>
                </Grid>
                <Grid xs={2} style={{"alignItems":"center"}}>
                <Button onClick={() => filter(value)}>Submit</Button>
                </Grid>
            </Grid>
            
      
      
        <HighchartsReact highcharts={Highcharts} options={options} />
        </Fragment>
    );
}
 
export default ChartComponent;